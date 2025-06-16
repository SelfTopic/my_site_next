import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>Привет, я Self Topic</h1>
      <p>Бэкенд-разработчик, навайбкодивший фронт для этого сайта</p>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Тёмная тема" : "Светлая тема"}
      </button>
    </header>
  );
};

export default Header;