import { AudioPlayList } from '../types/types';

export const requestPlayList = async () => {
  const response = await fetch('https://raw.githubusercontent.com/alexeyvalko/audio-player/main/audio/audioPlaylist.json')
  const playlist = await response.json() as AudioPlayList;
  return playlist
}
