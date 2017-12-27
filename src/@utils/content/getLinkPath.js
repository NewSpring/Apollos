const getLinkPath = (contentItem) => {
  const id = contentItem.id || contentItem.id;
  const category = contentItem.channelName;
  const seriesId = contentItem.parent && (contentItem.parent.id || contentItem.parent.id);

  switch (category) {
    case 'series_newspring':
      return `/series/${id}`;
    case 'sermons':
      return `/series/${seriesId}/sermon/${id}`;
    case 'studies':
      return `/studies/${id}`;
    case 'study_entries':
      return `/studies/${seriesId}/entry/${id}`;
    case 'devotionals':
      return `/devotions/${id}`;
    case 'newspring_albums':
      return `/music/${id}`;
    case 'articles':
      return `/articles/${id}`;
    case 'stories':
      return `/stories/${id}`;
    case 'news':
      return `/news/${id}`;
    case 'newspring_now':
      return `/events/${id}`;
    default:
      return null;
  }
};

export default getLinkPath;
