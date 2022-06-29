/* eslint no-console:off */
import { Dispatch, ReactElement, SetStateAction, useMemo } from 'react';
import { TabsContext } from './context';
import TabsItem from './TabsItem';

interface SubComponents {
  Item: typeof TabsItem;
}

interface Props {
  className?: string;
  activeStyles?: string;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  children: ReactElement;
}

const Tabs: SubComponents = ({
  children,
  className,
  activeStyles,
  active,
  setActive,
}: Props) => {
  if (!Array.isArray(children))
    console.error('Tabs should have more than 1 child!');

  const value = useMemo(
    () => ({
      tab: active,
      setTab: setActive,
      activeStyles: activeStyles || '',
    }),
    [active, setActive, activeStyles]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className={`flex items-center ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.Item = TabsItem;

export default Tabs;
