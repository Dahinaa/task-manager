import api from ".";
import type { ApiResponse, NewTaskInput, Task } from "my-types";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await api.get<ApiResponse<Task[]>>("/task");
  return res.data.payload;
};

export const createTask = async (data: NewTaskInput): Promise<Task> => {
  const res = await api.post<ApiResponse<Task>>("/task", data);
  return res.data.payload;
};

export const updateTask = async (
  id: number,
  data: NewTaskInput
): Promise<Task> => {
  const res = await api.patch<ApiResponse<Task>>(`/task/${id}`, data);
  return res.data.payload;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/task/${id}`);
};