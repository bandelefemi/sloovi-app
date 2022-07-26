import * as apis from "../api's";
import * as actions from "./actions";

export const doLogin = (payload) => async (dispatch) => {
  try {
    const {
      data: {
        results: { token },
      },
    } = await apis.login(payload);

    localStorage.setItem("token", token);

    const {
      data: { results },
    } = await apis.getUserId();

    dispatch(actions.loginSuccess({ token }));
    dispatch(actions.setUserDetails({ userData: results }));
  } catch (error) {
    console.error(error);
  }
};

export const addTask = (payload) => async (dispatch) => {
  try {
    dispatch(actions.manageLoading());
    await apis.addTask(payload);
    dispatch(fetchAllTasks());
    dispatch(actions.manageLoading());
  } catch (error) {
    dispatch(actions.manageLoading());
    console.error(error);
  }
};

export const fetchAllTasks = () => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await apis.fetchAllTasks();

    dispatch(actions.setTasks({ tasks: results }));
  } catch (error) {
    console.error(error);
  }
};

export const editTask = (payload) => async (dispatch) => {
  try {
    dispatch(actions.manageLoading());
    const { id, ...rest } = payload;
    await apis.editTask(id, rest);
    dispatch(actions.manageLoading());
    dispatch(fetchAllTasks());
  } catch (error) {
    dispatch(actions.manageLoading());
    console.error(error);
  }
};

export const deleteTask = (task_id) => async (dispatch) => {
  try {
    dispatch(actions.manageLoading());
    await apis.deleteTask(task_id);
    dispatch(actions.manageLoading());
    dispatch(fetchAllTasks());
  } catch (error) {
    dispatch(actions.manageLoading());
    console.error(error);
  }
};
