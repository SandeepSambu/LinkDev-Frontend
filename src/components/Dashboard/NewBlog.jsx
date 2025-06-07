import { useContext, useState } from "react";
import UserContext from "../../utils/userContext";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const NewBlog = ({ setPage, data }) => {
  const [form, setForm] = useState(
    !data
      ? {
          title: "",
          desc: "",
          slug: "",
        }
      : data
  );
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const input =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = { author: user.id, ...form };

      const blog = !data
        ? await axios.post(BASE_URL + "/createBlog", info, {
            withCredentials: true,
          })
        : await axios.put(BASE_URL + `/updateBlog/${data._id}`, info, {
            withCredentials: true,
          });

      setSuccess(true);

      let updatedBlogs;
      if (data) {
        updatedBlogs = user.blogs.map((b) =>
          b._id === data._id ? blog.data : b
        );
      } else {
        updatedBlogs = [...user.blogs, blog.data];
      }

      const updatedUser = {
        ...user,
        blogs: updatedBlogs,
      };

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      const formReset = { title: "", desc: "", slug: "" };
      setForm(formReset);
    } catch (err) {
      console.log(err.response.data);
      setErr(true);
    }
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded-lg shadow-md  mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4">Blog Details</h1>
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
          <label className="block font-medium mb-1">Snippet</label>
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
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            type="text"
            placeholder="Slug"
            value={form.slug}
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
              {data ? "Blog updated successfully." : "Blog added successfully."}
            </span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>
              {data ? "Failed to update blog." : "Failed to add blog."}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBlog;
