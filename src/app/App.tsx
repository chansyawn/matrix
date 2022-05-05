import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@app/store';
import Home from '@modules/home/Home';
import theme from '@style/theme';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
