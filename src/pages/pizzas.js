import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <div>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </div>
  );
};
// Gatsby executes this itself
export const pageQuery = graphql`
  query allPizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        price
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default PizzasPage;
