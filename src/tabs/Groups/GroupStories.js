import React from 'react';
import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import ThumbnailCard from '@ui/ThumbnailCard';
import PaddedView from '@ui/PaddedView';
import withTaggedContent from '@data/withTaggedContent';
import FeedItemCard from '@ui/FeedItemCard';
import { Link } from '@ui/NativeWebRouter';
import { getLinkPath, getItemImages, getItemBgColor, getItemIsLight } from '@utils/content';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import { H4 } from '@ui/typography';
import styled from '@ui/styled';
import HTMLView from '@ui/HTMLView';

const Title = styled({ textAlign: 'center', width: '100%' })(H4);

const renderMobileItem = item => (
  <Link to={getLinkPath(item)} key={item.id}>
    <FeedItemCard
      id={item.id}
      title={item.title}
      category={item.category || ''}
      images={getItemImages(item)}
      backgroundColor={getItemBgColor(item)}
      isLight={getItemIsLight(item)}
      isLoading={item.isLoading}
      isLiked={get(item, 'content.isLiked', false)}
    />
  </Link>
);

const renderWebItem = item => (
  <Link to={getLinkPath(item)} key={item.id}>
    <ThumbnailCard
      title={item.title}
      category={item.channelName}
      images={getItemImages(item)}
      isLoading={item.isLoading}
    >
      <HTMLView>{get(item, 'meta.summary', '')}</HTMLView>
    </ThumbnailCard>
  </Link>
);


const GroupStories = compose(
  withTaggedContent,
  withProps({
    sectionTitle: (
      <PaddedView horizontal={false}><Title>{'You can\'t do life alone'}</Title></PaddedView>
    ),
  }),
  mediaQuery(({ md }) => ({ maxWidth: md }),
    withProps({ renderItem: renderMobileItem }),
    withProps({ renderItem: renderWebItem }),
  ),
)(RelatedContentWithoutData);

export default GroupStories;
