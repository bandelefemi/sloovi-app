import * as types from "./types";
export const test = () => ({ type: "value" });

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const setUserDetails = (payload) => ({
  type: types.SET_USER_DETAILS,
  payload,
});

export const setTasks= (payload) => ({
  type: types.SET_TASKS,
  payload,
});

export const setTask= (payload) => ({
  type: types.SET_TASK,
  payload,
});

export const manageLoading= (payload) => ({
  type: types.MANAGE_LOADING_STATE,
  payload,
});


