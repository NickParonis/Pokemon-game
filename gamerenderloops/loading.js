let loadingId
const animateloading = () => {
    loadingId = window.requestAnimationFrame(animateloading);
    housesprite.draw();
    mow.draw();
    if(keys.q.pressed && lastkey == "q"){
        house.initiated = false;
        moving = true;
        $('.testdiv').addClass('hide');
        $('.dialoguediv').toggleClass('hide');
        $('.exitdiv').toggleClass('hide');
        window.cancelAnimationFrame(animationhouseId);
        animate();
    }
}