import {
  Box,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Square,
  useToken,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { canvasTextPreview } from '@common/components/IconCreator/IconCanvasPreview';
import IconPreview from '@common/components/IconCreator/IconPreview';

type TextIconEditorProps = {
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
  modalRef: React.RefObject<HTMLDivElement>;
};

const TextIconEditor = ({
  previewCanvasRef,
  modalRef,
}: TextIconEditorProps) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');

  const presetColors: string[] = useToken('colors', [
    'gray.300',
    'red.300',
    'orange.300',
    'yellow.300',
    'green.300',
    'teal.300',
    'blue.300',
    'cyan.300',
    'purple.300',
    'pink.300',
  ]);

  useEffect(() => {
    if (previewCanvasRef.current)
      canvasTextPreview(previewCanvasRef.current, text, color);
  }, [color, previewCanvasRef, text]);

  return (
    <>
      <FormLabel>Preview</FormLabel>
      <IconPreview canvasRef={previewCanvasRef} />
      <FormLabel>Text</FormLabel>
      <Input
        value={text}
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
      />
      <FormLabel>Color</FormLabel>
      <Popover placement="top-start">
        <PopoverTrigger>
          <Square
            size="6"
            bgColor={color}
            rounded="md"
            border="solid"
            cursor="pointer"
            _hover={{
              borderColor: 'gray.300',
            }}
          />
        </PopoverTrigger>
        <Portal containerRef={modalRef}>
          <PopoverContent width="64" _focus={{ shadow: 'none' }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Pick color</PopoverHeader>
            <PopoverBody>
              <VStack>
                <HexColorPicker
                  style={{ width: '100%' }}
                  color={color}
                  onChange={setColor}
                />
                <Wrap spacing={2}>
                  {presetColors.map((presetColor) => (
                    <Box
                      key={presetColor}
                      cursor="pointer"
                      rounded="md"
                      border="solid"
                      boxSize="6"
                      bgColor={presetColor}
                      _hover={{
                        borderColor: 'gray.300',
                      }}
                      onClick={() => setColor(presetColor)}
                    />
                  ))}
                </Wrap>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default TextIconEditor;
