import React from 'react';
import Layout from './src/components/Layout';

// This function will return a component which will wrap all page level components
export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
