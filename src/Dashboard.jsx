import ActivityOverview from "./components/Dashboard/ActivityOverview";
import DashboardTabs from "./components/Dashboard/DashboardTabs";
import ProfileSummary from "./components/Dashboard/ProfileSummary";
import QuickActions from "./components/Dashboard/QuickActions";
import { useContext, useEffect, useState } from "react";
import ActionsPage from "./components/Dashboard/ActionsPage";
import UserContext from "./utils/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [page, setPage] = useState({ type: "", data: null });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileSummary user={user} />
      <QuickActions setPage={setPage} />
      {page.type ? (
        <ActionsPage page={page} user={user} setPage={setPage} />
      ) : (
        <>
          <ActivityOverview />
          <DashboardTabs setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
