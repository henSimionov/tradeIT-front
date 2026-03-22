import { act } from "react";
import { success } from "zod";

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
        userProfile: {
            logout: "Logout",
            generateToken: "Generate Token"
        },
        tokenDialog: {
            title: "Generate Token",
            tokenForm: {
                expirationLabel: "Expiration",
                options: {
                    "1d": "1 day",
                    "7d": "7 days",
                    "30d": "30 days"
                },
                actions: {
                    cancel: "Cancel",
                    generate: "Generate",
                },
            },
            successView: {
                resultLabel: "Your API Token",
                actions: {
                    done: "Done",
                },
                expiresOn: "Expires on: ",
            },

            errors: {
                title: "Error",
                unknown: "An unknown error occurred",
                noSession: "No active session found. Please try to log in again.",
                copyFailed: "Failed to copy token."
            },
            success: {
                title: "Success",
                generated: "Token generated successfully!",
                copied: "Token copied to clipboard!"
            },

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
