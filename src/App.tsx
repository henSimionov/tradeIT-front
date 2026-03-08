import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout';
import HomePage from './components/home-page';
import { ThemeProvider } from './providers';
import { config } from './config';
import { Toaster } from '@/components/base/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: config.query,
  },
});

const router = (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {router}
        <Toaster richColors position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider >
  );
}

export default App;

