import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndTasks = async () => {
      try {
        const profileRes = await api.get("/auth/profile");
        setProfile(profileRes.data);

        const taskRes = await api.get("/tasks");
        setTasks(taskRes.data);
      } catch (error) {
        alert("Failed to load dashboard data");
      }
    };

    fetchProfileAndTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>

      {profile && (
        <div>
          <h2>Welcome, {profile.name}</h2>
          <p>{profile.email}</p>
        </div>
      )}

      <hr />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TaskForm onTaskAdded={(task) => setTasks([...tasks, task])} />

      <TaskList
        tasks={filteredTasks}
        onTaskUpdated={(updatedTask) =>
          setTasks(
            tasks.map((t) =>
              t._id === updatedTask._id ? updatedTask : t
            )
          )
        }
        onTaskDeleted={(id) =>
          setTasks(tasks.filter((t) => t._id !== id))
        }
      />
    </div>
  );
};

export default Dashboard;
