import { PropsWithChildren } from 'react';

export function ScrollView({ children }: PropsWithChildren) {
  return (
    <div className="h-full max-h-dvh min-h-dvh w-full overflow-y-auto pb-5">
      {children}
    </div>
  );
}
