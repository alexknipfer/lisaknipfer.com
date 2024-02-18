function loadServerEnvironmentVariable(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const ENV = {
  spotify: {
    clientId: loadServerEnvironmentVariable('SPOTIFY_CLIENT_ID'),
    clientSecret: loadServerEnvironmentVariable('SPOTIFY_CLIENT_SECRET'),
    refreshToken: loadServerEnvironmentVariable('SPOTIFY_REFRESH_TOKEN'),
  },
};
