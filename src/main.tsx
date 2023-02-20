import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import Games from "./Pages/Games";
import Zones from "./Components/Zones";
import Manage from "./Components/Manage";
import Signin from "./Components/Signin";
import Error from "./Components/Error";

const Spinner = (
  <div
    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);

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
        element: <Manage />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={Spinner} />
  </React.StrictMode>,
);
