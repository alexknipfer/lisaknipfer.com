import { imageBuilder } from '~/sanity/client';
import { TimelineItem as SanityTimelineItem } from '~/types/sanity';

interface Props {
  timelineItem: SanityTimelineItem;
}

export function TimelineItem({
  timelineItem: { name, description, image },
}: Props) {
  return (
    <div className="flex-grow pl-4 md:pl-8">
      <span className="font-semibold">{name}</span>
      <p className="text-sm">{description}</p>
      {!!image && (
        <div className="mt-2 overflow-hidden rounded-xl">
          <img
            className="animate-reveal"
            src={imageBuilder.image(image).auto('format').url()}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            alt={name}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
