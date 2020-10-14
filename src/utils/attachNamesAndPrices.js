import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export const attachNamesAndPrices = (order, pizzas) =>
  order.map((item) => {
    const pizza = pizzas.find((_pizza) => _pizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
