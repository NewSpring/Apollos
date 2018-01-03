import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import { ItemWithoutData } from './Item';

const html = "<div class=\"esv\">\n<div class=\"esv-text\"><p id=\"p40011015.01-1\"><span class=\"verse-num woc\" id=\"v40011015-1\">15&nbsp;</span><span class=\"woc\">He who has ears to hear, let him hear.</span></p>\n <p id=\"p40011016.01-1\"><span class=\"verse-num woc\" id=\"v40011016-1\">16&nbsp;</span><span class=\"woc\">&#8220;But to what shall I compare this generation? It is like children sitting in the marketplaces and calling to their playmates,</span></p>\n <div class=\"block-indent\">\n<p class=\"line-group\" id=\"p40011017.01-1\"><span class=\"verse-num woc\" id=\"v40011017-1\">17&nbsp;</span><span class=\"woc\">&#8220;&#8216;We played the flute for you, and you did not dance;<br />\n<span class=\"indent\"></span>we sang a dirge, and you did not mourn.&#8217;</span></p>\n</div>\n <p class=\"same-paragraph\" id=\"p40011018.01-1\"><span class=\"verse-num woc\" id=\"v40011018-1\">18&nbsp;</span><span class=\"woc\">For John came neither eating nor drinking, and they say, &#8216;He has a demon.&#8217;</span> <span class=\"verse-num woc\" id=\"v40011019-1\">19&nbsp;</span><span class=\"woc\">The Son of Man came eating and drinking, and they say, &#8216;Look at him! A glutton and a drunkard, a friend of tax collectors and sinners!&#8217; Yet wisdom is justified by her deeds.&#8221;</span></p>\n</div>\n</div>"; // eslint-disable-line

describe('the ScriptureItem component', () => {
  it('renders scripture html', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ItemWithoutData content={{ html }} isLoading={false} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

