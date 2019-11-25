const variables = process.env;

const env = {
  ...variables,
  PRODUCTION: variables.NODE_ENV === 'production',
  DEVELOPMENT: variables.NODE_ENV === 'development',
  TEST: variables.NODE_ENV === 'test',
  SECURE: variables.NODE_ENV !== 'production' && variables.NODE_HTTPS === 'true'
};

module.exports = env;
