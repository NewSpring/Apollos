import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps, branch, withProps } from 'recompose';
import { get, times } from 'lodash';

import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
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
    excludedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.array,
    sectionTitle: PropTypes.string,
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

const getItemImages = (item) => {
  let images = get(item, 'content.images', []);
  if (!images.length) images = get(item, 'parent.content.images', [{}]);
  return images[0].url; // TODO short circuit. Highliner should handle image selection in the array
};

const renderItems = (content = []) => (
  content.map(item => (
    <Link to={getLinkPath(item)} key={item.id}>
      <ThumbnailCard
        title={item.title}
        category={item.channelName}
        image={getItemImages(item)}
        isLoading={item.isLoading}
      />
    </Link>
  ))
);

const Wrapper = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  backgroundColor: theme.colors.lightSecondary,
}))(View);

const Title = styled(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.sizing.baseUnit / 2,
}))(H5);

const RelatedContentWithoutData = enhance(({
  sectionTitle,
  content,
}) => (
  <Wrapper>
    <Title>{sectionTitle}</Title>
    {renderItems(content)}
  </Wrapper>
));

export default RelatedContentWithoutData;
