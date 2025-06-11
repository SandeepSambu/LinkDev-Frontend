import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../utils/userContext";

const ProfileSummary = ({ user }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout");

      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="shadow-md p-6 rounded-lg flex items-center gap-6 justify-between">
      <div className="flex gap-6">
        <img
          src={
            user.avatar
              ? `${BASE_URL}${user.avatar}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFq2Os_qxcikined0MkVGu4T3fC718LSJpQA&s"
          }
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-gray-600">{user?.title}</p>
          <p className="text-sm text-gray-500">{user?.bio}</p>
        </div>
      </div>
      <div
        className="flex items-center hover:bg-gray-600 hover:text-white p-2 rounded-2xl"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <button>Logout</button>
      </div>
    </div>
  );
};

export default ProfileSummary;
