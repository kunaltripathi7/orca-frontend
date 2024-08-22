import { PropagateLoader } from "react-spinners";

import { useUser } from "../auth/useUser";
import CreateServerModal from "./CreateServerModal";
import { useServer } from "@/features/server/useServer";

function InitialProfile() {
  const { isLoading: isUserLoading } = useUser();
  const { isLoading: isServerLoading } = useServer();
  const isLoading = isServerLoading || isUserLoading;

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoading ? (
        <PropagateLoader color="#AF79F9" size={15} />
      ) : (
        <CreateServerModal />
      )}
    </div>
  );
}

export default InitialProfile;
