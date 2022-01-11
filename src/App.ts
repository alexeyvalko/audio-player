import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';

export class App {
  private rootElement: Element;

  container: HTMLDivElement;

  player: AudioPlayer

  constructor(rootElement: Element) {
    this.rootElement = rootElement;
    this.player = new AudioPlayer()
    this.container = this.createContainer();
  }

  createContainer() {
    const element = document.createElement('div');
    element.classList.add('app-container');
    return element;
  }

  render() {
    this.player.init()
    this.container.append(this.player.element)
    this.rootElement.append(this.container);
  }
}
