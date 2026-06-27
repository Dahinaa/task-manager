import { Request, Response } from "express";
import Task from "../models/task";
import Category from "../models/category";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      include: [Category],
    });

    res.json({
      status: "success",
      message: "Tasks found",
      payload: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error finding tasks",
      payload: error,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await Task.findByPk(id, {
      include: [Category],
    });

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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error finding task",
      payload: error,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, completed, categoryId } = req.body;

    const newTask = await Task.create({
      title,
      description,
      priority,
      completed,
      categoryId,
    });

    const taskWithCategory = await Task.findByPk(newTask.id, {
      include: [Category],
    });

    res.status(201).json({
      status: "success",
      message: "Task created",
      payload: taskWithCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating task",
      payload: error,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
        payload: null,
      });
    }

    await task.update(req.body);

    const updatedTask = await Task.findByPk(id, {
      include: [Category],
    });

    res.json({
      status: "success",
      message: "Task updated",
      payload: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating task",
      payload: error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
        payload: null,
      });
    }

    await task.destroy();

    res.json({
      status: "success",
      message: "Task deleted",
      payload: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting task",
      payload: error,
    });
  }
};