import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/Router/routes";

import { LayoutDashboard, TrendingUp, Wallet } from "lucide-react";

import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export const PagesNavigator = () => {

    const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
    const [selectedPage, setSelectedPage] = useState(0);
    const navigate = useNavigate();

    const sideBarRoutes = useMemo(() => [
        { name: t('nav.dashboards'), path: routes.dashboards, icon: <LayoutDashboard size={16} /> },
        { name: t('nav.wallets'), path: routes.wallets, icon: <Wallet size={16} /> },
        { name: t('nav.assets'), path: routes.assets, icon: <TrendingUp size={16} /> },
    ], [t]);

    const navigateToPage = useCallback((index: number) => {
        console.log("asfdnhsdgbdfi", sideBarRoutes[index].path);

        setSelectedPage(index);
        navigate(sideBarRoutes[index].path);
    }, [navigate, sideBarRoutes]);

    const pagesList = useMemo(() => {
        return sideBarRoutes.map((route, index) => (
            <LinkButton key={route.name} className={`w-full justify-start ${selectedPage === index ? 'bg-brand text-on-brand hover:bg-brand-hover hover:text-on-brand' : ''}`} variant={'ghost'} path={route.path}
                onClick={() => navigateToPage(index)}>
                {route.icon}
                {route.name}
            </LinkButton>
        ));
    }, [sideBarRoutes, selectedPage, navigateToPage]);

    return (
        <div className="flex flex-col flex-1 px-3 py-4">
            {pagesList}
        </div>
    )
}
