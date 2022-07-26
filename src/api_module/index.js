import axios from "axios";

// const getAuthToken = () => localStorage.getItem("token");

const company_id = "company_413ef22b6237417fb1fba7917f0f69e7";

const axiosInstance = axios.create({
  baseURL: "https://stage.api.sloovi.com",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg3NzA2MjYsIm5iZiI6MTY1ODc3MDYyNiwianRpIjoiODYwNDhlMTctYTM1Mi00OTBmLThhMDEtZWVmNjRjNDM5MmMzIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.uEyBP5Ed2UUw5DkCkXoaUi_ulk90fbivlCTEPyJ7cZI';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (data) =>
  axiosInstance({ method: "POST", url: "login", data });

export const getUserId = () =>
  axiosInstance({
    method: "GET",
    url: `https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`,
  });

export const addTask = (data) =>
  axiosInstance({
    method: "POST",
    url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
    data,
  });

export const fetchAllTasks = () =>
  axiosInstance({
    method: "GET",
    url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
  });

export const editTask = (task_id, data) =>
  axiosInstance({
    method: "PUT",
    url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`,
    data,
  });

export const deleteTask = (task_id) =>
  axiosInstance({
    method: "DELETE",
    url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`,
  });
