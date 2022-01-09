import './controls.css';

import { createPlayPauseSvgIcon } from './createPlayPauseSvgIcon';
import { createSvgArrow } from './createArrow';
import { AudioPlayerState, ControlButtons, PlayPauseState } from '../../types/types';

export class Controls {
  container: HTMLElement;

  prevButton: HTMLButtonElement;

  nextButton: HTMLButtonElement;

  playPauseButton: HTMLButtonElement;

  prevIcon: SVGSVGElement;

  nextIcon: SVGSVGElement;

  playPauseIcon: SVGSVGElement;

  private state: AudioPlayerState;

  constructor(playerState: AudioPlayerState) {
    this.state = playerState;
    this.container = document.createElement('div');
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');
    this.playPauseButton = document.createElement('button');

    this.prevIcon = createSvgArrow('left', 'button-icon');
    this.nextIcon = createSvgArrow('right', 'button-icon');
    this.playPauseIcon = createPlayPauseSvgIcon(this.state.play, 'button-icon');
  }


  switchPlayPauseButton(state: PlayPauseState) {
    this.state.play = state;
    this.playPauseIcon = createPlayPauseSvgIcon(this.state.play, 'button-icon');
    this.playPauseButton.innerHTML = '';
    this.playPauseButton.dataset.name = this.state.play;
    this.playPauseButton.append(this.playPauseIcon);
  }

  addListeners() {
    const handleMouseUp = (e: Event) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        button.classList.remove('pressed')
        switch (button.dataset.name) {
          case ControlButtons.prev:
            break;
          case ControlButtons.next:
            break;
          case ControlButtons.play:
           this.switchPlayPauseButton(ControlButtons.pause)
            break;
          case ControlButtons.pause:
            this.switchPlayPauseButton(ControlButtons.play)
            break;
          default:
            throw Error('Error while click controls');
        }
      }
    };

   const handleMouseDown = (e:Event) => {
     const target = e.target as Element
     const button = target.closest('button')
     if(button) {
       button.classList.add('pressed')
     }
   }

    this.container.addEventListener('mouseup', handleMouseUp)
    this.container.addEventListener('mousedown', handleMouseDown);
  }

  init() {
    this.prevButton.dataset.name = ControlButtons.prev;
    this.nextButton.dataset.name = ControlButtons.next;
    this.playPauseButton.dataset.name = this.state.play;

    this.prevButton.appendChild(this.prevIcon);
    this.nextButton.appendChild(this.nextIcon);
    this.playPauseButton.appendChild(this.playPauseIcon);

    this.prevButton.classList.add('prev-next');
    this.nextButton.classList.add('prev-next');
    this.playPauseButton.classList.add('play-pause');

    this.container.classList.add('audio-controls');
    this.container.append(this.prevButton, this.playPauseButton, this.nextButton);
    this.addListeners();
  }
}
