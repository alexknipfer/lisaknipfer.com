import { cn } from '~/lib/utils';

interface Props {
  children: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export function Heading({ level, children, className }: Props) {
  const Tag = level;

  return (
    <Tag
      className={cn(`font-semibold ${className ? className : ''}`, {
        'text-2xl md:text-3xl': level === 'h1',
        'text-lg md:text-xl': level === 'h2',
        'text-md md:text-xl': level === 'h3',
        'text-base md:text-lg': level === 'h4',
      })}
    >
      {children}
    </Tag>
  );
}
