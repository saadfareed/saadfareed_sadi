import React from 'react';
import { themeInitScript } from '@lib/theme';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{
        __html: themeInitScript,
      }}
    />,
  ]);
};
