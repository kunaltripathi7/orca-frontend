import ArrowIcon from "../assets/icons/arrow.svg";
import cursorImage from "../assets/images/cursor.png";
import messageImage from "../assets/images/message.png";

function Hero() {
  return (
    <div className="text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-[96px] relative overflow-clip h-full">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
      <div className="container relative">
        <div className="flex items-center justify-center">
          <a
            href="https://medium.com/8904378hjdfgjdsfhg87kjfdsjklgl"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30"
          >
            <span className="bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
              Version 1.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowIcon />
            </span>
          </a>
        </div>
        <div className="flex justify-center mt-10">
          <div className="inline-flex relative">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-center inline-flex">
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
              className="absolute top-[56px] left-[510px] hidden sm:inline lg:left-[743px] lg:top-[134px]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md lg:max-w-[500px]">
            Connect with friends and like-minded individuals in a vibrant
            community. Engage in lively discussions, share your interests, and
            build lasting relationships all in one place.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
