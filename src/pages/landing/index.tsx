import Logo from '@/assets/logo.png';
import Mascot from '@/assets/fitbot.png';

export default function LandingPage() {
  return (
    <div className='bg-[#202123] min-h-screen flex flex-col'>
      <header className='flex items-center'>
        <img src={Logo} alt='logo' className='w-20' />
        <p className='primary text-3xl font-semibold'>US-GPT</p>
        <div className='flex ml-auto mr-10 items-center gap-6'>
          <a href='/' className='text-[#8ED5FF] text-xl'>
            Đăng nhập
          </a>
          <a
            href='/'
            className='text-[#202123] bg-[#8ED5FF] px-6 py-3 rounded-full text-xl'
          >
            Đăng ký
          </a>
        </div>
      </header>
      <main className='flex grow justify-center items-center text-white'>
        <div className='w-1/3'>
          <div className='flex items-center'>
            <img src={Logo} alt='logo' className='w-44' />
            <h1 className='text-4xl font-semibold'>
              Welcome to <br />
              <span className='text-6xl primary font-extrabold'>US-GPT</span>
            </h1>
          </div>
          <h3 className='font-semibold text-4xl'>
            Bạn đồng hành công nghệ của sinh viên HCMUS
          </h3>
          <p className='font-normal'>
            Trợ lý thông minh hỗ trợ học tập, rèn luyện dành riêng cho sinh viên
            trường ĐH Khoa học tự nhiên, ĐHQG-HCM.
          </p>
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
