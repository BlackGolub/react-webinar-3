import { memo, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import Authorization from "../../containers/authorization-control";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import { Form } from "../../components/form";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const state = useSelector(state => state.user);
  const [stateInput, setStateInput] = useState({ login: '', password: '' });

  useEffect(() => {
    if (state.authorization) navigate('/profile');
    return () => {
      store.actions.user.deleteError();
    };
  }, [state.authorization]);

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();

  const getUser = (e) => {
    e.preventDefault();
    store.actions.user.getUser(stateInput);
  };

  return (
    <PageLayout>
      <Authorization />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Form getUser={getUser} error={state.error} text={'Вход'}
            stateInput={stateInput} setStateInput={setStateInput} />
    </PageLayout>
  );
}

export default memo(Login);
