let animationId
const animateMainGame = () => {
    // recursive loop
    animationId = window.requestAnimationFrame(animateMainGame);

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
            balls.splice(i,1)
            console.log("pokeball found");
            house.initiated = true
            moving = false;
            movables.forEach((movable) => {
                switch (lastkey){
                    case 'w':
                        movable.position.y -= 3
                    break
                    case 'a':
                        movable.position.x -= 3
                    break
                    case 's':
                        movable.position.y += 3
                    break
                    case 'd':
                        movable.position.x += 3
                    break
                }
            })
            window.cancelAnimationFrame(animationId);
            animateHouse();
            $('.dialoguediv').toggleClass('hide');
            $('.exitdiv').toggleClass('hide');
            let textWrapper = document.querySelector('.ml3');
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({loop: true})
            .add({
            targets: '.ml3 .letter',
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: 250,
            delay: (el, i) => 150 * (i+1)
            }).add({
            targets: '.ml3',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
            });
            // gsap.to('#overlapdiv', {
            //     opacity: 1,
            //     repeat: 1,
            //     yoyo: true
            // })
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
            house.initiated = true
            moving = false;
            movables.forEach((movable) => {
                switch (lastkey){
                    case 'w':
                        movable.position.y -= 3
                    break
                    case 'a':
                        movable.position.x -= 3
                    break
                    case 's':
                        movable.position.y += 3
                    break
                    case 'd':
                        movable.position.x += 3
                    break
                }
            })
            window.cancelAnimationFrame(animationId);
            animateHouse();
            $('.dialoguediv').toggleClass('hide');
            $('.exitdiv').toggleClass('hide');
            let textWrapper = document.querySelector('.ml3');
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({loop: true})
            .add({
            targets: '.ml3 .letter',
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: 250,
            delay: (el, i) => 150 * (i+1)
            }).add({
            targets: '.ml3',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
            });
        }
    }

    // button check
    if (keys.w.pressed && lastkey == "w"){
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
    if (keys.a.pressed && lastkey == "a"){
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
    if (keys.s.pressed && lastkey == "s"){
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
    if (keys.d.pressed && lastkey == "d"){
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