import { createHtmlElement } from './utils/createHtmlElement';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { requestPlayList } from './utils/requestPlayList';

export class App {
  private rootElement: Element;
  private container = createHtmlElement('div', 'app-container');
  private player: AudioPlayer = new AudioPlayer();

  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  async render() {
    this.player.init();
    this.container.append(this.player.element);
    this.rootElement.append(this.container);
    const playlist = await requestPlayList();
    this.player.getPlaylist(playlist);
  }
}
