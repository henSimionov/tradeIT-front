
import { Outlet } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import Sidebar from './components/SideBar/SideBar';


export const Layout = () => {
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
