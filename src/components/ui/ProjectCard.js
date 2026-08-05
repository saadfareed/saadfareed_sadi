import styled from 'styled-components';
import { Link } from 'gatsby';

// A single-column ledger of entries rather than a card grid — each project
// is a ruled row (date/status column + body), like line items on a
// statement, instead of a floating shadowed card.
export const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectCard = styled.article`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 28px;
  padding: 32px 0;
  border-top: 1px solid var(--border-soft);

  &:first-child {
    border-top: none;
    padding-top: 4px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: var(--text-muted);

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
`;

const statusRow = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);

  span.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--stamp);
    flex-shrink: 0;
  }
`;

export const StatusLink = styled.a`
  ${statusRow};
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--heading);
  }
`;

export const StatusBadge = styled.div`
  ${statusRow};
`;

export const Year = styled.span``;

export const CardBody = styled.div`
  min-width: 0;
`;

export const CardTitle = styled.h3`
  margin: 0 0 4px;
  font-size: clamp(19px, 2.5vw, 23px);
  font-weight: 500;
  line-height: 1.2;
`;

export const CardTagline = styled.p`
  margin: 0 0 14px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.02em;
`;

export const CardDescription = styled.p`
  margin: 0;
  color: var(--text);
  font-size: var(--fz-sm);
  line-height: var(--text-line-height);
`;

export const MetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: 20px 0;
`;

export const Metric = styled.div`
  strong {
    display: block;
    color: var(--heading);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 600;
  }

  span {
    color: var(--text-muted);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export const TechLine = styled.p`
  margin: 0 0 18px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
`;

export const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const CardActionLink = styled(Link)`
  ${({ theme }) => theme.mixins.fillButton};
`;

export const CardActionExternal = styled.a`
  ${({ theme }) => theme.mixins.fillButton};
`;
