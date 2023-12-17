import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function UserInfo({name, phone, email, text}) {

  const cn = bem('UserInfo');

  return (
    <div className={cn()}>
    <h2 className={cn('text')}>{text}</h2>
      <p className={cn('info')}>
        Имя: <span className={cn('span')}>{name}</span>
      </p>
      <p className={cn('info')}>
        Телефон: <span className={cn('span')}>{phone}</span>
      </p>
      <p className={cn('info')}>
        email: <span className={cn('span')}>{email}</span>
      </p>
    </div>
  )
}

UserInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  text: PropTypes.string,
};

export default memo(UserInfo);