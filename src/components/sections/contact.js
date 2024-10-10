import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 50px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
  
  .info {
    text-align: justify;
  }
  
  .hire-me {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">Looking for Expertise?</h2>

      <h2 className="title">Hire Me</h2>

      <p className='info'> If you’re searching for a versatile software engineer who delivers 
        innovative and impactful solutions, you’ve come to the right place! 
        With years of experience in tackling complex problems with cutting-edge 
        technologies, I'm here to help your project succeed. 
        Whether it's a startup idea or a challenging software problem, 
        I’m ready to bring your vision to life. </p>

      <div className='hire-me'>
        <a className="email-link" href={`mailto:${email}`}>
          Let's Chat
        </a>
        <a href="https://www.upwork.com/freelancers/~013a7b947b3c849afd" className="email-link">
          Hire Me
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
