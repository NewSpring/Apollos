import { get } from 'lodash';

const site = 'https://newspring.cc';

const getSiteLink = (contentItem) => {
  const category = contentItem.channelName;
  const { meta } = contentItem;

  if (contentItem && contentItem.__typename === 'Group') { // eslint-disable-line
    return `https://my.newspring.cc/groups/${contentItem.id}`;
  }

  switch (category) {
    case 'series_newspring':
      return `${site}/sermons/${meta.urlTitle}`;
    case 'sermons':
      return `${site}/sermons/${contentItem.parent.meta.urlTitle}/${meta.urlTitle}`;
    case 'studies':
      return `${site}/studies/${meta.urlTitle}`;
    case 'study_entries':
      return `${site}/studies/${contentItem.parent.meta.urlTitle}/${meta.urlTitle}`;
    case 'devotionals':
      return `${site}/studies`; // todo
    case 'newspring_albums':
      return `${site}/music`; // todo
    case 'articles':
      return `${site}/articles/${meta.urlTitle}`;
    case 'stories':
      return `${site}/stories/${meta.urlTitle}`;
    case 'news':
      return `${site}/news/${meta.urlTitle}`;
    case 'newspring_now':
      return `${site}/events/${meta.urlTitle}`;
    default:
      return get(contentItem, 'meta.urlTitle', '#');
  }
};

export default getSiteLink;
