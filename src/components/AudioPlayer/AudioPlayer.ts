import './player-styles.css';

import { Visualization } from '../Visualization/Visualization';
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

  visualization: Visualization;

  analyser: AnalyserNode | null;

  isAudioContext: boolean;

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
    this.analyser = null;
    this.isAudioContext = false;
    this.visualization = new Visualization();
  }

  getTrack(index: number): AudioInfo {
    const info = playList[index];
    return info;
  }

  getPlaylistLength() {
    const { length } = playList;
    return length;
  }

  createAudioContext() {
    if (!this.isAudioContext) {
      const audioContext = new AudioContext();
      const audioSrc = audioContext.createMediaElementSource(this.audio);
      this.analyser = audioContext.createAnalyser();
      audioSrc.connect(this.analyser);
      this.analyser.connect(audioContext.destination);
      this.analyser.fftSize = 1024;
      this.isAudioContext = true
    }
  }

  createAudioTrack() {
    this.isAudioContext = false;
    this.audio = new Audio();
    this.audio.src = this.currentTrack.url;
    this.addAudioListeners();
    this.trackInfo.update(this.currentTrack);
  }

  nextAudio() {
    const playlistLength = this.getPlaylistLength();
    this.state.trackNumber = (this.state.trackNumber + 1) % playlistLength;
    this.currentTrack = this.getTrack(this.state.trackNumber);
    this.createAudioTrack();
  }

  prevAudio() {
    const playlistLength = this.getPlaylistLength();
    this.state.trackNumber =
      this.state.trackNumber === 0
        ? playlistLength - 1
        : (this.state.trackNumber - 1) % playlistLength;
    this.currentTrack = this.getTrack(this.state.trackNumber);
    this.createAudioTrack();
  }

  addAudioListeners() {
    this.audio.oncanplay = async () => {
      if (this.state.play === 'play') {
        await this.audio.play();
        this.createAudioContext();
        if (this.analyser) {
          this.visualization.render(this.analyser);
        }
      }
    };
    this.audio.onended = () => {
      if (this.state.autoplay) this.nextAudio();
    };
  }

  addControlListeners() {
    const handleClick = async (e: Event) => {
      const target = e.target as Element;
      const button = target.closest('button');
      if (button) {
        button.classList.remove('pressed');
        switch (button.dataset.name) {
          case ControlButtons.prev:
            this.audio.pause();
            this.prevAudio();
            break;
          case ControlButtons.next:
            this.audio.pause();
            this.nextAudio();
            break;
          case ControlButtons.play:
            this.state.play = ControlButtons.play;
            this.controls.switchPlayPauseButton(ControlButtons.pause);
            await this.audio.play();
            this.createAudioContext();
            if (this.analyser) {
              this.visualization.render(this.analyser);
            }
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

    const handleMouseUpAndLeave = (e: Event) => {
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

    this.container.addEventListener('mouseout', handleMouseUpAndLeave);
    this.container.addEventListener('mouseup', handleMouseUpAndLeave);
    this.container.addEventListener('mousedown', handleMouseDown);
  }

  init() {
    this.controls.init();
    this.trackInfo.init();
    this.visualization.init();
    this.createAudioTrack();
    this.element.classList.add('audio-player');
    this.container.classList.add('audio-container');
    this.container.append(this.trackInfo.container, this.controls.container);
    this.element.append(this.container, this.visualization.container);
    this.addControlListeners();
    this.addAudioListeners();
  }
}
