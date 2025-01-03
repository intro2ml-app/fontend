import Avatar from '@/assets/avatar.png';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className='flex justify-between px-10 py-2 pt-4'>
      <h2 className='font-bold text-3xl primary'>US-GPT</h2>
      <div className='flex items-center gap-2'>
        <p>{user?.username}</p>
        <img src={Avatar} alt="User's avatar" className='w-[50px]' />
      </div>
    </header>
  );
}
