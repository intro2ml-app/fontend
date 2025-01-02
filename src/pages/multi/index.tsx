import { useRef, useState } from 'react';
import Chat from './chat';
import { useQuery } from '@tanstack/react-query';

export default function MultiModelPage() {
  const [message, setMessage] = useState('');
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);

  const models = useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const resp = await fetch('http://localhost:5001/api/models', {
        credentials: 'include',
      });

      const data = await resp.json();

      return data;
    },
  });

  const handleClick = () => {
    ref1.current?.click();
    ref2.current?.click();
  };

  return (
    <div className='flex gap-8 px-10 h-full'>
      <Chat
        message={message}
        setMessage={setMessage}
        btnRef={ref1}
        models={models.data}
        handleClick={handleClick}
      />
      <Chat
        message={message}
        setMessage={setMessage}
        models={models.data}
        btnRef={ref2}
        handleClick={handleClick}
      />
    </div>
  );
}
