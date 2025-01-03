import { Button } from '@/components/ui/button';
import { API } from '@/lib/constant';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import 'katex/dist/katex.min.css';
import MathRenderer from '@/components/MathRenderer';
import ModelSelector from '@/components/ModelSelector';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';

export default function ChatDetailPage() {
  const [message, setMessage] = useState('');
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const chatId = useParams().id;
  const containerRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const chatHistories = useQuery({
    queryKey: ['chatHistories', { chat_id: chatId }],
    queryFn: async () => {
      const resp = await fetch(`${API}/chatHistories/${chatId}`, {
        credentials: 'include',
      });

      const data = await resp.json();
      console.log(data);

      const model = models.data.find(
        (el) => el._id === data[data.length - 1].model_id
      );
      setModel(model);
      setChats(data);
      return data;
    },
  });

  const addMessage = async () => {
    setLoading(true);
    setChats((prev) => [...chats, { message, response: '' }]);
    setMessage('');
    const formattedMsg = message.split('\n');
    const resp = await fetch(`${API}/chatHistories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        message: formattedMsg,
        model_id: model._id,
      }),
    });

    const data = await resp.json();
    setModel(models.data.find((el) => el._id === data.model_id).model_name);
    setLoading(false);
    queryClient.invalidateQueries({
      queryKey: ['chatHistories', { chat_id: chatId }],
    });
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
    <div className='relative flex flex-col px-40 gap-10 h-full max-h-full overflow-hidden pt-4'>
      <ModelSelector models={models.data} model={model} setModel={setModel} />
      <div
        className='flex-1 overflow-auto'
        style={{
          scrollbarWidth: 'none',
        }}
      >
        <div ref={containerRef} className='h-full'>
          <ChatMessageList
            ref={containerRef}
            className='flex-1 overflow-scroll'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            {chats.map((chat, idx) => (
              <>
                <ChatBubble
                  key={idx}
                  variant='sent'
                  className='px-4 py-2 bg-[#8ED5FF] rounded-full text-[#202123] max-w-[75%]'
                >
                  <MathRenderer text={chat.message} />
                </ChatBubble>
                {chat.response && (
                  <ChatBubble key={`${idx}_resp`} variant='received'>
                    <MathRenderer text={chat.response} />
                  </ChatBubble>
                )}
              </>
            ))}
            {loading && <ChatBubbleMessage isLoading />}
          </ChatMessageList>
          {!chatHistories.isFetched && (
            <LoaderCircle className='animate-spin mx-auto' />
          )}
        </div>
      </div>
      <div className='mb-10'>
        <div className='relative'>
          <Button
            onClick={addMessage}
            className='absolute top-1/2 -translate-y-1/2 right-10 p-0'
            variant='ghost'
          >
            <Send size={40} />
          </Button>
          <Textarea
            placeholder='Trò chuyện với US-GPT'
            className='rounded-lg bg-[#ECECF1] h-fit dark:bg-[#4C4D55] placeholder:text-[16px]'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
