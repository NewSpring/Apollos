import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps, branch, withProps } from 'recompose';
import { times } from 'lodash';

import { Link } from '@ui/NativeWebRouter';
import { getLinkPath, getItemImages } from '@utils/content';
import { withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { H5 } from '@ui/typography';
import ThumbnailCard from '@ui/ThumbnailCard';

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    id: 'fakeId0',
    title: '',
    channelName: '',
    content: {
      images: [],
    },
    isLoading: true,
  });

  const loadingStateData = [];
  times(numberOfItems, (n) => {
    const newData = itemData();
    newData.id = `fakeId${n}`;
    loadingStateData.push(newData);
  });

  return loadingStateData;
};


const enhance = compose(
  pure,
  setPropTypes({
    content: PropTypes.array,
    sectionTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    renderItem: PropTypes.func,
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    sectionTitle: 'More Like This',
    content: [],
  }),
  branch(({ isLoading, content }) => (isLoading && !content.length), withProps({
    content: generateLoadingStateData(3),
  })),
  withThemeMixin(() => ({
    type: 'light',
  })),
);

const defaultItemRenderer = item => (
  <Link to={getLinkPath(item)} key={item.id}>
    <ThumbnailCard
      title={item.title}
      category={item.channelName}
      images={getItemImages(item)}
      isLoading={item.isLoading}
    />
  </Link>
);

const renderSectionTitle = (sectionTitle) => {
  if (typeof sectionTitle !== 'string') return sectionTitle;
  return (<Title>{sectionTitle}</Title>);
};

const Wrapper = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  backgroundColor: theme.colors.lightSecondary,
}))(View);

const Title = styled(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit,
}))(H5);

const RelatedContentWithoutData = enhance(({
  sectionTitle,
  renderItem = defaultItemRenderer,
  content,
  style,
}) => (
  <Wrapper style={style}>
    {sectionTitle ? renderSectionTitle(sectionTitle) : null}
    {content.map(renderItem)}
  </Wrapper>
));

export default RelatedContentWithoutData;
