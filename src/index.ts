import './styles/style.css';

import { App } from './App';

window.onload = async () => {
  const rootElement = document.querySelector('#app');
  if (!rootElement) throw new Error('Error: element with id "app" not found');
  const app = new App(rootElement);
  await app.render();
};
