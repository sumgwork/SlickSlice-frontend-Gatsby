import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';

const Slicemaster = ({ data }) => {
  const { slicemaster } = data;

  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image.asset.fluid.src} />
      <Img fluid={slicemaster.image.asset.fluid} />
      <div>
        <h2 className="mark">{slicemaster.name}</h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
};

export default Slicemaster;

export const query = graphql`
  query slicemaster($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
