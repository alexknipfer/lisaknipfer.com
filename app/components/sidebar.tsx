import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';

import { Settings } from '~/types/sanity';
import { menuRoutes } from '~/lib/route-config';
import { MenuContent } from './menu-content';

interface Props {
  settings: Settings;
}

export default function Sidebar({ settings }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^\d+$/)) {
        const index = parseInt(event.key, 10) - 1;

        if (index < menuRoutes.length) {
          navigate(menuRoutes[index].template);
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [navigate]);

  return (
    <div className="left-0 top-0 hidden h-dvh w-60 shrink-0 self-start border-r border-zinc-200 bg-zinc-50 p-3 text-sm lg:fixed lg:block xl:w-72">
      <MenuContent settings={settings} />
    </div>
  );
}
