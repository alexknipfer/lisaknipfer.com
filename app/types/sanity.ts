import type dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { PortableTextBlock } from '@portabletext/types';

export enum PageContentBuilderType {
  PAGE_DESCRIPTION = 'pageDescription',
  TIMELINE = 'timeline',
  TIMELINE_YEAR = 'timelineYear',
  TIMELINE_ITEM = 'timelineItem',
  PERSONAL_INFORMATION = 'personalInformation',
}

export type PageContentType = PageDescriptionContent | Timeline;

interface SanityArrayItemBase {
  _key: string;
}

export interface SocialItem {
  _type: string;
  _key: string;
  label: string;
  link: string;
  icon: string;
}

export interface Settings {
  socialItems: Array<SocialItem>;
}

export interface SanityPageWithBuilder extends SanityPage {
  pageBuilder: Array<PageDescriptionContent | Timeline | PersonalInformation>;
}

export interface SanityPage {
  _id: string;
  title: string;
  sidebarOrder: number;
  sidebarIcon: keyof typeof dynamicIconImports;
  slug: string;
}

export interface PageDescriptionContent {
  _type: PageContentBuilderType.PAGE_DESCRIPTION;
  title: string;
  description: string;
}

export interface TimelineItem extends SanityArrayItemBase {
  _type: PageContentBuilderType.TIMELINE_ITEM;
  _key: string;
  name: string;
  description: string;
  image: SanityImage;
}

interface TimelineYear extends SanityArrayItemBase {
  _type: PageContentBuilderType.TIMELINE_YEAR;
  year: string;
  timelineItems: Array<TimelineItem>;
}

export interface Timeline {
  _type: PageContentBuilderType.TIMELINE;
  timelineItemIcon: string;
  timelineYears: Array<TimelineYear>;
}

export interface PersonalInformation {
  _type: PageContentBuilderType.PERSONAL_INFORMATION;
  personalList: Array<PersonalListItem>;
}

interface PersonalListItem extends SanityArrayItemBase {
  _type: string;
  title: string;
  listItem: Array<PortableTextBlock>;
}

export interface SanityImage {
  asset: {
    url: string;
    metadata: SanityImageMetadata;
    altText: string | null;
  };
}

export interface SanityImageMetadata {
  isOpaque: boolean;
  blurHash: string;
  hasAlpha: boolean;
  lqip: string;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  };
}
