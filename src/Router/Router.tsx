import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../providers';

import { Layout } from '../components/Layout';
import { HomePage } from '@/components/homePage';
import { queryClient } from '@/queryClient';
import { UserProvider } from '@/providers/userProvider/UserContext';


export const Router = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
