import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ButtonProvider } from "./hooks/ButtonContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { SlippageProvider } from "./contexts/SlippageContext.jsx";
import { SelectedStrategyProvider } from "./contexts/SelectedStrategyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ButtonProvider>
      <Provider store={store}>
        <SearchProvider>
          <SlippageProvider>
            <SelectedStrategyProvider>
              <App />
            </SelectedStrategyProvider>
          </SlippageProvider>
        </SearchProvider>
      </Provider>
    </ButtonProvider>
  </StrictMode>
);
