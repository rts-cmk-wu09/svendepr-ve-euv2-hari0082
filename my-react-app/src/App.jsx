import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
