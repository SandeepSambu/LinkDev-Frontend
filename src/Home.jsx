import Hero from "./components/Home/Hero";
import Features from "./components/Home/Features";
import CommunityStats from "./components/Home/CommunityStats";
import Footer from "./components/Home/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <CommunityStats />
      <Footer />
    </div>
  );
};

export default Home;
