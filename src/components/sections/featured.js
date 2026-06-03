import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { featuredProjects, srConfig } from '@config';
import sr from '@utils/sr';
import {
  Section,
  CardsGrid,
  ProjectCard,
  CardHeader,
  StatusLink,
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
  CardActionLink,
  CardActionExternal,
} from '@components/ui';

const StyledFeaturedSection = styled(Section)`
  width: 100%;
`;

const Featured = () => {
  const revealContainer = useRef(null);
  const revealCards = useRef([]);

  useEffect(() => {
    if (!sr) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
    revealCards.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeaturedSection id="projects" ref={revealContainer}>
      <h2 className="numbered-heading">Projects</h2>
      <p className="section-intro">
        Production work and case studies from high-throughput backend systems, payment platforms, and
        microservices migrations.
      </p>

      <CardsGrid>
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} ref={el => (revealCards.current[i] = el)}>
            <CardHeader>
              {project.external ? (
                <StatusLink href={project.external} target="_blank" rel="noreferrer">
                  <span className="dot" aria-hidden="true" />
                  {project.status}
                </StatusLink>
              ) : (
                <StatusBadge>
                  <span className="dot" aria-hidden="true" />
                  {project.status}
                </StatusBadge>
              )}
              <Year>{project.year}</Year>
            </CardHeader>

            <CardTitle>{project.title}</CardTitle>
            <CardTagline>{project.tagline}</CardTagline>
            <CardDescription>{project.description}</CardDescription>

            <MetricsGrid>
              {project.metrics.map(metric => (
                <Metric key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </Metric>
              ))}
            </MetricsGrid>

            <TechList>
              {project.tech.map(item => (
                <TechTag key={item}>{item}</TechTag>
              ))}
            </TechList>

            <CardFooter>
              <CardActionLink to={`/projects/${project.slug}`}>Case Study →</CardActionLink>
              {project.external && (
                <CardActionExternal href={project.external} target="_blank" rel="noreferrer">
                  Live ↗
                </CardActionExternal>
              )}
            </CardFooter>
          </ProjectCard>
        ))}
      </CardsGrid>
    </StyledFeaturedSection>
  );
};

export default Featured;
