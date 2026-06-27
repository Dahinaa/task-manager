import { Request, Response } from "express";

const categories = [
  { id: 1, name: "Escuela" },
  { id: 2, name: "Casa" },
  { id: 3, name: "Personal" },
];

export const getAllCategories = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Categories found",
    payload: categories,
  });
};