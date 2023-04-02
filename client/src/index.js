import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


//  root    on websivun,   DOM  pää elementti,  jonka paikalle,  react:lla  renderöidään eli piirretäään  reactin tuottamat komponentit.  navbar, koti.. yms. yms.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

