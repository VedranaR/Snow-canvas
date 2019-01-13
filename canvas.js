let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//c is context
let c = canvas.getContext("2d");

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(300, 400, 100, 100);
// c.fillStyle = "rgba(255, 255, 0, 0.5)";
// c.fillRect(600, 100, 100, 100);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// //Arc / Circle
// c.beginPath(); //separates the circle from the previous drawing (line)
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();

// for (let i = 0; i < 3; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath(); //separates the circle from the previous drawing (line)
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "red";
//   c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", event => {});

//creating an object
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  //function that draws the circle according to the given params
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.stroke();
    c.fill();
    c.fillStyle = "rgba(0, 255, 0, 0.5)";
  };

  //function that updates the location of a circle, creating movement
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

//empty array of circles
let circleArray = [];

for (let i = 0; i < 100; i++) {
  let radius = 20;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 15; //dx is velocity of x movement
  let dy = (Math.random() - 0.5) * 15; //dy is velocity of y movement

  //pushing the newly created circle with new random params into a circle array
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate); //a function calls itself, creating an indefinite movement
  c.clearRect(0, 0, innerWidth, innerHeight); //clears previous instances of circles
  //loops through all the circles, animating each individually
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
