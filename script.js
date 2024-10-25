// script.js

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;  // Fixed width
canvas.height = 400; // Fixed height

// Firework particle class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.gravity = 0.1;
        this.alpha = 1;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let fireworks = [];

// Create fireworks
function createFirework(x, y) {
    const colors = ['#FF004D', '#00FF00', '#00BFFF', '#FF7F50', '#FFD700'];
    for (let i = 0; i < 100; i++) {
        fireworks.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

// Animation loop for fireworks
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Handle mouse click for fireworks
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createFirework(x, y);
});

// Create flowerpot firework effect
function createFlowerpotFirework(flowerpot) {
    const colors = ['#FF004D', '#00FF00', '#00BFFF', '#FF7F50', '#FFD700'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.bottom = '50px'; // Start above the flowerpot
        particle.style.left = `${flowerpot.offsetLeft + 10}px`; // Center in flowerpot
        flowerpot.appendChild(particle);

        // Random speed and direction
        const speedX = (Math.random() - 0.5) * 4;
        const speedY = (Math.random() - 0.5) * 4;

        // Animate particle
        setTimeout(() => {
            const interval = setInterval(() => {
                const rect = particle.getBoundingClientRect();
                particle.style.left = `${rect.left + speedX}px`;
                particle.style.bottom = `${parseFloat(particle.style.bottom) + speedY}px`;

                if (parseFloat(particle.style.bottom) > 100 || rect.left > 600) {
                    clearInterval(interval);
                    particle.remove();
                }
            }, 20);
        }, 100);
    }
}

// Initialize flowerpots with animations
document.querySelectorAll('.flowerpot').forEach(pot => {
    setInterval(() => {
        createFlowerpotFirework(pot);
    }, 1500); // New firework every 1.5 seconds
});

// Start the animation for fireworks
animate();

