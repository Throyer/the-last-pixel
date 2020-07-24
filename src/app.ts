import "../public/styles.css";
import Game from "./game/Game";
import Engine from "./core/Engine";

const game = new Game(new Engine({ canvasId: "game", width: 800, height: 600 }));

game.start();

