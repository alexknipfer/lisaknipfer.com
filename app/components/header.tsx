import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { SanityPageSlugAndTitle, Settings } from '~/types/sanity';

import { MobileDrawer } from './mobile-drawer';

interface Props {
  settings: Settings;
  pageSlugsAndTitles: Array<SanityPageSlugAndTitle>;
}

const MOBILE_SCROLL_THRESHOLD = 20;
const MAX_SCROLL_PERCENTAGE = 100;

function getTransformValues() {
  const translateY = Math.max(MAX_SCROLL_PERCENTAGE - window.scrollY, 0);
  const opacity = Math.min(
    Math.max(
      (window.scrollY -
        MOBILE_SCROLL_THRESHOLD *
          (MOBILE_SCROLL_THRESHOLD / (window.scrollY ** 2 / 100))) /
        100,
      0,
    ),
    1,
  );

  return { translateY, opacity };
}

export function Header({ settings, pageSlugsAndTitles }: Props) {
  const [transformValues, setTransformValues] = useState({
    translateY: 0,
    opacity: 0,
  });
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setTransformValues(getTransformValues());
    };

    setTransformValues(getTransformValues());

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const headerName = pageSlugsAndTitles.find(
    (slugAndTitle) => (slugAndTitle.slug || '/') === location.pathname,
  )?.title;

  return (
    <header className="sticky inset-0 z-50 flex h-12 w-full items-center gap-2 border-b border-zinc-200 bg-white px-2 md:px-4 lg:hidden">
      <MobileDrawer settings={settings} />
      <span
        className="text-sm font-semibold"
        style={{
          transform: `translateY(${transformValues.translateY}%)`,
          opacity: transformValues.opacity,
        }}
      >
        {headerName}
      </span>
    </header>
  );
}
