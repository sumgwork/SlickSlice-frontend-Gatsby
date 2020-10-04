import path from 'path';

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
  console.log('toppings to pages');

  // 1. Get a template for the page
  const toppingTemplate = path.resolve('./src/pages/Pizzas.js');
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
