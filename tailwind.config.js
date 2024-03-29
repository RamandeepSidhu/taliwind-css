/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js" 

  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      willChange: {
        "left-top": "left, top",
      },
      animation: {
        'marquee': 'marquee var(--marquee-duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--marquee-duration) linear infinite',
      },
      keyframes: {
        marquee: {
          '100%': { transform: 'translateX(-50%)' }
        },
        "marquee-vertical": {
          '100%': { transform: 'translateY(-50%)' }
        }
      }
    
    },
    container: {
      center: true,
      padding: "2rem",
      spacing: {
        11: "2.75rem",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        footer: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/dist/plugin.cjs", "@tailwindcss/typography", "@tailwindcss/forms", "@tailwindcss/container-queries",'flowbite/plugin'),
  ],
};
