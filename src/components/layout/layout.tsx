import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/side-bar';
import Topbar from '@/components/layout/top-bar';

const Layout = () => {
    return (
        <div data-component="MainLayout" className="flex h-screen overflow-hidden bg-surface transition-colors duration-200">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />

                <main className="flex-1 overflow-y-auto p-6 bg-surface transition-colors duration-200">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
