export const createHtmlElement = <T extends HTMLElement>(
  elementName: string,
  ...classNames: string[]
): T => {
  const element = <T>document.createElement(elementName);
  element.classList.add(...classNames);
  return element;
};