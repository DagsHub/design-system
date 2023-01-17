module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links', 
    '@storybook/addon-essentials', 
    '@storybook/addon-interactions', 
    '@storybook/addon-docs', 
    '@storybook/preset-scss'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  },
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: "webpack5",
  },
};