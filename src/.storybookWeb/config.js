import { configure } from '@storybook/react';

function loadStories() {
  require('../storybook');
}

configure(loadStories, module);
