import { toast } from "@/components/ui/use-toast";
import { getCurrentUserRequest } from "@/services/apiUser";
import { useAuth, useUser as useProfile } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { inflate } from "./authSlice";

export type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
};

export function useUser() {
  const { user, isLoaded: isClerkLoaded } = useProfile();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const userProfile: User | undefined = user
    ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      }
    : undefined;

  const { data: currentUser, isLoading: isQueryLoading } = useQuery(
    "getCurrentUser",
    // returns a prom -> rq handles it automatically
    () => getCurrentUserRequest(userProfile, getToken),
    {
      enabled: !!userProfile,
      onError: () => {
        toast({ description: "Error getting User" });
      },
      onSuccess: (user) => dispatch(inflate(user)),
    },
  );

  const isLoading = !isClerkLoaded || isQueryLoading;

  return { isLoading, currentUser };
}
