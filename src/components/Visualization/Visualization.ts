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

    const barWidth = (WIDTH / bufferLength) * 4.2;
    let barHeight = 0;
    let x = 0;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (let i = 0; i < bufferLength; i += 2) {
          barHeight = dataArray[i]/HEIGHT * 100;
          const r = barHeight + 35 * (i / bufferLength);
          const g = 250 * (i / bufferLength);
          const b = 50;

          this.ctx.fillStyle = `rgba(${r},${g},${b}, 0.2)`;
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
