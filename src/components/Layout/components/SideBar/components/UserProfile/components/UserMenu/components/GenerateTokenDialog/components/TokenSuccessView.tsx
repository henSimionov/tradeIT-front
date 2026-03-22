import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";


export const TokenSuccessView = ({ token }: { token: string }) => {

    const { t } = useTranslation("translation", { keyPrefix: "sidebar.tokenDialog.successView" });
    const { isCopied, copy } = useCopyToClipboard();

    return (
        <div className="space-y-2">
            <Label className="text-text-muted text-xs">{t("resultLabel")}</Label>

            <div className=" relative flex items-center bg-surface-raised border border-subtle rounded-lg p-3">

                <code className="flex text-xs text-text-base break-all pr-3">{token}</code>

                <Button size="icon" variant="ghost" onClick={() => copy(token)}>
                    {!isCopied ? <Copy /> : <Check className="text-success" />}
                </Button>

            </div>
        </div>
    );
};