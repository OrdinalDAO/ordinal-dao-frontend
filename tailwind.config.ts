import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'neutral': {
	50: '#FBFBFC',
	100: '#F8F8F8',
	200: '#E8E7EA',
	300: '#DCDBE0',
	400: '#D0D0D5',
	500: '#B1B0B9',
	600: '#82808F',
	700: '#565560',
	800: '#2B2A30',
	900: '#161518'
      },
      'primary': {
	50: '#F7EBFF',
	100: '#D5ADF0',
	200: '#C084E8',
	300: '#AC5CE0',
	400: '#9733D9',
	500: '#820AD1',
	600: '#6C08AE',
	700: '#57078B',
	800: '#410568',
	900: '#2B0346'
      },
      'secondary': {
	50: '#F2F7D5',
	100: '#EAF2BA',
	200: '#DFEB97',
	300: '#D5E474',
	400: '#CADE52',
	500: '#C0D72F',
	600: '#A0B327',
	700: '#808F1F',
	800: '#606B17',
	900: '#404810'
      },
      'success': {
	50: '#F0FDF4',
	100: '#DCFCE7',
	200: '#BBF7D0',
	300: '#86EFAC',
	400: '#4ADE80',
	500: '#22C55E',
	600: '#16A34A',
	700: '#15803D',
	800: '#166534',
	900: '#03160B'
      },
      'warning': {
	50: '#FFFBEB',
	100: '#FEF3C7',
	200: '#FDE68A',
	300: '#FCD34D',
	400: '#FBBF24',
	500: '#F59E0B',
	600: '#D97706',
	700: '#B45309',
	800: '#92400E',
	900: '#78350F'
      },
      'destructive': {
	50: '#FEF2F2',
	100: '#FEE2E2',
	200: '#FECACA',
	300: '#FCA5A5',
	400: '#F87171',
	500: '#EF4444',
	600: '#DC2626',
	700: '#B91C1C',
	800: '#991B1B',
	900: '#7F1D1D'
      },
      'dark-mode': {
	50: '#F2F7D5',
	100: '#EAF2BA',
	200: '#38373F',
	300: '#D5E474',
	400: '#313039',
	500: '#2D2B34',
	600: '#A0B327',
	700: '#808F1F',
	800: '#24222B',
	900: '#181620'
      },
      'neutral-light': {
	400: '#727880',
	500: '#1B1D1F'
      },
      'origin-green': {
	100: '#E6F9EF',
	500: '#7DC066'
      },
      'black': '#121212',
      'white': '#FFFFFF'
    }
  },
  plugins: [],
}
export default config
