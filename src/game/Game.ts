import Engine from "../core/Engine";
import { randomBetween, randomItems } from "../uitls/random";
import Player from "./objects/Player";
import Resource from "./objects/Resource";
import Carvao from "./prefabs/Carvao";
import Trigo from "./prefabs/Trigo";
import Point2D from "./objects/Point2D";
import Madeira from "./prefabs/Madeira";
import GameObject from "./objects/GameObject";

export default class Game {
  engine: Engine;
  player: Player;
  resources: Resource[] = [];
  entities: GameObject[] = [];

  constructor(engine: Engine) {
    this.engine = engine;
    this.resources = this.criarRecursos(5);
    this.player = new Player();
    this.entities = [...this.resources, this.player];

    document.addEventListener("keydown", ({ key }) => {
      if (this.canMove(this.player)) {
        this.player.move(key);
      }

      if (key === "c") {
        this.resources.forEach(resource => {
          if (resource.isIntersect(this.player)) {
            this.player.collect(resource);
            if (resource.quantidade === 0) {
              this.entities = this.entities.filter((entity) => entity.id !== resource.id);
              this.resources = this.resources.filter((_resource) => _resource.id !== resource.id);
            }
          }
        })
      }
    });
  }

  start(): void {
    this.engine.start();
    this.engine.update = (context) => {
      this.entities.forEach(entity => {
        entity.udpate(context);
      });
    };
  }

  criarRecursos(quantidade: number): Resource[] {
    const { width, height } = this.engine.canvas;

    const carvao: (posicao: Point2D, quantidade: number) => Carvao
      = (posicao, quantidade) => new Carvao({ posicao, quantidade });

    const madeira: (posicao: Point2D, quantidade: number) => Madeira
      = (posicao, quantidade) => new Madeira({ posicao, quantidade });

    const trigo: (posicao: Point2D, quantidade: number) => Trigo
      = (posicao, quantidade) => new Trigo({ posicao, quantidade });

    let tipos: Array<(posicao: Point2D, quantidade: number) => Resource> = [
      carvao,
      trigo,
      madeira
    ];

    let resources: Resource[] = [];
    for (let i = 0; i < quantidade; i++) {

      const posicao: Point2D = {
        x: randomBetween(0, width),
        y: randomBetween(0, height)
      };

      const getResource = randomItems(tipos);
      const resource = getResource(posicao, randomBetween(1, 13));

      resources = [...resources, resource];
    }
    return resources;
  }

  canMove(object: GameObject): boolean {
    const {
      posicao: { x, y },
      largura,
      altura,
    } = object;
    const { width, height } = this.engine.canvas;
    return x > 0 && y > 0 && x < width - largura && y < height - altura;
  }
}

