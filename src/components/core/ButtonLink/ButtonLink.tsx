import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import { Size, sizes, variantStyles } from '@/components/core/Button';
import { Props } from '@/components/core/MyLink';

interface ButtonProps extends Props {
  size?: Size;
  iconLeft?: React.ComponentType<React.ComponentProps<'svg'>>;
  iconRight?: React.ComponentType<React.ComponentProps<'svg'>>;
}

const ButtonLink: FC<ButtonProps> = ({
  className,
  children,
  variant = 'white',
  href,
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  ...props
}) => (
  <Link href={href || ''} passHref>
    <a
      className={clsx(
        'inline-flex items-center font-medium rounded-lg shadow-sm',
        variantStyles[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {IconLeft && <IconLeft className="-ml-0.5 mr-2 h-5 w-5 flex-shrink-0" />}
      {children}
      {IconRight && (
        <IconRight className="ml-2 -mr-0.5 h-5 w-5 flex-shrink-0" />
      )}
    </a>
  </Link>
);

export default ButtonLink;
