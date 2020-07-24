import Madeira from "../Madeira";
import Point2D from "../../objects/Point2D";

export default function madeiraFactory(
  posicao: Point2D,
  quantidade: number
): Madeira {
  return new Madeira({ posicao, quantidade });
}
