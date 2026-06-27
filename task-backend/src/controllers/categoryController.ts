import { Request, Response } from "express";
import Category from "../models/category";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();

    res.json({
      status: "success",
      message: "Categories found",
      payload: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error finding categories",
      payload: error,
    });
  }
};