import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { API } from '@/lib/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const LogInSchema = z.object({
  username: z.string().min(1, { message: 'Tài khoản không được để trống' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LogInSchema),
  });
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    const resp = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!resp.ok) {
      const error = await resp.text();
      setError(error);
      return;
    }

    if (resp.ok) {
      window.location.href = '/login';
    }
  };

  return (
    <main className='flex flex-col items-center mt-10 gap-16'>
      <img src={Logo} alt='US-GPT logo' className='w-16' />
      <div className='text-center min-w-[300px] flex flex-col gap-4'>
        <h1 className='font-bold text-3xl'>Đăng nhập</h1>
        <form
          className='max-w-[300px] flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <TextField
              className='w-full'
              label='Tài khoản'
              variant='outlined'
              type='text'
              {...register('username')}
            />
            {errors.username && (
              <p className='text-red-500 text-sm'>{errors.username.message}</p>
            )}
          </div>
          <div>
            <TextField
              className='w-full'
              label='Mật khẩu'
              variant='outlined'
              type='password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <Button
            type='submit'
            className='bg-[#003F88] hover:bg-[#003F88] hover:bg-opacity-80 rounded-full'
          >
            Tiếp tục
          </Button>
        </form>
        <p className='text-sm'>
          Chưa có tài khoản?
          <Link to='/register' className='text-[#003F88]'>
            {' '}
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
