import EditProfileForm from "./EditProfileForm";
import NewBlog from "./NewBlog";
import NewProject from "./NewProject";

const ActionsPage = ({ page, user, setPage }) => {
  if (page.type.includes("Project")) {
    return page.type === "newProject" ? (
      <NewProject setPage={setPage} data={null} />
    ) : (
      <NewProject setPage={setPage} data={page.data} />
    );
  } else if (page.type.includes("Blog")) {
    return page.type === "newBlog" ? (
      <NewBlog setPage={setPage} data={null} />
    ) : (
      <NewBlog setPage={setPage} data={page.data} />
    );
  } else if (page.type === "editProfile")
    return <EditProfileForm initialData={user} setPage={setPage} />;
};

export default ActionsPage;
