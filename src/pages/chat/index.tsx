import ChatPreview from '@/components/ChatPreview';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { API } from '@/lib/constant';
import { useQuery } from '@tanstack/react-query';
import {
  GalleryHorizontalEnd,
  LogOut,
  SquareArrowOutUpRight,
  SquarePen,
  SunDim,
} from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const chats = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch(`${API}/chats/${user._id}`);
      return response.json();
    },
  });

  return (
    <main className='flex min-h-screen'>
      <nav className='flex flex-col bg-[#ECECF1] dark:bg-[#303137] w-[300px] px-2 pt-20'>
        <Link to='/chat'>
          <Button className='bg-[#8ED5FF] hover:bg-[#8ED5FF] dark:bg-[#202123] dark:hover:bg-[#202123] hover:bg-opacity-80 w-full justify-start mb-8 text-black dark:text-white'>
            <SquarePen size={24} />
            Đoạn chat mới
          </Button>
        </Link>
        <Separator className='bg-[#003F88] dark:bg-[#4C4D55] mb-8' />
        <div className='flex flex-col gap-2 grow'>
          {chats.isFetched &&
            chats.data?.map((chat: any) => (
              <ChatPreview
                key={chat._id}
                id={chat._id}
                title={chat.chat_name}
              />
            ))}
        </div>
        <Separator className='bg-[#003F88] dark:bg-[#4C4D55] mb-6' />
        <div className='flex flex-col gap-7 mb-8 text-[#003F88] dark:text-white font-medium'>
          <Link to='multi' className='flex gap-2'>
            <GalleryHorizontalEnd />
            Multi models
          </Link>
          <Button
            className='flex gap-2 p-0 justify-start font-medium text-md h-fit hover:bg-transparent'
            variant='ghost'
            onClick={() => {
              document.documentElement.classList.toggle('dark');
            }}
          >
            <SunDim />
            Dark mode
          </Button>
          <Link to='/' className='flex gap-2'>
            <SquareArrowOutUpRight />
            Updates & FAQ
          </Link>
          <Link to='/' className='flex gap-2'>
            <LogOut />
            Đăng xuất
          </Link>
        </div>
      </nav>
      <div className='w-full flex flex-col'>
        <Header />
        <section
          className='grow'
          style={{
            maxHeight: 'calc(100vh - 70px)',
          }}
        >
          <Outlet />
        </section>
      </div>
    </main>
  );
}
