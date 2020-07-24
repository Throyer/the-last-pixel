import { uuid } from "uuidv4";
import Point2D from "./Point2D";


export default abstract class GameObject {
  id: string;
  posicao: Point2D;
  largura: number;
  altura: number;
  cor: string;

  constructor({
    posicao,
    largura,
    altura,
    cor,
  }: {
    posicao: Point2D
    largura: number;
    altura: number;
    cor: string;
  }) {
    this.id = uuid();
    this.posicao = posicao;
    this.largura = largura;
    this.altura = altura;
    this.cor = cor;
  }

  abstract udpate(context: CanvasRenderingContext2D): void;

  public isIntersect(gameObject: GameObject): boolean {
    return (
      this.posicao.x < gameObject.posicao.x + gameObject.largura &&
      this.posicao.x + this.largura > gameObject.posicao.x &&
      this.posicao.y < gameObject.posicao.y + gameObject.altura &&
      this.posicao.y + this.altura > gameObject.posicao.y)
  }
}
