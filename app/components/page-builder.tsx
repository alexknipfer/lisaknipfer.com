import { PageContentBuilderType, SanityPageWithBuilder } from '~/types/sanity';
import { PersonalInformation } from './personal-information';
import { PageDescription } from './page-description';
import { Timeline } from './timeline';

interface Props {
  pageBuilder: SanityPageWithBuilder['pageBuilder'];
}

export function PageBuilder({ pageBuilder }: Props) {
  return (
    <>
      {pageBuilder.map((content) => {
        switch (content._type) {
          case PageContentBuilderType.PAGE_DESCRIPTION:
            return <PageDescription key={content._type} content={content} />;
          case PageContentBuilderType.TIMELINE:
            return <Timeline key={content._type} content={content} />;
          case PageContentBuilderType.PERSONAL_INFORMATION:
            return (
              <PersonalInformation key={content._type} content={content} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
