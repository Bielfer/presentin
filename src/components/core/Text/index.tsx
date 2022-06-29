import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { VariantText } from '@/types/styles';

interface Props extends HTMLAttributes<any> {
  className?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  b?: boolean;
  small?: boolean;
  i?: boolean;
  span?: boolean;
  del?: boolean;
  em?: boolean;
  blockquote?: boolean;
  label?: boolean;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  htmlFor?: string;
}

const elementStyles = {
  h1: '',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'font-bold',
  p: '',
  b: '',
  small: '',
  i: '',
  span: '',
  del: '',
  em: '',
  blockquote: '',
  label: 'text-sm font-medium text-gray-700',
};

const Text: FC<Props> = ({
  className,
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  b,
  small,
  i,
  span,
  del,
  em,
  blockquote,
  label,
  iconLeft,
  iconRight,
  ...props
}) => {
  const elements = {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    b,
    small,
    i,
    span,
    del,
    em,
    blockquote,
    label,
  };
  const elementArray = Object.keys(elements) as VariantText[];
  const element = elementArray.find((el) => elements[el] === true) || 'p';

  return (
    <>
      {React.createElement(
        element,
        {
          className: `flex items-center gap-x-1 ${elementStyles[element]} ${
            className ?? ''
          }`,
          ...props,
        },
        iconLeft,
        children,
        iconRight
      )}
    </>
  );
};

export default Text;
