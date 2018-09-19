import { Share, Platform } from 'react-native';
import { get } from 'lodash';
import { track, events } from '@utils/analytics';
import getSiteLink from './getSiteLink';

const share = (content) => {
  Share.share({
    ...Platform.select({
      ios: {
        title: content.title || content.name,
        message: content.title || content.name,
        url: getSiteLink(content),
      },
      android: {
        title: content.title || content.name,
        message: `${content.title} ${getSiteLink(content)}` || content.name,
      },
    }),
  });

  track(events.Shared, {
    channel: get(content, 'channelName'),
    isLiked: get(content, 'content.isLiked'),
    contentId: get(content, 'id'),
    meta: get(content, 'meta'),
    title: content.title || content.name,
  });
};

export default share;
