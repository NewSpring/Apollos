import { configure, addDecorator } from '@storybook/react';
import { loadStories } from '../storyLoader'; // storyLoader.js is generated on storybook start
import AppContext from '../decorators/AppContext';

addDecorator(AppContext);

configure(loadStories, module);
