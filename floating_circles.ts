const canvas = document.getElementById('floatingCirclesCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// --- SETTINGS ---
const numberOfCircles: number = 50;      // Number of circles to create
const minRadius: number = 10;           // Minimum radius of a circle
const maxRadius: number = 30;           // Maximum radius of a circle
const minOpacity: number = 0.3;          // Minimum opacity of a circle (0 to 1)
const maxOpacity: number = 0.7;          // Maximum opacity of a circle (0 to 1)
const minSpeed: number = 0.5;            // Minimum movement speed of a circle
const maxSpeed: number = 2.0;            // Maximum movement speed of a circle
const baseBlueHue: number = 200;        // Base hue for the blue color (0-360)
const blueSaturation: number = 80;      // Saturation for the blue color (0-100%)
const blueLightnessMin: number = 50;    // Minimum lightness for the blue color (0-100%)
const blueLightnessMax: number = 80;    // Maximum lightness for the blue color (0-100%)
// --- END SETTINGS ---

// Set canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold the circles
const circles: Circle[] = [];

// Function to generate a random number within a range
function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Circle class
class Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityX: number;
    velocityY: number;

    constructor(x: number, y: number, radius: number, color: string, velocityX: number, velocityY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(): void {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce off the edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.draw();
    }
}

// Function to create circles
function createCircles(): void {
    for (let i = 0; i < numberOfCircles; i++) {
        const radius = random(minRadius, maxRadius);
        const x = random(radius, canvas.width - radius);
        const y = random(radius, canvas.height - radius);
        const opacity = random(minOpacity, maxOpacity);
        const lightness = random(blueLightnessMin, blueLightnessMax);
        const color = `hsla(${baseBlueHue}, ${blueSaturation}%, ${lightness}%, ${opacity})`;
        const speed = random(minSpeed, maxSpeed);
        const velocityX = (Math.random() - 0.5) * speed; // Random horizontal velocity
        const velocityY = (Math.random() - 0.5) * speed; // Random vertical velocity

        circles.push(new Circle(x, y, radius, color, velocityX, velocityY));
    }
}

// Animation function
function animate(): void {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    circles.forEach(circle => {
        circle.update();
    });
}

// Initialize
createCircles(); // Call createCircles without a fixed number
animate();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});