"use client";

import Head from "next/head";
import { ThemeProvider } from "@/hooks/useTheme";
import { WebSocketProvider } from "@/hooks/useWebSocket";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skill";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ContactMenu from "@/components/ContactMenu";
import JokeBox from "@/components/JokeBox";
import "@/app/styles/global.css";

export default function Home() {
  return (
    <ThemeProvider>
      <WebSocketProvider>
        <div className="wrapper">
          <Head>
            <title>Self About</title>
            <meta name="description" content="Личный сайт с навыками и чатом" />
          </Head>

          <BackgroundCanvas />

          <div className="container">
            <Header />
            <About />
            <Skills />
            <Chat />
            <Footer />
          </div>

          <div className="right-column">
            <Sidebar />
            <ContactMenu />
          </div>

          <JokeBox />
        </div>
      </WebSocketProvider>
    </ThemeProvider>
  );
}