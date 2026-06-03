import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email, resume, heroKeywords } from '@config';
import { navDelay, loaderDelay } from '@utils';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: var(--content-max-width);
  padding-top: var(--nav-height);

  .status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    color: var(--secondary);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;

    span.dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--brand);
      box-shadow: 0 0 12px color-mix(in srgb, var(--brand) 60%, transparent);
    }
  }

  h1.big-heading {
    margin: 0;
    line-height: 1.05;

    .accent {
      color: var(--secondary);
    }
  }

  .bio {
    max-width: 640px;
    margin: 28px 0 0;
    color: var(--text);
    font-size: var(--fz-lg);
    line-height: var(--text-line-height);

    strong {
      color: var(--heading);
      font-weight: 600;
    }
  }

  .keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .keyword {
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--heading);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin-top: 48px;
  }

  .primary-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 0;
  }

  .secondary-link {
    ${({ theme }) => theme.mixins.smallButton};
    margin: 0;
    padding: 16px 28px;
    font-size: var(--fz-sm);
  }

  .resume-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: 8px;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover,
    &:focus {
      color: var(--secondary);
    }
  }
`;

const HeroItem = styled.div`
  transition-delay: ${({ $delay }) => $delay};

  &.fadeup-enter,
  &.fadeup-enter-active {
    transition-delay: ${({ $delay }) => $delay};
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    {
      content: (
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Available for opportunities
        </p>
      ),
    },
    {
      content: (
        <h1 className="big-heading">
          Backend <span className="accent">Developer.</span>
          <br />
          Full-Stack Ready.
        </h1>
      ),
    },
    {
      content: (
        <p className="bio">
          Hi, I&apos;m <strong>Saad Fareed</strong> — I architect{' '}
          <strong>microservices</strong>, ship <strong>full-stack apps</strong>, and build{' '}
          <strong>products people actually use</strong>. From startups to scale-ups, I deliver
          systems built to <strong>last and scale</strong>.
        </p>
      ),
    },
    {
      content: (
        <div className="keywords">
          {heroKeywords.map(keyword => (
            <span key={keyword} className="keyword">
              {keyword}
            </span>
          ))}
        </div>
      ),
    },
    {
      content: (
        <div className="hero-actions">
          <a href="/#projects" className="primary-link">
            View Projects →
          </a>
          <a href={`mailto:${email}`} className="secondary-link">
            Hire Me
          </a>
          <a href={resume} className="resume-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      ),
    },
  ];

  return (
    <StyledHeroSection>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              <HeroItem $delay={`${(i + 1) * 100}ms`}>{item.content}</HeroItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};

export default Hero;
