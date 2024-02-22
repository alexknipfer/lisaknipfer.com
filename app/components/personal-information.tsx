import { PortableText } from '@portabletext/react';

import { CardHeader, CardContent, Card } from '~/components/ui/card';
import { PersonalInformation as SanityPersonalInformation } from '~/types/sanity';
import { Heading } from './heading';

interface Props {
  content: SanityPersonalInformation;
}

export function PersonalInformation({ content }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {content.personalList.map((item) => (
        <Card key={item._key} className="h-full">
          <CardHeader className="text-center">
            <Heading level="h2">{item.title}</Heading>
          </CardHeader>
          <CardContent className="flex items-start">
            <PortableText
              value={item.listItem}
              components={{
                listItem: {
                  bullet: ({ children }) => (
                    <li className="list-disc">{children}</li>
                  ),
                },
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
