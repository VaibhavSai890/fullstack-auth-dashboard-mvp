import api from "../services/api";

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const toggleComplete = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      onTaskUpdated(res.data);
    } catch {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      onTaskDeleted(id);
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            onClick={() => toggleComplete(task)}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
