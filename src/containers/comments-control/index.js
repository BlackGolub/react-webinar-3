import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import Comment from "../../components/comment"
import CommentAuthentication from "../../components/comment-authentication"
import CommentCounter from "../../components/comment-counter"
import CommentForm from "../../components/comment-form"
import useSelector from "../../hooks/use-selector"
import commentsActions from "../../store-redux/comments/actions"
import { generateListComments } from "../../utils/comment-format"

function Comments({ comments, idArticle }) {
  const exists = useSelector((state) => state.session.exists);
  const [commentActionState, setCommentActionState] = useState("none");
  const [formComment, setFormComment] = useState("false");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => ({
    profile: state.session.user.profile?.name,
  }));

  const findLastChildOfTopParentComment = (commentLists, commentId) => {
    let currentComment = null;
    let lastChild = null;

    commentLists.forEach((list) => {
      list.forEach((comment) => {
        if (comment._id === commentId) {
          currentComment = comment;
        }
      });
    });

    if (!currentComment) {
      return null;
    }

    while (currentComment.parent) {
      let foundParent = false;
      commentLists.forEach((list) => {
        list.forEach((comment) => {
          if (comment._id === currentComment.parent._id) {
            currentComment = comment;
            foundParent = true;
          }
        });
      });
      if (!foundParent) break;
    }

    lastChild = currentComment;
    let children = [];
    do {
      children = commentLists.flatMap((comments) =>
        comments.filter(
          (comment) => comment.parent && comment.parent._id === lastChild._id
        )
      );

      if (children.length > 0) {
        lastChild = children[children.length - 1];
      }
    } while (children.length > 0);

    return lastChild ? lastChild._id : currentComment._id;
  };

  const toggleCommentActionState = (id) =>
    setCommentActionState(commentActionState === id ? "none" : id);
  const toggleFormComment = (commentId) => {
    const commentLists = generateListComments(comments, idArticle);
    const lastChildCommentId = findLastChildOfTopParentComment(
      commentLists,
      commentId
    );
    setFormComment(lastChildCommentId);
  };

  const postComment = (data) => {
    const commentData = data.parent._id
      ? data
      : { ...data, parent: { _id: idArticle, _type: "article" } };
    dispatch(commentsActions.postComments(commentData, profile));
    if (data.parent._id) setFormComment(false);
  };

  const commentsList = generateListComments(comments, idArticle).flatMap(
    (item) =>
      item.map((comment, i) => {
        return (
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
            profile={profile}
          />
        );
      })
  );

  return (
    <>
      <CommentCounter count={comments.length} />
      {commentsList}
      {commentActionState === "none" && (
        <CommentAuthentication
          exists={exists}
          type={commentActionState}
          checkProfile={toggleCommentActionState}
        />
      )}
      {(formComment === "false" || formComment === null) && (
        <CommentForm
          exists={exists}
          title={"Новый комментарий"}
          hand={postComment}
          onChangeFormComment={toggleFormComment}
        />
      )}
    </>
  );
}

export default memo(Comments);