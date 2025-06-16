import { useWebSocket } from "@/hooks/useWebSocket";

const Sidebar = () => {
  const { onlineCount, totalMessages, nickname, setNickname } = useWebSocket();

  return (
    <aside className="sidebar">
      <h3>Информация</h3>
      <p>Пользователей онлайн: {onlineCount}</p>
      <p>Сообщений в чате: {totalMessages}</p>
      <div className="nickname-section">
        <label htmlFor="nickname">Ваш ник:</label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Введите ник"
          className="nickname-input"
        />
      </div>
    </aside>
  );
};

export default Sidebar;