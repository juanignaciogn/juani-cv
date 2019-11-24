import React from 'react';
import ReactDOMServer from 'react-dom/server';


const renderMiddleware = (opt = {}) => {
    return (req, res, next) => {
        res.render = (Component, data = {}, done) => {
            res.header('Content-Type', 'text/html; charset=utf-8');
            
            const app = ReactDOMServer.renderToString(React.createElement(Component));
            
            const output = `
            <!DOCTYPE html><html lang="es-AR">
            <head></head>${app}</html>
            `;

            if (done) {
                return done(null, output);
              }
              return res.send(output);
        };
        next()
    };
};

export default renderMiddleware
