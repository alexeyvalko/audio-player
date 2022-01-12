import './visual.css';

export class Visualization {
  element: HTMLCanvasElement;

  container: HTMLDivElement;

  ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.element = document.createElement('canvas');
    this.container = document.createElement('div');
    this.ctx = this.element.getContext('2d');
  }

  render(analyser: AnalyserNode) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = this.element.width;
    const HEIGHT = this.element.height;

    const barWidth = (WIDTH / bufferLength) * 5;
    let barHeight = 0;
    let x = 0;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (let i = 0; i < bufferLength; i += 1) {
          barHeight =
            i < 40
              ? (((dataArray[i] / 4) * dataArray[i]) / HEIGHT) * 1.5
              : (((dataArray[i] / 2) * dataArray[i]) / HEIGHT) * 1.5 * ((i / bufferLength) * 7);
          const r = barHeight + 50 * (i / bufferLength);
          const g = 0;
          const b = 150 - barHeight * 2;
          const opacity = (barHeight / bufferLength) * 0.4 + 0.05;

          this.ctx.fillStyle = `rgba(${r},${g},${b}, ${opacity})`;
          this.ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
    };
    renderFrame();
  }

  init() {
    this.element.classList.add('canvas');
    this.container.classList.add('canvas-container');
    this.container.append(this.element);
  }
}
