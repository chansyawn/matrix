import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';

type ConfigCardProps = {
  title: string;
  children?: React.ReactNode;
};

const ConfigCard = ({ title, children }: ConfigCardProps) => {
  return (
    <AccordionItem border="solid" rounded="lg" overflow="hidden">
      <AccordionButton _focus={{ shadow: 'none' }} >
        <Box flex="1" py="1" textAlign="left">
          <Heading size="sm">{title}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};

export default ConfigCard;
