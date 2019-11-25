import React from 'react';
import { shape } from 'prop-types';

const Layout = ({ children }) => (
  <body>
    <div id="app-root">
      {children}
    </div>
  </body>
);

Layout.propTypes = {
  children: shape().isRequired
};

Layout.defaultProps = {};

export default Layout;
