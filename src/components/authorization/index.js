import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function Authorization({ state, exitUser }) {
  const cn = bem('Authorization');

  return (
    <div className={cn()}>
      {state.authorization ? (
        <>
          <button className={cn('button')} onClick={() => exitUser()}>
            Выход
          </button>
          <Link to='/profile' className={cn('user-name')}>
            {state.user.name}
          </Link>
        </>
      ) : (
        <Link to='/login' className={cn('button')}>
          Вход
        </Link>
      )}
    </div>
  );
}

Authorization.propTypes = {
  state: PropTypes.object,
  exitUser: PropTypes.func,
};

export default memo(Authorization);
