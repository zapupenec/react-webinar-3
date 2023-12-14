import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  /*
  Не получается сделать нормально.
  По прямой ссылке всегда сначала загружается приложение без авторизации.
  Сначала ловлю user === null,а потом ререндер и уже ок.
  Не могу понять как быть =(
  */

  const store = useStore();
  useInit(() => {
    store.actions.auth.initAuth();
  }, []);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={user ? <Navigate to={"/profile"} /> : <Login />}
        />
        <Route
          path={"/profile"}
          element={user ? <Profile /> : <Navigate to={"/login"} />}
        />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
