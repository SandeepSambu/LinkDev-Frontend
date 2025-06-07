const stats = [
  { label: "Developers", value: "5,000+" },
  { label: "Projects Shared", value: "1,200" },
  { label: "Blogs Published", value: "850" },
  { label: "Connections Made", value: "10,000+" },
];

const CommunityStats = () => {
  return (
    <section className="community-stats bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ label, value }) => (
          <div key={label} className="stat-card">
            <p className="text-4xl font-extrabold text-indigo-600">{value}</p>
            <p className="text-lg font-medium mt-2">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStats;
