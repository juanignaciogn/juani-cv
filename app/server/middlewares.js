import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

export default [
  compression(),
  helmet({
    frameguard: false,
    dnsPrefetchControl: {
      allow: true
    }
  }),
  bodyParser.urlencoded({
    limit: '100kb',
    extended: true
  }),
  bodyParser.json({
    limit: '100kb'
  }),
  bodyParser.raw({
    limit: '100kb'
  }),
  cookieParser(),
  hpp()
];
