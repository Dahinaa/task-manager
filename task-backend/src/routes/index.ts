import { Router, Request, Response } from "express";
import taskRoutes from "./taskRoutes";
import categoryRoutes from "./categoryRoutes";

const apiRouter: Router = Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Aesthetic Task Planner API funcionando");
});

apiRouter.use("/task", taskRoutes);
apiRouter.use("/category", categoryRoutes);

export default apiRouter;