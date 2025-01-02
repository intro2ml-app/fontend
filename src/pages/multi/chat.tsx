import MathRenderer from '@/components/MathRenderer';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Chat } from '@/lib/utils';

type ChatProps = {
  message: string;
  setMessage: (message: string) => void;
  btnRef?: React.RefObject<HTMLButtonElement>;
  models: any;
  handleClick?: () => void;
};

export default function ChatComponent({
  message,
  setMessage,
  btnRef,
  models,
  handleClick,
}: ChatProps) {
  const [model, setModel] = useState();
  const [chat, setChat] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const query = async () => {
    setChat([
      ...chat,
      {
        message,
        type: 'sent',
        model_id: model?._id,
      },
    ]);
    setLoading(true);
    setMessage('');
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
    const formattedMsg = message.split('\n').join(' ');
    const resp = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: formattedMsg,
        model: model?.model_name,
        stream: false,
      }),
    });

    const data = await resp.json();
    setLoading(false);
    setChat((prev) => [
      ...prev,
      {
        message: data.response,
        type: 'received',
        model_id: model?._id,
      },
    ]);
  };

  useEffect(() => {
    if (!models) return;
    setModel(models[0]);
  }, [models]);

  return (
    <section className='relative w-1/2 h-full flex flex-col gap-10'>
      <div>
        <Select
          onValueChange={(value) => {
            setModel(value);
            setChat([]);
          }}
        >
          <SelectTrigger className='w-fit flex gap-2'>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: no input */}
            <label className='text-[#9A9B9F]'>Select model</label>
            <SelectValue
              placeholder={
                model?.model_name || <LoaderCircle className='animate-spin' />
              }
            />
          </SelectTrigger>
          <SelectContent>
            {models?.map((model: any) => (
              <SelectItem key={model._id} value={model}>
                {model.model_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ChatMessageList
        ref={containerRef}
        className='flex-1 overflow-scroll'
        style={{
          scrollbarWidth: 'none',
        }}
      >
        {chat.map((chat, idx) => (
          <ChatBubble key={idx} variant={chat.type}>
            <MathRenderer text={chat.message} />
          </ChatBubble>
        ))}
        {loading && <ChatBubbleMessage isLoading />}
      </ChatMessageList>
      <div className='mb-10 bottom-0 w-full'>
        <div className='relative'>
          <Button ref={btnRef} className='hidden' onClick={query} />
          <Button
            onClick={() => {
              handleClick();
            }}
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
    </section>
  );
}
