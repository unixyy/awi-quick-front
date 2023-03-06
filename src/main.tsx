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
import {getIsAdmin, isLoggedIn} from "./Middlewares/auth";

const Home = React.lazy(() => import("./Pages/Home"));
const Games = React.lazy(() => import("./Pages/Games"));
const Zones = React.lazy(() => import("./Pages/Zones"));
const ZoneMenu = React.lazy(() => import("./Pages/ZoneMenu"));
const Manage = React.lazy(() => import("./Pages/Admin/Manage"));
const Signin = React.lazy(() => import("./Pages/Signin"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Error = React.lazy(() => import("./Pages/Error"));
const ManageGames = React.lazy(() => import("./Pages/Admin/ManageGames"));
const ManageZones = React.lazy(() => import("./Pages/Admin/ManageZones"));
const ManageMenu = React.lazy(() => import("./Pages/Admin/ManageMenu"));
const ManageVolunteers = React.lazy(() => import("./Pages/Admin/ManageVolunteers"));
const ManageGameAssign = React.lazy(() => import("./Pages/Admin/ManageGameAssignement"));
const ManageVolunteerAssignments = React.lazy(() => import("./Pages/Admin/ManageVolunteerAssignments"));
const Zone = React.lazy(() => import("./Pages/Zone"));

const Spinner = (
  <div
    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
    role="status"
  >
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
        children: [
          {
            path: "/zones",
            element: <ZoneMenu />,
          },
          {
            path: "/zones/:zoneId",
            element: <Zone />,
          },
        ],
      },
      {
        path: "/manage",
        element: getIsAdmin() ? <Manage /> : <Navigate to={"/signin"} />,
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
          {
            path:"/manage/AssignGame",
            element: <ManageGameAssign />
          },
          {
            path: "/manage/volunteers-assignments",
            element: <ManageVolunteerAssignments />
          }
        ],
      },
      {
        path: "/signin",
        element: isLoggedIn() ? <Navigate to={"/"} /> : <Signin />,
      },
      {
        path: "/profile",
        element: <Profile />
      }
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
