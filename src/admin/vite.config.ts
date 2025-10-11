import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      host: true,
      allowedHosts: [
        'gg0kk40g444cw8cwkw4cg00s.obrobibini.com',
        'mechanico-strapi.stelgatelabs.com',
      ],
    },
  });
};