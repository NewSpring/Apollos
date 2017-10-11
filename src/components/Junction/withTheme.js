import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function withTheme() {
  return function (OriginalComponent) {
    return class Extended extends Component {
      static contextTypes = {
        theme: PropTypes.shape({
          primaryColor: PropTypes.string,
          secondaryColor: PropTypes.string,
        }),
      };

      render() {
        return <OriginalComponent theme={this.context.theme} {...this.props} />;
      }
    };
  };
}



