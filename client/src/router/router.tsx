import { createBrowserRouter, Navigate } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";

import Login from "../views/Login";
import { PublicRoutes } from "./PublicRoutes";
import { Kanban } from "../views/Kanban";

export const router = createBrowserRouter([
  {
      element: <PublicRoutes />, 
      children: [
          {
              path: "/login",
              element: <Login />,

          },
          {
            path: "*",
            element: <Navigate to="/login" />,
        },
          
      ],
  },
  {
      element: <PrivateRoutes />,
      children: [
          {
              path: "/kanban",
              element: <Kanban />,
          },
          {
              path: "/",
              element: <Navigate to="/kanban" />,
          },
          {
            path: "*",
            element: <Navigate to="/kanban" />,
        },
      ],
  },
  {
      path: "*",
      element: <h1>Not found</h1>,
  },
]);
