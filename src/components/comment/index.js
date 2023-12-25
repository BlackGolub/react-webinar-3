import { cn as bem } from '@bem-react/classname'
import PropTypes from 'prop-types'
import { memo } from "react"
import dateFormat from "../../utils/date-formate"
import CommentAuthentication from "../comment-authentication"
import CommentForm from "../comment-form"
import './style.css'

function Comment({ exists, user, date, text, indent, id, hand2, commentActionState, checkProfile, onChangeFormComment, formComment, profile}) {
  const cn = bem('Comment');
  const { date: formattedDate, time } = dateFormat(date);
  const userClassName = user === profile ? cn('user', { i: true }) : cn('user');

  
  const showOption = () => {
    if (!exists) checkProfile(id);
    else onChangeFormComment(id);
  };

  const limitedIndent = Math.min(indent, 460);

  return (
    <div style={{ marginLeft: `${limitedIndent}px`, wordWrap: 'break-word' }}>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <p className={userClassName}>{user}</p>
          <p className={cn('date')}>{`${formattedDate} в ${time}`}</p>
        </div>
        <p className={cn('text')}>{text}</p>
        <button value={id} className={cn('button')} type='button' onClick={showOption}>Ответить</button>
        {commentActionState === id ? <CommentAuthentication exists={exists} checkProfile={checkProfile}/> : null}
        {formComment === id ?
          <CommentForm title={'Новый ответ'} exists={exists} indent={indent} type={true} onChangeFormComment={onChangeFormComment} 
                       commentId={id} hand={hand2}/> : null}
      </div>
    </div>
  )
}

Comment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  indent: PropTypes.number,
  id: PropTypes.string,
  checkProfile: PropTypes.func,
  exists: PropTypes.bool,
  commentActionState: PropTypes.string,
  profile: PropTypes.string.isRequired
};

export default memo(Comment);