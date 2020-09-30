import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'http://localhost:8000',
    description: 'The best pizza place in Sydney',
  },
  plugins: [
    // For critical CSS rendering by Gatsby
    'gatsby-plugin-styled-components',
    {
      // For reading from Sanity
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'r8vf7z9s',
        dataset: 'production',
        watchMode: true, // In dev mode
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
