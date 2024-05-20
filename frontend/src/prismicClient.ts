import * as prismic from '@prismicio/client';

// Fill in your repository name
export const repositoryName = 'bereke-work';

export const prismicClient = prismic.createClient(repositoryName);
