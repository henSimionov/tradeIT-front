import { NavLink } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useUser } from '@/providers/userProvider/useUser';

const NAV_LINKS = [
    { path: '/', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
] as const;

const Sidebar = () => {
    const user = useUser();
    return (
        <aside data-component="Sidebar" className="w-56 shrink-0 flex flex-col border-r border-subtle bg-surface transition-colors duration-200">

            <div data-slot="logo" className="px-4 py-4 border-b border-subtle flex items-center gap-0">
                <img src="/logo.png" alt="TradeIT logo" className="h-10 w-auto" />
                <span className="text-xl font-black tracking-tight text-text-base">
                    Trade
                    <span className='text-brand'>IT</span>
                </span>
            </div>

            < nav data-slot="nav" className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" >
                {
                    NAV_LINKS.map(({ path, icon, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-brand text-on-brand shadow-sm'
                                    : 'text-text-muted hover:bg-surface-raised hover:text-text-base'
                                }`
                            }
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))
                }
            </nav >

            < div data-slot="user" className="px-4 py-4 border-t border-subtle" >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-on-brand text-sm font-bold shrink-0">
                        {user.initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-text-base truncate">{user.name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                </div>
            </div >
        </aside >
    );
};

export default Sidebar;
