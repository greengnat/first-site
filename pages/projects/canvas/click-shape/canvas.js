
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Width/height for rectangles
let w = 100
let h = 100
// Velocity / Rate of movement
let vX = 1
let vY = 1;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Rectangle {
    constructor(x, y, w, h, color) {
        this.color = color
        this.x = x
        this.originX = x
        this.originY = y
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        c.beginPath()
        c.lineWidth = "3"
        c.fillStyle = this.color
        c.rect(mouse.x, mouse.y, this.w, this.h)
        c.fill()
        c.stroke()
        c.closePath()
    }

    update() {
        this.x = mouse.x
        this.y = mouse.y
        this.draw()
    }
}

// Implementation
let objects
function init() {
    objects = []

    for (let i = 0; i < 2; i++) {
        objects.push(new Rectangle(mouse.x, mouse.y, w, h, 'black'))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // c.fillText('This is where we want shapes', mouse.x, mouse.y)
    objects.forEach(object => {
        object.update()
    })
}

document.addEventListener('mousedown', function () {
    init()
    animate()

})
document.addEventListener('mouseup', function () {
    objects = []
})