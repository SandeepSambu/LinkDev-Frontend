import { useState } from "react";
import MyProjects from "./MyProjects";
import MyBlogs from "./MyBlogs";

const DashboardTabs = ({ setPage }) => {
  const [tab, setTab] = useState("projects");

  return (
    <div className="mt-8">
      <div className="flex justify-around m-10">
        <button
          onClick={() => setTab("projects")}
          className="p-2 hover:bg-sky-300 rounded-2xl"
        >
          Projects
        </button>
        <button
          onClick={() => setTab("blogs")}
          className="p-2 hover:bg-sky-300 rounded-2xl"
        >
          Blogs
        </button>
      </div>
      {tab === "projects" && <MyProjects setPage={setPage} />}
      {tab === "blogs" && <MyBlogs setPage={setPage} />}
    </div>
  );
};

export default DashboardTabs;
