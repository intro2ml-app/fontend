import Logo from '@/assets/logo.png';
import Mascot from '@/assets/fitbot.png';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className='bg-[#202123] min-h-screen flex flex-col'>
      <header className='flex items-center p-4 gap-2'>
        <img src={Logo} alt='logo' className='w-16' />
        <p className='primary text-3xl font-semibold'>US-GPT</p>
        {user ? (
          <div className='ml-auto'>
            <Link to='/chat' className='text-[#8ED5FF] text-xl'>
              Chats
            </Link>
          </div>
        ) : (
          <div className='flex ml-auto mr-10 items-center gap-6'>
            <a href='/login' className='text-[#8ED5FF] text-xl'>
              Đăng nhập
            </a>
            <a
              href='/register'
              className='text-[#202123] bg-[#8ED5FF] px-6 py-3 rounded-full text-xl'
            >
              Đăng ký
            </a>
          </div>
        )}
      </header>
      <main className='flex gap-10 grow justify-center items-center text-white'>
        <div className='max-w-2xl'>
          <div className='flex items-center gap-4 mb-4'>
            <img src={Logo} alt='logo' className='w-48 object-center' />
            <h1 className='text-5xl font-semibold'>
              Welcome to <br />
              <span className='text-8xl primary font-extrabold'>US-GPT</span>
            </h1>
          </div>
          <h3 className='font-semibold text-4xl'>
            Bạn đồng hành công nghệ của sinh viên HCMUS
          </h3>
          <p className='font-normal text-lg'>
            Trợ lý thông minh hỗ trợ học tập, rèn luyện dành riêng cho sinh viên
            trường ĐH Khoa học tự nhiên, ĐHQG-HCM.
          </p>
          <Button className='mt-12 rounded-full text-xl px-10 py-8 bg-[#8ED5FF] text-black hover:bg-[#8ED5FF] hover:bg-opacity-80'>
            Bắt đầu ngay!
          </Button>
        </div>
        <img
          src={Mascot}
          alt='US GPT mascot'
          className='h-[500px] -scale-x-100'
        />
      </main>
      <footer className='bg-[#2D2E35] flex justify-end text-[#C5C5D1] gap-4 pr-10 py-4'>
        <a href='/'>About Us</a>
        <a href='/'>Privacy & Terms</a>
      </footer>
    </div>
  );
}
