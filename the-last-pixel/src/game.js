const screen = document.querySelector("canvas");
const context = screen.getContext("2d");
document.addEventListener('keydown', move);
var keyPressed;

var height = 500;
var width = 500;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AREA_COLETA = 50;

let resources = [
    {
        id: 1,
        nome: "carvão",
        x: random(100, 200),
        y: random(100, 200),
        largura: 10,
        altura: 10,
        velocidade: 10,
        color: "#75746f",
        count: random(1, 6)
    },
    {
        id: 2,
        nome: "carvão",
        x: random(2, 350),
        y: random(50, 450),
        largura: 10,
        altura: 10,
        velocidade: 10,
        color: "#75746f",
        count: random(1, 6)
    },
    {
        id: 3,
        nome: "madeira",
        x: random(2, 350),
        y: random(50, 450),
        largura: 10,
        altura: 10,
        velocidade: 10,
        color: "#876b61",
        count: random(1, 6)
    },
    {
        id: 4,
        nome: "madeira",
        x: random(2, 350),
        y: random(50, 450),
        largura: 10,
        altura: 10,
        velocidade: 10,
        color: "#876b61",
        count: random(1, 6)
    }
]

const player = {
    x: 10,
    y: 10,
    largura: 10,
    altura: 10,
    velocidade: 10,
    color: "#000000",
    itens: []
}

function update() {
    // frame update
    const frame = requestAnimationFrame(update);
    context.clearRect(0, 0, screen.width, screen.height);

    // desenha o recurso
    resources.forEach(resource => {
        context.fillStyle = resource.color;
        context.fillRect(resource.x, resource.y, resource.largura, resource.altura);
        context.fillStyle = resource.color;
        context.fillText(`${resource.nome}: ${resource.count}`, resource.x, resource.y - 5);
        context.fillStyle = resource.color;
        context.fillText(`${resource.x}: ${resource.y}`, resource.x, resource.y - 20);
    })

    // desenha o jogador
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.largura, player.altura);

    // // i o jogador
    // context.fillStyle = "#FFF";
    // context.fillText(`${player.x} - ${player.y}`, player.x, player.y - 5);

    player.itens.forEach((item, index) => {

        context.fillStyle = "#000";
        context.fillText(`${item.nome}: ${item.count}`, player.x, player.y + (25 * -index));
    })
}

/**
 * Movimento do jogador
 * @param {KeyEvent} event Evento da tecla
 */
function move(event) {
    keyPressed = event.key;

    if (keyPressed === 'a' && player.x > 0) {
        player.x -= player.velocidade;
    }

    if (keyPressed === 'd' && player.x < screen.width - player.largura) {
        player.x += player.velocidade;
    }

    if (keyPressed === 'w' && player.y > 0) {
        player.y -= player.velocidade;
    }

    if (keyPressed === 's' && player.y < screen.height - player.altura) {
        player.y += player.velocidade;
    }

    if (keyPressed === 'c') {
        podeColetar(player);
    }
}

function podeColetar(player) {
    resources.forEach(resource => {
        const virtualLargura = resource.largura + AREA_COLETA;
        const virtualAltura = resource.altura + AREA_COLETA;

        if (player.x >= resource.x && player.x <= resource.x + virtualLargura &&
            player.y >= resource.y && player.y <= resource.y + virtualAltura
        ) {
            const item = player.itens.find(item => item.nome == resource.nome);

            if (item) {
                resource.count--;
                item.count++;
            } else {
                player.itens.push({ nome: resource.nome, count: 1 });
            }

            if (resource.count === 0) {
                resources = resources.filter(r => r.id !== resource.id);
            }
            console.log(`pode coletar um ${resource.nome} id:` + resource.id);
        }

    });
}



update();