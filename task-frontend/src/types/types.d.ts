declare module "my-types" {
  export interface Category {
    id: number;
    name: string;
  }

  export interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    categoryId: number;
    category?: Category;
  }

  export interface NewTaskInput {
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    categoryId: number;
  }

  export interface ApiResponse<T> {
    status: string;
    message: string;
    payload: T;
  }
}