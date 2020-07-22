import Engine from "../core/Engine";
import random from "../uitls/random";
import Player from "./objects/Player";
import Resource from "./objects/Resource";
import { uuid } from "uuidv4";

export default class Game {
  engine: Engine;
  player: Player;
  resources: Resource[] = [];

  constructor(engine: Engine) {
    this.engine = engine;
    this.resources = this.criarRecursos(15);
    this.player = new Player();

    document.addEventListener("keydown", ({ key }) => {
      const canMove = (player: Player): boolean => {
        const {
          position: { x, y },
          largura,
          altura,
        } = player;
        const { width, height } = engine.canvas;
        return x > 0 && y > 0 && x < width - largura && y < height - altura;
      };

      if (canMove(this.player)) {
        this.player.move(key);
      }

      if (key === "c") {
        // podeColetar(player);
      }
    });
  }

  start(): void {
    const AREA_COLETA = 50;

    this.engine.start();

    this.engine.update = (context) => {
      // desenha o recurso
      this.resources.forEach((resource) => {
        context.fillStyle = resource.color;
        context.fillRect(
          resource.position.x,
          resource.position.y,
          resource.largura,
          resource.altura
        );
        context.fillStyle = resource.color;
        context.fillText(
          `${resource.nome}: ${resource.quantidade}`,
          resource.position.x,
          resource.position.y - 5
        );
        context.fillStyle = resource.color;
        context.fillText(
          `${resource.position.x}: ${resource.position.y}`,
          resource.position.x,
          resource.position.y - 20
        );
      });

      // desenha o jogador
      context.fillStyle = this.player.color;
      context.fillRect(
        this.player.position.x,
        this.player.position.y,
        this.player.largura,
        this.player.altura
      );

      // i o jogador
      context.fillStyle = "#000";
      context.fillText(
        `${this.player.position.x} - ${this.player.position.y}`,
        this.player.position.x,
        this.player.position.y - 5
      );

      this.player.inventario.forEach((resource, index) => {
        context.fillStyle = "#000";
        context.fillText(
          `${resource.nome}: ${resource.quantidade}`,
          this.player.position.x,
          this.player.position.y + 25 * -index
        );
      });
    };

    // function podeColetar(player) {
    //   resources.forEach((resource) => {
    //     const virtualLargura = resource.largura + AREA_COLETA;
    //     const virtualAltura = resource.altura + AREA_COLETA;

    //     if (
    //       player.x >= resource.x &&
    //       player.x <= resource.x + virtualLargura &&
    //       player.y >= resource.y &&
    //       player.y <= resource.y + virtualAltura
    //     ) {
    //       const item = player.itens.find((item) => item.nome == resource.nome);

    //       if (item) {
    //         resource.count--;
    //         item.count++;
    //       } else {
    //         player.itens.push({ nome: resource.nome, count: 1 });
    //       }

    //       if (resource.count === 0) {
    //         resources = resources.filter((r) => r.id !== resource.id);
    //       }
    //       console.log(`pode coletar um ${resource.nome} id:` + resource.id);
    //     }
    //   });
    // }
  }

  criarRecursos(quantidade: number): Resource[] {
    const { width, height } = this.engine.canvas;
    let tipos: { nome: string; color: string }[] = [
      {
        color: "#ffde7a",
        nome: "Trigo",
      },
      {
        color: "#635425",
        nome: "Madeira",
      },
      {
        color: "#333c47",
        nome: "Carvão",
      },
    ];
    let resources: Resource[] = [];
    for (let i = 0; i < quantidade; i++) {
      const indice = random(0, tipos.length - 1);
      const { nome, color } = tipos[indice];
      const resource: Resource = {
        id: uuid(),
        altura: 10,
        largura: 10,
        color,
        nome,
        position: {
          y: random(0, height),
          x: random(0, width),
        },
        quantidade: random(1, 13),
      };
      
      resources = [...resources, resource];
    }
    return resources;
  }
}
