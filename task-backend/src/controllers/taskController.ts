import { Request, Response } from "express";

let tasks = [
  {
    id: 1,
    title: "Estudiar backend",
    description: "Repasar rutas y controladores",
    priority: "Alta",
    completed: false,
    categoryId: 1,
  },
];

export const getAllTasks = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Tasks found",
    payload: tasks,
  });
};

export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
      payload: null,
    });
  }

  res.json({
    status: "success",
    message: "Task found",
    payload: task,
  });
};

export const createTask = (req: Request, res: Response) => {
  const { title, description, priority, categoryId } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    description,
    priority,
    completed: false,
    categoryId,
  };

  tasks.push(newTask);

  res.status(201).json({
    status: "success",
    message: "Task created",
    payload: newTask,
  });
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
      payload: null,
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
  };

  res.json({
    status: "success",
    message: "Task updated",
    payload: tasks[taskIndex],
  });
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({
    status: "success",
    message: "Task deleted",
    payload: null,
  });
};