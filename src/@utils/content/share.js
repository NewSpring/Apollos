import { Share, Platform } from 'react-native';
import { track, events, categories } from '@utils/analytics';
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

  track(events.Shared, categories.Content, content.id);
};

export default share;
