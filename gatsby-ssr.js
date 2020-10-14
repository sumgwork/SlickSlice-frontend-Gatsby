import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

// This function will return a component which will wrap all page level components
export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}

// This is to wrap the absolute root, even above pages in hierarchy
export function wrapRootElement({ element }) {
  return <OrderProvider>{element} </OrderProvider>;
}
