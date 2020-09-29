import 'normalize.css';
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';
import Nav from './Nav';
import stripes from '../assets/images/stripes.svg';

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  background: white url(${stripes});
  background-size: 1500px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.44);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: -1.5rem;
  }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <ContentStyles>
        <Nav />
        <main>{children}</main>
        <Footer />
      </ContentStyles>
    </SiteBorderStyles>
  </>
);

export default Layout;
