import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/userContext";
import { BASE_URL } from "../../utils/constants";

const NewProject = ({ setPage, data }) => {
  const [form, setForm] = useState(
    !data
      ? {
          title: "",
          desc: "",
          tech: [],
          git: "",
          demo: "",
        }
      : data
  );
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      success && setSuccess(false);
      err && setErr(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [success, err]);

  const { user, setUser } = useContext(UserContext);

  const input =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "tech") value = value.trim().split(",");

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = { author: user.id, ...form };
      const project = data
        ? await axios.put(BASE_URL + `/updateProject/${data._id}`, info, {
            withCredentials: true,
          })
        : await axios.post(
            BASE_URL + "/createProject",
            { info },
            {
              withCredentials: true,
            }
          );
      setSuccess(true);

      let updatedProjects;
      if (data) {
        updatedProjects = user.projects.map((p) =>
          p._id === data._id ? project.data : p
        );
      } else {
        updatedProjects = [...user.projects, project.data];
      }

      const updatedUser = {
        ...user,
        projects: updatedProjects,
      };

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      const formReset = { title: "", desc: "", tech: [], git: "", demo: "" };
      setForm(formReset);
    } catch {
      setErr(true);
    }
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded-lg shadow-md  mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4">Project Details</h1>
        <div className="my-5">
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title of the project"
            value={form.title}
            className={input}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label className="block font-medium mb-1">Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description of the project"
            value={form.desc}
            className={input}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label className="block font-medium mb-1">Tech Stack</label>
          <input
            name="tech"
            type="text"
            placeholder="Tech stack used in the project"
            value={form.tech}
            className={input}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label className="block font-medium mb-1">Github URL</label>
          <input
            name="git"
            type="text"
            placeholder="Github URL"
            value={form.git}
            className={input}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label className="block font-medium mb-1">Demo URL</label>
          <input
            name="demo"
            type="text"
            placeholder="Demo URL"
            value={form.demo}
            className={input}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-around">
          <button type="submit" className="bg-blue-500 p-2 rounded-xl">
            {data ? "Edit" : "Submit"}
          </button>
          <button
            className="bg-blue-500 p-2 rounded-xl"
            onClick={() => setPage({ type: "", data: null })}
          >
            Back
          </button>
        </div>
      </form>
      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>
              {data
                ? "Project updated successfully."
                : "Project added successfully."}
            </span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>
              {data ? "Failed to update project." : "Failed to add project."}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProject;
