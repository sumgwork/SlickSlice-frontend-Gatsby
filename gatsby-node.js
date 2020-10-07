import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for the page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page
  data.pizzas.nodes.forEach((pizza) => {
    const slugName = pizza.slug.current;
    actions.createPage({
      path: `pizza/${slugName}`,
      component: pizzaTemplate,
      context: { slug: slugName },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for the page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 3. Loop over each toppings and create a page
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: { topping: topping.name, toppingRegex: `/${topping.name}/i` },
    });
  });
}

// Sourcing beer data from external API
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  // loop over
  beers.forEach((beer) => {
    // create node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer), // checks if data has changed
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
}

// happens before createPages - Gatsby provided
export async function sourceNodes(params) {
  // fetch a list of beers and source them into gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

// Gatsby provided function
export async function createPages(params) {
  // Create pages dynamically
  await Promise.all([
    // 1. Pizzas
    turnPizzaIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
  ]);
  // 3. Slicemasters
}
