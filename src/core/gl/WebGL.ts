export default class WebGL {

    public static context: WebGLRenderingContext = null;

    public static initialize(elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;

        if (elementId) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;
            if (!canvas) {
                throw new Error(`Não foi possivel encontrar o elemento com o id ${elementId}`);
            }
        } else {
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }

        this.context = canvas.getContext("webgl");

        if (!this.context) {
            throw new Error("Não foi possivel inicializar o WebGL.");
        }

        return canvas;
    }
}