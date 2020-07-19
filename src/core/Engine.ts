import WebGL from "./gl/WebGL";

export default class Engine {
    
    private canvas: HTMLCanvasElement;

    constructor() { }

    public start(): void {

        this.canvas = WebGL.initialize();

        WebGL.context.clearColor(0, 0, 0, 1);

        this.loop();
    }

    public resize(): void {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    private loop(): void {
        WebGL.context.clear(WebGL.context.COLOR_BUFFER_BIT);

        requestAnimationFrame(this.loop.bind(this));
    }
}