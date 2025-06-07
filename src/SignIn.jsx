import { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

const SignIn = () => {
  const [flag, setFlag] = useState(true);
  const [error, setError] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-700 to-purple-700 flex flex-col justify-center items-center text-center">
      <div className="text-white font-bold text-4xl mb-5">{`${
        flag ? "SignIn" : "SignUp"
      } Form`}</div>
      <form
        className={`${
          flag ? "h-96" : "py-5"
        } w-1/3 border-2 border-gray-400 rounded-3xl flex flex-col justify-center items-center`}
      >
        {flag ? (
          <Login
            flag={flag}
            setFlag={setFlag}
            error={error}
            setError={setError}
          />
        ) : (
          <Register
            flag={flag}
            setFlag={setFlag}
            error={error}
            setError={setError}
          />
        )}
        <>
          {error ? (
            <h1 className="text-red-500 text-xl mt-2">{error}</h1>
          ) : (
            <></>
          )}
        </>
      </form>
    </div>
  );
};

export default SignIn;
