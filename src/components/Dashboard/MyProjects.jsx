import { useContext, useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTrash, FaEdit } from "react-icons/fa";
import UserContext from "../../utils/userContext";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const MyProjects = ({ setPage }) => {
  const { user, setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      success && setSuccess(false);
      err && setErr(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [success, err]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + `/deleteProject/${id}`, {
        withCredentials: true,
      });

      setSuccess(true);

      const updatedProjects = user.projects.filter(
        (project) => project._id !== id
      );

      const updatedUser = { ...user, projects: updatedProjects };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      setErr(true);
    }
  };

  return (
    <div className="space-y-4">
      {user.projects?.length === 0 ? (
        <p className="text-gray-500">No projects added yet.</p>
      ) : (
        user.projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.desc}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <a
                  href={project.git}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-black"
                >
                  <FaGithub />
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-black"
                >
                  <FaExternalLinkAlt />
                </a>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() =>
                    setPage({ type: "editProjects", data: project })
                  }
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(project._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Project deleted successfully.</span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>Failed to delete Project.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
