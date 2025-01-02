import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '@/pages/landing/index.tsx';
import LoginPage from '@/pages/(auth)/login/index.tsx';
import SignUpPage from './pages/(auth)/signup';
import ChatPage from './pages/chat';
import ChatBase from './pages/chat/(base)';
import PublicRoute from './components/PublicRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatDetailPage from './pages/chat/(base)/[id]';
import { MathJaxContext } from 'better-react-mathjax';
import MultiModelPage from './pages/multi';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />,
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  {
    path: '/chat',
    element: <ChatPage />,
    children: [
      {
        path: '',
        element: <ChatBase />,
      },
      {
        path: ':id',
        element: <ChatDetailPage />,
      },
      {
        path: 'multi',
        element: <MultiModelPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
