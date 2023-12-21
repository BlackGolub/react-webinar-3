import { memo, useState } from "react";
import Comment from "../../components/comment";
import { generateListComments } from "../../utils/comment-format";
import CommentCounter from "../../components/comment-counter";
import CommentAuthentication from "../../components/comment-authentication";
import useSelector from "../../hooks/use-selector";
import CommentForm from "../../components/comment-form";
import { useDispatch } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";

function Comments({ comments, idArticle }) {
  const exists = useSelector(state => state.session.exists);
  const [commentActionState, setCommentActionState] = useState('none');
  const [formComment, setFormComment] = useState('false');
  const dispatch = useDispatch();
  const { profile } = useSelector(state => ({profile: state.session.user.profile?.name}));

  const toggleCommentActionState = (id) => setCommentActionState(commentActionState === id ? 'none' : id);
  const toggleFormComment = (id) => setFormComment(formComment === id ? 'false' : id);

  const postComment = (data) => {
    const commentData = data.parent._id ? data : { ...data, parent: { _id: idArticle, _type: "article" } };
    dispatch(commentsActions.postComments(commentData, profile));
    if (data.parent._id) setFormComment(false);
  }

  const commentsList = generateListComments(comments, idArticle)
    .flatMap(item => item.map((comment, i) => (
      <Comment
        key={comment._id}
        id={comment._id}
        exists={exists}
        user={comment.author.profile.name}
        date={comment.dateCreate}
        text={comment.text}
        indent={(i + 1) * 30 + 10}
        hand2={postComment}
        commentActionState={commentActionState}
        checkProfile={toggleCommentActionState}
        onChangeFormComment={toggleFormComment}
        formComment={formComment}
      />
    )));

  return (
    <>
      <CommentCounter count={comments.length} />
      {commentsList}
      {commentActionState === 'none' && <CommentAuthentication exists={exists} type={commentActionState} checkProfile={toggleCommentActionState} />}
      {formComment === 'false' && <CommentForm exists={exists} title={'Новый комментарий'} hand={postComment} />}
    </>
  )
}

export default memo(Comments);