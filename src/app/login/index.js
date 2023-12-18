import { memo, useCallback } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Login() {
  const { t } = useTranslate();

  const store = useStore();

  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    onSubmit: useCallback(
      (loginData) => {
        store.actions.auth.login(loginData);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Auth />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        t={t}
        disabled={select.waiting}
        onSubmit={callbacks.onSubmit}
      />
    </PageLayout>
  );
}

export default memo(Login);
