const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Parlar con el Vieyra",
    description: "tengo que chismear cosas con él",
    completed: false,
  },
  {
    id: 2,
    title: "Alimentar a mi paloma",
    description: "pq tiene hambre",
    completed: false,
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({ message: "Tarea eliminada correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});