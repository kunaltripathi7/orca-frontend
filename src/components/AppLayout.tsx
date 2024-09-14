import NavigationSidebar from "@/components/NavigationSidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-[#7758D1] to-[#F7CBFD]">
      <NavigationSidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
