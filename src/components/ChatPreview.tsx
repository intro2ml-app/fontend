import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, PencilLine, Trash2 } from 'lucide-react';
import { API } from '@/lib/constant';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { TextField } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type ChatPreviewProps = {
  id: string;
  title: string;
  active?: boolean;
};

const EditTitleSchema = z.object({
  title: z.string().min(1, { message: 'Tài khoản không được để trống' }),
});

export default function ChatPreview({ id, title, active }: ChatPreviewProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditTitleSchema),
  });
  const queryClient = useQueryClient();

  const deleteChat = async () => {
    const resp = await fetch(`${API}/chats/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (resp.ok) {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    }

    window.location.href = '/chat';
  };

  const editTitle = async () => {
    const resp = await fetch(`${API}/chats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_name: getValues('title') }),
    });

    if (resp.ok) {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    setValue('title', title);
  }, [dialogOpen]);

  return (
    <div
      className={cn(
        'flex gap-4 p-1 rounded-xl max-w-[250px] text-[#003F88] dark:text-[#C5C5D1]',
        active && 'bg-[#9db4ce] dark:bg-[#303137]'
      )}
    >
      <Link to={id} className={cn('flex items-center gap-2 grow min-w-0')}>
        <MessageSquare className='min-w-fit text-[#003F88] dark:text-[#C5C5D1]' />
        <p className='overflow-hidden grow text-ellipsis whitespace-nowrap dark:text-white'>
          {title}
        </p>
      </Link>

      <div className='flex gap-2'>
        <Button
          variant='ghost'
          className='p-0'
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <PencilLine />
        </Button>
        <Button variant='ghost' className='p-0' onClick={deleteChat}>
          <Trash2 />
        </Button>
      </div>

      <Dialog open={dialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit chat title</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(editTitle)} id='editTitleForm'>
            <TextField
              className='w-full'
              label='Tên đoạn chat'
              variant='outlined'
              type='text'
              {...register('title')}
            />
          </form>
          <DialogFooter>
            <Button variant='ghost' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' form='editTitleForm'>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
