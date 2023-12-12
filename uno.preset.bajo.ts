import type { Preset } from 'unocss'
import chroma from 'chroma-js'

const fontSize = {
  'xs': 0.75,
  'sm': 0.875,
  'base': 1,
  'lg': 1.25,
  'xl': 1.5,
  '2xl': 2,
  '3xl': 2.5,
  '4xl': 2.875,
  '5xl': 3,
}

const sizes = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
}

function getGradient(from: string, to: string, orientation = '180deg') {
  const colors = chroma
    .scale([from, to])
    .mode('lch')
    .domain([0, 100])
    .colors(10)

  const gradient = colors
    .reduce((acc: string[], color: string, index: number) => {
      acc.push(`${color} ${index * 10}%`)
      return acc
    }, [])
    .join(', ')

  return `linear-gradient(${[orientation, gradient].join(', ')})`
}

export default function presetBajoTheme(): Preset {
  return {
    name: 'bajo-preset',
    theme: {
      colors: {
        beige: {
          50: '#FBF9F4',
          100: '#F6F0E5',
          200: '#F0E6D3',
          300: '#E9DCC1',
          400: '#E5D5B4',
          500: '#E0CDA7',
          600: '#DCC89F',
          700: '#D8C196',
          800: '#D3BA8C',
          900: '#CBAE7C',
          A100: '#FFFFFF',
          A200: '#FFFFFF',
          A400: '#FFF7EA',
          A700: '#FFEED0',
        },
        green: {
          50: '#EAEDEA',
          100: '#CAD1CB',
          200: '#A6B3A8',
          300: '#829585',
          400: '#687E6A',
          500: '#4D6750',
          600: '#465F49',
          700: '#3D5440',
          800: '#344A37',
          900: '#253927',
          A100: '#83FF91',
          A200: '#50FF63',
          A400: '#1DFF36',
          A700: '#03FF1',
        },
        black: {
          50: '#E1E2E2',
          100: '#B4B6B7',
          200: '#838688',
          300: '#515658',
          400: '#2B3134',
          500: '#060D10',
          600: '#050B0E',
          700: '#04090C',
          800: '#030709',
          900: '#020305',
          A100: '#4D4DFF',
          A200: '#1A1AFF',
          A400: '#0000E6',
          A700: '#0000CD',
        },
      },
      fontSize: Object.entries(fontSize).reduce((acc: any, [key, value]) => {
        acc[key] = [`${value}rem`, `${value + 0.125}rem`]
        return acc
      }, {}),
    },
    rules: [
      // [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
      [
        /^gradient-([a-z]+)-?(hover)?$/,
        ([_, name, isHover]) => {
          if (name === 'green') {
            const gradient
              = isHover === 'hover'
                ? getGradient('#3D5440', '#253927')
                : getGradient('#4D6750', '#3D5440')
            return {
              'background-image': `${gradient}`,
            }
          }

          if (name === 'greendark') {
            return {
              'background-image': getGradient('#4D6750', '#253927'),
            }
          }

          if (name === 'bajo') {
            return {
              'background-image': getGradient('#E0CDA7', '#4D6750'),
            }
          }

          return {}
        },
      ],
    ],
    variants: [],
    shortcuts: [
      // typography
      {
        'text-gradient': 'bg-clip-text text-transparent',
        'p-section': 'py-8 md:py-24',
      },

      // containers
      {
        'border-container': 'border-1 border-grey-100 rounded-lg',
      },

      // buttons
      {
        'btn-disabled': 'disabled:pointer-events-none',
        'btn-animation': 'active:hover:scale-95 active:hover:transition active:focus:scale-95 active:focus:transition',
        'btn-hover': 'hover:bg-opacity-90 hover:transition hover:duration-200',
        'btn': 'rounded-2 inline-flex btn-md btn-glass btn-hover shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center btn-animation whitespace-nowrap text-ellipsis',
        'btn-primary': 'btn gradient-green text-white',
        'btn-glass': 'bg-black-500/20 dark:bg-white/20',
        'btn-primary-dark': 'btn gradient-greendark text-white',
      },
      [/^btn-(xs|sm|md|lg|xl)$/, ([, size]) => {
        const sizeNum = sizes[size as keyof typeof sizes]
        return `h-${sizeNum} min-h-[${(sizeNum / 4).toFixed(1)}rem] px-${(sizeNum / 3).toFixed(0)} text-${size === 'md' ? 'base' : size}`
      }],

      // forms
      {
        'form-input': 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm',
      },
    ],
  }
}
