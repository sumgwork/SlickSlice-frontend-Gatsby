import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data: { pizza } }) => (
  <PizzaGrid>
    <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
    <Img fluid={pizza.image.asset.fluid} />
    <div>
      <h2 className="mark">{pizza.name}</h2>
      <ul>
        {pizza.toppings.map((topping) => (
          <li key={topping.id}>{topping.name}</li>
        ))}
      </ul>
    </div>
  </PizzaGrid>
);

export default SinglePizzaPage;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      price
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
