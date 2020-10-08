import { graphql, Link } from 'gatsby';
import React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

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

const SlicemastersPage = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;
  const { currentPage, skip } = pageContext;
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={process.env.GATSBY_PAGE_SIZE}
        totalCount={data.slicemasters.totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
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

export const pageQuery = graphql`
  query Slicemasters($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
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
