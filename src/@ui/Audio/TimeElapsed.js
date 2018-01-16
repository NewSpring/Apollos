import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { padStart } from 'lodash';
import { compose, getContext } from 'recompose';
import { UIText } from '@ui/typography';

class TimeElapsed extends PureComponent {
  static propTypes = {
    positionMillis: PropTypes.shape({
      addListener: PropTypes.func,
      removeListener: PropTypes.func,
    }),
  }

  constructor(...args) {
    super(...args);
    if (this.props.positionMillis) {
      this.listener = this.props.positionMillis.addListener(this.listen);
    }
  }

  state = {
    value: 0,
  };

  componentWillReceiveProps({ positionMillis }) {
    if (this.props.positionMillis !== positionMillis) {
      if (this.listener) this.props.positionMillis.removeListener(this.listener);
      positionMillis.addListener(this.listen);
    }
  }

  componentWillUnmount() {
    if (this.listener) this.props.positionMillis.removeListener(this.listener);
  }

  listen = ({ value }) => {
    if (!Number.isNaN(value)) this.setState({ value });
  }

  render() {
    const duration = moment.duration(this.state.value);
    return (
      <UIText>
        {duration.minutes()}:{padStart(duration.seconds(), 2, '0')}
      </UIText>
    );
  }
}

const enhance = compose(
  getContext({
    positionMillis: PropTypes.object,
  }),
);

export default enhance(TimeElapsed);
