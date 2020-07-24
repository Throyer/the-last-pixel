import Point2D from "../../objects/Point2D";
import Carvao from "../Carvao";

export default function carvaoFactory(
  posicao: Point2D,
  quantidade: number
): Carvao {
  return new Carvao({ posicao, quantidade });
}
