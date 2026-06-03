import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  max-width: var(--content-max-width);
`;

export const Prose = styled.div`
  color: var(--text);
  line-height: var(--text-line-height);
  text-align: left;

  p {
    margin: 0 0 var(--paragraph-spacing);

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
