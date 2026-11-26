import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { PAGES, SITE_URL, type PageId } from './pages';

export { PAGES, SITE_URL };

export function render(page: PageId) {
  return renderToString(
    <React.StrictMode>
      <App initialPage={page} />
    </React.StrictMode>,
  );
}
