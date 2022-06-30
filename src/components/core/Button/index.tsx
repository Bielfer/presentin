import { ButtonHTMLAttributes } from 'react';
import Spinner from '@/components/core/Spinner';
import clsx from 'clsx';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'primary' | 'secondary' | 'white';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button';
  iconLeft?: React.ComponentType<React.ComponentProps<'svg'>>;
  iconRight?: React.ComponentType<React.ComponentProps<'svg'>>;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const variantStyles = {
  primary:
    'border border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  secondary:
    'border border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  white:
    'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
};

export const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const Button = ({
  type,
  className,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  variant = 'white',
  size = 'md',
  loading,
  ...props
}: Props) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    className={clsx(
      'inline-flex items-center font-medium rounded-lg shadow-sm',
      variantStyles[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {IconLeft && <IconLeft className="-ml-0.5 mr-2 h-5 w-5 flex-shrink-0" />}
    {loading ? <Spinner size="sm" color="white" /> : children}
    {IconRight && <IconRight className="ml-2 -mr-0.5 h-5 w-5 flex-shrink-0" />}
  </button>
);

export default Button;
