import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

export function Form({getUser, stateInput, setStateInput, error, text}) {

  const cn = bem('Form');

  const onChangeInput = (e) => {
    setStateInput(state => ({
      ...state,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <form onSubmit={getUser} className={cn()}>
      <h2 className={cn('text')}>{text}</h2>
      <label className={cn('label')} htmlFor="login">
        Логин
        <input
          className={cn('input')}
          id='login' type="text"
          value={stateInput.name}
          onChange={onChangeInput}/>
      </label>
      <label className={cn('label')} htmlFor="password">
        Пароль
        <input
          className={cn('input')}
          id='password' type="password"
          value={stateInput.password}
          onChange={onChangeInput}/>
      </label>
      {error ? <span className={cn('span')}>{error}</span> : null}
      <button className={cn('button')}>Войти</button>
    </form>
  )
}

Form.propTypes = {
  error: PropTypes.string,
  stateInput: PropTypes.object,
  setStateInput: PropTypes.func,
  onLogin: PropTypes.func,
  text: PropTypes.string,
};


export default memo(Form);