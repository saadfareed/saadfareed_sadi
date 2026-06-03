import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Testimonials, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > section {
    width: 100%;
    max-width: var(--content-max-width);
  }

  > section:first-of-type {
    padding-top: 0;
  }
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Testimonials />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
