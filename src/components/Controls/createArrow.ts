import { ArrowControlOrientation } from "../../types/types";

export const createSvgArrow = (orientation: ArrowControlOrientation, ...classNames:string[]): SVGSVGElement => {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  const path = orientation === "left" ? 'M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z' : 'M11 3v4.119L3 2.5v11l8-4.619V13h2V3z';

  iconSvg.setAttribute('height', '16');
  iconSvg.setAttribute('width', '16');
  iconSvg.setAttribute('fill', 'none');
  iconSvg.setAttribute('viewBox', '0 0 16 16');
  iconSvg.classList.add(...classNames);

  iconPath.setAttribute(
    'd',
    path
  );
  iconSvg.append(iconPath);
  return iconSvg
};
