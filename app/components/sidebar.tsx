import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';

import { Settings } from '~/types/sanity';
import { menuRoutes } from '~/lib/route-config';
import { MenuContent } from './menu-content';

interface Props {
  settings: Settings;
}

// export const loader = async () => {
//   const data = await client.fetch<Settings>(settingsQuery);

//   return json({ data });
// };

export default function Sidebar({ settings }: Props) {
  // const { data } = useLoaderData<typeof loader>();
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
    <div className="hidden w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-3 text-sm lg:block xl:w-72">
      <MenuContent settings={settings} />
    </div>
  );
}
