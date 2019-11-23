/**
 * Environment variables
 */
const variables = process.env;

/**
 * env (we take the process.env variables and we add some custom shortcuts)
 */
const env = {
  ...variables,
  PRODUCTION: variables.NODE_ENV === 'production',
  DEVELOPMENT: variables.NODE_ENV === 'development',
  TEST: variables.NODE_ENV === 'test',
  SECURE: variables.NODE_ENV !== 'production' && variables.NODE_HTTPS === 'true'
};

/**
 * Expose env
 */
module.exports = env;
