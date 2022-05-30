
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
canvas.width = 1024;
canvas.height = 576;
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);
const bgimg = new Image();
const bgimgAb = new Image();
const playerimg = new Image();
const playerupimg = new Image();
const playerdownimg = new Image();
const playerleftimg = new Image();
const playerrightimg = new Image();
playerimg.src = './sprites/playerDown.png'
playerupimg.src = './sprites/playerUp.png'
playerdownimg.src = './sprites/playerDown.png'
playerleftimg.src = './sprites/playerLeft.png'
playerrightimg.src = './sprites/playerRight.png'
bgimgAb.src = './img/mapabove.png'
bgimg.src = './img/map.png'
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const offset = {
    x: -1170,
    y: -950
}
class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites }){
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw(){
        c.drawImage(
            this.image,
            // cropping
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
        if(this.moving){
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0){
                if(this.frames.val < this.frames.max - 1){
                    this.frames.val++
                }
                else{
                    this.frames.val = 0
                }
            }
        }
        
    }
}
class Boundary {
    static width = 48
    constructor({position, }){
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
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
})
const backgroundAbove = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgimgAb
})
const boundaries = [];
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
}
let lastkey = ''


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
const rectColliding = ({rectangular1, rectangular2}) => {
    return (
        rectangular1.position.x - 15 + rectangular1.width >= rectangular2.position.x &&
        rectangular1.position.x + 15  <= rectangular2.position.x + rectangular2.width &&
        rectangular1.position.y + rectangular1.height - 15 >= rectangular2.position.y &&
        rectangular1.position.y + 15 <= rectangular2.position.y + rectangular2.height
    )
}

const movables = [background,backgroundAbove, ...boundaries]
const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw()
    player.draw();
    backgroundAbove.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
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
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true;
            lastkey = "w";
        break
        case 'a':
            keys.a.pressed = true;
            lastkey = "a";
        break
        case 's':
            keys.s.pressed = true;
            lastkey = "s";
        break
        case 'd':
            keys.d.pressed = true;
            lastkey = "d";
        break
    }
});
window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break
        case 's':
            keys.s.pressed = false;
        break
        case 'd':
            keys.d.pressed = false;
        break
    }
})

animate();