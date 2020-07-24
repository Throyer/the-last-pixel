import GameObject from "../objects/GameObject";

export default class ShowFps extends GameObject {

    private currentSecond: number;
    private frameCount: number;
    private framesLastSecond: number;
    private isVisible: boolean;

    constructor(isVisible = true) {
        super({
            cor: "#FF0000",
            altura: 0,
            largura: 0,
            posicao: { x: 10, y: 20 }
        });
        this.isVisible = isVisible;
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;
    }

    private calculaFps() {
        let sec = Math.floor(Date.now() / 1000);
        if (sec != this.currentSecond) {
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        }
        else { this.frameCount++; }
    }

    public udpate(context: CanvasRenderingContext2D): void {
        if (this.isVisible) {
            this.calculaFps();
            context.fillStyle = "#FF0000";
            context.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);
        }
    }

}