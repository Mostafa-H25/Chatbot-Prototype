import ChatSidebar from '@/components/sidebar/chatSidebar/ChatSidebar';
import PromptSideBar from '@/components/sidebar/promptSidebar/PromptSidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex h-screen w-screen flex-col text-sm text-white dark:text-white dark'>
      <div className='flex h-full w-full sm:pt-0'>
        <ChatSidebar />
        {children}
        <PromptSideBar />
      </div>
    </main>
  );
}
