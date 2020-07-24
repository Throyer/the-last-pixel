import Point2D from "../objects/Point2D";
import Resource from "../objects/Resource";

export default class Trigo extends Resource {
    constructor({ posicao, quantidade }: { posicao: Point2D; quantidade: number; }) {
        super({
            nome: "Trigo",
            posicao,
            largura: 30,
            altura: 30,
            cor: "#a8a832",
            quantidade
        });
    }
}