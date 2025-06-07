const stats = [
  { label: "Projects", value: 5 },
  { label: "Blogs", value: 3 },
  { label: "Followers", value: 120 },
  { label: "Following", value: 87 },
];

const ActivityOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="bg-gray-100 p-4 rounded-lg text-center shadow"
        >
          <p className="text-2xl font-bold text-indigo-600">{value}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivityOverview;
