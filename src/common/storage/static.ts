import { setStaticResource } from '@common/storage/resource';

import icon_baidu from '@assets/icons/icon_baidu.svg';
import icon_bilibili from '@assets/icons/icon_bilibili.svg';
import icon_bing from '@assets/icons/icon_bing.svg';
import icon_google from '@assets/icons/icon_google.svg';
import icon_weibo from '@assets/icons/icon_weibo.svg';

const staticResourceList = [
  icon_baidu,
  icon_bilibili,
  icon_bing,
  icon_google,
  icon_weibo,
];

export const initStaticResource = (): void => {
  staticResourceList.forEach((resource) => {
    setStaticResource(resource);
  });
};
