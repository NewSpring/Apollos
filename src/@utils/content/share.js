import { Share } from 'react-native';

import getSiteLink from './getSiteLink';

const share = (content) => {
  Share.share({
    title: content.title || content.name,
    message: content.title || content.name,
    url: getSiteLink(content),
  });
};

export default share;
