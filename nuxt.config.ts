// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
const APP_NAME: string = process.env.APP_NAME;
// @ts-ignore
const BACKEND_SERVER: string = process.env.BACKEND_SERVER;
// @ts-ignore
const BACKEND_API_VERSION: string = process.env.BACKEND_API_VERSION;

console.log(`BACKEND: ${BACKEND_SERVER}`)

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
      title: APP_NAME,
      titleTemplate: `%s - ${APP_NAME}`,
      meta: [
        {
          name: 'viewport', content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: `${APP_NAME}, day-to-day activities management`,
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
      APP_NAME: APP_NAME,
      BACKEND_SERVER: BACKEND_SERVER,
      BACKEND_API_VERSION: BACKEND_API_VERSION,
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
            url: `/api/${BACKEND_API_VERSION}/auth/login`
          },
          logout: {
            url: `/api/${BACKEND_API_VERSION}/auth/logout`
          },
          user: {
            url: `/api/${BACKEND_API_VERSION}/auth/me`
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
