import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";

const store = new Store();

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>
);
