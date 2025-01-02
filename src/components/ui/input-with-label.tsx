import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className='relative w-full'>
        <Input
          type={type}
          ref={ref}
          {...props}
          className='peer mt-4 bg-transparent py-6 focus:border-[#003F88] border-2'
        />
        <label
          htmlFor={props.name}
          className='absolute -z-10 top-1/2 left-3 text-gray-500 -translate-y-1/2 transform transition-all duration-200
      peer-focus:-top-3 peer-focus:-translate-y-0 peer-focus:text-sm peer-focus:left-2 peer-focus:text-[#003F88]
      peer-focus:z-10 peer-focus:bg-white peer-focus:px-1 peer-focus:py-1
      peer-placeholder-shown:text-base peer-placeholder-shown:left-2 peer-placeholder-shown:-top-3 peer-placeholder-shown:z-10'
        >
          {props.label}
        </label>
      </div>
    );
  }
);

InputWithLabel.displayName = 'InputWithLabel';
export { InputWithLabel };
