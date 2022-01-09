import { PlayPauseState } from "../../types/types";

export const createPlayPauseSvgIcon = (playOrPause: PlayPauseState, ...classNames:string[]): SVGSVGElement => {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  const path = playOrPause === "play" ? 'M4.018 14L14.41 8 4.018 2z' : 'M3 2h3v12H3zm7 0h3v12h-3z';

  iconSvg.setAttribute('height', '16');
  iconSvg.setAttribute('width', '16');
  iconSvg.setAttribute('viewBox', '0 0 16 16');
  iconSvg.classList.add(...classNames);

  iconPath.setAttribute(
    'd',
    path
  );
  iconSvg.append(iconPath);

  return iconSvg
};