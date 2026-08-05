import { css } from 'styled-components';

import Fraunces400 from '@fonts/Fraunces/fraunces-400.woff2';
import Fraunces500 from '@fonts/Fraunces/fraunces-500.woff2';
import Fraunces600 from '@fonts/Fraunces/fraunces-600.woff2';
import Fraunces500Italic from '@fonts/Fraunces/fraunces-500italic.woff2';

import PlexSans400 from '@fonts/PlexSans/plexsans-400.woff2';
import PlexSans500 from '@fonts/PlexSans/plexsans-500.woff2';
import PlexSans600 from '@fonts/PlexSans/plexsans-600.woff2';
import PlexSans700 from '@fonts/PlexSans/plexsans-700.woff2';

import PlexMono400 from '@fonts/PlexMono/plexmono-400.woff2';
import PlexMono500 from '@fonts/PlexMono/plexmono-500.woff2';
import PlexMono600 from '@fonts/PlexMono/plexmono-600.woff2';

const face = (name, src, weight, style = 'normal') => `
  @font-face {
    font-family: '${name}';
    src: url(${src}) format('woff2');
    font-weight: ${weight};
    font-style: ${style};
    font-display: swap;
  }
`;

const Fonts = css`
  ${face('Fraunces', Fraunces400, 400)}
  ${face('Fraunces', Fraunces500, 500)}
  ${face('Fraunces', Fraunces600, 600)}
  ${face('Fraunces', Fraunces500Italic, 500, 'italic')}

  ${face('IBM Plex Sans', PlexSans400, 400)}
  ${face('IBM Plex Sans', PlexSans500, 500)}
  ${face('IBM Plex Sans', PlexSans600, 600)}
  ${face('IBM Plex Sans', PlexSans700, 700)}

  ${face('IBM Plex Mono', PlexMono400, 400)}
  ${face('IBM Plex Mono', PlexMono500, 500)}
  ${face('IBM Plex Mono', PlexMono600, 600)}
`;

export default Fonts;
