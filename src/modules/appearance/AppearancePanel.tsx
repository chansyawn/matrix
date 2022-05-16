import { TabPanelsProps } from '@chakra-ui/react';
import { range } from 'lodash';

import ColorModeConfig from '@modules/appearance/ColorModeConfig';
import ConfigCard from '@modules/layout/ConfigCard';
import ConfigTabPanel from '@modules/layout/ConfigTabPanel';

type AppearancePanelProps = TabPanelsProps;

const cardList = [
  {
    title: '🌓 Color Mode',
    content: <ColorModeConfig />,
  },
];

const cardIdxList = range(cardList.length);

const AppearancePanel = (props: AppearancePanelProps) => {
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

export default AppearancePanel;
