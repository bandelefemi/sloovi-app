import React from "react";
import { editTask } from "../../redux/thunks";
import AddOrEditTask from "../AddOrEditTask";

const EditTasks = (props) => {
  return <AddOrEditTask edit={true} actionCall={editTask} {...props} />;
};

export default EditTasks;
