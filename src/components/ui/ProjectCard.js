import styled from 'styled-components';
import { Link } from 'gatsby';

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.article`
  ${({ theme }) => theme.mixins.boxShadow};
  display: grid;
  grid-template-rows: auto auto auto 1fr auto auto auto;
  min-height: 100%;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background-color: var(--surface);
  transition: transform 0.35s var(--easing), box-shadow 0.35s var(--easing);

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardHeader = styled.div`
  ${({ theme }) => theme.mixins.flexBetween};
  margin-bottom: 20px;
`;

export const StatusLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--heading);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-decoration: none;

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--brand);
  }

  &:hover,
  &:focus {
    color: var(--secondary);
  }
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--heading);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--brand);
  }
`;

export const Year = styled.span`
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px;
  color: var(--heading);
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.2;
`;

export const CardTagline = styled.p`
  margin: 0 0 16px;
  color: var(--secondary);
  font-size: var(--fz-sm);
  line-height: 1.4;
`;

export const CardDescription = styled.p`
  margin: 0;
  color: var(--text);
  font-size: var(--fz-sm);
  line-height: var(--text-line-height);
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
`;

export const Metric = styled.div`
  strong {
    display: block;
    margin-bottom: 4px;
    color: var(--secondary);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 600;
  }

  span {
    color: var(--text);
    font-size: var(--fz-xs);
    line-height: 1.4;
  }
`;

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

export const TechTag = styled.span`
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--brand) 45%, var(--border));
  border-radius: 999px;
  color: var(--secondary);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

export const CardActionLink = styled(Link)`
  ${({ theme }) => theme.mixins.fillButton};
`;

export const CardActionExternal = styled.a`
  ${({ theme }) => theme.mixins.fillButton};
`;
