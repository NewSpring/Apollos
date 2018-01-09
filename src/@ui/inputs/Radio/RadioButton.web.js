import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withContext } from 'recompose';
import get from 'lodash/get';
import {
  UIText,
} from '@ui/typography';

class RadioInput extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    label: '',
  };

  render() {
    return (
      <Fragment>
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
        />
        <UIText>{this.props.label}</UIText>
      </Fragment>
    );
  }
}

const enhance = withContext({
  name: PropTypes.string,
}, ({ name, ownProps }) => ({
  name: name || get(ownProps, 'name'),
}));

export default enhance(RadioInput);
