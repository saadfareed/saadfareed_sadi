import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, introVideoUrl } from '@config';
import sr from '@utils/sr';
import { Section, Prose, LoomEmbed, LedgerFields, FieldRow } from '@components/ui';

const StyledAboutSection = styled(Section)``;

const StyledAboutGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $hasVideo }) => ($hasVideo ? '1.3fr 1fr' : '1fr')};
  gap: 50px;
  align-items: start;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledMainColumn = styled.div`
  min-width: 0;
  max-width: ${({ $hasVideo }) => ($hasVideo ? 'none' : 'var(--content-narrow)')};
`;

const StyledVideoColumn = styled.div`
  min-width: 0;
  position: sticky;
  top: calc(var(--nav-height) + 32px);

  @media (max-width: 900px) {
    position: static;
  }
`;

const skillFields = [
  {
    label: 'Languages & Frameworks',
    value: 'Python (Django, FastAPI), Node.js, Go, TypeScript, SQL',
  },
  { label: 'Backend', value: 'REST / gRPC, Microservices, SQS, MQTT, Redis' },
  { label: 'Databases', value: 'PostgreSQL, MongoDB, Cassandra, Elasticsearch, DynamoDB' },
  { label: 'DevOps', value: 'AWS (Lambda, SQS, EC2), Docker' },
  { label: 'Education', value: 'BS, Computer Science — UET Lahore (2018–2022)' },
];

const About = () => {
  const revealContainer = useRef(null);
  const hasVideo = Boolean(introVideoUrl);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <div className="ledger-heading">
        <span className="eyebrow">Profile</span>
        <h2 className="headline">About Me</h2>
      </div>

      <StyledAboutGrid $hasVideo={hasVideo}>
        <StyledMainColumn $hasVideo={hasVideo}>
          <Prose>
            <p>Hello! I&apos;m Saad Fareed, a Senior Backend Engineer based in Lahore, PK.</p>

            <p>
              I architect high-throughput, distributed systems and event-driven backends that serve
              millions of transactions. My work spans PCI DSS-compliant payment systems,
              multi-database architectures, real-time data pipelines, and monolith-to-microservices
              migrations across Python, Node.js, and Go.
            </p>

            <p>
              I&apos;ve shipped production systems at{' '}
              <a href="https://www.linkedin.com/in/saad-fareed/">
                Foodie, Agrilift, CodeViz, and OCloud Solutions
              </a>
              , collaborating with cross-functional teams in fast-paced engineering environments.
            </p>
          </Prose>
        </StyledMainColumn>

        {hasVideo && (
          <StyledVideoColumn>
            <LoomEmbed url={introVideoUrl} title="Saad Fareed — video introduction" />
          </StyledVideoColumn>
        )}
      </StyledAboutGrid>

      <LedgerFields>
        {skillFields.map(field => (
          <FieldRow key={field.label} label={field.label} value={field.value} labelWidth="220px" />
        ))}
      </LedgerFields>
    </StyledAboutSection>
  );
};

export default About;
