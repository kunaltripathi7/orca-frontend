import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

function Homepage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Homepage;
