import { React, ReactDOM, SWRConfig } from './common';

import fetcher from './api/fetcher';

import App from './routers/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
        suspense: true,
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
