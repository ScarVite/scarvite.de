module.exports = {
  /*
  ** Customizing Port for dev Build
  */
  env: {
    devMode: true,
  },
  server: {
    port: 3001,
  },
  /*
  ** Enabling Dev Tools
  */
  /*vue: {
    config: {
      productionTip: false,
      devtools: true //Ist noch Verbuggt, muss ich noch fixen
    }
  },*/
  /*
  ** Enabling Google Analytics
  */
  plugins: [
    { src: '~plugins/google-analytics.js', mode: 'client' }
  ],
  /*
  ** Add FAS config
  */
  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: true
    },
  },
  /*
  ** Adding The Required Modules
  */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
  ],
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/svg',
    '@nuxtjs/fontawesome'
  ],
  /*
 ** Adding Auth Settings
 */
  auth: {
    // Options
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.scarvite.de/graphql',
      }
    }
  },
  /*
  ** Adding Main Css/ Scss
  */
  css: [
    '@/css/main.css'
  ],
  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'ScarVite.de',
    author: 'ScarVite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'ScarVite Portfolio' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*'
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

