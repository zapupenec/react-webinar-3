import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {StoreContext} from "./store/context";
import {I18nProvider} from "./i18n/context";
import App from './app';
import Store from "./store";
import exclude from "./utils/exclude";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </I18nProvider>
  </StoreContext.Provider>
);


console.log(exclude({a: 1, b: 2}, {b: 2}));
