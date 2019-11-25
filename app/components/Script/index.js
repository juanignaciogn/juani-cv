import React from 'react';
import { string, bool } from 'prop-types';
import withSideEffect from 'react-side-effect';
import ScriptBundler from './Bundler';


const Script = ({ children }) => (
  typeof children === 'string' ? React.createElement('script', null, children) : null
);

Script.propTypes = {
  src: string,
  inline: bool
};


const reducePropsToState = (propsList) => {
  const scripts = {};

  propsList.forEach((props) => {
    const {
      src,
      inline
    } = props;

      if (!scripts.hasOwnProperty(src)) { // eslint-disable-line
      scripts[src] = {
        src,
        inline
      };
    }
  });

  return scripts;
};

const handleStateChangeOnClient = () => null;

const mapStateOnServer = (scripts) => scripts;

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
  mapStateOnServer
)(Script);
export { ScriptBundler };
