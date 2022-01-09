import './styles/style.css';

import { App } from './App';

window.onload = () => {
  const rootElement = document.querySelector('#app');
  if (!rootElement) throw new Error('Error: element with id "app" not found');
  const app = new App(rootElement);
  app.render();
};
