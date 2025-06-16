import { useState, useEffect } from "react";
import { JokeResponse } from "@/types";

const JokeBox = () => {
  const [joke, setJoke] = useState<string>("Загрузка шутки...");

  const fetchJoke = async () => {
    try {
      const res = await fetch("/api/random-joke");
      const data: JokeResponse = await res.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke("Не удалось загрузить шутку");
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="joke-box">
      <p>{joke}</p>
      <button onClick={fetchJoke} className="reload-button" title="Загрузить новую шутку">
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
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.98 0M20.49 15a9 9 0 01-14.98 0" />
        </svg>
      </button>
    </div>
  );
};

export default JokeBox;