import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components/layout';
import featuredProjects from '@data/projects';

const Page = styled.div`
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + 40px) var(--page-gutter) 100px;
`;

const Breadcrumb = styled.nav`
  margin-bottom: 32px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);

  a {
    color: var(--secondary);

    &:hover {
      color: var(--secondary);
    }
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);

  .live {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    span.dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--secondary);
    }
  }
`;

const Title = styled.h1`
  margin: 0 0 12px;
  color: var(--heading);
  font-size: clamp(32px, 5vw, 48px);
`;

const Tagline = styled.p`
  margin: 0 0 24px;
  color: var(--secondary);
  font-size: var(--fz-lg);
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
`;

const TechTag = styled.span`
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--secondary) 45%, var(--border));
  border-radius: 999px;
  color: var(--secondary);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
`;

const DemoButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  display: inline-block;
  margin-bottom: 48px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);

  strong {
    display: block;
    margin-bottom: 6px;
    color: var(--secondary);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
  }

  span {
    color: var(--text);
    font-size: var(--fz-xs);
  }
`;

const Block = styled.section`
  margin-bottom: 40px;

  h2 {
    margin-bottom: 16px;
    color: var(--heading);
    font-size: var(--fz-xl);
  }

  p {
    margin: 0 0 14px;
    color: var(--text);
    line-height: var(--text-line-height);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 22px;
      color: var(--text);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--secondary);
      }
    }
  }
`;

const ArchGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const ArchCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  h3 {
    margin: 0 0 8px;
    color: var(--secondary);
    font-size: var(--fz-md);
  }

  p {
    margin: 0;
    color: var(--text);
    font-size: var(--fz-sm);
  }
`;

const CodeBlock = styled.pre`
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  line-height: 1.6;
  overflow-x: auto;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);
  text-decoration: none;

  h3 {
    margin: 0 0 8px;
    color: var(--heading);
    font-size: var(--fz-md);
  }

  p {
    margin: 0;
    color: var(--text);
    font-size: var(--fz-sm);
  }
`;

const ProjectTemplate = ({ pageContext, location }) => {
  const project = featuredProjects.find(p => p.slug === pageContext.slug);

  if (!project) {
    return null;
  }

  const related = featuredProjects.filter(p => p.slug !== project.slug).slice(0, 2);

  return (
    <Layout location={location}>
      <Page>
        <Breadcrumb>
          <Link to="/">Home</Link> &nbsp;›&nbsp; <Link to="/#projects">Projects</Link> &nbsp;›&nbsp;{' '}
          {project.title}
        </Breadcrumb>

        <MetaRow>
          <span className="live">
            <span className="dot" aria-hidden="true" />
            {project.status}
          </span>
          <span>{project.year}</span>
          <span>{project.category}</span>
        </MetaRow>

        <Title>{project.title}</Title>
        <Tagline>{project.tagline}</Tagline>

        <TechRow>
          {project.tech.map(t => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </TechRow>

        {project.external && (
          <DemoButton href={project.external} target="_blank" rel="noreferrer">
            Live Demo ↗
          </DemoButton>
        )}

        <StatsGrid>
          {project.metrics.map(m => (
            <StatCard key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </StatCard>
          ))}
        </StatsGrid>

        <Block>
          <h2>Project Overview</h2>
          {project.overview.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>

        <Block>
          <h2>Key Engineering Highlights</h2>
          <ul>
            {project.highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>

        <Block>
          <h2>System Architecture</h2>
          <ArchGrid>
            {project.architecture.map(layer => (
              <ArchCard key={layer.title}>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                </div>
                <TechRow>
                  {layer.tech.map(t => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </TechRow>
              </ArchCard>
            ))}
          </ArchGrid>
        </Block>

        <Block>
          <h2>Full Tech Stack</h2>
          <CodeBlock>{JSON.stringify(project.techStack, null, 2)}</CodeBlock>
        </Block>

        <Block>
          <h2>Related Projects</h2>
          <RelatedGrid>
            {related.map(r => (
              <RelatedCard key={r.slug} to={`/projects/${r.slug}`}>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </Block>
      </Page>
    </Layout>
  );
};

ProjectTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default ProjectTemplate;
