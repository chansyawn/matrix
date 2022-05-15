import { Box } from '@chakra-ui/react';

type IconPreviewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const IconPreview = ({ canvasRef }: IconPreviewProps) => {
  return (
    <Box boxSize="16" border="solid" rounded="md" overflow="hidden">
      <canvas
        ref={canvasRef}
        width="512px"
        height="512px"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default IconPreview;
