import './globals.css';
import type { Metadata } from 'next';
import { ChatBubble } from '@/components/chat/chat-bubble';
import { Inter } from 'next/font/google';
import { Navbar } from "@/components/layout/navbar";
import { GalaxyBackground } from "@/components/background/galaxy-background";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EDUNEXUS - Tu plataforma educativa',
  description: 'Plataforma educativa para estudiantes y profesores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-black/90 backdrop-blur-md`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
            <GalaxyBackground />
          </div>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <ChatBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}