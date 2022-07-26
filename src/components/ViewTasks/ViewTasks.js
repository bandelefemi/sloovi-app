import React from "react";
import useCustomSelector from "../../CustomHooks/useCustomSelector";
import "./ViewTasks.css";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setTask } from "../../redux/actions";
import { format } from "date-fns";

const ViewTasks = ({ openEditTaskModel }) => {
  const [tasks] = useCustomSelector("tasks");
  const dispatch = useDispatch();

  const taskElement =()=> {
    if(tasks) {
      return tasks && tasks.map((task) => (
        <div
          className="view-tasks-container"
          key={task.id}
          style={{ padding: "0.75rem 0.5rem" }}
        >
          <div>
            <strong style={{ display: "block", padding: "0.5rem 0" }}>
              {task.task_msg}
            </strong>
            <p>
              {task.task_date} {format(new Date(task.task_time * 1000), "hh:mm aa")}
            </p>
          </div>
          <div>
            <button
              className="edit"
              onClick={() => {
                dispatch(
                  setTask({
                    task_time: new Date(task.task_time * 1000),
                    task_msg: task.task_msg,
                    task_date: task.task_date,
                    is_completed: task.is_completed,
                    id: task.id,
                  })
                );
                openEditTaskModel();
              }}
            >
              <AiFillEdit style={{ color: "gray" }} />
            </button>
          </div>
        </div>
      ));
    } else {
      return console.log('something is wrong')
    }
  }
  console.log(tasks)
return (
  <div>
    {taskElement()}
  </div>
)
  
};

export default ViewTasks;
