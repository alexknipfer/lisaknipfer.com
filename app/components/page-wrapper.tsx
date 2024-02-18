import { PropsWithChildren } from 'react';

export function PageWrapper({ children }: PropsWithChildren) {
  return <div className="w-full px-5 pt-8 md:px-8">{children}</div>;
}
