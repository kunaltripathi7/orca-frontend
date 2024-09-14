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
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="container flex h-20 min-w-[350px] flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={logoImage} alt="Brand Logo" className="mt-2 h-12 w-12" />
        <span className="text-5xl font-bold text-[#AF79F9]">Orca</span>
      </div>

      <div
        className={
          isLoaded
            ? `mt-3 ${!isSignedIn && "rounded-md bg-[#AF79F9]/90 px-3 py-2 text-zinc-100"}`
            : ""
        }
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
