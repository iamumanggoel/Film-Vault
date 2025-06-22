/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
}


/**
 * 
    Semantic Name           Example Tailwind Class	                       Description
    background	            bg-background	                                 Page background
    surface	                bg-surface	                                   Card background
    text	                  text-text	                                     Primary text
    muted	                  text-muted	                                   Secondary or subtitle text 
    primary                	text-primary, bg-primary	                     Branding highlights
    accent	                bg-accent	                                     Buttons, CTAs
    info	                  text-info, bg-info	                           Info banners 
    success	                text-success, bg-success	                     Success states 
    warning	                text-warning, bg-warning	                     Warning states
    danger	                text-danger, bg-danger	                       Errors, deletes 
 */