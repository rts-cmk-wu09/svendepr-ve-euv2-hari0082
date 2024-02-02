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
/* import Search from "./pages/Search.jsx";
import Schedule from "./pages/Schedule.jsx";
import Login from "./pages/Login.jsx";
import Classview from "./pages/Classview.jsx"; */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      {/*    <Route path="/søgeside" element={<Search />} />
      <Route path="/kalender" element={<Schedule />} />
      <Route path="/login" element={<Login />} />
      <Route path="/classview" element={<Classview />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
