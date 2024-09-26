import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Heading className="text-6xl">404 Page Not Found</Heading>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
}
export default PageNotFound;
