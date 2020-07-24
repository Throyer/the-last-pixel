import GameObject from "./GameObject";
import Point2D from "./Point2D";
import Player from "./Player";

export default class Resource extends GameObject {

    nome: string;
    quantidade: number;
    constructor({ nome, posicao, largura = 30, altura = 30, cor, quantidade }:
        { nome: string, posicao: Point2D; largura?: number; altura?: number; cor: string; quantidade: number }) {
        super({ posicao, largura, altura, cor });
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public udpate(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.cor;
        context.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura);

        context.fillStyle = this.cor;
        context.font = "bold 12px 'Press Start 2P'";
        context.fillText(
            `${this.nome}: ${this.quantidade}`,
            this.posicao.x,
            this.posicao.y - 5
        );
    }
}