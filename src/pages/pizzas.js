import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <div>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </div>
  );
};
// Gatsby executes this itself
export const pageQuery = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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
