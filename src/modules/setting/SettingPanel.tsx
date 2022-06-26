import { TabPanelProps } from '@chakra-ui/react';
import { range } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ConfigCard from '@modules/layout/ConfigCard';
import ConfigTabPanel from '@modules/layout/ConfigTabPanel';
import SearchConfig from '@modules/search/SearchConfig';
import LanguageConfig from '@modules/setting/LanguageConfig';

type SettingPanelProps = TabPanelProps;

const SettingPanel = (props: SettingPanelProps) => {
  const { t } = useTranslation();
  const cardList = useMemo(
    () => [
      {
        title: `🌏 ${t('language.title')}`,
        content: <LanguageConfig />,
      },
      {
        title: `🔍 ${t('search.title')}`,
        content: <SearchConfig />,
      },
    ],
    [t],
  );

  return (
    <ConfigTabPanel {...props} defaultIndex={range(cardList.length)}>
      {cardList.map((card, idx) => (
        <ConfigCard key={idx} title={card.title}>
          {card.content}
        </ConfigCard>
      ))}
    </ConfigTabPanel>
  );
};

export default SettingPanel;
