import {
  Box,
  Center,
  chakra,
  Icon,
  Image,
  VisuallyHiddenInput,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiFile,
  FiRotateCcw,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';

import { canvasImagePreview } from '@common/components/IconCreator/IconCanvasPreview';
import IconPreview from '@common/components/IconCreator/IconPreview';

const ActionBarIcon = chakra(Icon, {
  baseStyle: {
    cursor: 'pointer',
    boxSize: '4',
  },
});

type ImageIconEditorProps = {
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
};

const ImageIconEditor = ({ previewCanvasRef }: ImageIconEditorProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      setScale(1);
      setRotate(0);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader?.result?.toString() ?? '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          1,
          width,
          height,
        ),
        width,
        height,
      ),
    );
  };

  const selectImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const rotateImage = (angle: number) => {
    setRotate((rotate + angle) % 360);
  };

  const zoomImage = (zoom: number) => {
    setScale((pre) => pre + zoom);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderCropPreview = useCallback(
    throttle((completedCrop, rotate, zoom) => {
      if (imgRef.current && previewCanvasRef.current && completedCrop) {
        canvasImagePreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          rotate,
          zoom,
        );
      }
    }, 200),
    [],
  );

  useEffect(() => {
    if (completedCrop) renderCropPreview(completedCrop, scale, rotate);
  }, [completedCrop, renderCropPreview, rotate, scale]);

  return (
    <>
      <Wrap>
        <VStack>
          <Box boxSize="64" border="solid" overflow="hidden">
            <ReactCrop
              style={{
                width: '100%',
                height: '100%',
              }}
              disabled={crop === undefined}
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(completedCrop) => setCompletedCrop(completedCrop)}
              aspect={1}
            >
              <Image
                ref={imgRef}
                src={imgSrc}
                onLoad={onImageLoad}
                transform={`rotate(${rotate}deg) scale(${scale})`}
                boxSize="full"
                fit="contain"
                fallback={
                  <Center h="64" cursor="pointer" onClick={selectImage}>
                    Select Image
                  </Center>
                }
              />
            </ReactCrop>
          </Box>
          <Wrap>
            <VisuallyHiddenInput
              ref={fileInputRef}
              type="file"
              onChange={handleSelectFile}
            />
            <ActionBarIcon as={FiFile} onClick={selectImage} />
            <ActionBarIcon as={FiRotateCcw} onClick={() => rotateImage(-90)} />
            <ActionBarIcon as={FiRotateCw} onClick={() => rotateImage(90)} />
            <ActionBarIcon as={FiZoomIn} onClick={() => zoomImage(0.1)} />
            <ActionBarIcon as={FiZoomOut} onClick={() => zoomImage(-0.1)} />
          </Wrap>
        </VStack>
        <IconPreview canvasRef={previewCanvasRef} />
      </Wrap>
    </>
  );
};

export default ImageIconEditor;
