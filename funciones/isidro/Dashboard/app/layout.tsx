import './globals.css';
import type { Metadata } from 'next';
import { ChatBubble } from '@/components/chat/chat-bubble';
import { GalaxyBackground } from '@/components/background/galaxy-background';
import { Inter } from 'next/font/google';
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EDUNEXUS - Dashboard',
  description: 'Plataforma educativa interactiva',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body className={inter.className + " bg-black/90 backdrop-blur-md"}>
        <SidebarProvider>
          <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
            <GalaxyBackground />
          </div>
          <div className="relative z-10 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto transition-all duration-300 md:ml-0">
                {children}
              </main>
            </div>
          </div>
          <ChatBubble />
        </SidebarProvider>
      </body>
    </html>
  );
}