import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { isLoggedIn } from "./Middlewares/auth";
const Home = React.lazy(() => import("./Pages/Home"));
const Games = React.lazy(() => import("./Pages/Games"));
const Zones = React.lazy(() => import("./Pages/Zones"));
const Manage = React.lazy(() => import("./Pages/Admin/Manage"));
const Signin = React.lazy(() => import("./Pages/Signin"));
const Error = React.lazy(() => import("./Pages/Error"));
const ManageGames = React.lazy(() => import("./Pages/Admin/ManageGames"));
const ManageZones = React.lazy(() => import("./Pages/Admin/ManageZones"));
const ManageMenu = React.lazy(() => import("./Pages/Admin/ManageMenu"));
const ManageVolunteers = React.lazy(
  () => import("./Pages/Admin/ManageVolunteers"),
);
const Zone = React.lazy(() => import("./Pages/Zone"));

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
        path: "/zones/:id",
        element: <Zone />,
      },
      {
        path: "/manage",
        element: isLoggedIn() ? <Manage /> : <Navigate to={"/signin"} />,
        children: [
          {
            path: "/manage",
            element: <ManageMenu />,
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
          },
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
    <Suspense fallback={Spinner}>
      <RouterProvider router={router} fallbackElement={Spinner} />
    </Suspense>
  </React.StrictMode>,
);
