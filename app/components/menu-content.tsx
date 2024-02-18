import { useLocation, Link } from '@remix-run/react';

import { ExternalLink } from 'lucide-react';
import { Settings } from '~/types/sanity';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { menuRoutes } from '~/lib/route-config';
import { cn } from '~/lib/utils';

interface Props {
  showHotkeys?: boolean;
  settings: Settings;
}

export function MenuContent({ settings, showHotkeys = true }: Props) {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        to="/"
        className="mb-3 flex gap-3 rounded p-2 transition-colors duration-200 hover:bg-pink-100"
      >
        <Avatar>
          <AvatarImage src="/assets/avatar.jpg" />
          <AvatarFallback>LK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">Lisa Knipfer</span>
          <span className="text-zinc-600">Fullfillment Expert</span>
        </div>
      </Link>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-1">
          {menuRoutes.map(({ label, template, icon }, index) => {
            const isCurrentPath = pathname === template;
            const Icon = icon;

            return (
              <Link
                key={template}
                to={template}
                className={cn(
                  'flex items-center justify-between rounded-lg p-2 text-pink-800 transition duration-200',
                  {
                    'hover:bg-pink-100': !isCurrentPath,
                    'bg-pink-950 text-zinc-50': isCurrentPath,
                  },
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="font-medium">{label}</span>
                </span>
                {showHotkeys && (
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded border border-zinc-200 bg-zinc-100 text-xs',
                      {
                        'border-zinc-500 bg-zinc-600 text-zinc-50':
                          isCurrentPath,
                      },
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <hr />
        <div className="flex flex-col gap-1">
          <span className="mb-2 pl-2 text-xs font-medium text-zinc-600">
            Social
          </span>
          {settings.socialItems.map(({ link, icon, label, _key }) => {
            return (
              <a
                key={_key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg p-2 text-pink-800 transition duration-200 hover:bg-pink-100"
              >
                <span className="flex items-center gap-2">
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
                  <span className="font-medium">{label}</span>
                </span>
                <ExternalLink size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
