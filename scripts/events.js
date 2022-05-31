const keys = {
    w: {
        pressed: false,
        // arrow
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
    q: {
        pressed: false
    },
};
let lastkey = ''
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
        case 'q':
            keys.q.pressed = true;
            lastkey = "q";
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
        case 'q':
            keys.q.pressed = false;
        break
    }
})