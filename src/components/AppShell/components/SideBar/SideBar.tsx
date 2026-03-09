import { useUser } from '@/providers/userProvider/useUser';
import { useTranslation } from 'react-i18next';
import { PagesNavigator } from './components/PagesNavigator';

const Sidebar = () => {
    const user = useUser();
    const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });

    return (
        <aside className="w-56 flex flex-col border-r border-subtle">

            <div className=" px-8 py-4 border-b border-subtle flex items-center gap-2">
                <img src="/logo.ico" alt={t('logoAlt')} className="h-6 w-auto" />
                <span className="text-xl font-black tracking-tight text-text-base">
                    {t('logoName')}
                    <span className='text-brand'>{t('logoNameHighlight')}</span>
                </span>
            </div>

            <PagesNavigator />

            <div className="px-4 py-4 border-t border-subtle">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-on-brand text-sm font-bold">
                        {user.initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-text-base truncate">{user.name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
