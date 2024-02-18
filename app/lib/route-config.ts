import { Home, CalendarDays, PlayCircle } from 'lucide-react';

export const routeConfig = {
  home: {
    label: 'Home',
    template: '/',
    icon: Home,
  },
  timeline: {
    label: 'Timeline',
    template: '/timeline',
    icon: CalendarDays,
  },
  tracks: {
    label: 'My Hot Jams',
    template: '/tracks',
    icon: PlayCircle,
  },
};

export const menuRoutes = [
  routeConfig.home,
  routeConfig.timeline,
  routeConfig.tracks,
];
