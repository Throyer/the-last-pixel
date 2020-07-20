const screen = document.querySelector("canvas");
const designer = screen.getContext("2d");


function update() {
    // frame update
    const frame = requestAnimationFrame(update);
    designer.clearRect(0, 0, screen.width, screen.height);
}

update();