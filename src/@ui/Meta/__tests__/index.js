import generateData from '../metadata';

describe('Meta', () => {
  it('should have default data if nothing is passed to it', () => {
    expect(generateData()).toMatchSnapshot();
  });
  it('should override the default title', () => {
    expect(generateData({ title: 'this is a test title' })).toMatchSnapshot();
  });
  it('should override the default image', () => {
    expect(generateData({ title: '#link-to-test-image' })).toMatchSnapshot();
  });
  it('should have an id', () => {
    expect(generateData({ id: 'article.id' })).toMatchSnapshot();
  });
  it('should have an og:type meta property', () => {
    expect(generateData({ meta: [{ property: 'og:type', content: 'article' }] })).toMatchSnapshot();
  });
});
