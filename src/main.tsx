import '@/styles/global.css';
import 'react-tooltip/dist/react-tooltip.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

if (!container) {
  throw new Error('문서에 "#root" 요소가 존재하지 않습니다.');
}

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
