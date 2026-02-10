import { useState } from "react";
import api from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post("/tasks", { title });
      onTaskAdded(res.data);
      setTitle("");
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="task-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn-add">
        Add
      </button>
    </form>
  );
};

export default TaskForm;