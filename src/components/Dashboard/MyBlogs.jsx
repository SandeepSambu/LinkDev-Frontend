import { FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { format } from "date-fns";
import UserContext from "../../utils/userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const MyBlogs = ({ setPage }) => {
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
      await axios.delete(BASE_URL + `/deleteBlog/${id}`, {
        withCredentials: true,
      });

      setSuccess(true);

      const updatedBlogs = user.blogs.filter((blog) => blog._id !== id);

      const updatedUser = { ...user, blogs: updatedBlogs };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      setErr(true);
    }
  };

  return (
    <div className="space-y-4">
      {user.blogs.length === 0 ? (
        <p className="text-gray-500">You haven’t written any blogs yet.</p>
      ) : (
        user.blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {blog.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <a
                  href={`/blog/${blog.slug}`}
                  className="text-gray-600 hover:text-black"
                >
                  <FaExternalLinkAlt />
                </a>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => setPage({ type: "editBlog", data: blog })}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(blog._id)}
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
            <span>Blog deleted successfully.</span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>Failed to delete blog.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
