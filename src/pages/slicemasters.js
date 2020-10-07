import { graphql, Link } from 'gatsby';
import React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemastersPage = ({ data }) => {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Image fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SlicemastersPage;

export const query = graphql`
  query Slicemasters {
    slicemasters: allSanityPerson(limit: 2, skip: 2) {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
      totalCount
    }
  }
`;
