import { createBrowserRouter } from "react-router-dom";
import Layout from '../layout';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Singup';
import Profiledetail from "../pages/Profiledetail";
import Wallet from "../pages/Wallet";





export const router=createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "Profiledetail",
        element: <Profiledetail />,
      },
      {
        path: "Wallet",
        element: <Wallet />,
      },
    ],
  },
]);