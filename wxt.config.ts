import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Word Guessing App',
    description: 'Guess the 5 letter english word!',
    version: '1.0.0',
  }
});
