import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { API } from '@/lib/constant';

const SignUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Email không hợp lệ' })
      .min(1, { message: 'Email không được để trống' }),
    username: z
      .string()
      .min(1, { message: 'Tên người dùng không được để trống' }),
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    const resp = await fetch(`${API}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (resp.ok) {
      window.location.href = '/login';
    }
  };

  return (
    <main className='flex flex-col items-center mt-10 gap-16'>
      <img src={Logo} alt='US-GPT logo' className='w-16' />
      <div className='text-center min-w-[300px] flex flex-col gap-4'>
        <h1 className='font-bold text-3xl'>Đăng ký</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-[300px] flex flex-col gap-4 text-left'
        >
          <div>
            <TextField
              className='w-full'
              label='Địa chỉ email'
              variant='outlined'
              type='email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <TextField
              className='w-full'
              label='Tên tài khoản'
              variant='outlined'
              type='text'
              {...register('username')}
            />
            {errors.username && (
              <p className='text-red-500'>{errors.username.message}</p>
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
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div>
            <TextField
              className='w-full'
              label='Nhập lại mật khẩu'
              variant='outlined'
              type='password'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type='submit'
            className='bg-[#003F88] hover:bg-[#003F88] hover:bg-opacity-80 rounded-full'
          >
            Đăng ký
          </Button>
        </form>
        <p className='text-sm'>
          Đã có tài khoản?
          <Link to='/login' className='text-[#003F88]'>
            {' '}
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
}
