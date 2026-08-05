import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components/layout';
import { LedgerFields, FieldRow } from '@components/ui';
import featuredProjects from '@data/projects';

const HeroBand = styled.div`
  width: 100%;
  background: var(--surface-alt);
  border-bottom: 1px solid var(--border);
`;

const HeroInner = styled.div`
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + 40px) var(--page-gutter) 40px;
`;

const Page = styled.div`
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 56px var(--page-gutter) 100px;
`;

const Breadcrumb = styled.nav`
  margin-bottom: 32px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);

  a {
    color: var(--text-muted);

    &:hover {
      color: var(--heading);
    }
  }
`;

const Title = styled.h1`
  margin: 28px 0 10px;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 500;
`;

const Tagline = styled.p`
  margin: 0 0 32px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-md);
`;

const DemoButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  display: inline-flex;
  margin-top: 32px;
`;

const Block = styled.section`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
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
        content: '—';
        position: absolute;
        left: 0;
        color: var(--text-muted);
      }
    }
  }
`;

const ArchLog = styled.div`
  border-top: 1px solid var(--border);
`;

const ArchRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid var(--border-soft);

  .step {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--text-muted);
    padding-top: 3px;
  }

  h3 {
    margin: 0 0 6px;
    font-size: var(--fz-md);
    font-weight: 600;
  }

  p {
    margin: 0 0 10px;
    color: var(--text);
    font-size: var(--fz-sm);
  }

  .tech {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled(Link)`
  display: block;
  padding: 24px;
  background: var(--bg);
  text-decoration: none;
  transition: var(--transition);

  &:hover,
  &:focus {
    background: var(--surface);
  }

  h3 {
    margin: 0 0 8px;
    color: var(--heading);
    font-size: var(--fz-md);
    font-weight: 600;
  }

  p {
    margin: 0;
    color: var(--text-muted);
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
      <HeroBand>
        <HeroInner>
          <Breadcrumb>
            <Link to="/">Home</Link> &nbsp;›&nbsp; <Link to="/#projects">Projects</Link>{' '}
            &nbsp;›&nbsp; {project.title}
          </Breadcrumb>

          <Title>{project.title}</Title>
          <Tagline>{project.tagline}</Tagline>

          <LedgerFields>
            <FieldRow label="Status" value={project.status} status={project.status === 'Live'} />
            <FieldRow label="Year" value={project.year} />
            <FieldRow label="Category" value={project.category} />
            <FieldRow label="Stack" value={project.tech.join(', ')} />
            {project.metrics.map(m => (
              <FieldRow key={m.label} label={m.label} value={m.value} />
            ))}
          </LedgerFields>

          {project.external && (
            <DemoButton href={project.external} target="_blank" rel="noreferrer">
              View Live ↗
            </DemoButton>
          )}
        </HeroInner>
      </HeroBand>

      <Page>
        <Block>
          <div className="ledger-heading">
            <span className="eyebrow">Summary</span>
            <h2 className="headline">Project Overview</h2>
          </div>
          {project.overview.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>

        <Block>
          <div className="ledger-heading">
            <span className="eyebrow">Notable</span>
            <h2 className="headline">Key Engineering Highlights</h2>
          </div>
          <ul>
            {project.highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>

        <Block>
          <div className="ledger-heading">
            <span className="eyebrow">Request Flow</span>
            <h2 className="headline">System Architecture</h2>
          </div>
          <ArchLog>
            {project.architecture.map((layer, i) => (
              <ArchRow key={layer.title}>
                <span className="step">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <span className="tech">{layer.tech.join(' · ')}</span>
                </div>
              </ArchRow>
            ))}
          </ArchLog>
        </Block>

        <Block>
          <div className="ledger-heading">
            <span className="eyebrow">Breakdown</span>
            <h2 className="headline">Full Tech Stack</h2>
          </div>
          <LedgerFields>
            {Object.entries(project.techStack).map(([category, items]) => (
              <FieldRow
                key={category}
                label={category}
                value={items.join(', ')}
                labelWidth="140px"
              />
            ))}
          </LedgerFields>
        </Block>

        <Block>
          <div className="ledger-heading">
            <span className="eyebrow">See Also</span>
            <h2 className="headline">Related Projects</h2>
          </div>
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
