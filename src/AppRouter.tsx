import { createBrowserRouter, createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import { Situatie } from '@/pages/situatie/Situatie.tsx';
import { Leaderboard } from '@/pages/leaderboard/Leaderboard.tsx';
import { Navbar } from '@/pages/Navbar.tsx';
import { ListaPersoane } from '@/pages/persoane/lista/ListaPersoane.tsx';
import { Persoana } from '@/pages/persoane/detalii/Persoana.tsx';
import { ListaCheltuieli } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';

export const AppRoutes: RouteObject[] = [
  {
    path: '',
    element: <Navbar />,

    children: [
      {
        path: '',
        element: <Navigate to={'/situatie'} />,
      },
      {
        path: 'persoana',
        children: [
          {
            index: true,
            path: '',
            element: <ListaPersoane />,
          },
          {
            path: ':id',
            element: <Persoana />,
          },
        ],
      },
      {
        path: 'situatie',
        element: <Situatie />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: 'cheltuiala',
        children: [
          {
            index: true,
            path: '',
            element: <ListaCheltuieli />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
];

export const router = createHashRouter(AppRoutes);
