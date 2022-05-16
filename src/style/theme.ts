import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
    },
    borders: {
      solid: {
        default: '1px solid #e2e8f0',
        _dark: '1px solid #4A5568',
      },
    },
  },
});

export default theme;
