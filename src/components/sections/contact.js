import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email, resume, linkedin } from '@config';
import sr from '@utils/sr';
import { Section, Prose } from '@components/Section';

const StyledContactSection = styled(Section)`
  margin-bottom: 50px;
  width: 100%;
`;

const StyledContactInner = styled.div`
  width: 100%;
  text-align: left;

  ${Prose} {
    margin-top: 24px;
    max-width: 640px;
    text-align: left;
  }

  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
    gap: 40px;
    margin-top: 40px;
    width: 100%;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .hire-me {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
    margin-top: 32px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 0;
  }
`;

const FormCard = styled.form`
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--surface);

  h3 {
    margin: 0 0 24px;
    color: var(--heading);
    font-size: var(--fz-xl);
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .field {
    margin-bottom: 20px;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    background: var(--bg);
    color: var(--heading);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    transition: var(--transition);

    &:focus {
      border-color: var(--brand);
      outline: 0;
    }

    &::placeholder {
      color: color-mix(in srgb, var(--text) 70%, transparent);
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }

  button[type='submit'] {
    ${({ theme }) => theme.mixins.bigButton};
    width: 100%;
    margin-top: 8px;
    border: none;
    cursor: pointer;
  }

  .disclaimer {
    margin: 16px 0 0;
    color: var(--text);
    font-size: var(--fz-xs);
    text-align: center;
  }
`;

const budgetOptions = [
  'Select a range',
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
];

const Contact = () => {
  const revealContainer = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' });

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget || 'Not specified'}\n\n${form.message}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <StyledContactInner>
        <h2 className="numbered-heading">Get In Touch</h2>

        <div className="contact-layout">
          <div>
            <Prose>
              <p>
                I&apos;m open to senior backend and platform engineering roles, consulting engagements, and
                challenging distributed systems problems. Whether you&apos;re scaling payments, migrating to
                microservices, or building high-throughput pipelines — let&apos;s talk.
              </p>
            </Prose>

            <div className="hire-me">
              <a className="email-link" href={`mailto:${email}`}>
                Email Me
              </a>
              <a href={resume} className="email-link">
                Resume
              </a>
              <a href={linkedin} className="email-link">
                LinkedIn
              </a>
            </div>
          </div>

          <FormCard onSubmit={handleSubmit}>
            <h3>Start a Conversation</h3>

            <div className="field">
              <label htmlFor="contact-name">Your Name *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email Address *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-budget">Project Budget</label>
              <select id="contact-budget" name="budget" value={form.budget} onChange={handleChange}>
                {budgetOptions.map(option => (
                  <option key={option} value={option === 'Select a range' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project, tech stack, timeline, and what you need help with..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Send Message →</button>
            <p className="disclaimer">No spam. Your email is used only to reply to your inquiry.</p>
          </FormCard>
        </div>
      </StyledContactInner>
    </StyledContactSection>
  );
};

export default Contact;
