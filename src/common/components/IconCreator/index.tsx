import {
  Center,
  FormErrorMessage,
  Icon,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';

import IconEditor from '@common/components/IconCreator/IconEditor';

const IconCreator = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
}: UseControllerProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, name: fieldName },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  const modalSize = useBreakpointValue({
    base: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'xl',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!value) {
      setPreview('');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(value);
  }, [value]);

  const imagePreviewProps = {
    boxSize: '12',
    border: 'solid',
    rounded: 'md',
    cursor: 'pointer',
    onClick: onOpen,
    shadow: isOpen ? 'outline' : 'none',
    _hover: {
      borderColor: 'gray.300',
    },
  };

  return (
    <>
      <VisuallyHiddenInput name={fieldName} />
      <Image
        src={preview}
        {...imagePreviewProps}
        fallback={
          <Center {...imagePreviewProps}>
            <Icon as={FiPlus} />
          </Center>
        }
      />
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <IconEditor setIcon={onChange} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

IconCreator.displayName = 'IconCreator';

export default IconCreator;
