import './controls.css';

import { createPlayPauseSvgIcon } from './createPlayPauseSvgIcon';
import { createSvgArrow } from './createSvgArrow';
import { ControlButtons, PlayPauseState } from '../../types/types';
import { createHtmlElement } from '../../utils/createHtmlElement';

export class Controls {
  container = createHtmlElement('div', 'audio-controls');
  prevButton = createHtmlElement('button', 'prev-next');
  nextButton = createHtmlElement('button', 'prev-next');
  playPauseButton = createHtmlElement('button', 'play-pause-button');
  prevIcon = createSvgArrow('left', 'button-icon');
  nextIcon = createSvgArrow('right', 'button-icon');
  playPauseIcon = createPlayPauseSvgIcon(ControlButtons.play, 'button-icon');

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

    this.container.append(this.prevButton, this.playPauseButton, this.nextButton);
  }
}
