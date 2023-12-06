import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import useSelector from "../store/use-selector";
import PageLayout from "../components/page-layout";
import routes from "./routes";
import Basket from "./basket";
import Main from "./main";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  // сделал параметр page, чтобы можно было переключать браузерными кнопками назад и вперёд по страницам
  // не знал как сделать иначе, чтобы при загрузке приложения page был равен 1
  const location = useLocation();
  if (location.pathname === '/') {
    return <Navigate to="/1" replace />;
  }

  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path={`${routes.main}/:page`} element={<Main />} />
          <Route path={`${routes.product}/:id`} element={<Product />} />
        </Route>
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
