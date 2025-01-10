import { allThemes, defaultTheme, safeThemeList } from "./themes";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const themer = require("tailwindcss-themer");

const config: Config = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: safeThemeList,
  theme: {
  	extend: {
  		screens: {
  			ssm: '400px'
  		},
  		fontFamily: {
  			main: 'DM Sans'
  		},
  		keyframes: {
  			'loading-pin': {
  				'0%, 40%, 100%': {
  					height: '0.5em',
  					'background-color': '#282336'
  				},
  				'20%': {
  					height: '1em',
  					'background-color': 'white'
  				}
  			}
  		},
  		animation: {
  			'loading-pin': 'loading-pin 1.8s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
            video: {
                default: "hsl(var(--video-background))",
            }
  		}
  	}
  },
  plugins: [
    require("tailwind-scrollbar"),
    themer({
      defaultTheme: defaultTheme,
      themes: [
        {
          name: "default",
          selectors: [".theme-default"],
          ...defaultTheme,
        },
        ...allThemes,
      ],
    }),
    plugin(({ addVariant }) => {
      addVariant("dir-neutral", "[dir] &");
    }),
      require("tailwindcss-animate")
],
};

export default config;
