import { AudioInfo } from '../../types/types';
import { createHtmlElement } from '../../utils/createHtmlElement';
import './info-styles.css';

export class TrackInfo {
  container = createHtmlElement('div', 'info-container');
  authorElement = createHtmlElement('div', 'author-info');
  trackNameElement = createHtmlElement('div', 'track-info');

  constructor({ author, name }: AudioInfo) {
    this.authorElement.textContent = author;
    this.trackNameElement.textContent = name;
  }

  update({ author, name }: AudioInfo) {
    this.authorElement.textContent = author;
    this.trackNameElement.textContent = name;
  }

  init() {
    this.container.append(this.trackNameElement, this.authorElement);
  }
}
