import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold order
  const [order, setOrder] = useContext(OrderContext);

  // 2. make a function to add things to order
  const addToOrder = (orderedPizza) => setOrder([...order, orderedPizza]);

  // 3. Make a function to remove things from order
  const removeFromOrder = (index) =>
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);

  // 4. Send this data to a serverless function when they checkout
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
