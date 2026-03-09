import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/AppShell/components/SideBar';
import { TopBar } from './components/TopBar';


const AppShell = () => {
    return (
        <div className="flex h-screen w-full bg-surface">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export { AppShell };
