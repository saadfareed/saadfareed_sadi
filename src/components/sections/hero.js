import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email, resume, heroKeywords } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { LedgerFields, FieldRow } from '@components/ui';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: var(--content-max-width);
  padding-top: calc(var(--nav-height) + 56px);

  @media (max-width: 480px) {
    padding-top: calc(var(--nav-height) + 32px);
  }

  .letterhead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1.big-heading {
    margin: 44px 0 24px;
    max-width: 15ch;

    em {
      font-style: italic;
      font-weight: 500;
    }
  }

  .bio {
    max-width: 62ch;
    margin: 0;
    color: var(--text);
    font-size: var(--fz-lg);
    line-height: var(--text-line-height);

    strong {
      color: var(--heading);
      font-weight: 600;
    }
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 28px;
    margin-top: 40px;
  }

  .primary-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 0;
  }

  .secondary-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    border-bottom: 1px solid var(--border);
    padding-bottom: 2px;

    &:hover,
    &:focus {
      color: var(--heading);
      border-bottom-color: var(--heading);
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

  const fields = [
    { label: 'Account Holder', value: 'Saad Fareed' },
    { label: 'Role', value: 'Senior Backend Engineer' },
    { label: 'Period', value: '2022 — Present' },
    { label: 'Stack', value: heroKeywords.join(', ') },
  ];

  const items = [
    {
      content: (
        <p className="letterhead">
          <span>Statement of Record</span>
          <span>Lahore, PK — UTC+5</span>
        </p>
      ),
    },
    {
      content: (
        <LedgerFields>
          {fields.map(field => (
            <FieldRow key={field.label} label={field.label} value={field.value} />
          ))}
          <FieldRow label="Status" value="Available for new engagements" status />
        </LedgerFields>
      ),
    },
    {
      content: (
        <h1 className="big-heading">
          Backend systems built to be <em>trusted</em> with the money.
        </h1>
      ),
    },
    {
      content: (
        <p className="bio">
          I&apos;m <strong>Saad Fareed</strong>. I design the payment orchestration, audit trails,
          and distributed data systems that keep transactions honest at scale — currently shipping
          PCI-compliant checkout and refund infrastructure for a high-throughput order platform.
        </p>
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
          <a href={resume} className="secondary-link">
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
