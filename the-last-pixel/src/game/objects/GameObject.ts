import { uuid } from "uuidv4";

export default abstract class GameObject {
  id: string;
  position: {
    x: number;
    y: number;
  };
  largura: number;
  altura: number;
  color: string;

  constructor({
    position,
    largura,
    altura,
    color,
  }: {
    position: {
      x: number;
      y: number;
    };
    largura: number;
    altura: number;
    color: string;
  }) {
    this.id = uuid();
    this.position = position;
    this.largura = largura;
    this.altura = altura;
    this.color = color;
  }
}
