import { Accordion, TabPanel, TabPanelProps, VStack } from '@chakra-ui/react';

type ConfigTabPanelProps = TabPanelProps & {
  defaultIndex?: number[];
  children?: React.ReactNode;
};

const ConfigTabPanel = ({
  defaultIndex,
  children,
  ...props
}: ConfigTabPanelProps) => {
  return (
    <TabPanel px="0" {...props}>
      <Accordion allowMultiple defaultIndex={defaultIndex}>
        <VStack align="stretch">{children}</VStack>
      </Accordion>
    </TabPanel>
  );
};

export default ConfigTabPanel;
