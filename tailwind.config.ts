import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // blue: '#1E40AF',
        // crimson: '#DC143C',
        // sky: '#1E40AF',
        // zinc: '#F4F4F5',
      },
    },
  },
  plugins: [],
} satisfies Config;
