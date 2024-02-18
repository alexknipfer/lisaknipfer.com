import { PortableText } from '@portabletext/react';

import { PersonalInformation as SanityPersonalInformation } from '~/types/sanity';
import { Heading } from './heading';

interface Props {
  content: SanityPersonalInformation;
}

export function PersonalInformation({ content }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {content.personalList.map((item) => (
        <div
          className="bg-yellow-200 p-5 shadow-xl odd:rotate-3 even:-rotate-3"
          key={item._key}
        >
          <Heading level="h2">{item.title}</Heading>
          <PortableText
            value={item.listItem}
            components={{
              listItem: {
                bullet: ({ children }) => (
                  <li className="list-inside list-disc">{children}</li>
                ),
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}
