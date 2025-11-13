import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#F87171',
        success: '#34D399',
        background: '#F3F4F6',
        cardBackground: '#FFFFFF',
        textPrimary: '#1F2937',
        textSecondary: '#4B5563',
        textOnPrimary: '#FFFFFF',
        warning: '#FBBF24',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
} satisfies Config;