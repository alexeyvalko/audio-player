import './player-styles.css';

import { TrackInfo } from '../TrackInfo/TrackInfo';
import { Controls } from '../Controls/Controls';
import { AudioInfo, AudioPlayerState, ControlButtons } from '../../types/types';
import { playList } from '../../utils/playList';

export class AudioPlayer {
  element: HTMLDivElement;

  container: HTMLDivElement;

  state: AudioPlayerState;

  controls: Controls;

  currentTrack: AudioInfo;

  trackInfo: TrackInfo;

  audio: HTMLAudioElement;

  constructor() {
    this.state = {
      play: 'pause',
      muted: 'unmute',
      autoplay: true,
      trackNumber: 0,
    };
    this.currentTrack = this.getTrack(this.state.trackNumber);

    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.controls = new Controls();
    this.trackInfo = new TrackInfo(this.currentTrack);

    this.audio = new Audio();
    this.audio.src = this.currentTrack.url;
  }

  getTrack(index: number): AudioInfo {
    const info = playList[index];
    return info;
  }

  addControlListeners() {
    const handleClick = async (e: Event) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        button.classList.remove('pressed');
        switch (button.dataset.name) {
          case ControlButtons.prev:
            break;
          case ControlButtons.next:
            break;
          case ControlButtons.play:
            this.state.play = ControlButtons.play;
            this.controls.switchPlayPauseButton(ControlButtons.pause);
            await this.audio.play();
            break;
          case ControlButtons.pause:
            this.state.play = ControlButtons.pause;
            this.controls.switchPlayPauseButton(ControlButtons.play);
            this.audio.pause();
            break;
          default:
            throw Error('Error while click controls');
        }
      }
    };

    const handleMouseDown = (e: Event) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        button.classList.add('pressed');
      }
    };

    const handleMouseUp = (e: Event) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        button.classList.remove('pressed');
      }
    };

    this.container.addEventListener('click', (e: Event) => {
      handleClick(e).catch((err: Error) => {
        throw Error(err.message);
      });
    });

    this.container.addEventListener('mouseup', handleMouseUp);
    this.container.addEventListener('mousedown', handleMouseDown);
  }

  init() {
    this.controls.init();
    this.trackInfo.init();
    this.element.classList.add('audio-player');
    this.container.classList.add('audio-container');
    this.container.append(this.trackInfo.container, this.controls.container);
    this.element.appendChild(this.container);
    this.addControlListeners();
  }
}
