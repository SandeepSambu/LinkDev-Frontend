const QuickActions = ({ setPage }) => {
  return (
    <div className="flex justify-around m-10">
      <button
        className="btn-primary p-2 hover:bg-gray-600 hover:text-white rounded-2xl"
        onClick={() =>
          setPage((prevState) => ({ ...prevState, type: "newProject" }))
        }
      >
        ➕ Add Project
      </button>
      <button
        className="btn-secondary p-2 hover:bg-gray-600 hover:text-white rounded-2xl"
        onClick={() =>
          setPage((prevState) => ({ ...prevState, type: "newBlog" }))
        }
      >
        ✍️ Write Blog
      </button>
      <button
        className="btn-outline p-2 hover:bg-gray-600 hover:text-white rounded-2xl"
        onClick={() =>
          setPage((prevState) => ({ ...prevState, type: "editProfile" }))
        }
      >
        📝 Edit Profile
      </button>
    </div>
  );
};

export default QuickActions;
