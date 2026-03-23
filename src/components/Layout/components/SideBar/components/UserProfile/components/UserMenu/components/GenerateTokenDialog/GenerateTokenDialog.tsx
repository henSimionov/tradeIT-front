import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@clerk/react";
import { ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TokenForm } from "./components/TokenForm";
import { TokenSuccessView } from "./components/TokenSuccessView";
import { generateToken } from "@/api/api-keys/api-keys.service";
import { useMutation } from "@tanstack/react-query";

export interface GenerateTokenDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const useGenerateToken = () => {
    return useMutation({
        mutationFn: (expirationTime: string) => {
            return generateToken(expirationTime);
        },
    });
};

export const GenerateTokenDialog = ({ isOpen, onOpenChange }: GenerateTokenDialogProps) => {

    const { t } = useTranslation("translation", { keyPrefix: "sidebar.tokenDialog" });

    const { userId, sessionId } = useAuth();
    const { mutate: generateTokenCall, data, isPending, isSuccess, reset } = useGenerateToken(userId, sessionId);

    const handleClose = useCallback((open: boolean) => {
        onOpenChange(open);

        if (!open) {
            setTimeout(reset, 200);
        }
    }, [onOpenChange, reset]);

    return (

        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-surface border-subtle text-text-base">

                <DialogHeader>
                    <DialogTitle className="text-text-base flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand" />
                        {t("title")}
                    </DialogTitle>
                </DialogHeader>

                {
                    isSuccess ? (
                        <TokenSuccessView tokenResponse={data} />
                    ) : (
                        <TokenForm
                            onSubmit={(time) => generateTokenCall(time)}
                            onCancel={() => handleClose(false)}
                            isPending={isPending}
                        />
                    )
                }

            </DialogContent>
        </Dialog>
    );
};
