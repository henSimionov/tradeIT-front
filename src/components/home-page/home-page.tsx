import { useUser } from '@/providers/userProvider/useUser';
import { DayPeriod, getCurrentSlot } from '@/lib/time';

const GREETINGS: Record<DayPeriod, string> = {
    [DayPeriod.Morning]: 'Good morning',
    [DayPeriod.Afternoon]: 'Good afternoon',
    [DayPeriod.Evening]: 'Good evening',
    [DayPeriod.Night]: 'Good night',
} as const;


const HomePage = () => {
    const user = useUser();
    const greeting = GREETINGS[getCurrentSlot()];

    return (
        <div data-page="HomePage" className="space-y-6">
            <div data-slot="header">
                <h1 className="text-2xl font-black text-text-base">{greeting}, {user.name} 👋</h1>
                <p className="text-sm text-text-muted mt-0.5">Here's your portfolio overview.</p>
            </div>
            <div data-slot="content" className="h-130 w-300 border flex items-center justify-center text-sm text-text-muted">In development...</div>
        </div>

    );
};

export default HomePage;

