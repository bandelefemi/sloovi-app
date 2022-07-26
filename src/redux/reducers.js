import * as types from "./types";

const initialState = {
  isLoading: false,
  userData: {},
  tasks: [],
  task: {
    task_msg: "",
    assigned_user: "",
    task_date: "",
    task_time: "",
    is_completed: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.payload };

    case types.SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    case types.SET_TASKS:
      return { ...state, ...action.payload };

    case types.SET_TASK:
      return {
        ...state,
        task: action.payload,
      };

    case types.MANAGE_LOADING_STATE:
      return { ...state, isLoading: !state.isLoading };

    default:
      return state;
  }
};

export default reducer;
