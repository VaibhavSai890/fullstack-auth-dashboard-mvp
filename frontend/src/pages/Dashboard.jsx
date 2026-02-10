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
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/auth/profile");
        setProfile(profileRes.data);

        const tasksRes = await api.get("/tasks");
        setTasks(tasksRes.data);
      } catch {
        alert("Failed to load dashboard data");
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {profile && (
        <div className="dashboard-header">
          <div className="user-info">
            <h2>Hello, {profile.name} 👋</h2>
            <p>{profile.email}</p>
          </div>
          <button onClick={logout} className="btn-logout">
            Sign Out
          </button>
        </div>
      )}

      <div className="content-card">
        <input
          className="search-bar"
          placeholder="🔍  Search your tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TaskForm onTaskAdded={(task) => setTasks([...tasks, task])} />

        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>Your Tasks</h3>
        
        <TaskList
          tasks={filteredTasks}
          onTaskUpdated={(updatedTask) =>
            setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)))
          }
          onTaskDeleted={(id) => setTasks(tasks.filter((t) => t._id !== id))}
        />
      </div>
    </div>
  );
};

export default Dashboard;