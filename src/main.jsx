import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import BackToTop from "./components/BackToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <ToastContainer position="top-right" />
      <BackToTop></BackToTop>
    </AuthProvider>
  </React.StrictMode>
);
