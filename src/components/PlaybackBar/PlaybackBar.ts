import './playback-bar.css';

export class PlaybackBar {
  container: HTMLDivElement;

  playbackBar: HTMLInputElement;

  volumeSlider: HTMLInputElement;

  currentTime: HTMLDivElement;

  totalTime: HTMLDivElement;

  volumeButton: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div');

    this.playbackBar = document.createElement('input');
    this.playbackBar.type = 'range';
    this.playbackBar.max = '100';
    this.playbackBar.value = '0';
    this.playbackBar.name = 'playbackSlider';

    this.volumeSlider = document.createElement('input');
    this.volumeSlider.type = 'range';
    this.volumeSlider.classList.add('player-volume-slider');
    this.volumeSlider.max = '100';
    this.volumeSlider.value = '100';
    this.volumeSlider.name = 'audioVolumeSlider';

    this.volumeButton = document.createElement('button');
    this.volumeButton.className = 'unmute player-icon';

    this.currentTime = document.createElement('div');
    this.currentTime.textContent = '0:00';
    this.totalTime = document.createElement('div');
    this.totalTime.textContent = '0:00';
  }

  calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  setTotalTime(duration: number) {
    const time = this.calculateTime(duration);
    this.totalTime.textContent = time;
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
    this.currentTime.classList.add('time');
    this.totalTime.classList.add('time');
    this.playbackBar.classList.add('player-slider');
    this.container.classList.add('playback-bar');
    this.container.append(
      this.currentTime,
      this.playbackBar,
      this.totalTime,
      this.volumeButton,
      this.volumeSlider,
    );
  }
}
