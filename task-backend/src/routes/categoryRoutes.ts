import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRouter: Router = Router();

categoryRouter.get("/", getAllCategories);

export default categoryRouter;