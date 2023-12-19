import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Authorization from "../../containers/authorization-control";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import UserInfo from "../../components/user-info";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const {user, authorization} = useSelector(state => state.user)

  useEffect(() => {
    if (!authorization) navigate('/login')
  }, [authorization])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Authorization/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserInfo name={user.name} phone={user.phone} email={user.email} text={'Профиль'}/>
    </PageLayout>
  )
}


export default memo(Profile);