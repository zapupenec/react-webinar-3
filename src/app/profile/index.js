import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfileInfo from "../../components/profile-info";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.user.loadUserData();
  }, []);

  const select = useSelector((state) => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Auth />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
