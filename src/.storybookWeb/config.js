import { configure } from '@storybook/react';
import { loadStories } from '../.storybook'; // .storybook.js is generated on storybook start

configure(loadStories, module);
