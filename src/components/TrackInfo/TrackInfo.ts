import './info-styles.css'

export class TrackInfo {
  authorElement: HTMLElement;

  trackNameElement: HTMLElement;

  container: HTMLElement

  constructor(author: string, trackName: string) {
    this.container = document.createElement('div')
    this.authorElement = document.createElement('div');
    this.trackNameElement = document.createElement('div');
    this.authorElement.textContent = author;
    this.trackNameElement.textContent = trackName;
  }

  init() {
    this.container.classList.add('info-container')
    this.authorElement.classList.add('author-info')
    this.trackNameElement.classList.add('track-info')
    this.container.append(this.trackNameElement, this.authorElement)
  }
}
