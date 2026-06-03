const featuredProjects = require('./data/projects');
const testimonials = require('./data/testimonials');

module.exports = {
  email: 'saadfareedsadi@gmail.com',
  resume: '/saadfareed_SSE.pdf',
  github: 'https://github.com/saadfareed',
  linkedin: 'https://www.linkedin.com/in/saad-fareed',

  socialMedia: [
    { name: 'GitHub', url: 'https://github.com/saadfareed' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/saad-fareed' },
  ],

  navLinks: [
    { name: 'About', url: '/#about' },
    { name: 'Experience', url: '/#jobs' },
    { name: 'Projects', url: '/#projects' },
    { name: 'Contact', url: '/#contact' },
  ],

  heroKeywords: ['Python', 'Django', 'FastAPI', 'Node', 'React', 'Next'],

  colors: {
    primary: '#0a192f',
    secondary: '#64ffda',
  },

  featuredProjects,
  testimonials,

  srConfig: (delay = 100, viewFactor = 0.12) => ({
    origin: 'bottom',
    distance: '32px',
    duration: 800,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 0.98,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: -40, left: 0 },
  }),
};
