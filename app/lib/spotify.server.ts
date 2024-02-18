import {
  SpotifyCursorPaginatedResponse,
  SpotifyRecentlyPlayed,
  SpotifyTokenResponse,
} from '~/types/spotify';
import { ENV } from './env.server';

class SpotifyService {
  private static readonly TOKEN_ENDPOINT =
    'https://accounts.spotify.com/api/token';
  private static readonly RECENTLY_PLAYED_ENDPOINT =
    'https://api.spotify.com/v1/me/player/recently-played';

  public async getRecentlyPlayed(): Promise<
    SpotifyCursorPaginatedResponse<SpotifyRecentlyPlayed>
  > {
    const { access_token } = await this.getAccessToken();

    const reponse = await fetch(SpotifyService.RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return reponse.json();
  }

  private async getAccessToken(): Promise<SpotifyTokenResponse> {
    const response = await fetch(SpotifyService.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.getAuthToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: ENV.spotify.refreshToken,
      }),
    });

    return response.json();
  }

  private getAuthToken() {
    return Buffer.from(
      `${ENV.spotify.clientId}:${ENV.spotify.clientSecret}`,
    ).toString('base64');
  }
}

export const spotify = new SpotifyService();
