import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  SpotifyCursorPaginatedResponse,
  SpotifyRecentlyPlayed,
  SpotifyTrack,
} from '~/types/spotify';

function getSmallestTrackImage(track: SpotifyTrack) {
  return track.album.images.length > 0
    ? track.album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
    : null;
}

interface Props {
  tracks: SpotifyCursorPaginatedResponse<SpotifyRecentlyPlayed>;
}

export function RecentlyPlayedTracks({ tracks }: Props) {
  return (
    <section className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[70px]" />
            <TableHead className="min-w-[150px]">Song</TableHead>
            <TableHead className="hidden min-w-[150px] md:table-cell">
              Artist(s)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.items.map(({ track }) => {
            const image = getSmallestTrackImage(track);
            const artists = track.artists
              .map((artist) => artist.name)
              .join(', ');

            return (
              <TableRow key={track.id}>
                <TableCell>
                  {image && (
                    <img
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      alt={`Album cover for ${track.name}`}
                      className="h-10 w-10"
                      loading="lazy"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={track.external_urls.spotify}
                    className="block text-nowrap font-medium hover:underline hover:underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.name}
                  </a>
                  <span className="text-gray-500 md:hidden">{artists}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {artists}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
