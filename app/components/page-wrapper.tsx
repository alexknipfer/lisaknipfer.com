import { PropsWithChildren } from 'react';

export function PageWrapper({ children }: PropsWithChildren) {
  return <div className="px-5 py-8 md:px-8 lg:ml-60 xl:ml-72">{children}</div>;
}
