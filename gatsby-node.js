const path = require('path');
const featuredProjects = require('./src/data/projects');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@lib': path.resolve(__dirname, 'src/lib'),
      },
    },
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/project.js');

  featuredProjects.forEach(project => {
    createPage({
      path: `/projects/${project.slug}`,
      component: template,
      context: { slug: project.slug },
    });
  });
};
