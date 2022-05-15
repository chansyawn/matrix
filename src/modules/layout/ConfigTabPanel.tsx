import { Accordion, TabPanel, TabPanelProps, VStack } from '@chakra-ui/react';

type ConfigTabPanelProps = TabPanelProps & {
  children?: React.ReactNode;
};

const ConfigTabPanel = ({ children, ...props }: ConfigTabPanelProps) => {
  return (
    <TabPanel px="0" {...props}>
      <Accordion allowMultiple>
        <VStack align="stretch">{children}</VStack>
      </Accordion>
    </TabPanel>
  );
};

export default ConfigTabPanel;
