import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/userContext";
import { BASE_URL } from "../../utils/constants";

const EditProfileForm = ({ initialData, setPage }) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const input =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      success && setSuccess(false);
      err && setErr(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [success, err]);

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.name = "Full name is required.";
    if (!form.title) newErrors.title = "Title is required.";
    if (form.bio.length > 150)
      newErrors.bio = "Bio cannot exceed 150 characters.";
    if (form.github && !/^https:\/\/github\.com\/\w+$/i.test(form.github))
      newErrors.github = "Enter a valid GitHub profile URL.";
    if (
      form.linkedin &&
      !/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/i.test(
        form.linkedin
      )
    )
      newErrors.linkedin = "Enter a valid LinkedIn profile URL.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();

    formData.append("userName", form.username);
    formData.append("title", form.title);
    formData.append("bio", form.bio);
    formData.append("location", form.location);
    formData.append("github", form.github);
    formData.append("linkedin", form.linkedin);

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    try {
      const user = await axios.patch(BASE_URL + "/updateUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(user.data));
      setUser(user.data);
      setSuccess(true);
    } catch (err) {
      setErr(true);
      console.log(err.message);
    }
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded-lg shadow-md mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        <div className="my-5">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={input}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">
            Title (e.g., Frontend Developer)
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={input}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            maxLength={150}
            className={input + "resize-none"}
          />
          <div className="text-right text-sm text-gray-500">
            {form.bio.length}/150
          </div>
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className={input}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">GitHub Profile</label>
          <input
            name="github"
            value={form.github}
            onChange={handleChange}
            className={input}
          />
          {errors.github && (
            <p className="text-red-500 text-sm">{errors.github}</p>
          )}
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">LinkedIn Profile</label>
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            className={input}
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">{errors.linkedin}</p>
          )}
        </div>

        <div className="my-5">
          <label className="block font-medium mb-1">Profile Picture</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
          {form.avatar && (
            <img
              src={
                typeof form.avatar === "string"
                  ? `${BASE_URL}${form.avatar}`
                  : URL.createObjectURL(form.avatar)
              }
              alt="preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <div className="flex justify-around">
          <button type="submit" className="bg-blue-500 p-2 rounded-xl">
            Submit
          </button>
          <button
            className="bg-blue-500 p-2 rounded-xl"
            onClick={() => setPage("")}
          >
            Back
          </button>
        </div>
      </form>
      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Successfully updated.</span>
          </div>
        </div>
      )}
      {err && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>Failed to update.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileForm;
