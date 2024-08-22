import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

function Landingpage() {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Landingpage;
