import Resource from "../objects/Resource";
import Point2D from "../objects/Point2D";

export default class Madeira extends Resource {
    constructor({ posicao, quantidade }: { posicao: Point2D; quantidade: number; }) {
        super({
            nome: "Madeira",
            posicao,
            largura: 30,
            altura: 30,
            cor: "#635425",
            quantidade
        });
    }
}