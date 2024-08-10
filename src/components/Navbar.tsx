import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logoImage from "../assets/images/logo.png";

function Navbar() {
  return (
    <div className="container h-20 flex flex-row justify-between items-center min-w-[350px]">
      <div className="flex gap-4 items-center">
        <img src={logoImage} alt="Brand Logo" className="h-12 w-12 mt-2" />
        <span className="text-5xl text-[#AF79F9] font-bold">Orca</span>
      </div>
      <div className="">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
