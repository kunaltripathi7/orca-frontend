import { ServerType, TokenType } from "@/utils/types";
import axios from "axios";
import qs from "query-string";
import { API_BASE_URL } from "./apiUser";

export async function createChannelRequest(
  serverId: string | undefined,
  channelData: FormData,
  getToken: TokenType,
): Promise<ServerType | undefined> {
  if (!serverId) return;
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/channels`,
    query: {
      serverId,
    },
  });
  try {
    const res = await axios.post(url, channelData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Couldn't able to create channel at this moment!");
  }
}

export async function deleteChannelRequest(
  getToken: TokenType,
  serverId: string | undefined,
  channelId: string | undefined,
) {
  if (!serverId) return;

  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/channels/${channelId}`,
    query: {
      serverId,
    },
  });

  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Couldn't able to delete the channel at this moment!");
  }
}

export async function editChannelRequest(
  serverId: string | undefined,
  channelId: string | undefined,
  channelData: FormData,
  getToken: TokenType,
): Promise<ServerType | undefined> {
  if (!serverId || !channelId) return;
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/channels/${channelId}`,
    query: {
      serverId,
    },
  });
  try {
    const res = await axios.patch(url, channelData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Couldn't able to edit channel at this moment!");
  }
}

export async function getChannelRequest(
  serverId: string | undefined,
  channelId: string | undefined,
  getToken: TokenType,
): Promise<ServerType | undefined> {
  if (!serverId || !channelId) return;
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/channels/${channelId}`,
    query: {
      serverId,
    },
  });
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Couldn't able to get the channel at this moment!");
  }
}
