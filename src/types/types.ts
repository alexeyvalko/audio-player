export interface AudioInfo {
  author: string;
  name: string;
  url: string;
}

export type AudioPlayList = AudioInfo[];
export type ArrowControlOrientation = 'left' | 'right';
export type PlayPauseState = 'pause' | 'play';

export interface AudioPlayerState {
  play: PlayPauseState;
  muted: 'unmute' | 'mute';
  autoplay: boolean;
}
