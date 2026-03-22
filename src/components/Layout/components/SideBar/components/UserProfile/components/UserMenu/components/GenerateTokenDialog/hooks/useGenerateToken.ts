import { generateToken } from "@/api/api-keys/api-keys.service";
import { useMutation } from "@tanstack/react-query";

export const useGenerateToken = (userId?: string | null, sessionId?: string | null) => {
    return useMutation({
        mutationFn: (expirationTime: string) => {
            if (!userId || !sessionId) throw new Error("Auth required");
            return generateToken({ userId, expirationTime, sessionId });
        },
    });
};