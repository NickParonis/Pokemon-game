const rectColliding = ({rectangular1, rectangular2}) => {
    return (
        rectangular1.position.x  + rectangular1.width >= rectangular2.position.x &&
        rectangular1.position.x   <= rectangular2.position.x + rectangular2.width &&
        rectangular1.position.y + rectangular1.height  >= rectangular2.position.y &&
        rectangular1.position.y  <= rectangular2.position.y + rectangular2.height
    )
}