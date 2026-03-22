import { SECOND_IN_MS } from "@/time";
import { useCallback, useState } from "react";

export const useCopyToClipboard = (duration = SECOND_IN_MS) => {

    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), duration);
    }, [duration]);

    return { isCopied, copy };
};