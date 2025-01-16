import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { SampleComponent } from '@/SampleComponent.tsx';
import { ListaPersoane } from '@/pages/ListaPersoane.tsx';
import { Persoana } from '@/pages/Persoana.tsx';
import { Situatie } from '@/pages/Situatie.tsx';
import { Leaderboard } from '@/pages/Leaderboard.tsx';
import { Navbar } from '@/pages/Navbar.tsx';


export const AppRoutes: RouteObject[] = [
  {
    path: '',
    element: <Navbar/>,

    children: [
      {
        path: '',
        element: <Navigate to={'/situatie'} />
      },
      {
        path: 'persoana',
        children: [
          {
            index: true,
            path: '',
            element: <ListaPersoane/>,
          },
          {
            path: ':id',
            element: <Persoana/>,
          }
        ]
      },
      {
        path: 'situatie',
        element: <Situatie/>,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard/>,
      }
    ]
  },
  {
    path: '*',
    element: <div>Not found</div>
  }

];

export const router = createBrowserRouter(AppRoutes);
