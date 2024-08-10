import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-screen justify-center gap-10">
      <Heading className="text-6xl">404 Page Not Found</Heading>
      <Button variant="primary">Go Back</Button>
    </div>
  );
}
export default PageNotFound;
