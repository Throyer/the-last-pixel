import WebGL from "./gl/WebGL";
import Shader from "./gl/Shader";

export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _shader: Shader;

  constructor() {}

  public start(): void {
    this._canvas = WebGL.initialize();

    WebGL.context.clearColor(0, 0, 0, 1);

    this.leadShaders();
    this._shader.use();

    this.loop();
  }

  public resize(): void {
    if (this._canvas) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
  }

  private loop(): void {
    WebGL.context.clear(WebGL.context.COLOR_BUFFER_BIT);
    requestAnimationFrame(this.loop.bind(this));
  }

  private leadShaders(): void {
    let vertexSource = `
    attribute vec3 a_position;
    
    void main() {
        gl_Position = vec4(a_position, 1.0);
    }
    `;

    let fragmentSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0);
    }
    `;

    this._shader = new Shader({
      name: "basic",
      vertexSource,
      fragmentSource,
    });
  }
}
