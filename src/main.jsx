import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import Router from "./router";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from 'react-toastify';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Fragment>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Router />
          <ToastContainer/>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  // </Fragment>
);
