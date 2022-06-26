import {
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ImageIconEditor from '@common/components/IconCreator/ImageIconEditor';
import TextIconEditor from '@common/components/IconCreator/TextIconEditor';

import 'react-image-crop/dist/ReactCrop.css';

type IconEditorProps = {
  setIcon: (icon: Blob | null) => void;
  onClose: () => void;
};

const IconEditor = ({ setIcon, onClose }: IconEditorProps) => {
  const { t } = useTranslation();
  const [iconType, setIconType] = useState<'text' | 'image'>('text');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSumbit = () => {
    previewCanvasRef.current?.toBlob((blob) => {
      setIcon(blob);
      onClose();
    });
  };

  return (
    <>
      <ModalHeader py="3">{t`iconEditor.title`}</ModalHeader>
      <ModalCloseButton />
      <ModalBody ref={modalRef}>
        <RadioGroup
          onChange={(value: 'text' | 'image') => setIconType(value)}
          value={iconType}
          mb="4"
        >
          <HStack>
            <Radio value="text">{t`iconEditor.textIcon`}</Radio>
            <Radio value="image">{t`iconEditor.imageIcon`}</Radio>
          </HStack>
        </RadioGroup>
        {iconType === 'text' && (
          <TextIconEditor
            previewCanvasRef={previewCanvasRef}
            modalRef={modalRef}
          />
        )}
        {iconType === 'image' && (
          <ImageIconEditor previewCanvasRef={previewCanvasRef} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSumbit}>
          Confirm
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

export default IconEditor;
