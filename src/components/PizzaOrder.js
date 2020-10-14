import React from 'react';
import Image from 'gatsby-image';
import { MenuItemStyles } from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    <p> You have {order.length} items in your order!</p>
    {order.map((item, index) => {
      const pizza = pizzas.find((_pizza) => _pizza.id === item.id);
      return (
        <MenuItemStyles key={`${item.id}-${item.size}-${index}`}>
          <Image fluid={pizza.image.asset.fluid} alt={pizza.name} />
          <h2>
            {pizza.name} ({item.size})
          </h2>
          <p>{formatMoney(calculatePizzaPrice(pizza.price, item.size))}</p>
          <button
            type="button"
            className="remove"
            title={`Remove ${item.size} ${pizza.name} from Order`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
