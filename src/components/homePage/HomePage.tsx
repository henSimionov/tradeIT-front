import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@/providers/userProvider/useUser';
import { DayPeriod, getCurrentSlot } from '@/time';
import { useTranslation } from 'react-i18next';
import { Loader } from '../ui/Loader';
import { PortfolioAssets } from './components/PortfolioAssets';

export const HomePage = () => {
    const user = useUser();
    const { t } = useTranslation('translation', { keyPrefix: 'homePage' });

    const greetingKey: Record<DayPeriod, string> = {
        [DayPeriod.Morning]: t('greeting.morning'),
        [DayPeriod.Afternoon]: t('greeting.afternoon'),
        [DayPeriod.Evening]: t('greeting.evening'),
        [DayPeriod.Night]: t('greeting.night'),
    };

    const greeting = greetingKey[getCurrentSlot()];

    return (
        <div className="w-full m-3">
            <div>
                <span className="scroll-m-20 text-2xl font-extrabold text-balance text-text-base">{greeting}, {user.firstName} 👋</span>
                <p className="text-sm text-text-muted mt-0.5">{t('portfolioOverview')}</p>
            </div>
            <ErrorBoundary fallback={<p className="text-sm">{t('loadingError')}</p>}>
                <Suspense fallback={<Loader />}>
                    <PortfolioAssets />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

