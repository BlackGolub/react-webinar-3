import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentCounter({count}) {

  return (
    <h1 className="CommentCounter">{`Коментарии (${count})`}</h1>
  )
}

CommentCounter.propTypes = {
  count: PropTypes.number
};

export default memo(CommentCounter);