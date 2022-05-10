import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@app/store';
import AppContainer from '@modules/layout/Container';
import theme from '@style/theme';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <AppContainer />
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
