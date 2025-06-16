const ContactMenu = () => {
  return (
    <div className="contact-menu">
      <h3>Контактная информация</h3>
      <a
        href="https://github.com/selftopic"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
        title="GitHub"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.3a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <span>GitHub</span>
      </a>
      <a
        href="https://t.me/self_topic"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
        title="Telegram"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        <span>Telegram</span>
      </a>
      <a
        href="https://your-donation-page"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
        title="Поддержать"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M9 15l3-3 3 3" />
        </svg>
        <span>Поддержать деньгой</span>
      </a>
    </div>
  );
};

export default ContactMenu;