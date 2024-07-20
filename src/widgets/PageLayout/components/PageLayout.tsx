import { ReactNode } from '@tanstack/react-router';
import { memo, PropsWithChildren, type FC } from 'react';

type PageLayoutProps = {
  topLine: ReactNode;
};

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = memo(
  (props) => {
    const { topLine, children } = props;

    return (
      <main className="p-10">
        {topLine}
        {children}
      </main>
    );
  }
);
