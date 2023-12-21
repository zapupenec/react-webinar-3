// Начальное состояние
export const initialState = {
  list: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
  errors: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, list: [], count: 0, waiting: true, errors: null };

    case "comments/load-success":
      return {
        ...state,
        list: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
      };

    case "comments/load-error":
      return {
        ...state,
        list: [],
        waiting: false,
        errors: action.payload.data,
      };

    case "comments/add-start":
      return { ...state, waiting: true };

    case "comments/add-success":
      return {
        ...state,
        list: [...state.list, action.payload.data],
        count: state.count + 1,
        waiting: false,
      };

    case "comments/add-error":
      return { ...state, waiting: false, errors: action.payload.data };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
