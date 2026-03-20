import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../providers';

import { AppShell } from '../components/AppShell';
import { HomePage } from '@/components/homePage';
import { WalletsPage } from '@/components/WalletsPage/WalletsPage';
import { AuthGuard } from '../components/auth/AuthGuard';
import { queryClient } from '@/queryClient';
import { Toaster } from '@/components/ui/toaster';


export const Router = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthGuard>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<HomePage />} />
                <Route path="wallets" element={<WalletsPage />} />
              </Route>
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}



