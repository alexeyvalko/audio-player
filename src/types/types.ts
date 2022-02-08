export interface AudioInfo {
  author: string;
  name: string;
  src: string;
  url?: string;
}

export type AudioPlayList = AudioInfo[];
export type ArrowControlOrientation = 'left' | 'right';
export type PlayPauseState = 'pause' | 'play';

export interface AudioPlayerState {
  play: PlayPauseState;
  muted: 'unmute' | 'mute';
  autoplay: boolean;
  trackNumber: number
}

export enum ControlButtons {
  prev = 'prev',
  next = 'next',
  play = 'play',
  pause = 'pause',
}
