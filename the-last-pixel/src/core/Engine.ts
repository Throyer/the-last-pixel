export default class Engine {
  public update: (context: CanvasRenderingContext2D) => void;
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  constructor({
    canvasId,
    width,
    height,
  }: {
    canvasId: string;
    width: number;
    height: number;
  }) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public start(): void {
    this.loop();
    this.context = this.canvas.getContext("2d");
  }

  private loop(): void {
    if (this.update) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update(this.context);
    }
    requestAnimationFrame(this.loop.bind(this));
  }
}
