import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuth } from "@clerk/react";
import { Check, Copy, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateToken } from "@/api/api-keys/api-keys.service";
import { useToast } from "@/hooks/useToast";
import { ONE_SECOND } from "@/time";

const EXPIRATION_OPTIONS = ["1d", "7d", "30d"] as const;

export interface GenerateTokenDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const GenerateTokenDialog = ({ isOpen, onOpenChange }: GenerateTokenDialogProps) => {

    const { t } = useTranslation("translation", { keyPrefix: "sidebar.tokenDialog" });
    const { userId, sessionId } = useAuth();
    const { toast } = useToast();

    const [expirationTime, setExpiration] = useState<string>(EXPIRATION_OPTIONS[0]);
    const [isCopying, setIsCopying] = useState(false);


    const { mutate, data, isPending, isSuccess, reset } = useMutation({
        mutationFn: () => {
            if (!sessionId) {
                return Promise.reject(new Error(t("errors.noSession")));
            }
            return generateToken({ userId, expirationTime, sessionId });
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: t("errors.title"),
                description: error.message || t("errors.unknown"),
            });
        },
    });

    const tokenValue = data?.token;

    const handleClose = useCallback(() => {
        onOpenChange(false);
        setTimeout(reset, 200);
    }, [onOpenChange, reset]);

    const copyToClipboard = useCallback(async () => {
        if (!tokenValue) return;

        try {
            await navigator.clipboard.writeText(tokenValue);
            setIsCopying(true);
            setTimeout(() => setIsCopying(false), ONE_SECOND * 2);
        } catch {
            toast({ variant: "destructive", description: t("errors.copyFailed") });
        }
    }, [tokenValue, toast, t]);

    const onFormSubmit = useCallback((e: React.SubmitEvent) => {
        e.preventDefault();
        mutate();
    }, [mutate]);

    const renderForm = () => (
        <form onSubmit={onFormSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
                <Label htmlFor="expiration">{t("expirationLabel")}</Label>
                <Select value={expirationTime} onValueChange={setExpiration}>
                    <SelectTrigger id="expiration" className="w-full">
                        <SelectValue placeholder={t("selectPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                        {EXPIRATION_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {t(`options.${opt}`)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={handleClose}>
                    {t("actions.cancel")}
                </Button>
                <Button
                    type="submit"
                    disabled={isPending} // 🚀 Disable if no session
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t("actions.generate")}
                </Button>
            </div>
        </form>
    );

    const renderSuccess = () => (
        <div className="space-y-5">
            <div>
                <Label className="text-xs text-muted-foreground mb-1">
                    {t("resultLabel")}
                </Label>
                <div className="flex items-center p-3 rounded-md border break-all">
                    <span className="flex select-all text-xs">{tokenValue}</span>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 ml-3"
                        onClick={copyToClipboard}
                    >
                        {isCopying ? (
                            <Check className="h-4 w-4 text-green-600" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
            <Button className="w-full" onClick={handleClose}>
                {t("actions.done")}
            </Button>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                </DialogHeader>

                {isSuccess ? renderSuccess() : renderForm()}
            </DialogContent>
        </Dialog>
    );
};