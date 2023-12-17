import { memo, useCallback } from "react";
import SideLayout from "../../components/side-layout";
import Authorization from "../../components/authorization";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useLocation, useNavigate } from "react-router-dom";

function AuthorizationControl() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = useSelector(state => state.user)

  const callbacks = {
    exitUser: useCallback(() => {
      store.actions.user.exitUser();
      if (location.pathname === '/profile') navigate('/login')
    }, [store])
  }

  return (
    <SideLayout side='end'>
      <Authorization state={state} exitUser={callbacks.exitUser} text={'Вход'}/>
    </SideLayout>
  )
}

export default memo(AuthorizationControl);