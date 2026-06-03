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

const getInitials = name =>
  name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const StyledTestimonialsSection = styled(Section)`
  width: 100%;
`;

const TestimonialsShell = styled.div`
  margin-top: 8px;
  padding: clamp(20px, 4vw, 32px);
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);
  box-shadow: 0 10px 30px -20px var(--shadow);
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
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const CarouselHint = styled.span`
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  opacity: 0.75;
`;

const DotNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DotButton = styled.button`
  width: ${({ $active }) => ($active ? '28px' : '8px')};
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? 'var(--brand)' : 'color-mix(in srgb, var(--text) 25%, transparent)'};
  cursor: pointer;
  transition: width 0.3s var(--easing), background 0.3s var(--easing);

  &:hover,
  &:focus {
    background: var(--brand);
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
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 280px;
  margin: 0;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--bg);
  transition: transform 0.35s var(--easing), border-color 0.35s var(--easing);

  &:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--brand) 45%, var(--border));
  }
`;

const CardTop = styled.div`
  ${({ theme }) => theme.mixins.flexBetween};
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
`;

const QuoteIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--brand) 16%, transparent);
  color: var(--brand);
  font-family: Georgia, serif;
  font-size: 28px;
  line-height: 1;
`;

const CompanyBadge = styled.span`
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--brand) 40%, var(--border));
  border-radius: 999px;
  color: var(--secondary);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  white-space: nowrap;
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
  background: var(--border);
`;

const AuthorRow = styled.footer`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.span`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--brand) 22%, var(--surface));
  color: var(--heading);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 600;
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
    color: var(--text);
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
      <h2 className="numbered-heading">What Clients &amp; Colleagues Say</h2>
      <p className="section-intro">
        Feedback from engineering leaders and collaborators across payments, platform, and distributed systems work.
      </p>

      <TestimonialsShell
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}>
        <CarouselHeader>
          <div>
            <CarouselLabel>Testimonials</CarouselLabel>
            <CarouselHint>{isPaused ? 'Paused · hover to read' : 'Auto-advancing carousel'}</CarouselHint>
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
                    <QuoteIcon aria-hidden="true">&ldquo;</QuoteIcon>
                    <CompanyBadge>{company}</CompanyBadge>
                  </CardTop>

                  <QuoteText>{quote}</QuoteText>

                  <CardDivider />

                  <AuthorRow>
                    <Avatar aria-hidden="true">{getInitials(name)}</Avatar>
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
