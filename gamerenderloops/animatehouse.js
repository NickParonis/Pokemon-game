let animationhouseId
const animateHouse = () => {
    animationhouseId = window.requestAnimationFrame(animateHouse);
    housesprite.draw();
    mow.draw();
    if(keys.q.pressed && lastkey == "q"){
        house.initiated = false;
        moving = true;
        $('.testdiv').addClass('hide');
        $('.dialoguediv').toggleClass('hide');
        $('.exitdiv').toggleClass('hide');
        window.cancelAnimationFrame(animationhouseId);
        animateMainGame();
    }
}