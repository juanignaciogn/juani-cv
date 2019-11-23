require('@babel/register')({
  ignore: ['node_modules']
});

const Server = require('./app/server').default;

new Server();
