import { Sequelize } from "sequelize-typescript";
import Task from "../models/task";
import Category from "../models/category";

const connection = new Sequelize({
  database: "task_planner_db",
  dialect: "postgres",
  username: "task_user",
  password: "task_password",
  host: "localhost",
  port: 5432,
  models: [Task, Category],
  logging: false,
});

async function seedCategories() {
  const count = await Category.count();

  if (count === 0) {
    await Category.bulkCreate([
      { name: "Escuela" },
      { name: "Casa" },
      { name: "Personal" },
    ]);
  }
}

async function connectionDB() {
  try {
    await connection.authenticate();
    console.log("Conexión exitosa a PostgreSQL.");

    await connection.sync();
    await seedCategories();
  } catch (error) {
    console.log("Error al conectar con PostgreSQL:", error);
  }
}

export default connectionDB;