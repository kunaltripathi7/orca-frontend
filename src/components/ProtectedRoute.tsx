import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate("/");
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center">
        <PropagateLoader color="#9167c8" />
      </div>
    );
  if (isSignedIn) return children;
};

export default ProtectedRoute;
