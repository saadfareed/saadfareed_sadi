import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import {
  Section,
  CardsGrid,
  ProjectCard,
  CardMeta,
  StatusBadge,
  Year,
  CardBody,
  CardTitle,
  CardTagline,
  CardDescription,
  MetricsRow,
  Metric,
  TechLine,
  CardFooter,
  CardActionExternal,
} from '@components/ui';
import { stripHtml, buildOpenSourceMetrics } from '@utils/markdown';

const StyledProjectsSection = styled(Section)`
  width: 100%;
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectsSectionQuery {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              date
              company
            }
            html
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);
  const revealCards = useRef([]);

  useEffect(() => {
    if (!sr) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
    revealCards.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const projects = data.projects.edges.map(({ node }) => node);

  return (
    <StyledProjectsSection id="open-source" ref={revealContainer}>
      <div className="ledger-heading">
        <span className="eyebrow">Public Record</span>
        <h2 className="headline">Open Source</h2>
      </div>
      <p className="section-intro">
        Public repositories, CLI tools, and community projects — maintained for developers and
        shared on GitHub.
      </p>

      <CardsGrid>
        {projects.map((node, i) => {
          const { frontmatter, html } = node;
          const { github, external, title, tech = [], date, company } = frontmatter;
          const year = date ? String(new Date(date).getFullYear()) : '—';
          const description = stripHtml(html);
          const metrics = buildOpenSourceMetrics(tech, year);

          return (
            <ProjectCard key={title} ref={el => (revealCards.current[i] = el)}>
              <CardMeta>
                <StatusBadge>
                  <span className="dot" aria-hidden="true" />
                  Open Source
                </StatusBadge>
                <Year>{year}</Year>
              </CardMeta>

              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardTagline>{company || 'Community Project'}</CardTagline>
                <CardDescription>{description}</CardDescription>

                <MetricsRow>
                  {metrics.map(metric => (
                    <Metric key={`${metric.label}-${metric.value}`}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </Metric>
                  ))}
                </MetricsRow>

                <TechLine>{tech.join(' · ')}</TechLine>

                <CardFooter>
                  {github && (
                    <CardActionExternal href={github} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </CardActionExternal>
                  )}
                  {external && (
                    <CardActionExternal href={external} target="_blank" rel="noreferrer">
                      Live ↗
                    </CardActionExternal>
                  )}
                </CardFooter>
              </CardBody>
            </ProjectCard>
          );
        })}
      </CardsGrid>
    </StyledProjectsSection>
  );
};

export default Projects;
