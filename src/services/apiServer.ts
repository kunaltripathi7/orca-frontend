import { ErrorType, TokenType } from "@/utils/types";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getServerRequest(
  userId: string,
  getToken: TokenType,
): Promise<AxiosResponse | undefined | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/server/${userId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const exception = error.response?.data as ErrorType;
      if (exception.errorCode === 4001) return null;
    } else throw new Error("Failed to get Server");
  }
}

export async function createServerRequest(
  userId: string,
  getToken: TokenType,
  ServerData: FormData,
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/server/${userId}`,
      ServerData,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw new Error("Failed to Create Server");
  }
}
