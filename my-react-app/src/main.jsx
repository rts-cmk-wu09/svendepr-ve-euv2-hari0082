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
import Welcome from "./pages/Welcome.jsx"; // Adjusted import
import ErrorPage from "./pages/ErrorPage.jsx";
import Search from "./pages/Search.jsx";
import Schedule from "./pages/Schedule.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Classview from "./pages/Classview.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Welcome />} />
      <Route path="/søgeside" element={<SearchPage />} />
      <Route path="/kalender" element={<Calender />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
