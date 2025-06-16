export interface Message {
  type: string;
  username: string;
  content: string;
  sendedAt: string;
}

export interface WebSocketData {
  type: 'message' | 'online' | 'totalMessages' | 'register' | 'user_left';
  data: Message | { count: number } | { username: string };
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export interface JokeResponse {
  joke: string;
  content: string;
}
