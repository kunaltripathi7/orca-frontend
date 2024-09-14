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
    url: `${API_BASE_URL}/api/channel`,
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
