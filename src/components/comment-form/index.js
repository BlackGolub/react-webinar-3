import { cn as bem } from "@bem-react/classname"
import PropTypes from "prop-types"
import { memo, useEffect, useRef, useState } from "react"
import "./style.css"

function CommentForm({
  exists,
  title,
  onChangeFormComment,
  commentId,
  hand,
  type,
}) {
  const cn = bem("CommentForm");
  const [value, setValue] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current && type) {
      const formRect = formRef.current.getBoundingClientRect();
      const scrollY =
        formRect.top +
        window.pageYOffset -
        (window.innerHeight - formRect.height) / 2;
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      hand({ text: value, parent: { _id: commentId, _type: "comment" } });
    }
    setValue("");
    onChangeFormComment("false");
  };

  return (
    <>
      {exists && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={cn()}
          style={{ marginLeft: type ? "0px" : "40px" }}
        >
          <p className={cn("title")}>{title}</p>
          <textarea
            className={cn("textarea")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={cn("wrapper")}>
            <button className={cn("button")} type="submit">
              Отправить
            </button>
            {type ? (
              <button
                className={cn("button")}
                type="button"
                onClick={() => onChangeFormComment("false")}
              >
                Отмена
              </button>
            ) : null}
          </div>
        </form>
      )}
    </>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  exists: PropTypes.bool,
  onChangeFormComment: PropTypes.func,
  hand: PropTypes.func.isRequired,
  commentId: PropTypes.string,
};

export default memo(CommentForm);
