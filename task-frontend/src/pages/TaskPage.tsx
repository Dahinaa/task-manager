import {
  ClipboardDocumentListIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "my-types";
import { deleteTask, getAllTasks } from "../api/taskapi";

const TaskPage: React.FC = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleQuery, setTitleQuery] = useState("");
  const [descriptionQuery, setDescriptionQuery] = useState("");

  useEffect(() => {
    getAllTasks().then((tasks: Task[]) => {
      setTasks(tasks);
      console.log(tasks);
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const title = titleQuery.trim().toLowerCase();
    const description = descriptionQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesTitle =
        title.length === 0 || task.title.toLowerCase().includes(title);

      const matchesDescription =
        description.length === 0 ||
        task.description.toLowerCase().includes(description);

      return matchesTitle && matchesDescription;
    });
  }, [descriptionQuery, titleQuery, tasks]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) {
      return;
    }

    deleteTask(id).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div className="p-4">
      <nav className="bg-white border border-pink-200 rounded-2xl shadow-lg shadow-pink-100 overflow-hidden">
        {/* Header */}
        <div className="border-b border-pink-200 bg-pink-100 px-4 py-4 flex items-center gap-2">
          <ClipboardDocumentListIcon className="h-5 w-5 text-pink-600" />

          <p className="text-base font-bold text-pink-700">
            All Tasks 🎀
          </p>
        </div>

        {/* Cute decoration */}
        <div className="px-4 py-5 bg-pink-50 border-b border-pink-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-pink-600">
                My Tasks ♡
              </h1>

              <p className="text-sm text-gray-500">
                Organiza tus pendientes yippieee ✨🎀
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="/cat-heart.jpg"
                alt="Cute cat with heart"
                className="h-16 w-16 rounded-2xl object-cover border border-pink-200 bg-white p-1 shadow-sm shadow-pink-100"
              />

              <img
                src="/cat-flower.jpg"
                alt="Cute cat with flower"
                className="h-16 w-16 rounded-2xl object-cover border border-pink-200 bg-white p-1 shadow-sm shadow-pink-100"
              />

              <img
                src="/cat-cute.jpg"
                alt="Cute cat"
                className="h-16 w-16 rounded-2xl object-cover border border-pink-200 bg-white p-1 shadow-sm shadow-pink-100"
              />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="px-4 py-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-900">
            Filter 🧸
          </h2>

          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-600">
                Title
              </label>

              <input
                className="mt-1 w-44 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
                type="text"
                placeholder="Title"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Description
              </label>

              <input
                className="mt-1 w-44 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
                type="text"
                placeholder="Description"
                value={descriptionQuery}
                onChange={(e) => setDescriptionQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-4 py-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-pink-700">
              Results 🌸
            </h2>

            <button
              onClick={() => navigate("/tasks/new")}
              className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-pink-200 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              NEW TASK ✨
            </button>
          </div>

          <div className="space-y-3">
            {/* Header tipo tabla */}
            <div className="hidden md:grid grid-cols-12 gap-3 rounded-2xl bg-pink-100 px-4 py-3 text-xs font-bold text-pink-700 border border-pink-200">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Title</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Completed</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-pink-200 bg-pink-50 px-4 py-8 text-center text-sm text-gray-500">
                No tasks found 🐾
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <article
                  key={task.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center rounded-2xl border border-pink-200 bg-white px-4 py-4 shadow-sm shadow-pink-100 hover:shadow-md hover:shadow-pink-200 transition"
                >
                  <div className="md:col-span-1">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <p className="md:hidden text-xs font-bold text-pink-500">
                      Title
                    </p>

                    <button className="text-pink-600 hover:underline text-sm font-bold">
                      {task.title}
                    </button>
                  </div>

                  <div className="md:col-span-3">
                    <p className="md:hidden text-xs font-bold text-pink-500">
                      Description
                    </p>

                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="md:hidden text-xs font-bold text-pink-500">
                      Priority
                    </p>

                    <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700 border border-pink-200">
                      {task.priority}
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <p className="md:hidden text-xs font-bold text-pink-500">
                      Completed
                    </p>

                    <span
                      className={
                        task.completed
                          ? "inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200"
                          : "inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 border border-yellow-200"
                      }
                    >
                      {task.completed ? "Yes 🌸" : "No 🧸"}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/tasks/${task.id}/edit`, {
                          state: { task },
                        })
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TaskPage;