import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import purgecss from '@fullhuman/postcss-purgecss'

const isProd = process.env.NODE_ENV === 'production'

export default {
  plugins: [
    autoprefixer,
    ...(isProd
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.js'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: ['show', 'collapsing', 'scrolled', 'active'],
              patterns: [/^aos-/, /^swiper-/, /^navbar-/],
            },
          }),
          cssnano({ preset: 'default' }),
        ]
      : []),
  ],
}
