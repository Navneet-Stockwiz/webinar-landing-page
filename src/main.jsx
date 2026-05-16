import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ButtonProvider } from "./hooks/ButtonContext.jsx";
import { WebinarProvider } from "./contexts/WebinarContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WebinarProvider>
      <LanguageProvider>
        <ButtonProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ButtonProvider>
      </LanguageProvider>
    </WebinarProvider>
  </StrictMode>
);
