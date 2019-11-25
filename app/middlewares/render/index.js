import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HeadSync from 'react-declarative-head';
import Style, { StyleBundler } from '../../components/Style';
import Script, { ScriptBundler } from '../../components/Script';


const renderMiddleware = (opt = {}) => (req, res, next) => {
  res.render = (Component, data = {}, done) => {
    res.header('Content-Type', 'text/html; charset=utf-8');

    const app = ReactDOMServer.renderToString(React.createElement(Component));

    const headBundler = Promise.resolve(HeadSync.rewind());
    const scriptBundler = Promise.resolve(ScriptBundler(Script));
    const styleBundler = Promise.resolve(StyleBundler(Style));

    return Promise.all([
      headBundler,
      styleBundler,
      scriptBundler
    ])
      .then((bundles) => {
        const headSync = bundles[0];
        const styles = bundles[1];
        const scripts = bundles[2];
        const output = `
                <!DOCTYPE html>
                <html lang="es-AR">
                    <head>
                        ${headSync}
                        ${styles}
                    </head>
                    ${app}
                    ${scripts}
                </html>
                `;

        if (done) {
          return done(null, output);
        }

        return res.send(output);
      })
      .catch((err) => {
        throw err;
      });
  };
  next();
};

export default renderMiddleware;
