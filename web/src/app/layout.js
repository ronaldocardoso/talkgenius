import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "TalkGenius - O seu mentor de entrevistas por IA",
  description: "Prepare-se para entrevistas de TI, UX e Projetos com um assistente de inteligência artificial em tempo real.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
