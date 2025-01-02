import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, PencilLine, Trash2 } from 'lucide-react';
import { API } from '@/lib/constant';
import { useQueryClient } from '@tanstack/react-query';

type ChatPreviewProps = {
  id: string;
  title: string;
};

export default function ChatPreview({ id, title }: ChatPreviewProps) {
  const queryClient = useQueryClient();

  const deleteChat = async () => {
    const resp = await fetch(`${API}/chats/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (resp.ok) {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    }
  };

  return (
    <div className='flex gap-4 max-w-[250px] text-[#003F88] dark:text-[#C5C5D1]'>
      <Link to={id} className='flex items-center gap-2 grow min-w-0'>
        <MessageSquare className='min-w-fit text-[#003F88] dark:text-[#C5C5D1]' />
        <p className='overflow-hidden grow text-ellipsis whitespace-nowrap dark:text-white'>
          {title}
        </p>
      </Link>

      <div className='flex gap-2'>
        <Button variant='ghost' className='p-0'>
          <PencilLine />
        </Button>
        <Button variant='ghost' className='p-0' onClick={deleteChat}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
