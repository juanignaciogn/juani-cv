/**
 * Module dependencies
 */
import express from 'express';
import cluster from 'cluster';
import fs from 'fs';
import http from 'http';
import https from 'https';
import os from 'os';
import middlewares from './middlewares';
import { SECURE, PRODUCTION } from './env';
import config from '../../config';
import appRouter from './router';

const numCPUs = os.cpus().length;

class Server {
  constructor() {
    /**
     * Merge defaults with the given config
     */
    this.config = config;

    /**
     * Create express instance
     */
    this.app = express();

    /**
     * Set express trust proxy
     */
    this.app.set('trust proxy', true);

    /**
     * Ping route
     */
    this.app.get('/ping', (req, res) => res.status(200).send('pong'));


    /**
     * App Routes
     */
    if (appRouter) {
      this.app.use(express.static(this.config.server.static));
      this.app.use(
        this.config.basePath,
        middlewares,
        appRouter,
      );
    }

    /**
     * Run Server
     */
    if (PRODUCTION) {
      this.cluster();
    } else {
      this.startDev();
    }
  }

  /**
   * Start server
   */
  start() {
    const { port, host } = this.config.server;
    this.server = http.createServer(this.app).listen(port, host, () => {
      console.info(`App listening on port ${port}.`);
    });

    return this;
  }

  /**
   * Start dev server
   */
  startDev() {
    let port;

    // Creates https server
    if (SECURE) {
      port = this.config.server.securePort;
      const options = {
        key: fs.readFileSync(`${__dirname}/../../config/ssl/key.pem`),
        cert: fs.readFileSync(`${__dirname}/../../config/ssl/cert.pem`)
      };
      this.server = https.createServer(options, this.app);

    // Creates http server
    } else {
      port = this.config.server.port; // eslint-disable-line prefer-destructuring
      this.server = http.createServer(this.app);
    }

    // Configure server port and host
    this.server.listen(port, this.config.server.host, () => {
      console.info(`App listening on port ${port}.`);
    });

    return this;
  }

  /**
   * Stop server
   */
  stop() {
    this.server.close();

    return this;
  }

  /**
   * Use cluster to start server
   */
  cluster() {
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
      }

      cluster.on('online', (worker) => {
        console.info(`Worker ${worker.process.pid} is online`);
      });

      cluster.on('exit', (worker) => {
        console.info(`Worker ${worker.process.pid} died`);
        console.info('Starting a new worker');
        cluster.fork();
      });
    } else {
      this.start();
    }

    return this;
  }
}

export default Server;
