import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { ENV } from '~/lib/env';

export const client = createClient({
  projectId: ENV.sanity.projectId,
  dataset: ENV.sanity.dataset,
  useCdn: false,
  apiVersion: ENV.sanity.apiVersion,
});

export const imageBuilder = imageUrlBuilder(client);
