import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/Router/routes";

import { LayoutDashboard, TrendingUp, Wallet } from "lucide-react";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const PagesNavigator = () => {

    const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
    const [selectedPage, setSelectedPage] = useState(0);

    const pagesList = useMemo(() => {
        const sideBarRoutes = [
            { name: t('nav.dashboards'), path: routes.dashboards, icon: <LayoutDashboard size={16} /> },
            { name: t('nav.wallets'), path: routes.wallets, icon: <Wallet size={16} /> },
            { name: t('nav.assets'), path: routes.asserts, icon: <TrendingUp size={16} /> },
        ];
        return sideBarRoutes.map((route, index) => (
            <LinkButton key={route.name} className={`w-full justify-start ${selectedPage === index ? 'bg-brand text-on-brand hover:bg-brand-hover hover:text-on-brand' : ''}`} variant={'ghost'} path={route.path}
                onClick={() => setSelectedPage(index)}>
                {route.icon}
                {route.name}
            </LinkButton>
        ));
    }, [t, selectedPage]);

    return (
        <div className="flex flex-col flex-1 px-3 py-4">
            {pagesList}
        </div>
    )
}
