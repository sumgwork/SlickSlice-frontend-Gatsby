import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

const PersonGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
const Slicemaster = ({ data }) => {
  const { slicemaster } = data;

  return (
    <PersonGrid>
      <Img fluid={slicemaster.image.asset.fluid} />
      <div>
        <h2 className="mark">{slicemaster.name}</h2>
        <p>{slicemaster.description}</p>
      </div>
    </PersonGrid>
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
