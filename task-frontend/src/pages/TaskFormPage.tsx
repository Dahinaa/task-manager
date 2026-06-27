import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { Category, NewTaskInput, Task } from "my-types";
import { getAllCategories } from "../api/categoryapi";
import { createTask, updateTask } from "../api/taskapi";

const inputClass =
  "w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200";

const labelClass = "block text-xs font-medium text-gray-600 mb-1";

const emptyForm: NewTaskInput = {
  title: "",
  description: "",
  priority: "Media",
  completed: false,
  categoryId: 0,
};

const TaskFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { task?: Task } | null;

  const isEditing = id !== undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<NewTaskInput>(emptyForm);

  useEffect(() => {
    getAllCategories().then((categories: Category[]) => {
      setCategories(categories);
    });

    if (isEditing && state?.task) {
      const task = state.task;

      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        categoryId: task.categoryId,
      });
    }
  }, []);

  const handleChange = (
    field: keyof NewTaskInput,
    value: string | number | boolean
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isEditing) {
      updateTask(Number(id), form).then(() => {
        navigate("/tasks");
      });
    } else {
      createTask(form).then(() => {
        navigate("/tasks");
      });
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-pink-200 rounded-2xl shadow-lg shadow-pink-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-pink-200 bg-pink-100 px-4 py-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="text-pink-600 hover:text-pink-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>

            <p className="text-base font-bold text-pink-700">
              {isEditing ? "Edit Task ✏️" : "New Task ✨"}
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-5 bg-pink-50">
            <div>
              <h1 className="text-2xl font-bold text-pink-600">
                Task Information ♡
              </h1>

              <p className="text-sm text-gray-500">
                Fill out the fields to save your task 🎀
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title</label>

                <input
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Task title"
                  value={form.title}
                  onChange={(event) =>
                    handleChange("title", event.target.value)
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Priority</label>

                <select
                  required
                  className={inputClass}
                  value={form.priority}
                  onChange={(event) =>
                    handleChange("priority", event.target.value)
                  }
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>

                <textarea
                  required
                  className={inputClass}
                  placeholder="Task description"
                  value={form.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>

                <select
                  required
                  className={inputClass}
                  value={form.categoryId || ""}
                  onChange={(event) =>
                    handleChange(
                      "categoryId",
                      parseInt(event.target.value) || 0
                    )
                  }
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Completed</label>

                <select
                  required
                  className={inputClass}
                  value={form.completed ? "true" : "false"}
                  onChange={(event) =>
                    handleChange(
                      "completed",
                      event.target.value === "true"
                    )
                  }
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-pink-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="rounded-xl border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-700 shadow-sm hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-pink-200 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              {isEditing ? (
                <>
                  <PencilSquareIcon className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusIcon className="h-4 w-4" />
                  Save Task
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskFormPage;