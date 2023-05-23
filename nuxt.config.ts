// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
const BACKEND_SERVER: string = process.env.BACKEND_SERVER;

export default defineNuxtConfig({
// @ts-ignore
  ssr: false,
  modules: [
    '@element-plus/nuxt',
    '@nuxt-alt/auth',
    '@pinia/nuxt',
  ],
  app: {
    head: {
      title: 'Nucleus',
      titleTemplate: '%s - Nucleus',
      meta: [
        {
          name: 'viewport', content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Nucleus, day-to-day activities management',
        },
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'stylesheet', type: 'text/css', href: '/assets/css/bootstrap-utilities.min.css'},
        {rel: 'stylesheet', type: 'text/css', href: '/assets/css/bootstrap-grid.min.css'},
      ],
    }
  },

  runtimeConfig: {
    public: {
      BACKEND_SERVER: BACKEND_SERVER
    }
  },

  css: [
    "~/assets/style.css"
  ],

  typescript: {
    strict: true,
    shim: false,
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },

  vite: {},

  auth: {
    // globalMiddleware: true,
    cookie: {
      options: {
        sameSite: 'lax'
      }
    },
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: BACKEND_SERVER,
        endpoints: {
          login: {
            url: '/api/v1/auth/login'
          },
          logout: {
            url: '/api/v1/auth/logout'
          },
          user: {
            url: '/api/v1/auth/me'
          }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    }
  },

  router: {
    options: {
      hashMode: true,
    }
  },

})
