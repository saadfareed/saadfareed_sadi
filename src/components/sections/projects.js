import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Section } from '@components/Section';
import {
  CardsGrid,
  ProjectCard,
  CardHeader,
  StatusBadge,
  Year,
  CardTitle,
  CardTagline,
  CardDescription,
  MetricsGrid,
  Metric,
  TechList,
  TechTag,
  CardFooter,
  CardActionExternal,
} from '@components/ProjectCard';

const StyledProjectsSection = styled(Section)`
  width: 100%;
`;

const stripHtml = html =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const buildMetrics = (tech = [], year) => {
  const metrics = [
    { value: year, label: 'Year' },
    { value: 'Open Source', label: 'Type' },
  ];

  tech.slice(0, 2).forEach((item, index) => {
    metrics.push({ value: item, label: index === 0 ? 'Primary Stack' : 'Tools' });
  });

  while (metrics.length < 4) {
    metrics.push({ value: 'Public', label: 'Availability' });
    break;
  }

  return metrics.slice(0, 4);
};

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
      <h2 className="numbered-heading">Open Source</h2>
      <p className="section-intro">
        Public repositories, CLI tools, and community projects — maintained for developers and shared on GitHub.
      </p>

      <CardsGrid>
        {projects.map((node, i) => {
          const { frontmatter, html } = node;
          const { github, external, title, tech = [], date, company } = frontmatter;
          const year = date ? String(new Date(date).getFullYear()) : '—';
          const description = stripHtml(html);
          const metrics = buildMetrics(tech, year);

          return (
            <ProjectCard key={title} ref={el => (revealCards.current[i] = el)}>
              <CardHeader>
                <StatusBadge>
                  <span className="dot" aria-hidden="true" />
                  Open Source
                </StatusBadge>
                <Year>{year}</Year>
              </CardHeader>

              <CardTitle>{title}</CardTitle>
              <CardTagline>{company || 'Community Project'}</CardTagline>
              <CardDescription>{description}</CardDescription>

              <MetricsGrid>
                {metrics.map(metric => (
                  <Metric key={`${metric.label}-${metric.value}`}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </Metric>
                ))}
              </MetricsGrid>

              <TechList>
                {tech.map(item => (
                  <TechTag key={item}>{item}</TechTag>
                ))}
              </TechList>

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
            </ProjectCard>
          );
        })}
      </CardsGrid>
    </StyledProjectsSection>
  );
};

export default Projects;
