import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isSignedIn) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        const connectSocket = async () => {
            try {
                const token = await getToken();

                const socketInstance = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:7000", {
                    auth: { token },
                    transports: ["websocket", "polling"],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000,
                });

                socketInstance.on("connect", () => {
                    console.log("Socket connected:", socketInstance.id);
                    setIsConnected(true);
                });

                socketInstance.on("disconnect", () => {
                    console.log("Socket disconnected");
                    setIsConnected(false);
                });

                socketInstance.on("connect_error", (error) => {
                    console.error("Socket connection error:", error.message);
                    setIsConnected(false);
                });

                setSocket(socketInstance);
            } catch (error) {
                console.error("Failed to initialize socket:", error);
            }
        };

        connectSocket();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [isSignedIn]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
