import './globals.css';
import type { Metadata } from 'next';
import { ChatBubble } from '@/components/chat/chat-bubble';
import { GalaxyBackground } from '@/components/background/galaxy-background';
import { Inter } from 'next/font/google';
import { SidebarProvider } from "@/components/layout/sidebar-context";
import ClientMainLayout from "@/components/layout/client-main-layout";

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
          <ClientMainLayout>{children}</ClientMainLayout>
          <ChatBubble />
        </SidebarProvider>
      </body>
    </html>
  );
}