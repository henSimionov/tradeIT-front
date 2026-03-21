import { useTranslation } from 'react-i18next';
import { PagesNavigator } from './components/PagesNavigator';
import { UserProfile } from './components/UserProfile';


const Sidebar = () => {

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
            <UserProfile />
        </aside>
    );
};

export default Sidebar;