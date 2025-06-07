import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";

const Register = ({ setFlag, setError }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Confirm Password doesn't match...");
      return;
    }

    try {
      await axios.post(BASE_URL + "/register", {
        username,
        email,
        password,
      });
      setFlag(true);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="bg-gray-300 m-2 p-2 rounded-3xl w-1/2 mb-10 border-1"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-zinc-400 p-2 m-2 w-1/5 rounded-2xl"
        onClick={(e) => {
          handleSignUp(e);
        }}
      >
        SignUp
      </button>
      <p className="mt-5 text-white">
        Already a memeber?{" "}
        <span>
          <button
            className="rounded-2xl hover:bg-purple-900 px-2 py-1"
            onClick={() => {
              setFlag(true);
              setError("");
            }}
          >
            SignIn
          </button>
        </span>
      </p>
    </>
  );
};

export default Register;
