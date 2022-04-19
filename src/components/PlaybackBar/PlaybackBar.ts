import { createHtmlElement } from '../../utils/createHtmlElement';
import './playback-bar.css';

export class PlaybackBar {
  container = createHtmlElement('div', 'playback-bar');
  playbackBarContainer = createHtmlElement('div', 'slider-container');
  volumeSliderContainer = createHtmlElement('div', 'volume-container');
  currentTime = createHtmlElement('div', 'time');
  totalTime = createHtmlElement('div', 'time');
  volumeButton: HTMLButtonElement = createHtmlElement('button', 'unmute', 'player-icon');
  playbackBar: HTMLInputElement = createHtmlElement('input', 'player-slider');
  volumeSlider: HTMLInputElement = createHtmlElement('input', 'player-volume-slider');

  constructor() {
    this.playbackBar.type = 'range';
    this.playbackBar.max = '100';
    this.playbackBar.value = '0';
    this.playbackBar.name = 'playbackSlider';

    this.volumeSlider.type = 'range';
    this.volumeSlider.max = '100';
    this.volumeSlider.value = '100';
    this.volumeSlider.name = 'audioVolumeSlider';

    this.currentTime.textContent = '0:00';
    this.totalTime.textContent = '0:00';
  }

  calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  setTotalTime(duration: number) {
    if (!Number.isNaN(duration)) {
      const time = this.calculateTime(duration);
      this.totalTime.textContent = time;
    }
  }

  setCurrentTime(duration: number) {
    const time = this.calculateTime(duration);
    this.currentTime.textContent = time;
  }

  setPlayBackValue(value: string) {
    this.playbackBar.value = value;
  }

  setPlayBackMaxValue(audioDuration: number) {
    this.playbackBar.max = `${Math.floor(audioDuration)}`;
  }

  getPlaybackBar() {
    return this.playbackBar;
  }

  getVolumeButton() {
    return this.volumeButton;
  }

  setVolumeSliderValue(value: string) {
    this.volumeSlider.value = value;
  }

  getVolumeSlider() {
    return this.volumeSlider;
  }

  getPlaybackValue() {
    return this.playbackBar.value;
  }

  showRangeProgress(name: string) {
    if (name === this.playbackBar.name) {
      const value = (+this.playbackBar.value / +this.playbackBar.max) * 100;
      this.container.style.setProperty('--slider-before-width', `${value}%`);
    } else {
      const volumeValue = (+this.volumeSlider.value / +this.volumeSlider.max) * 100;
      this.container.style.setProperty('--volume-before-width', `${volumeValue}%`);
    }
  }

  init() {
    this.volumeSliderContainer.append(this.volumeSlider);
    this.playbackBarContainer.append(this.playbackBar);
    this.container.append(
      this.currentTime,
      this.playbackBarContainer,
      this.totalTime,
      this.volumeButton,
      this.volumeSliderContainer,
    );
  }
}
