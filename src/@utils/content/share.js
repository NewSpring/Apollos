import { Share } from 'react-native';
import { track, events, categories } from '@utils/analytics';
import getSiteLink from './getSiteLink';

const share = (content) => {
  Share.share({
    title: content.title || content.name,
    message: content.title || content.name,
    url: getSiteLink(content),
  });

  track(events.Shared, categories.Content);
};

export default share;
