import { PropagateLoader } from "react-spinners";

import { useUser } from "../auth/useUser";
import InitialModal from "../Modals/InitialModal";
import { useAllServers } from "@/features/server/useAllServers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function InitialProfile() {
  const { isLoading: isUserLoading } = useUser();
  const { isLoading: isServerLoading, servers } = useAllServers();
  const navigate = useNavigate();
  const isLoading = isServerLoading || isUserLoading;

  useEffect(() => {
    if (servers && servers.length > 0)
      navigate(`/servers/${servers[0].id}`, { replace: true });
  }, [servers, navigate]);

  return (
    <>
      {isLoading || (servers && servers.length > 0) ? (
        <PropagateLoader color="#AF79F9" size={15} />
      ) : (
        <InitialModal />
      )}
    </>
  );
}

export default InitialProfile;
