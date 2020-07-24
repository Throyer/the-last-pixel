import Resource from "../objects/Resource";
import Point2D from "../objects/Point2D";

export default class Carvao extends Resource {
    constructor({ posicao, quantidade }: { posicao: Point2D; quantidade: number; }) {
        super({
            nome: "Carvão",
            posicao,
            largura: 30,
            altura: 30,
            cor: "#333c47",
            quantidade
        });
    }
}