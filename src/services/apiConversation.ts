import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

export interface DirectMessagesResponse {
    items: any[];
    nextCursor: string | null;
}

export const getOrCreateConversation = async (
    token: string,
    memberOneId: string,
    memberTwoId: string
) => {
    const params = new URLSearchParams({ memberOneId, memberTwoId });

    const response = await axios.get(`${API_URL}/api/conversations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getConversation = async (token: string, conversationId: string) => {
    const response = await axios.get(
        `${API_URL}/api/conversations/${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const getDirectMessages = async (
    token: string,
    conversationId: string,
    cursor?: string
): Promise<DirectMessagesResponse> => {
    const params = new URLSearchParams({ conversationId });
    if (cursor) params.append("cursor", cursor);

    const response = await axios.get(
        `${API_URL}/api/conversations/${conversationId}/messages?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const sendDirectMessage = async (
    token: string,
    conversationId: string,
    content: string,
    fileUrl?: string
) => {
    const params = new URLSearchParams({ conversationId });

    const response = await axios.post(
        `${API_URL}/api/conversations/${conversationId}/messages?${params}`,
        { content, fileUrl },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const editDirectMessage = async (
    token: string,
    conversationId: string,
    messageId: string,
    content: string
) => {
    const params = new URLSearchParams({ conversationId });

    const response = await axios.patch(
        `${API_URL}/api/conversations/${conversationId}/messages/${messageId}?${params}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const deleteDirectMessage = async (
    token: string,
    conversationId: string,
    messageId: string
) => {
    const params = new URLSearchParams({ conversationId });

    const response = await axios.delete(
        `${API_URL}/api/conversations/${conversationId}/messages/${messageId}?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
