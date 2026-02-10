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

  if (tasks.length === 0) {
    return <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No tasks found. Time to relax!</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div className="task-content" onClick={() => toggleComplete(task)}>
            <div className="checkbox">
              {task.completed && <span>✓</span>}
            </div>
            <span className="task-text">{task.title}</span>
          </div>

          <button onClick={() => deleteTask(task._id)} className="btn-delete" title="Delete">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;