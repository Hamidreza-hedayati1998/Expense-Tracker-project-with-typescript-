import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Profiledetail from '../Pages/Profiledetail';
import Wallet from '../Pages/Wallet';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout /> ,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'Profiledetail',
        element: <Profiledetail />,
      },
      {
        path: 'Wallet',
        element: <Wallet />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);