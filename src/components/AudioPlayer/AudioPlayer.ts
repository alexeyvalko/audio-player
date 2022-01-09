import './player-styles.css';

import { TrackInfo } from "../TrackInfo/TrackInfo";
import { Controls } from '../Controls/Controls';
import { AudioInfo, AudioPlayerState } from '../../types/types';
import { playList } from '../../utils/playList';

export class AudioPlayer {
  element: HTMLDivElement;

  container: HTMLDivElement;

  state: AudioPlayerState;

  controls: Controls;

  currentTrack: AudioInfo

  trackInfo: TrackInfo

  constructor() {
    this.state = {
      play: 'pause',
      muted: 'unmute',
      autoplay: true,
      trackNumber: 0
    };
    this.currentTrack = this.getTrack(this.state.trackNumber)
    this.trackInfo = new TrackInfo(this.currentTrack.author, this.currentTrack.name)
    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.controls = new Controls(this.state);
  }

  getTrack(index: number): AudioInfo {
   const info = playList[index]
   return info
  }

  init() {
    this.controls.init();
    this.trackInfo.init()
    this.element.classList.add('audio-player');
    this.container.classList.add('audio-container');
    this.container.append(this.trackInfo.container, this.controls.container);
    this.element.appendChild(this.container);
  }
}
