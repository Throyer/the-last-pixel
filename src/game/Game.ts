import Engine from "../core/Engine";
import { randomBetween, randomItems } from "../uitls/random";
import Player from "./objects/Player";
import Resource from "./objects/Resource";
import Point2D from "./objects/Point2D";
import GameObject from "./objects/GameObject";
import carvaoFactory from "./prefabs/factories/carvaoFactory";
import trigoFactory from "./prefabs/factories/trigoFactory";
import madeiraFactory from "./prefabs/factories/madeiraFactory";
import ShowFps from "./prefabs/ShowFps";

export default class Game {
  engine: Engine;
  player: Player;
  resources: Resource[] = [];
  entities: GameObject[] = [];

  constructor(engine: Engine) {
    this.engine = engine;
    this.resources = this.criarRecursos(10);
    this.player = new Player();
    this.entities = [new ShowFps(),...this.resources, this.player];

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

    let factories: Array<(posicao: Point2D, quantidade: number) => Resource> = [
      carvaoFactory,
      trigoFactory,
      madeiraFactory
    ];

    return Array.from({ length: quantidade })
      .map((): Resource => {

        const posicao: Point2D = {
          x: randomBetween(0, width),
          y: randomBetween(0, height)
        };

        const getResource = randomItems(factories);
        const resource = getResource(posicao, randomBetween(1, 13));

        return resource;
      });
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

