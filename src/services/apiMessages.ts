import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

export interface MessagesResponse {
    items: any[];
    nextCursor: string | null;
}

export const getMessages = async (
    token: string,
    channelId: string,
    cursor?: string
): Promise<MessagesResponse> => {
    const params = new URLSearchParams({ channelId });
    if (cursor) params.append("cursor", cursor);

    const response = await axios.get(`${API_URL}/api/messages?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const sendMessage = async (
    token: string,
    channelId: string,
    serverId: string,
    content: string,
    fileUrl?: string
) => {
    const params = new URLSearchParams({ channelId, serverId });

    const response = await axios.post(
        `${API_URL}/api/messages?${params}`,
        { content, fileUrl },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const editMessage = async (
    token: string,
    messageId: string,
    channelId: string,
    serverId: string,
    content: string
) => {
    const params = new URLSearchParams({ channelId, serverId });

    const response = await axios.patch(
        `${API_URL}/api/messages/${messageId}?${params}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const deleteMessage = async (
    token: string,
    messageId: string,
    channelId: string,
    serverId: string
) => {
    const params = new URLSearchParams({ channelId, serverId });

    const response = await axios.delete(
        `${API_URL}/api/messages/${messageId}?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
