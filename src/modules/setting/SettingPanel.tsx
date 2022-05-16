import { TabPanelProps } from '@chakra-ui/react';
import { range } from 'lodash';

import ConfigCard from '@modules/layout/ConfigCard';
import ConfigTabPanel from '@modules/layout/ConfigTabPanel';
import SearchConfig from '@modules/search/SearchConfig';

type SettingPanelProps = TabPanelProps;

const cardList = [
  {
    title: '🔍 Search',
    content: <SearchConfig />,
  },
];

const cardIdxList = range(cardList.length);

const SettingPanel = (props: SettingPanelProps) => {
  return (
    <ConfigTabPanel {...props} defaultIndex={cardIdxList}>
      {cardList.map((card, idx) => (
        <ConfigCard key={idx} title={card.title}>
          {card.content}
        </ConfigCard>
      ))}
    </ConfigTabPanel>
  );
};

export default SettingPanel;
