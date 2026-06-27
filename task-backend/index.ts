import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./src/routes";

const app: Express = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use(apiRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});