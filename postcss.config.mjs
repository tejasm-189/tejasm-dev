import UnoCSS from '@unocss/postcss';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  plugins: [
    UnoCSS({
      configOrPath: resolve(__dirname, 'uno.config.ts'),
    }),
  ],
};

export default config;
