import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import logoImage from "../assets/images/logo.png";

const FORCE_REDIRECT_URL = import.meta.env.VITE_CLERK_FORCE_REDIRECT_URL;

function Navbar() {
  const { isSignedIn } = useAuth();
  return (
    <div className="container h-20 flex flex-row justify-between items-center min-w-[350px]">
      <div className="flex gap-4 items-center">
        <img src={logoImage} alt="Brand Logo" className="h-12 w-12 mt-2" />
        <span className="text-5xl text-[#AF79F9] font-bold">Orca</span>
      </div>
      <div
        className={` mt-3 ${
          !isSignedIn && " p-1.5 px-3 rounded-xl border-2 border-zinc-300"
        }`}
      >
        <SignedOut>
          <SignInButton
            forceRedirectUrl={FORCE_REDIRECT_URL}
            signUpForceRedirectUrl={FORCE_REDIRECT_URL}
            mode="modal"
          />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
