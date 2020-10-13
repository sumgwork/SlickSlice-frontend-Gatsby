import calculatePizzaPrice from './calculatePizzaPrice';

export const calculateOrderTotal = (order, pizzas) =>
  order.reduce((runningTotal, item) => {
    const pizza = pizzas.find((_pizza) => _pizza.id === item.id);
    return runningTotal + calculatePizzaPrice(pizza.price, item.size);
  }, 0);
