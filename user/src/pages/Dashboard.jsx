import Welcome from "../components/Welcome";
import AddAccident from "../components/accident/AddAccident";
import AddCrime from "../components/crimes/AddCrime";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col h-screen w-screen">
      <div className="flex justify-between p-2">
        <div>
          <Welcome />
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="border rounded w-[200px] m-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-grow">
        <AddAccident className="flex-grow" />
        <AddCrime className="flex-grow" />
      </div>
    </div>
  );
};

export default Dashboard;
