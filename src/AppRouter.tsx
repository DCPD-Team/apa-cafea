import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { SampleComponent } from '@/SampleComponent.tsx';

export const AppRoutes: RouteObject[] = [
  {
    path: '',
    element: <SampleComponent />,
  },
];

export const router = createBrowserRouter(AppRoutes);
