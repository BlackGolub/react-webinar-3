export const generateListComments = (initialCommentList, id) => {
  let resultList = [];

  initialCommentList.forEach(comment => {
      if (comment.parent._id === id) {
          resultList.push([comment])
      }
  });

  initialCommentList.forEach(comment => {
      resultList.forEach((list, index) => {
          list.forEach(parentComment => {
              if (parentComment._id === comment.parent._id) {
                  resultList[index].push(comment);
              }
          });
      });
  });

  return resultList;
}
