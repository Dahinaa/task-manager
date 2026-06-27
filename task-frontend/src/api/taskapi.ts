import api from ".";
import type { ApiResponse, Task } from "my-types";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await api.get<ApiResponse<Task[]>>("/task");
  return res.data.payload;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/task/${id}`);
};