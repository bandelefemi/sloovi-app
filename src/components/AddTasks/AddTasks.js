import React from "react";
import { addTask } from "../../redux/thunks";
import AddOrEditTask from "../AddOrEditTask";

const AddTasks = (props) => {
  return (
    <AddOrEditTask
      edit={false}
      actionCall={addTask}
      {...props}
    />
  );
};

export default AddTasks;
