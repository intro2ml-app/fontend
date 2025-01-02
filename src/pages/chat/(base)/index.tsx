import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { API } from '@/lib/constant';
import { useQuery } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBase() {
  const [message, setMessage] = useState('');
  const [model, setModel] = useState('USGPT');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const createChat = async () => {
    const resp = await fetch(`${API}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user._id,
        model_id: '1',
      }),
    });

    const chat = await resp.json();
    await fetch(`${API}/chatHistories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chat._id,
        user_id: user._id,
        model_id: model,
        message,
        stream: false,
      }),
    });

    navigate(`/chat/${chat._id}`);
  };

  const models = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const resp = await fetch(`${API}/models`, {
        credentials: 'include',
      });
      return await resp.json();
    },
  });

  return (
    <div className='flex flex-col h-full dark:text-white'>
      <div className='ml-10'>
        <Select onValueChange={setModel}>
          <SelectTrigger className='w-fit flex gap-2'>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: no input */}
            <label className='text-[#9A9B9F]'>Select model</label>
            <SelectValue placeholder='USGPT' defaultValue={model} />
          </SelectTrigger>
          <SelectContent>
            {models.isFetched &&
              models.data?.map((model: any) => (
                <SelectItem key={model._id} value={model._id}>
                  {model.model_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className='w-full flex flex-col gap-10 items-center justify-center grow'>
        <h1 className='secondary dark:secondary-dark text-4xl font-medium py-2'>
          Tôi có thể giúp gì cho bạn?
        </h1>
        <div className='relative w-2/3'>
          <Button
            onClick={createChat}
            className='absolute top-1/2 -translate-y-1/2 right-10 p-0'
            variant='ghost'
          >
            <Send size={40} />
          </Button>
          <Input
            placeholder='Trò chuyện với US-GPT'
            className='rounded-full bg-[#ECECF1] dark:bg-[#4C4D55] p-8 placeholder:text-[16px]'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <p className='text-sm text-[#9A9B9F] mb-10 mx-auto'>
        US-GPT base on ... Our goal is to make AI systems more natural and safe
        to interact with. Your feedback will help us improve.
      </p>
    </div>
  );
}
