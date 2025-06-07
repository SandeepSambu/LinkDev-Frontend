const features = [
  {
    icon: "🛠️",
    title: "Project Showcase",
    description: "Share your dev projects with the community.",
  },
  {
    icon: "✍️",
    title: "Write Blogs",
    description: "Publish articles and tutorials.",
  },
  {
    icon: "🤝",
    title: "Network",
    description: "Follow developers, send messages, and collaborate.",
  },
  {
    icon: "✅",
    title: "Skill Validation",
    description: "Get endorsements and showcase your expertise.",
  },
];

const Features = () => {
  return (
    <section className="features-section py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="feature-card p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer text-center"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
