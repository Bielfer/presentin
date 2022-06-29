import { ReactElement } from 'react';
import { useTabNavigation } from './context';

interface Props {
  className?: string;
  value: string;
  children?: string | ReactElement;
}

const TabsItem = ({ children, className, value }: Props) => {
  const { tab, setTab, activeStyles } = useTabNavigation();

  const activeStylesClassName = tab === value ? activeStyles : '';

  return (
    <button
      type="button"
      className={`${activeStylesClassName} ${className}`}
      onClick={() => setTab(value)}
    >
      {children}
    </button>
  );
};

export default TabsItem;
