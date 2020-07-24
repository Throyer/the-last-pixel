import Point2D from "../../objects/Point2D";
import Trigo from "../Trigo";

export default function trigoFactory(
  posicao: Point2D,
  quantidade: number
): Trigo {
  return new Trigo({ posicao, quantidade });
}
