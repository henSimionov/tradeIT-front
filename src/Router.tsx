import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers';
import { config } from './config';
import { AppShell } from './components/AppShell';
import { HomePage } from './components/homePage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: config.query,
    },
});

const Router = () => {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppShell />}>
                            <Route index element={<HomePage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default Router;


