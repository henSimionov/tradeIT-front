import { Bell } from "lucide-react";

interface INotificationBellProps {
    count: number;
    onClick?: () => void;
}

const NotificationBell = ({ count, onClick }: INotificationBellProps) => {

    const label = count > 0 ? `${count} notification${count > 1 ? "s" : ""}` : "No notifications";
    return (
        <button
            data-slot="notifications"
            onClick={onClick}
            aria-label={label}
            title={label}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl text-text-muted hover:bg-surface-raised transition-colors"
        >
            <Bell size={17} />
            {count > 0 && (
                <span className="absolute top-1 right-1 min-w-3 h-3 px-0.5 flex items-center justify-center rounded-full bg-brand text-on-brand text-[9px] font-semibold leading-none">
                    {count}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;
