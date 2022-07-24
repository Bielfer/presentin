import Text from '@/components/core/Text';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

interface Props {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
  name?: string;
  children: ReactNode;
}

const InputLayout = ({
  label,
  hint,
  error,
  className,
  name,
  children,
}: Props) => (
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
      {children}
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

export default InputLayout;
