import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/App.tsx';
import { AuthProvider } from '@/hooks/useAuth.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import BrokenEspresso from '@/components/BrokenEspresso.tsx';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<BrokenEspresso />}>
    <AuthProvider>
      <TooltipProvider>
      <App />
    </TooltipProvider>
    </AuthProvider>
  </ErrorBoundary>
);
