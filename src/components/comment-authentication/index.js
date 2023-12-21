import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';


function CommentAuthentication({exists, type, checkProfile}) {
  const cn = bem('CommentAuthentication');

  return (
    <>
      {!exists ?
        <div className={cn()} >
          <Link className={cn('link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность {type === 'none' ? 'комментировать.' : 'ответить.'}
          {type === 'none' ? null : <button type={'button'} className={cn('button')} onClick={() => checkProfile('none')}>Отмена</button>}
        </div> :
        null
      }
    </>
  )
}

CommentAuthentication.propTypes = {
  exists: PropTypes.bool,
  type: PropTypes.string,
  checkProfile: PropTypes.func,
};

export default memo(CommentAuthentication);