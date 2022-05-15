import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
    },
  },
  borders: {
    solid: '1px solid #e2e8f0',
    dashed: '1px dashed #e2e8f0',
  },
});

export default theme;
