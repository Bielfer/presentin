import { FC, InputHTMLAttributes } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Text from '@/components/core/Text';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  password?: boolean;
  error?: string;
  hint?: string;
}

const Input: FC<Props> = ({
  label,
  placeholder,
  password,
  className,
  type,
  error,
  name,
  hint,
  ...props
}) => (
  <div className={className}>
    {label && (
      <div className="flex justify-between">
        <Text htmlFor={name} label>
          {label}
        </Text>
        {hint && (
          <span className="text-sm text-gray-500" id="email-optional">
            {hint}
          </span>
        )}
      </div>
    )}
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        className={
          !error
            ? 'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
            : 'block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md'
        }
        placeholder={placeholder}
        type={password ? 'password' : type ?? 'text'}
        id={name}
        {...props}
      />
      {!!error && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
    {!!error && (
      <p className="mt-2 text-sm text-red-600" id="error">
        {error}
      </p>
    )}
  </div>
);

export default Input;
