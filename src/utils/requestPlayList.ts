import { AudioPlayList } from '../types/types';

export const requestPlayList = async () => {
  const response = await fetch('./assets/audioPlaylist.json')
  const playlist = await response.json() as AudioPlayList;
  return playlist
}
