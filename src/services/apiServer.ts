import { ErrorCode, ErrorType, ServerType, TokenType } from "@/utils/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./apiUser";

export async function getServersRequest(
  getToken: TokenType,
): Promise<ServerType[] | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/server`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const exception = error.response?.data as ErrorType;
      if (exception?.errorCode === 4001) return null;
      throw new Error(error.message);
    } else throw new Error("Failed to get Servers");
  }
}

export async function createServerRequest(
  // opt this -- fetch on ss
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

export async function editServerRequest(
  serverId: string | undefined,
  getToken: TokenType,
  ServerData: FormData,
): Promise<ServerType | undefined> {
  if (!serverId) return;
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/server/${serverId}`,
      ServerData,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Edit Server");
  }
}

export async function getServerByIdRequest(
  serverId: string | undefined,
  getToken: TokenType,
): Promise<ServerType | undefined> {
  if (!serverId) return;
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/server/by-id/${serverId}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorCode = error.response?.data.errorCode as ErrorCode;
      if (errorCode === 4001) {
        throw new Error("4001");
      }
    }
    throw new Error("Failed to Get Server");
  }
}

export type SetIsloading = (state: boolean) => void;

export async function getInviteCodeRequest(
  getToken: TokenType,
  serverId: string | undefined,
): Promise<ServerType | undefined> {
  if (!serverId) return;
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/server/${serverId}/invite-code`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response.data as ServerType;
  } catch (error) {
    throw new Error("Failed to get Invite code");
  }
}

export async function joinServerRequest(
  getToken: TokenType,
  inviteCode: string | undefined,
): Promise<ServerType | undefined | number> {
  if (!inviteCode) return;
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/server/invite/${inviteCode}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const exception = error.response?.data as ErrorType;
      if (exception.errorCode === 1003) return exception.errorCode;
      if (exception.errorCode === 4001) throw new Error(error.message);
      throw new Error(error.message);
    }
    throw new Error(
      "Couldn't find the server, Please Check the invite code again",
    );
  }
}

export async function leaveServerRequest(
  getToken: TokenType,
  serverId: string | undefined,
): Promise<ServerType | undefined> {
  if (!serverId) return;
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/server/${serverId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response.data as ServerType;
  } catch (error) {
    throw new Error("Failed to Leave server at the moment");
  }
}

export async function deleteServerRequest(
  getToken: TokenType,
  serverId: string | undefined,
): Promise<AxiosResponse | undefined> {
  if (!serverId) return;
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/server/${serverId}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw new Error("Failed to delete the server");
  }
}
