import { IToken } from "@/api/api-keys/api-keys.types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { format, parseISO } from "date-fns";
import { CalendarClock, Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";


export const TokenSuccessView = ({ tokenResponse }: { tokenResponse: IToken }) => {

    const { t } = useTranslation("translation", { keyPrefix: "sidebar.tokenDialog.successView" });
    const { isCopied, copy } = useCopyToClipboard();

    const formattedDate = format(parseISO(tokenResponse.expiresAt), "MMM d, yyyy 'at' p");

    return (
        <div className="space-y-2">
            <Label className="text-text-muted text-xs">{t("resultLabel")}</Label>

            <div className=" relative flex items-center bg-surface-raised border border-subtle rounded-lg p-3">

                <code className="flex text-xs text-text-base break-all pr-3">{tokenResponse.token}</code>

                <Button size="icon" variant="ghost" onClick={() => copy(tokenResponse.token)}>
                    {!isCopied ? <Copy /> : <Check className="text-success" />}
                </Button>

            </div>

            <div className="flex items-center gap-2 px-1 pt-1">
                <CalendarClock className="h-3.5 w-3.5 text-text-muted" />
                <span className="text-xs text-text-muted">
                    {t("expiresOn")}: <span className="text-text-base font-medium">{formattedDate}</span>
                </span>
            </div>

        </div>
    );
};