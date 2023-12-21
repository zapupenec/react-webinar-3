import simplifyErrors from "../../utils/simplify-errors";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      const apiParams = {
        fields:
          "items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count",
        limit: "*",
        "search[parent]": id,
      };

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?${new URLSearchParams(apiParams)}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        // Ошибка загрузки
        const err = JSON.parse(e.message);
        dispatch({
          type: "comments/load-error",
          payload: { data: simplifyErrors(err.data.issues) },
        });
      }
    };
  },

  add: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/add-start" });

      try {
        const apiParams = {
          fields:
            "_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted",
        };

        const res = await services.api.request({
          url: `/api/v1/comments?${new URLSearchParams(apiParams)}`,
          method: "POST",
          body: JSON.stringify(data),
        });

        dispatch({
          type: "comments/add-success",
          payload: { data: res.data.result },
        });
      } catch (error) {
        const err = JSON.parse(e.message);
        dispatch({
          type: "comments/add-error",
          payload: { data: simplifyErrors(err.data.issues) },
        });
      }
    };
  },
};
