const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
canvas.width = 1024;
canvas.height = 576;
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);
const bgimg = new Image();
bgimg.src = './img/map.png'
const diaimg = new Image();
diaimg.src = './img/dialoguebox.png'
const mowimg = new Image();
mowimg.src = './img/mow.png'
const houseimg = new Image();
houseimg.src = './img/insidehouse.png'
const ballimg = new Image();
ballimg.src = './img/pokeball.png'
const bgimgAb = new Image();
bgimgAb.src = './img/mapabove.png'
const playerimg = new Image();
playerimg.src = './sprites/playerDown.png'
const playerupimg = new Image();
playerupimg.src = './sprites/playerUp.png'
const playerdownimg = new Image();
playerdownimg.src = './sprites/playerDown.png'
const playerleftimg = new Image();
playerleftimg.src = './sprites/playerLeft.png'
const playerrightimg = new Image();
playerrightimg.src = './sprites/playerRight.png'
const offset = {
    x: -1170,
    y: -950
}

const maingame = {
    initiated: true
}

const pokedex = {
    initiated: false
}
const house = {
    initiated: false
}

// boundaries
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}
const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.width + offset.y
                }
            }))
        }
    })
});

// pokeballs
const pokeballsMap = [];
for (let i = 0; i < pokeballs.length; i += 70){
    pokeballsMap.push(pokeballs.slice(i, 70 + i))
}
const balls = [];
pokeballsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025){
            balls.push(new Pokeball({
                position: {
                    x: j * Pokeball.width + offset.x,
                    y: i * Pokeball.width + offset.y
                },
                image: ballimg
            }));
        }
    })
    
});
console.log(balls)
// doors
const doorsMap = [];
for (let i = 0; i < doors.length; i += 70){
    doorsMap.push(doors.slice(i, 70 + i))
}
const availdoors = [];
doorsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1025){
            availdoors.push(new Door({
                position: {
                    x: j * Door.width + offset.x,
                    y: i * Door.width + offset.y
                }
            }))
        }
    })
});

// background
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgimg
});

// character
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerdownimg,
    frames: {
        max: 4
    },
    sprites: {
        up: playerupimg,
        down: playerdownimg,
        left: playerleftimg,
        right: playerrightimg
    }
});

// background2
const backgroundAbove = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgimgAb
});

// dialoguebox
const dialoguebox = new Sprite ({
    position: {
        x: 75,
        y: 20
    },
    image: diaimg
});

// house
const housesprite = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    image: houseimg
});

// mowouth
const mow = new Sprite ({
    position: {
        x: 350,
        y: 150
    },
    image: mowimg
});

const movables = [background, backgroundAbove, ...boundaries, ...balls, ...availdoors]

animateMainGame();
let pokemons = []
