import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@app/store';
import AppContainer from '@modules/layout/Container';
import theme from '@style/theme';

const App= () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <AppContainer />
          </DndProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
