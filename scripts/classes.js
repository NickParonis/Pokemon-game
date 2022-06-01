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
        this.width = 22
        this.height = 22
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Pokeball {
    static width = 48
    constructor({position, image}){
        this.position = position;
        this.width = 22;
        this.height = 22;
        this.image = image;
    }
    draw() {
        // c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
        );
    }
}
class Door {
    static width = 48
    constructor({position, }){
        this.position = position
        this.width = 25
        this.height = 25
    }
    draw() {
        c.fillStyle = 'rgba(0, 144, 144, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}