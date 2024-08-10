import Heading from "./Heading";
import { Button } from "./ui/button";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallBack = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div className="m-10 flex flex-col gap-3">
      <Heading className="text-red-500">Something Went Wrong!</Heading>
      <p>{error.message}</p>
      <span>
        <Button onClick={resetErrorBoundary} className="flex-none">
          Try Again
        </Button>
      </span>
    </div>
  );
};

export default ErrorFallBack;
