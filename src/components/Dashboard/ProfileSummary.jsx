const ProfileSummary = ({ user }) => {
  return (
    <div className="shadow-md p-6 rounded-lg flex items-center gap-6">
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="Avatar"
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h2 className="text-2xl font-bold">{user?.username}</h2>
        <p className="text-gray-600">{user?.title}</p>
        <p className="text-sm text-gray-500">{user?.bio}</p>
      </div>
    </div>
  );
};

export default ProfileSummary;
