import WebGL from "./WebGL";

export default class Shader {
  private _name: string;
  private _program: WebGLProgram;
  constructor({
    name,
    vertexSource,
    fragmentSource,
  }: {
    name: string;
    vertexSource: string;
    fragmentSource: string;
  }) {
    this._name = name;
    let vertexShader = this.loadShader(
      vertexSource,
      WebGL.context.VERTEX_SHADER
    );
    let fragmentShader = this.loadShader(
      fragmentSource,
      WebGL.context.FRAGMENT_SHADER
    );

    this.createProgram(vertexShader, fragmentShader);
  }

  public get name(): string {
    return this._name;
  }

  public use(): void {
    WebGL.context.useProgram(this._program);
  }

  private loadShader(source: string, shaderType: number): WebGLShader {
    let shader: WebGLShader = WebGL.context.createShader(shaderType);

    WebGL.context.shaderSource(shader, source);
    WebGL.context.compileShader(shader);
    let error = WebGL.context.getShaderInfoLog(shader);

    if (error) {
      throw new Error(`Erro ao compilar o shader: ${this._name}\n${error}`);
    }

    return shader;
  }

  private createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): void {
    this._program = WebGL.context.createProgram();
    WebGL.context.attachShader(this._program, vertexShader);
    WebGL.context.attachShader(this._program, fragmentShader);
    WebGL.context.linkProgram(this._program);

    let error = WebGL.context.getProgramInfoLog(this._program);

    if (error) {
      throw new Error(`Erro ao "linkar" o shader: ${this._name}\n${error}`);
    }
  }
}
