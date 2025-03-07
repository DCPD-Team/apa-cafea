import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/App.tsx';
import { AuthProvider } from '@/hooks/useAuth.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </AuthProvider>
);
