const enUS = {
    sidebar: {
        logoAlt: "TradeIT logo",
        logoName: "Trade",
        logoNameHighlight: "IT",
        nav: {
            dashboards: "Dashboards",
            wallets: "Wallets",
            assets: "Assets",
        },
    },
    homePage: {
        greeting: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening",
            night: "Good night",
        },
        portfolioOverview: "Here's your portfolio overview.",
        inDevelopment: "In development...",
    },
    userProvider: {
        syncError: "Failed to sync your trading profile. Please refresh the page. If the problem persists, contact our support - Ariel Dadon."
    }
} as const;

export default enUS;
