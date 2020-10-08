import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const SEO = ({ children, location, description, title, image }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s | ${site.siteMetadata.title}`}>
      {/* %s | appends to the title */}
      <html lang="en" />
      <title>{title}</title>

      {/* Favicons (from static folder) */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      {/* Meta tags */}
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta
        property="og:title"
        content={title || site.siteMetadata.title}
        key="ogtitle"
      />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
        key="ogdescription"
      />
      {children}
    </Helmet>
  );
};

export default SEO;
