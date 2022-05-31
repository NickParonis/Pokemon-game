
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
canvas.width = 1024;
canvas.height = 576;
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);
const bgimg = new Image();
bgimg.src = './img/map.png'
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
            }))
        }
    })
});
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgimg
});
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
const backgroundAbove = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgimgAb
});


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
};
let lastkey = ''

const rectColliding = ({rectangular1, rectangular2}) => {
    return (
        rectangular1.position.x  + rectangular1.width >= rectangular2.position.x &&
        rectangular1.position.x   <= rectangular2.position.x + rectangular2.width &&
        rectangular1.position.y + rectangular1.height  >= rectangular2.position.y &&
        rectangular1.position.y  <= rectangular2.position.y + rectangular2.height
    )
}

const movables = [background,backgroundAbove, ...boundaries, ...balls]
const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    balls.forEach(ball => {
        ball.draw();
    });
    player.draw();
    backgroundAbove.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    let moving = true
    player.moving = false;
    if (keys.w.pressed){
        player.moving = true;
        player.image = player.sprites.up
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectColliding({
                rectangular1: player,
                rectangular2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }}
            })){
                console.log("colliding")
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }
    }
    else if (keys.a.pressed){
        player.moving = true;
        player.image = player.sprites.left
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectColliding({
                rectangular1: player,
                rectangular2: {...boundary, position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                }}
            })){
                console.log("colliding")
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.x += 3
            })
        }  
    }
    if (keys.s.pressed){
        player.moving = true;
        player.image = player.sprites.down
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectColliding({
                rectangular1: player,
                rectangular2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }}
            })){
                console.log("colliding")
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
        } 
        
    }
    if (keys.d.pressed){
        player.moving = true;
        player.image = player.sprites.right
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectColliding({
                rectangular1: player,
                rectangular2: {...boundary, position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                }}
            })){
                console.log("colliding")
                moving = false
                break
            }
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
        } 
    }
}

animate();