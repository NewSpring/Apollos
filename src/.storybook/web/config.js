import { configure } from '@storybook/react';
import { loadStories } from '../storyLoader'; // storyLoader.js is generated on storybook start

configure(loadStories, module);
