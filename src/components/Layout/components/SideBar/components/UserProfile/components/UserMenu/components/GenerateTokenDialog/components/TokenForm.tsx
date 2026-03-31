import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EXPIRATION_OPTIONS = ["1d", "7d", "30d"];

interface TokenFormProps {
    onSubmit: (time: string) => void;
    onCancel: () => void;
    isPending: boolean;
}
export const TokenForm = ({ onSubmit, onCancel, isPending }: TokenFormProps) => {

    const defaultExpiration = EXPIRATION_OPTIONS[0];

    const [expirationTime, setExpiration] = useState<string>(defaultExpiration);
    const { t } = useTranslation("translation", { keyPrefix: "sidebar.tokenDialog.tokenForm" });

    return (
        <div>
            <div>

                <Label className="flex text-text-base text-sm pb-2">
                    {t("expirationLabel")}
                </Label>

                <Select value={expirationTime} onValueChange={setExpiration}>

                    <SelectTrigger className="bg-surface-raised border-subtle text-text-base focus:ring-brand">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent className="bg-surface-overlay border-subtle text-text-base">
                        {EXPIRATION_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt} className="focus:bg-brand focus:text-on-brand cursor-pointer">
                                {t(`options.${opt}`)}
                            </SelectItem>
                        ))}
                    </SelectContent>

                </Select>

            </div>

            <div className="flex justify-end gap-1 pt-5">

                <Button
                    variant="ghost"
                    type="button"
                    onClick={onCancel}
                    className=" text-text-muted hover:text-text-base">
                    {t("actions.cancel")}
                </Button>

                <Button
                    type="button"
                    className="bg-brand hover:bg-brand-hover text-on-brand"
                    onClick={() => onSubmit(expirationTime)}
                    disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t("actions.generate")}
                </Button>

            </div>
        </div>
    );
};