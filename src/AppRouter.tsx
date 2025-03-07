import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import { Situatie } from '@/pages/situatie/Situatie.tsx';
import { Leaderboard } from '@/pages/leaderboard/Leaderboard.tsx';
import { Navbar } from '@/pages/Navbar.tsx';
import { ListaPersoane } from '@/pages/persoane/lista/ListaPersoane.tsx';
import { Persoana } from '@/pages/persoane/detalii/Persoana.tsx';
import { ListaCheltuieli } from '@/pages/cheltuieli/lista/ListaCheltuieli.tsx';
import { AdminPanel } from '@/pages/admin/AdminPanel.tsx';
import { CustomRouteGuard } from '@/components/CustomRouteGuard.tsx';
import { ProfilPagina } from '@/pages/profil/ProfilPagina.tsx';
import { ProfilRedirect } from '@/pages/profil/components/ProfilRedirect.tsx';
import NotFound from '@/components/NotFound.tsx';

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
        path: 'profil',
        children: [
          {
            index: true,
            element: <ProfilRedirect />,
          },
          {
            path: ':id',
            element: <ProfilPagina />,
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
      {
        path: 'admin',
        element: (
          <CustomRouteGuard>
            <AdminPanel />
          </CustomRouteGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createHashRouter(AppRoutes);
