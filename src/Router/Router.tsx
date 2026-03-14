import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../providers';
import { config } from '../config';
import { AppShell } from '../components/AppShell';
import { HomePage } from '@/components/homePage';
import { AuthGuard } from '../components/auth/AuthGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: config.query,
  },
});

export const Router = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthGuard>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}



