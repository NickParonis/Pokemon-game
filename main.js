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

const movables = [background,backgroundAbove, ...boundaries, ...balls, ...availdoors]

// game render loops
const animate = () => {
    // recursive loop
    const animationId = window.requestAnimationFrame(animate);
    console.log(animationId)

    // renderd items
    background.draw();
    balls.forEach(ball => {
        ball.draw();
    });
    player.draw();
    backgroundAbove.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    availdoors.forEach(door => {
        door.draw();
    });
    let moving = true
    player.moving = false;

    // checks if you are in pokedex or in house and returns/ignores the events below
    if (pokedex.initiated || house.initiated) return

    // ball collision check
    for(let i = 0; i < balls.length; i++){
        const ball = balls[i]
        if (
            rectColliding({
                rectangular1: player,
                rectangular2: {...ball, position: {
                        x: ball.position.x,
                        y: ball.position.y
                    }
                }
            })
        ){
            console.log("doorfound");
            // house.initiated = true
            moving = false;
            movables.forEach((movable) => {
                movable.position.y -= 3
                movable.position.x += 3
            })
            window.cancelAnimationFrame(animationId);
            animateHouse();
            gsap.to('#overlapdiv', {
                opacity: 1,
                yoyo: true
            })
        }
    }

    // door collision check
    for(let i = 0; i < availdoors.length; i++){
        const availdoor = availdoors[i]
        if (
            rectColliding({
                rectangular1: player,
                rectangular2: {...availdoor, position: {
                        x: availdoor.position.x,
                        y: availdoor.position.y
                    }
                }
            })
        ){
            console.log("doorfound");
            // house.initiated = true
            moving = false;
            movables.forEach((movable) => {
                movable.position.y -= 3
                movable.position.x += 3
            })
            window.cancelAnimationFrame(animationId);
            animateHouse();
            gsap.to('#overlapdiv', {
                opacity: 1,
                yoyo: true
            })
        }
    }

    // button check
    if (keys.w.pressed){
        player.moving = true;
        player.image = player.sprites.up

        // boundary collision check
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
                console.log("colliding");
                moving = false;
                break
            }
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }
    }
    if (keys.a.pressed){
        player.moving = true;
        player.image = player.sprites.left

        // boundary collision check
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

        // boundary collision check
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

        // boundary collision check
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

const animateHouse = () => {
    const animationhouseId = window.requestAnimationFrame(animateHouse);
    console.log("you are inside")
    if(keys.q.pressed){
        house.initiated = false;
        window.cancelAnimationFrame(animationhouseId);
        
        gsap.to('#overlapdiv', {
            opacity: 0,
            yoyo: true
        })
        animate();
    }
}