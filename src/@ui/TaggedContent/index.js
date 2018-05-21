import React from 'react';
import { compose, withProps, renderComponent } from 'recompose';
import { get } from 'lodash';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import ThumbnailCard from '@ui/ThumbnailCard';
import PaddedView from '@ui/PaddedView';
import withTaggedContent from '@data/withTaggedContent';
import FeedItemCard from '@ui/FeedItemCard';
import { Link } from '@ui/NativeWebRouter';
import { getLinkPath, getItemImages, getItemBgColor, getItemIsLight } from '@utils/content';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import { H4, H5 } from '@ui/typography';
import styled from '@ui/styled';
import HTMLView from '@ui/HTMLView';

const Title = compose(
  styled({ textAlign: 'center', width: '100%' }),
  mediaQuery(({ md }) => ({ minWidth: md }), renderComponent(H4)),
)(H5);

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
      description={<HTMLView>{get(item, 'meta.summary', '')}</HTMLView>}
      category={item.channelName}
      images={getItemImages(item)}
      isLoading={item.isLoading}
    />
  </Link>
);

const TaggedContent = compose(
  withTaggedContent,
  withProps(({ sectionTitle }) => ({
    sectionTitle: (
      <PaddedView>
        <Title>{sectionTitle}</Title>
      </PaddedView>
    ),
  })),
  mediaQuery(
    ({ md }) => ({ maxWidth: md }),
    withProps({ renderItem: renderMobileItem }),
    withProps({ renderItem: renderWebItem }),
  ),
)(RelatedContentWithoutData);

export default TaggedContent;
