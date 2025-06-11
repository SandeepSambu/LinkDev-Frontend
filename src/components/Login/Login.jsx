import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/userContext";
import { BASE_URL } from "../../utils/constants";

const Login = ({ setFlag, setError }) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError("Invalid Credentials");
      return;
    }
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          loginEmail,
          loginPassword,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data?.data));
      setUser(response.data.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username / Email"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button
        className="bg-zinc-400 p-2 m-2 w-1/5 rounded-2xl"
        onClick={(e) => handleSignIn(e)}
      >
        Login
      </button>
      <p className="mt-5 text-white">
        New Here?{" "}
        <span>
          <button
            className="rounded-2xl hover:bg-purple-900 px-2 py-1"
            onClick={() => {
              setFlag(false);
              setError("");
            }}
          >
            SignUp
          </button>
        </span>
      </p>
    </>
  );
};

export default Login;
