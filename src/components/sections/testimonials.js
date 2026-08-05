import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { testimonials, srConfig } from '@config';
import sr from '@utils/sr';
import { Section } from '@components/ui';

const AUTOPLAY_DELAY = 2000;

const getVisibleCount = () => {
  if (typeof window === 'undefined') {
    return 3;
  }
  if (window.innerWidth <= 600) {
    return 1;
  }
  if (window.innerWidth <= 960) {
    return 2;
  }
  return 3;
};

const StyledTestimonialsSection = styled(Section)`
  width: 100%;
`;

const TestimonialsShell = styled.div`
  margin-top: 8px;
  padding: clamp(20px, 4vw, 32px);
  border: 1px solid var(--border);
  background: var(--surface);
`;

const CarouselHeader = styled.div`
  ${({ theme }) => theme.mixins.flexBetween};
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
`;

const CarouselLabel = styled.p`
  margin: 0;
  color: var(--heading);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const ConfidentialityNote = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`;

const CarouselHint = styled.span`
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
`;

const DotNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DotButton = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '7px')};
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--stamp)' : 'var(--border)')};
  cursor: pointer;
  transition:
    width 0.3s var(--easing),
    background 0.3s var(--easing);

  &:hover,
  &:focus {
    background: var(--stamp);
    outline: 0;
  }
`;

const CarouselViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  align-items: stretch;
  will-change: transform;
  transition: ${({ $animate }) =>
    $animate ? 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)' : 'none'};
  transform: translateX(${({ $offset }) => `-${$offset}%`});
`;

const CarouselSlide = styled.div`
  flex: 0 0 ${({ $slideWidth }) => $slideWidth};
  display: flex;
  padding: 0 8px;
  box-sizing: border-box;
`;

const TestimonialCard = styled.blockquote`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 280px;
  margin: 0;
  padding: 24px;
  border: 1px solid var(--border-soft);
  background: var(--bg);
  transition: border-color 0.35s var(--easing);

  &:hover {
    border-color: var(--stamp);
  }
`;

const CardTop = styled.div`
  ${({ theme }) => theme.mixins.flexBetween};
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const QuoteMark = styled.span`
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 40px;
  line-height: 0.6;
  color: var(--text-muted);
`;

const CompanyLabel = styled.span`
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  padding-top: 8px;
`;

const QuoteText = styled.p`
  flex: 1;
  margin: 0;
  color: var(--text);
  font-size: var(--fz-md);
  font-style: normal;
  line-height: 1.7;
`;

const CardDivider = styled.div`
  height: 1px;
  margin: 24px 0 20px;
  background: var(--border-soft);
`;

const AuthorRow = styled.footer`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.span`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-alt);
  color: var(--text-muted);

  svg {
    width: 17px;
    height: 17px;
  }
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    color: var(--heading);
    font-size: var(--fz-sm);
    font-weight: 600;
  }

  span {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.4;
  }
`;

const Testimonials = () => {
  const revealContainer = useRef(null);
  const isResetting = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const slideWidth = `${100 / visibleCount}%`;
  const slidePercent = 100 / visibleCount;
  const loopSlides = [...testimonials, ...testimonials.slice(0, visibleCount)];
  const activeDot = activeIndex % testimonials.length;

  const advance = useCallback(() => {
    if (isResetting.current) {
      return;
    }
    setActiveIndex(prev => prev + 1);
  }, []);

  const goToSlide = index => {
    isResetting.current = false;
    setAnimate(true);
    setActiveIndex(index);
  };

  const handleTransitionEnd = () => {
    if (activeIndex >= testimonials.length) {
      isResetting.current = true;
      setAnimate(false);
      setActiveIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          isResetting.current = false;
        });
      });
    }
  };

  useEffect(() => {
    if (!sr) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = window.setInterval(advance, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isPaused, advance]);

  useEffect(() => {
    setActiveIndex(0);
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  }, [visibleCount]);

  return (
    <StyledTestimonialsSection id="testimonials" ref={revealContainer}>
      <div className="ledger-heading">
        <span className="eyebrow">References</span>
        <h2 className="headline">What Clients &amp; Colleagues Say</h2>
      </div>
      <p className="section-intro">
        Feedback from engineering leaders and collaborators across payments, platform, and
        distributed systems work.
      </p>

      <TestimonialsShell
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}>
        <CarouselHeader>
          <div>
            <CarouselLabel>Testimonials</CarouselLabel>
            <CarouselHint>
              {isPaused ? 'Paused · hover to read' : 'Auto-advancing carousel'}
            </CarouselHint>
            <ConfidentialityNote>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Names withheld to protect confidentiality — shared with permission
            </ConfidentialityNote>
          </div>

          <DotNav aria-label="Testimonial slides">
            {testimonials.map(({ name, company }, index) => (
              <DotButton
                key={`${name}-${company}`}
                type="button"
                $active={activeDot === index}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={activeDot === index ? 'true' : undefined}
                onClick={() => goToSlide(index)}
              />
            ))}
          </DotNav>
        </CarouselHeader>

        <CarouselViewport aria-label="Client and colleague testimonials carousel">
          <CarouselTrack
            $offset={activeIndex * slidePercent}
            $animate={animate}
            onTransitionEnd={handleTransitionEnd}>
            {loopSlides.map(({ quote, name, role, company }, index) => (
              <CarouselSlide key={`${name}-${company}-${index}`} $slideWidth={slideWidth}>
                <TestimonialCard cite={company}>
                  <CardTop>
                    <QuoteMark aria-hidden="true">&ldquo;</QuoteMark>
                    <CompanyLabel>{company}</CompanyLabel>
                  </CardTop>

                  <QuoteText>{quote}</QuoteText>

                  <CardDivider />

                  <AuthorRow>
                    <Avatar aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </Avatar>
                    <AuthorMeta>
                      <strong>{name}</strong>
                      <span>{role}</span>
                    </AuthorMeta>
                  </AuthorRow>
                </TestimonialCard>
              </CarouselSlide>
            ))}
          </CarouselTrack>
        </CarouselViewport>
      </TestimonialsShell>
    </StyledTestimonialsSection>
  );
};

export default Testimonials;
