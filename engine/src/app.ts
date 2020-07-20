import Engine from "./core/Engine";
const engine = new Engine();

window.onload = () => {
    engine.start();
}

window.onresize = () => {
    engine.resize();
}