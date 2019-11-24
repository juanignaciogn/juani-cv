import React from 'react';

const Layout = ({ children }) => (
    <html>
        <head>
            <title></title>
        </head>
        <body>
            <div id="app-root"> {children }</div>
        </body>
    </html>
);

export default Layout
