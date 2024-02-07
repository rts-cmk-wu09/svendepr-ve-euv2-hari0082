import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Welcome from "./Pages/Welcome.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Home from "./Pages/Home.jsx";
import Classview from "./pages/Classview.jsx";
import Search from "./Pages/Search.jsx";
import Schedule from "./Pages/Schedule.jsx";
import Login from "./Pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/class/:id" element={<Classview />} />
      <Route path="/search" element={<Search />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
