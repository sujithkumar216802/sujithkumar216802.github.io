var count = 100;
var position, velocity;
var radius;
var maxXVelocity = 1;
var maxYVelocity = 1;
var mouseX = 10e15;
var mouseY = 10e15;
var prevInnerWidth, prevInnerHeight, prevDevicePixelRatio;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


function update() {
    radius = 5 * window.devicePixelRatio;
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    prevInnerHeight = window.innerHeight;
    prevInnerWidth = window.innerWidth;
    prevDevicePixelRatio = window.devicePixelRatio;
    // maxXVelocity = 
    // maxYVelocity = 
    // count = 
}

document.onmousemove = function (e) {
    mouseX = e.clientX * window.devicePixelRatio;
    mouseY = e.clientY * window.devicePixelRatio;
}

function randomPos() {
    return [Math.random() * canvas.width, Math.random() * canvas.height];
}

function randomVelocity() {
    temp = [Math.random() * maxXVelocity, Math.random() * maxYVelocity];
    if (Math.ceil(Math.random() * 2) == 1)
        temp[0] *= -1;
    if (Math.ceil(Math.random() * 2) == 1)
        temp[1] *= -1;
    if (temp[0] == 0 && temp[1] == 0)
        return randomVelocity();
    return temp;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function init() {
    position = [];
    velocity = [];
    for (let i = 0; i < count; i++) {
        position.push(randomPos());
        velocity.push(randomVelocity());
    }
}

update();
init();

function velocityChangeCalculator(x, y) {
    let d = dist(x, y, mouseX, mouseY);
    if (d < radius * 10) {
        let magnitude = maxXVelocity / d;
        let xDiff = x - mouseX;
        let yDiff = y - mouseY;
        let xVelocityChange = magnitude * (xDiff / (Math.abs(xDiff) + Math.abs(yDiff)));
        let yVelocityChange = magnitude * (yDiff / (Math.abs(xDiff) + Math.abs(yDiff)));
        return [xVelocityChange, yVelocityChange];
    }
    return [0, 0];
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (prevInnerWidth != window.innerWidth || prevInnerHeight != window.innerHeight || prevDevicePixelRatio != window.devicePixelRatio) {
        update();
        console.log(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    }
    for (let i = 0; i < count; i++) {
        let v = velocityChangeCalculator(position[i][0], position[i][1]);
        velocity[i][0] += v[0];
        velocity[i][1] += v[1];

        velocity[i][0] = Math.min(maxXVelocity, Math.max(-maxXVelocity, velocity[i][0]));
        velocity[i][1] = Math.min(maxYVelocity, Math.max(-maxYVelocity, velocity[i][1]));

        position[i][0] += velocity[i][0];
        position[i][1] += velocity[i][1];

        if (position[i][0] > canvas.width)
            position[i][0] %= canvas.width;
        else if (position[i][0] < 0)
            position[i][0] += canvas.width;
        if (position[i][1] > canvas.height)
            position[i][1] %= canvas.height;
        else if (position[i][1] < 0)
            position[i][1] += canvas.height;

        ctx.beginPath();
        ctx.arc(position[i][0], position[i][1], radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#242424';
        ctx.fill();
    }
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
