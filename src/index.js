import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, ArticleProvider, TagProvider } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <ArticleProvider>
        <TagProvider>
          <App />
        </TagProvider>
      </ArticleProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
