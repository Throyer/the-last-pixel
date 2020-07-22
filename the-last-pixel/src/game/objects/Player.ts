import GameObject from "./GameObject";
import Resource from "./Resource";

export default class Player extends GameObject {
  velocidade: number;
  inventario?: Resource[] = [];

  constructor() {
    super({
      altura: 10,
      largura: 10,
      color: "#A4FC",
      position: {
        x: 10,
        y: 10,
      },
    });
    this.velocidade = 10;
  }

  public move(key: "a" | "s" | "d" | "w" | string): void {
    if (key === "a") {
      this.position.x -= this.velocidade;
    }

    if (key === "d") {
      this.position.x += this.velocidade;
    }

    if (key === "w") {
      this.position.y -= this.velocidade;
    }

    if (key === "s") {
      this.position.y += this.velocidade;
    }
  }
}
