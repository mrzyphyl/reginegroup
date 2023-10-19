import Welcome from "../components/Welcome";
import AddAccident from "../components/accident/AddAccident";
import AddCrime from "../components/crimes/AddCrime";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate("/");
  const handleLogout = async () => {
    alert("Are you sure you want to logout");
    navigate("/");
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/users/logout`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="header-title">Dagupan Crime Report</h1>
        <button
          onClick={handleLogout}
          className="user-dashboard-logout"
        >
          Logout
        </button>
      </div>
      
      <Welcome/>
      <div className="content">
        <AddAccident className="flex-grow" />
        <AddCrime className="flex-grow" />
      </div>
    </div>
  );
};

export default Dashboard;
