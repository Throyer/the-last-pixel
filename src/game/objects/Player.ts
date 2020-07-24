import GameObject from "./GameObject";
import Resource from "./Resource";

export default class Player extends GameObject {
  velocidade: number;
  inventario?: Resource[] = [];

  constructor() {
    super({
      altura: 10,
      largura: 10,
      cor: "#A4FC",
      posicao: {
        x: 10,
        y: 10,
      },
    });
    this.velocidade = 10;
  }

  public move(key: "a" | "s" | "d" | "w" | string): void {
    if (key === "a") {
      this.posicao.x -= this.velocidade;
    }

    if (key === "d") {
      this.posicao.x += this.velocidade;
    }

    if (key === "w") {
      this.posicao.y -= this.velocidade;
    }

    if (key === "s") {
      this.posicao.y += this.velocidade;
    }
  }

  public udpate(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.cor;
    context.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura);
  }

  public collect(resource: Resource): void {
    const item = this.inventario.find((item) => item.nome == resource.nome);
    if (item) {
      item.quantidade++;
    } else {
      this.inventario.push(new Resource({ ...resource, quantidade: 1 }));
    }
    resource.quantidade--;  
  }
}
