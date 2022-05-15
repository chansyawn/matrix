import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

import ConfigTabPanel from '@modules/layout/ConfigTabPanel';
import SettingPanel from '@modules/layout/SettingPanel';

const Config = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({
    base: 'xs',
    sm: 'md',
    md: 'xl',
    lg: '2xl',
  });

  return (
    <>
      <IconButton
        position="absolute"
        right="2"
        bottom="2"
        aria-label="config"
        icon={<FiSettings />}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={modalSize}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent h="xl">
          <ModalBody py="4">
            <Tabs variant="soft-rounded">
              <TabList>
                <Wrap>
                  <Tab>⚙️ Setting</Tab>
                  <Tab>🎨 Appearance</Tab>
                  <Tab>📦 Widget</Tab>
                </Wrap>
              </TabList>
              <TabPanels>
                <ConfigTabPanel>
                  <SettingPanel />
                </ConfigTabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Config;
