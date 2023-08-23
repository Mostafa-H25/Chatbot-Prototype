

import ChatSidebar from "@/app/components/sidebar/chatSidebar/ChatSidebar";
import PromptSideBar from "@/app/components/sidebar/promptSidebar/PromptSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen flex-col text-sm text-white dark:text-white dark">
      <div className="flex h-full w-full pt-[48px] sm:pt-0">
        <ChatSidebar />
        {children}
        <PromptSideBar />
      </div>
    </main>
  );
}
