import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { compose, setPropTypes } from 'recompose';
import HTMLView from '@ui/HTMLView';
import Spacer from '@ui/Spacer';

import Item from './Item';

const copyright = '<h7>Scripture taken from The Holy Bible, English Standard Version. Copyright &copy;2001 by <a href="http://www.crosswaybibles.org">Crossway Bibles</a>, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Text provided by the <a href="http://www.gnpcb.org/esv/share/services/">Crossway Bibles Web Service</a><h7>';

const enhance = compose(
  setPropTypes({
    references: PropTypes.arrayOf(PropTypes.string), // bible queries to show, like "Genesis 1:5-10"
  }),
);

const Scripture = enhance(({ references = [] }) => (
  <View>
    {references.map(ref => <Item query={ref} key={ref} />)}
    <Spacer byHeight />
    <HTMLView>{copyright}</HTMLView>
  </View>
));

export default Scripture;
