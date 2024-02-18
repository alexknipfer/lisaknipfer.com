import { PropsWithChildren } from 'react';

export function PageContent({ children }: PropsWithChildren) {
  return <div className="mt-3 max-w-screen-md">{children}</div>;
}
