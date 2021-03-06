let colors = ["#01161E", "#124559", "#9A348E", "#0D0628", "#F1C8DB"];

colors[
    Math.floor(Math.random() * 5)
]


let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 45;
let minRadius = 2;

let ballGrowRangeX = 45;
let ballGrowRangeY = 45;


window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

})

function init() {

    circleArray = [];

    for (let i = 0; i < 700; i++) {
        let circle = new Circle((Math.random() * window.innerWidth), (Math.random() * window.innerHeight), ((Math.random() * 15) + 1), (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, colors[
            Math.floor(Math.random() * 5)
        ]);
        circleArray.push(circle);
    }
};

function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.fillStyle = color;


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.fillStyle
        c.fill();

    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        //interactivity mouse over makes circles grow

        if (mouse.x - this.x < ballGrowRangeX && mouse.x - this.x > -ballGrowRangeX && mouse.y - this.y < ballGrowRangeY && mouse.y - this.y > -ballGrowRangeY) {
            if (this.radius < maxRadius) {
                this.radius += 2;
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();

    }
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);


    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();

    };

}

function randomColor(lor = "") {
    return '#' + (function co(lor) {
        return (lor +=
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
            && (lor.length == 6) ? lor : co(lor);
    })('');
}

let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let m = Math.random() * 100;
let r = Math.random() * 1000;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let circleArray = [];
init();


animate();