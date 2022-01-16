import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { requestPlayList } from './utils/requestPlayList';

export class App {
  private rootElement: Element;

  container: HTMLDivElement;

  player: AudioPlayer;

  constructor(rootElement: Element) {
    this.rootElement = rootElement;
    this.player = new AudioPlayer();
    this.container = this.createContainer();
  }

  createContainer() {
    const element = document.createElement('div');
    element.classList.add('app-container');
    return element;
  }

  async render() {
    this.player.init();
    this.container.append(this.player.element);
    this.rootElement.append(this.container);
    const playlist = await requestPlayList();
    this.player.getPlaylist(playlist);
  }
}
