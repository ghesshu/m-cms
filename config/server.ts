export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // 👇 Add this so Strapi trusts proxy headers (important for HTTPS setups)
  proxy: {
    enabled: true, // tells Strapi to trust 'X-Forwarded-*' headers
    koa: true,     // needed for Koa to process secure cookies correctly
  },

  app: {
    keys: env.array('APP_KEYS'),
  },

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});

// export default ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
// });
