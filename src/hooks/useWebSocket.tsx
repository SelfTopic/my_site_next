import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import { Message, WebSocketData } from "@/types";

interface WebSocketContextType {
  messages: Message[];
  onlineCount: number;
  totalMessages: number;
  sendMessage: (message: Message) => Promise<void>;
  nickname: string;
  setNickname: (nickname: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const wsReady = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }

    ws.current = new WebSocket("ws://25.6.243.189:5432");
    
    wsReady.current = new Promise((resolve) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        resolve();
      } else {
        ws.current!.onopen = () => {
          console.log("WebSocket connected");
          resolve();
        };
      }
    });

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const parsed: WebSocketData = JSON.parse(event.data);
        console.log("Received WebSocket message:", parsed); // Отладка
        if (parsed.type === "message") {
          const msg = parsed.data as Message;
          // Упрощённая валидация
          if (msg.username && msg.content) {
            setMessages((prev) => [...prev, { 
              type: msg.type || "message", 
              username: msg.username, 
              content: msg.content, 
              sendedAt: msg.sendedAt || new Date().toLocaleDateString() 
            }]);
          } else {
            console.warn("Invalid message format:", msg);
          }
        } else if (parsed.type === "online") {
          setOnlineCount((parsed.data as { count: number }).count);
        } else if (parsed.type === "totalMessages") {
          setTotalMessages((parsed.data as { count: number }).count);
        } else if (parsed.type === "register" || parsed.type === "user_left") {
          console.log(`${parsed.type}: ${JSON.stringify(parsed.data)}`);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onerror = (error) => console.error("WebSocket error:", error);

    fetch("/api/chat-history")
      .then((res) => res.json())
      .then((data: { messages: Message[] }) => {
        console.log("Chat history loaded:", data.messages); // Отладка
        const validMessages = data.messages.filter(
          (msg) => msg.username && msg.content
        ).map((msg) => ({
          type: msg.type || "message",
          username: msg.username,
          content: msg.content,
          sendedAt: msg.sendedAt || new Date().toLocaleDateString()
        }));
        setMessages(validMessages);
        setTotalMessages(validMessages.length);
      })
      .catch((error) => console.error("Error fetching chat history:", error));

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  const sendMessage = async (message: Message) => {
    console.log("Sending message:", message); // Отладка
    await wsReady.current;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify({ type: "message", data: message }));
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    } else {
      console.warn("WebSocket is not open. Message not sent via WebSocket.");
    }

    try {
      await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error("Error sending HTTP message:", error);
    }
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    localStorage.setItem("nickname", newNickname);
    if (ws.current && ws.current.readyState === WebSocket.OPEN && newNickname.trim()) {
      const registerMessage = {
        type: "register",
        data: {
          type: "register",
          username: newNickname,
          content: "",
          sendedAt: new Date().toLocaleDateString(),
        },
      };
      console.log("Sending register message:", registerMessage); // Отладка
      ws.current.send(JSON.stringify(registerMessage));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ messages, onlineCount, totalMessages, sendMessage, nickname, setNickname: handleNicknameChange }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};