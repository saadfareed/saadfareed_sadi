const featuredProjects = require('./data/projects');

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

  testimonials: [
    {
      quote:
        'Saad architected our payment and checkout backbone with exceptional attention to financial integrity. The Saga-based design reduced checkout latency by 35% while keeping PCI compliance airtight.',
      name: 'Engineering Lead',
      role: 'Platform Engineering',
      company: 'Foodie',
    },
    {
      quote:
        'He led our monolith-to-microservices migration with clear ownership across payments, orders, and promotions. The gRPC services he built still scale independently under peak traffic.',
      name: 'Senior Product Manager',
      role: 'Product',
      company: 'Foodie',
    },
    {
      quote:
        'Integrated AWS SQS into our crop health pipelines and cut database load by 25%. Saad profiles bottlenecks quickly and ships resilient backend systems.',
      name: 'Data Science Manager',
      role: 'Engineering',
      company: 'Agrilift',
    },
    {
      quote:
        'Ranked among the top Python developers globally — Saad brings deep distributed systems knowledge and delivers measurable impact on every project he owns.',
      name: 'Tech Lead',
      role: 'Backend Engineering',
      company: 'CodeViz Technologies',
    },
    {
      quote:
        'The unified refund system handles every cancellation edge case we threw at it. Finance finally trusts the ledger because every movement is auditable end to end.',
      name: 'Finance Operations Lead',
      role: 'Finance',
      company: 'Foodie',
    },
    {
      quote:
        'Sub-100ms search on our catalog while order writes never backed up — the polyglot database design was exactly what our scale required.',
      name: 'Staff Engineer',
      role: 'Infrastructure',
      company: 'Foodie',
    },
  ],

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
