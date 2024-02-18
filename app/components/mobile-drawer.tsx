import { AlignLeft } from 'lucide-react';

import { Settings } from '~/types/sanity';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { MenuContent } from './menu-content';

interface Props {
  settings: Settings;
}

export function MobileDrawer({ settings }: Props) {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="duration-400 group transition-colors hover:bg-zinc-950"
        >
          <AlignLeft size={20} className="group-hover:stroke-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[70%]">
        <div className="overflow-y-auto p-2 md:p-4">
          <MenuContent showHotkeys={false} settings={settings} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
