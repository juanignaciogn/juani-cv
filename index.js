require('@babel/register')({
  ignore: ['node_modules']
});

const Server = require('./app/server').default;

module.exports = new Server();
