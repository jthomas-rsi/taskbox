import '../src/index.css'

// register Mock Service Worker _ MSW addon 
import { initialize, mswDecorator } from 'msw-storybook-addon';

//initialize the msw addon 
initialize();

//export decorators for global use
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
