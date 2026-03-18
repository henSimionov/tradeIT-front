

export interface IgenerateTokenBody {
    userId: string
    expirationTime: string;
    sessionId: string;
}

export interface IToken {
    token: string;
    expiresAt: string;
}
