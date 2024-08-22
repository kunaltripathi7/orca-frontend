import { useAuth, useClerk } from "@clerk/clerk-react";
import ArrowIcon from "../assets/icons/arrow.svg";
import cursorImage from "../assets/images/cursor.png";
import messageImage from "../assets/images/message.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (!isSignedIn) {
      openSignIn({
        forceRedirectUrl: import.meta.env.VITE_CLERK_FORCE_REDIRECT_URL,
        signUpForceRedirectUrl: import.meta.env.VITE_CLERK_FORCE_REDIRECT_URL,
      });
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="relative h-full overflow-clip bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] text-white sm:py-[96px]">
      <div className="absolute left-1/2 top-[calc(100%-96px)] h-[375px] w-[750px] -translate-x-1/2 rounded-[100%] border border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)] sm:top-[calc(100%-120px)] sm:h-[768px] sm:w-[1536px] lg:h-[1200px] lg:w-[2400px]"></div>
      <div className="container relative">
        <div className="flex items-center justify-center">
          <a
            href="https://medium.com/8904378hjdfgjdsfhg87kjfdsjklgl"
            className="inline-flex gap-3 rounded-lg border border-white/30 px-2 py-1"
          >
            <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Version 1.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowIcon />
            </span>
          </a>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex">
            <h1 className="inline-flex text-center text-3xl font-bold tracking-tighter sm:text-5xl lg:text-7xl">
              Where Conversations and
              <br />
              Communities Thrive
            </h1>
            <img
              src={cursorImage}
              alt="cursor Illustration"
              height="200"
              width="200"
              className="absolute right-[476px] top-[108px] hidden sm:inline lg:right-[741px] lg:top-[111px]"
            />
            <img
              src={messageImage}
              alt="Message Illustration"
              height="200"
              width="200"
              className="absolute left-[510px] top-[56px] hidden sm:inline lg:left-[743px] lg:top-[134px]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 max-w-md text-center text-xl lg:max-w-[500px]">
            Connect with friends and like-minded individuals in a vibrant
            community. Engage in lively discussions, share your interests, and
            build lasting relationships all in one place.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="rounded-lg bg-[#AF79F9] px-5 py-3 font-medium text-white"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
