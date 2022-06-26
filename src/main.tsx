import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/i18n';
import App from '@app/App';

import '@style/index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
