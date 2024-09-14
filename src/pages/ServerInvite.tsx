import { useJoinServer } from "@/hooks/useJoinServer";
import { PropagateLoader } from "react-spinners";

const ServerInvite = () => {
  const { error, isLoading } = useJoinServer();

  if (error || !isLoading) throw new Error("Couldn't found the server");

  return (
    <div className="relative flex h-screen items-center justify-center">
      <PropagateLoader color="#9479b9" className="absolute left-[-10px]" />
    </div>
  );
};

export default ServerInvite;
