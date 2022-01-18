import './player-styles.css';

import { PlaybackBar } from '../PlaybackBar/PlaybackBar';
import { Visualization } from '../Visualization/Visualization';
import { TrackInfo } from '../TrackInfo/TrackInfo';
import { Controls } from '../Controls/Controls';
import { AudioInfo, AudioPlayerState, ControlButtons, AudioPlayList } from '../../types/types';

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

  playbackBar: PlaybackBar;

  requestAF: number;

  playlist: AudioPlayList;

  isPlayable: boolean;

  constructor() {
    this.state = {
      play: 'pause',
      muted: 'unmute',
      autoplay: true,
      trackNumber: 0,
    };
    this.currentTrack = {
      author: 'Loading...',
      name: 'Loading...',
      url: 'empty',
    };
    this.requestAF = 0;
    this.playlist = [];

    this.element = document.createElement('div');
    this.container = document.createElement('div');
    this.controls = new Controls();
    this.trackInfo = new TrackInfo(this.currentTrack);
    this.playbackBar = new PlaybackBar();

    this.audio = new Audio();
    this.isPlayable = true;
    this.isAudioContext = false;
    this.visualization = new Visualization();

    this.analyser = null;
  }

  getTrack(index: number): AudioInfo {
    const info = this.playlist[index];
    return info;
  }

  getPlaylist(playlist: AudioPlayList) {
    this.playlist = playlist;
    this.initAudio();
  }


  createAudioContext() {
    if (!this.isAudioContext) {
      const audioContext = new AudioContext();
      const audioSrc = audioContext.createMediaElementSource(this.audio);
      this.analyser = audioContext.createAnalyser();
      audioSrc.connect(this.analyser);
      this.analyser.connect(audioContext.destination);
      this.isAudioContext = true;
    }
  }

  createAudioTrack() {
    if (this.currentTrack.url !== 'empty') {
      this.isAudioContext = false;
      this.audio = new Audio();
      this.audio.crossOrigin = 'anonymous';
      this.audio.src = this.currentTrack.url;
      this.addAudioListeners();
      this.trackInfo.update(this.currentTrack);
    }
  }

  nextAudio() {
    this.playbackBar.setCurrentTime(0);
    this.playbackBar.setPlayBackValue('0');
    this.playbackBar.showRangeProgress(this.playbackBar.getPlaybackBar().name);
    this.state.trackNumber = (this.state.trackNumber + 1) % this.playlist.length;
    this.currentTrack = this.getTrack(this.state.trackNumber);
    this.createAudioTrack();
  }

  prevAudio() {
    this.playbackBar.setCurrentTime(0);
    this.playbackBar.setPlayBackValue('0');
    this.playbackBar.showRangeProgress(this.playbackBar.getPlaybackBar().name);
    this.state.trackNumber =
      this.state.trackNumber === 0
        ? this.playlist.length - 1
        : (this.state.trackNumber - 1) % this.playlist.length;
    this.currentTrack = this.getTrack(this.state.trackNumber);
    this.createAudioTrack();
  }

  displayBufferedAmount(audio = this.audio) {
    const slider = this.playbackBar.getPlaybackBar();
    if (audio.buffered.length !== 0) {
      const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
      this.playbackBar.container.style.setProperty(
        '--buffered-width',
        `${(bufferedAmount / +slider.max) * 100}%`,
      );
    }
  }

  whilePlaying() {
    this.playbackBar.setPlayBackValue(`${Math.floor(this.audio.currentTime)}`);
    this.playbackBar.setCurrentTime(this.audio.currentTime);
    this.playbackBar.showRangeProgress('playbackSlider');
    this.requestAF = requestAnimationFrame(() => {
      this.whilePlaying();
    });
  }

  addAudioListeners() {
    if (this.audio.readyState > 0) {
      this.playbackBar.setPlayBackMaxValue(this.audio.duration);
      this.playbackBar.setTotalTime(this.audio.duration);
      this.displayBufferedAmount();
    } else {
      this.audio.onloadedmetadata = () => {
        this.playbackBar.setPlayBackMaxValue(this.audio.duration);
        this.playbackBar.setTotalTime(this.audio.duration);
        this.displayBufferedAmount();
      };
    }

    this.audio.oncanplay = async () => {
      if (this.state.play === 'play') {
        await this.audio.play();
        this.isPlayable = true;
        this.createAudioContext();
        if (this.analyser) {
          this.visualization.render(this.analyser);
        }
      }
    };
    this.audio.onended = () => {
      if (this.state.autoplay) this.nextAudio();
    };

    this.audio.onprogress = () => this.displayBufferedAmount();
  }

  addSlidersListeners() {
    const slider = this.playbackBar.getPlaybackBar();
    const volumeSlider = this.playbackBar.getVolumeSlider();
    const volumeButton = this.playbackBar.getVolumeButton();

    const setMuteUnMute = () => {
      this.state.muted = this.state.muted === 'unmute' ? 'mute' : 'unmute';
      volumeButton.classList.toggle('mute');
      volumeButton.classList.toggle('unmute');
    };

    volumeSlider.oninput = () => {
      this.playbackBar.showRangeProgress(volumeSlider.name);
      this.audio.volume = +volumeSlider.value / 100;
      volumeButton.className = +volumeSlider.value > 0 ? 'player-icon unmute' : 'player-icon mute';
    };

    slider.oninput = () => {
      if (!this.audio.paused) {
        cancelAnimationFrame(this.requestAF);
      }
      this.playbackBar.showRangeProgress(slider.name);
    };

    slider.addEventListener('change', () => {
      this.audio.currentTime = +this.playbackBar.getPlaybackValue();
      this.playbackBar.setCurrentTime(this.audio.currentTime);
      if (!this.audio.paused) {
        requestAnimationFrame(() => {
          this.whilePlaying();
        });
      }
    });

    volumeButton.onclick = () => {
      setMuteUnMute();
      if (this.state.muted === 'unmute') {
        this.audio.muted = false;
        volumeSlider.value = ` ${this.audio.volume * 100}`;
        this.playbackBar.showRangeProgress(volumeSlider.name);
      } else {
        volumeSlider.value = '0';
        this.playbackBar.showRangeProgress(volumeSlider.name);
        this.audio.muted = true;
      }
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
            if (this.isPlayable || this.state.play === 'pause') {
              this.isPlayable = false;
              this.audio.pause();
              this.prevAudio();
            }
            break;
          case ControlButtons.next:
            if (this.isPlayable || this.state.play === 'pause') {
              this.isPlayable = false;
              this.audio.pause();
              this.nextAudio();
            }
            break;
          case ControlButtons.play:
            this.state.play = ControlButtons.play;
            this.controls.switchPlayPauseButton(ControlButtons.pause);
            await this.audio.play();
            this.isPlayable = true;
            requestAnimationFrame(() => {
              this.whilePlaying();
            });
            this.createAudioContext();
            if (this.analyser) {
              this.visualization.render(this.analyser);
            }
            break;
          case ControlButtons.pause:
            this.state.play = ControlButtons.pause;
            this.controls.switchPlayPauseButton(ControlButtons.play);
            this.audio.pause();
            cancelAnimationFrame(this.requestAF);
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

    this.controls.container.addEventListener('click', (e: Event) => {
      handleClick(e).catch((err: Error) => {
        throw Error(err.message);
      });
    });

    this.container.addEventListener('mouseout', handleMouseUpAndLeave);
    this.container.addEventListener('mouseup', handleMouseUpAndLeave);
    this.container.addEventListener('mousedown', handleMouseDown);
  }

  initAudio() {
    this.currentTrack = this.getTrack(this.state.trackNumber);
    this.createAudioTrack();
    this.addControlListeners();
    this.addAudioListeners();
    this.addSlidersListeners();
  }

  init() {
    this.controls.init();
    this.trackInfo.init();
    this.playbackBar.init();
    this.visualization.init();
    this.element.classList.add('audio-player');
    this.container.classList.add('audio-container');
    this.container.append(
      this.trackInfo.container,
      this.controls.container,
      this.playbackBar.container,
    );
    this.element.append(this.container, this.visualization.container);
  }
}
