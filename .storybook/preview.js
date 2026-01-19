import '../src/app/globals.css';

/** @type { import('@storybook/nextjs').Preview } */
const preview = {
  parameters: {
    viewport: {
      viewports: {
        mobile1: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet1: {
          name: 'iPad',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
