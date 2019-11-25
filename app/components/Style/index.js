import StyleBundler from './Bundler';
import React from 'react';
import { string, bool } from 'prop-types';
import withSideEffect from 'react-side-effect';


const Style = ({ children }) => (
    typeof children === 'string' ? React.createElement('style', null, children) : null
)

Style.propTypes = {
    href: string,
    inline: bool
};


const reducePropsToState = (propsList) => {
    const styles = {};
  
    propsList.forEach((props) => {
      const {
        href,
        inline
      } = props;
  
      if (!styles.hasOwnProperty(href)) { // eslint-disable-line
        styles[href] = {
          href,
          inline
        };
      }
    });
  
    return styles;
}

const handleStateChangeOnClient = () => null;

const mapStateOnServer = styles => styles;

export default withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer)(Style);
export { StyleBundler };
