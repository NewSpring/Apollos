const { reloadApp } = require('detox-expo-helpers'); // eslint-ignore

describe('Giving', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should have home loaded', async () => {
    await waitFor(element(by.id('home')))
      .toBeVisible()
      .withTimeout(10000);
    await expect(element(by.id('home'))).toBeVisible();
  });
});
