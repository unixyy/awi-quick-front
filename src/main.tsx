import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import Zones from "./Pages/Zones";
import Manage from "./Pages/Admin/Manage";
import Signin from "./Pages/Signin";
import Error from "./Pages/Error";
import {isLoggedIn} from "./Middlewares/auth";
import ManageGames from "./Pages/Admin/ManageGames";
import ManageZones from "./Pages/Admin/ManageZones";
import ManageMenu from "./Pages/Admin/ManageMenu";
import ManageVolunteers from "./Pages/Admin/ManageVolunteers";
import axios from "axios";
import Cookies from "js-cookie";

const Spinner = (
  <div
    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);

axios.defaults.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/zones",
        element: <Zones />,
      },
      {
        path: "/manage",
        element: isLoggedIn() ? <Manage /> : <Navigate to={"/signin"} />,
        children: [
          {
            path: "/manage",
            element: <ManageMenu/>,
          },
          {
            path: "/manage/games",
            element: <ManageGames />,
          },
          {
            path: "/manage/zones",
            element: <ManageZones />,
          },
          {
            path: "/manage/volunteers",
            element: <ManageVolunteers />,
          }
        ],
      },
      {
        path: "/signin",
        element: isLoggedIn() ? <Navigate to={"/"} /> : <Signin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={Spinner} />
  </React.StrictMode>,
);
