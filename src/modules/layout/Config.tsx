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
import { useTranslation } from 'react-i18next';
import { FiSettings } from 'react-icons/fi';

import AppearancePanel from '@modules/appearance/AppearancePanel';
import SettingPanel from '@modules/setting/SettingPanel';

const Config = () => {
  const { t } = useTranslation();
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
          <ModalBody py="6">
            <Tabs variant="soft-rounded">
              <TabList>
                <Wrap overflow="visible">
                  <Tab>⚙️ {t`tab.setting`}</Tab>
                  <Tab>🎨 {t`tab.appearance`}</Tab>
                  <Tab>📦 {t`tab.widget`}</Tab>
                </Wrap>
              </TabList>
              <TabPanels>
                <SettingPanel />
                <AppearancePanel />
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Config;
