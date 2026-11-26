import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getPageFromPath, getPagePath, isPageId } from './pages';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const legacyPage = window.location.hash.slice(1);
if (isPageId(legacyPage)) {
  window.location.replace(`${getPagePath(legacyPage)}${window.location.search}`);
} else {
  const app = (
    <React.StrictMode>
      <App initialPage={getPageFromPath(window.location.pathname)} />
    </React.StrictMode>
  );
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app);
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
}
