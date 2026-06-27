import api from ".";
import type { ApiResponse, Category } from "my-types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<ApiResponse<Category[]>>("/category");
  return res.data.payload;
};