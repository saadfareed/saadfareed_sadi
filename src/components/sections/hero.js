import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Saad Fareed</h2>;
  const three = <h3 className="big-heading">I am a Business Problem Solver & Software Engineer.</h3>;
  const four = (
    <p>
      A Passionate Technology Enthusiast with Over 3 Years of Experience Driving Innovation and Delivering Tailored Solutions. 
      Expertly Merging Skills in Python, Django, FastAPI, LLM Models, React, Vue, Nuxt, TypeScript, AWS, Docker, NLP, and Data Analytics. 
      Proudly Recognized as One of the Top 50 Python Developers in Pakistan and Among the Top 2% Worldwide. Let’s Transform Ideas into Reality Together!
    </p>
  );
  const five = (
    <a href="https://www.upwork.com/freelancers/~013a7b947b3c849afd" className="email-link">
      Hire Me
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: `${i + 1}00ms`, textAlign: i === 3 ? 'justify' : 'initial'}}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};

export default Hero;
