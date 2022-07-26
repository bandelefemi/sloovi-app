import axios from "axios";
import { addMinutes, endOfDay, format, isAfter, isValid } from "date-fns";
import { startOfDay } from "date-fns/esm";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import useCustomSelector from "../CustomHooks/useCustomSelector";
import { setTask } from "../redux/actions";
import { deleteTask } from "../redux/thunks";
import "./AddOrEditTask.css";

const timeOptions = (interval = 30) => {
  const options = [];

  let time = startOfDay(new Date());
  const endTime = endOfDay(new Date());

  while (isAfter(endTime, time)) {
    options.push(time);
    time = addMinutes(time, interval);
  }

  return options;
};












const AddOrEditTask = ({
  toggleTaskModel,
  actionCall,
  edit,
  openAddTaskModel,
}) => {
  //wrapped options fetching in memo because to avoid computation of options on every render
  const options = useMemo(timeOptions, []);
  const dispatch = useDispatch();

  const [userData, isLoading, task] = useCustomSelector(
    "userData",
    "isLoading",
    "task"
  );



  // const [formData, setFormData] = useState({
  //   task_msg: '',
  //   task_date: '',
  //   task_time: '',
  
  // });





  // const config = {
  //   headers : {
  //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg3NzA2MjYsIm5iZiI6MTY1ODc3MDYyNiwianRpIjoiODYwNDhlMTctYTM1Mi00OTBmLThhMDEtZWVmNjRjNDM5MmMzIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.uEyBP5Ed2UUw5DkCkXoaUi_ulk90fbivlCTEPyJ7cZI',
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',          
  //     },
  //     data: {
  //             assigned_user: 'user_4ee4cf67ad474a27988bc0afb84cf472', 
  //             task_date: '2022-10-10',
  //             task_time: 2000,
  //             is_completed: 0,
  //             time_zone: 5000,
  //             task_msg: formData.task_msg
  //     },
  //     method: 'post',
  //     url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
  //   } 





 
// console.log(userData.data)
  const [taskDetails, setTaskDetails] = useState(task);

  const handleChange = (event, value = undefined) =>
    setTaskDetails((previousState) => ({
      ...previousState,
      [event.target.name]: value ? value : event.target.value,
    }));


  // const handleChange=(e)=> {
  //   const {name,value} = e.target
  
  //   setFormData((prevData)=> {
  //     return {
  //       ...prevData,
  //       [name] : value
  //     }
  //   })
  // }


  // console.log(formData)


  // const postData=()=> {
  //   axios(config)

  //   .then((res)=> {
  //     // console.log('form datas', new Date(formData.time).getTime());
  //     console.log(res)
      
  //   })
  // }


  useEffect(() => {
    setTaskDetails(task);
  }, [task]);

  const resetState = () => {
    openAddTaskModel();
    dispatch(
      setTask({
        task_msg: "",
        assigned_user: "",
        task_date: "",
        task_time: "",
        is_completed: 0,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const timeZoneinSeconds = -new Date().getTimezoneOffset() * 60;

    const payload = {
      ...taskDetails,
      // task_time: 4000,
      time_zone: 2000,
      // task_date: '2022-10-10',
      assigned_user: 'user_4ee4cf67ad474a27988bc0afb84cf472',
      // assigned_user: userData.user_id,
      task_time: new Date(taskDetails.task_time).getTime() / 1000,
      // time_zone: timeZoneinSeconds,
    };

    dispatch(actionCall(payload)).then(() => resetState());
  };

  return (
    <form onSubmit={handleSubmit} className="tasks-container">
      <div className="row">
        <label
          htmlFor="taskDescription"
          style={{ display: "block", padding: "0.25rem 0" }}
        >
          Task Description
        </label>
        <input
          autoFocus
          disabled={isLoading}
          onChange={handleChange}
          name="task_msg"
          value={taskDetails.task_msg}
          id="taskDescription"
          className="input"
          required
        />
      </div>
      <div className="row date-time">
        <div>
          <label
            htmlFor="date"
            style={{ display: "block", padding: "0.25rem 0" }}
          >
            Date
          </label>
          <input
            disabled={isLoading}
            onChange={(e) => {
              const date = new Date(e.target.value);
              if (isValid(date)) {
                const formattedDate = format(date, "yyyy-MM-dd");
                handleChange(e, formattedDate);
              }
            }}
            type="date"
            id="date"
            required
            name="task_date"
            value={taskDetails.task_date}
            className="date-picker"
          />
        </div>
        <div style={{ width: "100%" }}>
          <label
            htmlFor="time"
            style={{ display: "block", padding: "0.25rem 0" }}
          >
            Time
          </label>

          <select
            value={taskDetails.task_time}
            name="task_time"
            className="input time-input"
            disabled={isLoading}
            id="time"
            required
            onChange={handleChange}
          >
            <option disabled hidden />
            {options.map((option) => (
              <option key={option} value={option}>
                {format(option, "hh:mm aa")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <label
          htmlFor="assignuser"
          style={{ display: "block", padding: "0.25rem 0" }}
        >
          Assign User
        </label>
        <select disabled={isLoading} className="input time-input">
          <option>{}</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: edit ? "space-between" : "flex-end",
        }}
      >
        {edit && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              const shouldDelete = window.confirm(
                "Are you sure you want to delete?"
              );

              if (shouldDelete) {
                dispatch(deleteTask(taskDetails.id)).then(() => {
                  resetState();
                });
              }
            }}
          >
            <AiFillDelete />
          </button>
        )}
        <div className="action-buttons">
          <button
            disabled={isLoading}
            type="button"
            className="cancel"
            onClick={toggleTaskModel}
          >
            Cancel
          </button>
          <button disabled={isLoading} type="submit" className="save" >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddOrEditTask;
