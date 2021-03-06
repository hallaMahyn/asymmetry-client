export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Asymmetry-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' }
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/Main.css'

  ],
  router: {
    base: '/chatApp/'
  },

  axios: {
    baseUrl: 'http://localhost:4000',
    proxy: true
  },

  proxy: {
    '/api/': {
      target: process.env.NODE_ENV === 'production' ? 'http://23.105.248.11:4003' : 'http://localhost:4000'
    },
    '/admin/': {
      target: process.env.NODE_ENV === 'production' ? 'http://23.105.248.11:4003' : 'http://localhost:4000'
    }
  },


  toast: {
    position: 'bottom-right',
    duration: 1500,
    className: ['customToast'],
    // containerClass: ['customToast']
  },


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
