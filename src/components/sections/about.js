import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Section, Prose } from '@components/ui';

const StyledAboutSection = styled(Section)``;

const StyledMainColumn = styled.div`
  min-width: 0;
`;

const StyledSkills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 40px;
  width: 100%;
  margin-top: 48px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SkillGroup = styled.div`
  h4 {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 8px;
      padding-left: 18px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      line-height: 1.5;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 1.2;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  width: 100%;
  max-width: 260px;

  @media (max-width: 768px) {
    max-width: 280px;
    margin-top: 8px;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--image-overlay);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const StyledEducation = styled.div`
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--lightest-navy);

  h4 {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-md);
    font-weight: 600;
  }

  p {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-sm);
    line-height: var(--text-line-height);
  }

  .range {
    margin-top: 4px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const skillGroups = [
  {
    title: 'Languages & Frameworks',
    items: ['Python (Django, FastAPI)', 'Node.js', 'Go', 'TypeScript', 'SQL'],
  },
  {
    title: 'Backend',
    items: ['REST / gRPC', 'Microservices', 'SQS', 'MQTT', 'Redis'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Cassandra', 'Elasticsearch', 'DynamoDB'],
  },
  {
    title: 'DevOps',
    items: ['AWS (Lambda, SQS, EC2)', 'Docker'],
  },
];

const About = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <StyledMainColumn>
          <Prose>
            <p>Hello! I&apos;m Saad Fareed, a Senior Backend Engineer based in Lahore, PK.</p>

            <p>
              I architect high-throughput, distributed systems and event-driven backends that serve millions of
              transactions. My work spans PCI DSS-compliant payment systems, multi-database architectures, real-time
              data pipelines, and monolith-to-microservices migrations across Python, Node.js, and Go.
            </p>

            <p>
              I&apos;ve shipped production systems at{' '}
              <a href="https://www.linkedin.com/in/saad-fareed/">Foodie, Agrilift, CodeViz, and OCloud Solutions</a>,
              collaborating with cross-functional teams in fast-paced engineering environments.
            </p>
          </Prose>

          <StyledEducation>
            <h4>University of Engineering and Technology, Lahore</h4>
            <p>Bachelor of Science in Computer Science</p>
            <p className="range">2018 – 2022</p>
          </StyledEducation>
      </StyledMainColumn>

      {/* Profile photo temporarily hidden
      <StyledPic className="profile-photo">
        <div className="wrapper">
          <Img fluid={data.avatar.childImageSharp.fluid} alt="Saad Fareed" className="img" />
        </div>
      </StyledPic>
      */}

      <StyledSkills>
        {skillGroups.map(({ title, items }) => (
          <SkillGroup key={title}>
            <h4>{title}</h4>
            <ul>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SkillGroup>
        ))}
      </StyledSkills>
    </StyledAboutSection>
  );
};

export default About;
