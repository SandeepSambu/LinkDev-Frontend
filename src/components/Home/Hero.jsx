import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section flex flex-col items-center justify-center text-center pb-20 pt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">DevLink</h1>
      <p className="text-lg md:text-2xl mb-8 max-w-xl mx-auto">
        A Developer Portfolio Aggregator
      </p>
      <h1 className="text-4xl md:text-4xl font-bold mb-4">
        Connect, Share & Grow with Developers Worldwide
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
        Showcase projects, share blogs, and network with fellow devs.
      </p>
      <div className="flex gap-4">
        <button
          className="btn-primary px-6 py-3 rounded-md font-semibold bg-indigo-700 hover:bg-indigo-900 transition"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>
        <button className="btn-secondary px-6 py-3 rounded-md font-semibold bg-purple-700 hover:bg-purple-900 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
