import './controls.css';

import { createPlayPauseSvgIcon } from './createPlayPauseSvgIcon';
import { createSvgArrow } from './createArrow';
import { ControlButtons, PlayPauseState } from '../../types/types';

export class Controls {
  container: HTMLElement;

  prevButton: HTMLButtonElement;

  nextButton: HTMLButtonElement;

  playPauseButton: HTMLButtonElement;

  prevIcon: SVGSVGElement;

  nextIcon: SVGSVGElement;

  playPauseIcon: SVGSVGElement;

  constructor() {
    this.container = document.createElement('div');
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');
    this.playPauseButton = document.createElement('button');

    this.prevIcon = createSvgArrow('left', 'button-icon');
    this.nextIcon = createSvgArrow('right', 'button-icon');
    this.playPauseIcon = createPlayPauseSvgIcon(ControlButtons.play, 'button-icon');
  }


  switchPlayPauseButton(state: PlayPauseState) {
    this.playPauseIcon = createPlayPauseSvgIcon(state, 'button-icon');
    this.playPauseButton.innerHTML = '';
    this.playPauseButton.dataset.name = state;
    this.playPauseButton.append(this.playPauseIcon);
  }

 
  init() {
    this.prevButton.dataset.name = ControlButtons.prev;
    this.nextButton.dataset.name = ControlButtons.next;
    this.playPauseButton.dataset.name = ControlButtons.play;

    this.prevButton.appendChild(this.prevIcon);
    this.nextButton.appendChild(this.nextIcon);
    this.playPauseButton.appendChild(this.playPauseIcon);

    this.prevButton.classList.add('prev-next');
    this.nextButton.classList.add('prev-next');
    this.playPauseButton.classList.add('play-pause');

    this.container.classList.add('audio-controls');
    this.container.append(this.prevButton, this.playPauseButton, this.nextButton);
  }
}
