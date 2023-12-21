export default {

  loadComments: (id) => async (dispatch, getState, services) => {
    dispatch({ type: 'comments/load-start' });

    try {
      const response = await services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
      });

      dispatch({ type: 'comments/load-success', payload: { data: response.data.result.items } });
    } catch (error) {
      dispatch({ type: 'comments/load-error' });
    }
  },

  postComments: (data, user) => async (dispatch, getState, services) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Токен не найден');
        return;
      }

      const response = await services.api.request({
        url: "/api/v1/comments",
        method: "POST",
        body: JSON.stringify(data)
      });

      dispatch({
        type: 'oneComments/load-success',
        payload: {
          data: {
            ...response.data.result,
            author: {
              profile: {
                name: user,
                _id: response.data.result.author._id
              }
            }
          }
        }
      });
    } catch (error) {
      dispatch({ type: 'comments/load-error' });
    }
  }
}
