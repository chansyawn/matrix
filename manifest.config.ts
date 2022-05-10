import { defineManifest } from '@crxjs/vite-plugin';

import { name, description, version } from './package.json';

export default defineManifest({
  name,
  description,
  version,
  manifest_version: 3,
  permissions: ['storage'],
  host_permissions: ['<all_urls>'],
  action: {
    default_icon: {
      16: 'icons/icon16.png',
      32: 'icons/icon32.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
  },
  icons: {
    16: 'icons/icon16.png',
    32: 'icons/icon32.png',
    48: 'icons/icon48.png',
    128: 'icons/icon128.png',
  },
  chrome_url_overrides: {
    newtab: 'index.html',
  },
});
