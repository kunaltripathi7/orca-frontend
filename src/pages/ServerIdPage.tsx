import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ServerIdPage = () => {
  return (
    <SkeletonTheme baseColor="#2C2F48" highlightColor="#474A67">
      <div className="w-full bg-[#2C2F48]">
        <Skeleton className="h-full" />
      </div>
    </SkeletonTheme>
  );
};

export default ServerIdPage;
