import { TokenType, User } from "@/utils/types";
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCurrentUserRequest(
  userProfile: User | undefined,
  getToken: TokenType,
) {
  if (!userProfile) return null;
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, userProfile, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get User");
  }
}
