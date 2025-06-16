import { useState, useEffect, useRef } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Message } from "@/types";

const Chat = () => {
  const { messages, sendMessage, nickname } = useWebSocket();
  const [input, setInput] = useState<string>("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Current messages:", messages); // Отладка
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !nickname.trim()) return;

    const message: Message = {
      type: "message",
      content: input,
      sendedAt: new Date().toLocaleDateString(),
      username: nickname,
    };

    console.log("Submitting message:", message); // Отладка
    await sendMessage(message);
    setInput("");
  };

  return (
    <section className="chat">
      <h2>Общий чат</h2>
      <div className="chat-box">
        <div ref={chatRef} className="chat-messages">
          {messages.length === 0 ? (
            <p>Нет сообщений</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message">
                <span className="timestamp">{msg.sendedAt}</span>
                <span className="nickname">{msg.username}:</span>
                <p>{msg.content}</p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напиши что-нибудь..."
          />
          <button type="submit" disabled={!nickname.trim()}>
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;