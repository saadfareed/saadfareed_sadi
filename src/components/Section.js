import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  max-width: var(--content-max-width);
`;

export const SectionWide = styled(Section)`
  max-width: var(--content-max-width);
`;

export const SectionInner = styled.div`
  width: 100%;
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

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns = 'minmax(0, 1fr) 260px' }) => $columns};
  gap: ${({ $gap = '48px' }) => $gap};
  align-items: start;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
