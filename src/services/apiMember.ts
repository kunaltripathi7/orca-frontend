import { MemberRole, TokenType } from "@/utils/types";
import axios from "axios";
import qs from "query-string";
import { API_BASE_URL } from "./apiUser";

export async function getRoleChangeRequest(
  serverId: string | undefined,
  memberId: string,
  role: MemberRole,
  getToken: TokenType,
) {
  if (!serverId) return;

  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/member/${memberId}`,
    query: {
      serverId,
    },
  });

  try {
    const res = await axios.patch(
      url,
      { role },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    throw new Error(
      "Couldn't Process the request for Role change at the moment, Please try again",
    );
  }
}

export async function getRemoveMemberRequest(
  serverId: string | undefined,
  memberId: string,
  getToken: TokenType,
) {
  if (!serverId) return;
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/api/member/${memberId}`,
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
    throw new Error(
      "Couldn't Process the request for kicking the user at the moment, Please try again",
    );
  }
}
