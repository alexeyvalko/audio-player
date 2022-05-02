import { createHtmlElement } from "../../utils/createHtmlElement";
import './visual.css';

export class Visualization {
  element: HTMLCanvasElement = createHtmlElement('canvas', 'canvas');
  container = createHtmlElement('div', 'canvas-container');
  ctx: CanvasRenderingContext2D | null = this.element.getContext('2d');
  animationFrameId = 0;

  render(receivedAnalyser: AnalyserNode) {
    cancelAnimationFrame(this.animationFrameId);
    const analyser = receivedAnalyser;
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = this.element.width;
    const HEIGHT = this.element.height;
    const barWidth = (WIDTH / bufferLength) * 7;
    const amountOfBarsToRender = bufferLength - 925;
    let barHeight = 0;
    let x = 0;
    const renderFrame = () => {
      this.animationFrameId = requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (let i = 0; i < amountOfBarsToRender; i += 1) {
          barHeight =
            i < 45
              ? (dataArray[i] / 5) * (dataArray[i] / HEIGHT) * 1.5
              : (dataArray[i] / 2) * (dataArray[i] / HEIGHT) * 1.5 * ((i / bufferLength) * 7);
          const r = barHeight + 80 * (i / bufferLength);
          const g = 0;
          const b = 150 - barHeight * 2;
          const opacity = (barHeight / bufferLength) * 0.4 + 0.1;

          this.ctx.fillStyle = `rgba(${r},${g},${b}, ${opacity})`;
          this.ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
    };
    renderFrame();
  }

  init() {
    this.container.append(this.element);
  }
}
