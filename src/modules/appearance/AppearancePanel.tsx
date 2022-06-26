import { TabPanelsProps } from '@chakra-ui/react';
import { range } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ColorModeConfig from '@modules/appearance/ColorModeConfig';
import ConfigCard from '@modules/layout/ConfigCard';
import ConfigTabPanel from '@modules/layout/ConfigTabPanel';

type AppearancePanelProps = TabPanelsProps;

const AppearancePanel = (props: AppearancePanelProps) => {
  const { t } = useTranslation();

  const cardList = useMemo(
    () => [
      {
        title: `🌓 ${t('color.title')}`,
        content: <ColorModeConfig />,
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

export default AppearancePanel;
