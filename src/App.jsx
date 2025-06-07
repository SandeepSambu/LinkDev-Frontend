import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import UserContext from "./utils/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(BASE_URL + "/allow", {
          withCredentials: true,
        });
        const fetchedUser = response.data?.user;

        if (fetchedUser) {
          localStorage.setItem("user", JSON.stringify(fetchedUser));
          setUser(fetchedUser);
        }
      } catch (err) {
        const status = err.response?.status;
        if (status === 401) {
          localStorage.removeItem("user");
          setUser(null);
        } else {
          localStorage.removeItem("user");
          setUser(null);
          console.error("Error fetching token:", err);
        }
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="">
      <UserContext.Provider value={{ user: user, setUser }}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
