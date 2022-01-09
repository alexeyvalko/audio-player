import { createPlayPauseSvgIcon } from './createPlayPauseSvgIcon';
import { createSvgArrow } from './createArrow';
import './controls.css'

export class Controls {
  container: HTMLElement;

  prevButton: HTMLButtonElement;

  nextButton: HTMLButtonElement;

  playPauseButton: HTMLButtonElement;

  prevIcon: SVGSVGElement

  nextIcon: SVGSVGElement

  playPauseIcon: SVGSVGElement

  constructor() {
    this.container = document.createElement('div');
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');
    this.playPauseButton = document.createElement('button');

    this.prevIcon = createSvgArrow('left', ['button-icon'])
    this.nextIcon = createSvgArrow('right', ['button-icon'])
    this.playPauseIcon = createPlayPauseSvgIcon('play', ['button-icon'])
  }

  init() {
    this.prevButton.appendChild(this.prevIcon)
    this.nextButton.appendChild(this.nextIcon)
    this.playPauseButton.appendChild(this.playPauseIcon)

    this.prevButton.classList.add('prev-next');
    this.nextButton.classList.add('prev-next');
    this.playPauseButton.classList.add('play-pause');


    this.container.classList.add('audio-controls');
    this.container.append(this.prevButton, this.playPauseButton, this.nextButton);
  }
}
