export const environment = {
  production: true,
  loggingLevel: 'OFF',
  cookies: {
    token: '__auth__',
    userId: '__userid__',
  },
  googleAnalyticsKey: 'UA-151027057-1',
};

/**
 * Do not add configuration to this file if possible
 * Instead add it to config.json file that gets loaded through APP_INITIALIZER;
 * and consume it through the configuration.service.ts
 */
