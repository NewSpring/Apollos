import gql from 'graphql-tag';

export default gql`
  fragment NavigationImages on Content {
    content {
      images(sizes: ["medium"]) {
        url
        label
        size
      }
    }
  }
  query GetNavigation($site: String!) {
    navigation(nav: $site) {
      id
      link
      text
      image
      sort
      children {
        id
        link
        text
        image
        sort
      }
    }
    sermons: content(limit: 1, channel: "series_newspring") {
      ...NavigationImages
    }
    articles: content(limit: 1, channel: "articles") {
      ...NavigationImages
    }
    stories: content(limit: 1, channel: "stories") {
      ...NavigationImages
    }
    studies: content(limit: 1, channel: "studies") {
      ...NavigationImages
    }
    news: content(limit: 1, channel: "news") {
      ...NavigationImages
    }
    music: content(limit: 1, channel: "newspring_albums") {
      ...NavigationImages
    }
  }
`;
