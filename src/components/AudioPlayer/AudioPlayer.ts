
import './player-styles.css'

import { Controls } from "../Controls/Controls";
import { AudioPlayerState } from '../../types/types';


export class AudioPlayer {
  element: HTMLDivElement
 
  container: HTMLDivElement

  state: AudioPlayerState

  controls: Controls

  count: number

  constructor() {
    this.element = document.createElement('div');
    this.container = document.createElement('div')
    this.controls  = new Controls()

    this.state = {
      play: 'pause',
      muted: 'unmute',
      autoplay: true,
    };
    this.count = 0
  }

  init() {
    this.controls.init()
    this.element.classList.add('audio-player')
    this.container.classList.add('audio-container')
    this.container.appendChild(this.controls.container)
    this.element.appendChild(this.container)
  }
}