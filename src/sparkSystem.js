// Spark particle system for level up effect
export class SparkSystem {
    constructor(options = {}) {
        // Configuration
        this.sparkColor = options.color || "#ffca1c";
        this.secondaryColor = options.secondaryColor || "#ff8c00";
        this.particleCount = options.particleCount || 30;
        this.minSize = options.minSize || 1;
        this.maxSize = options.maxSize || 4;
        this.minSpeed = options.minSpeed || 2;
        this.maxSpeed = options.maxSpeed || 8;
        this.gravity = options.gravity || 0.1;
        this.fadeSpeed = options.fadeSpeed || 0.02;
        this.emissionRate = options.emissionRate || 3; // sparks per frame
        this.spreadAngle = options.spreadAngle || 120; // degrees

        // Canvas setup
        this.canvas = null;
        this.ctx = null;
        this.container = null;

        // Particles array
        this.particles = [];

        // Animation state
        this.animationId = null;
        this.isAnimating = false;

        this.init();
    }

    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'spark-system-container';
        this.container.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 52;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'spark-system-canvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;

        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Handle resize
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Generic emitSparks - does nothing by default, override this method for custom emission
    emitSparks() {
        // No default emission - must be overridden or use emitBurst
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Store trail position
            particle.trail.push({ x: particle.x, y: particle.y, life: particle.life });
            if (particle.trail.length > 5) {
                particle.trail.shift();
            }

            // Update physics
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += this.gravity; // Apply gravity

            // Add some turbulence
            particle.vx += (Math.random() - 0.5) * 0.2;

            // Fade out
            particle.life -= this.fadeSpeed;

            // Remove dead particles
            if (particle.life <= 0 || particle.y > this.canvas.height) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw() {
        if (!this.canvas || !this.ctx || !this.isAnimating) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Emit new sparks
        this.emitSparks();

        // Update particles
        this.updateParticles();

        // Draw particles
        this.particles.forEach(particle => {
            // Draw trail
            particle.trail.forEach((point, index) => {
                const trailAlpha = (index / particle.trail.length) * point.life * 0.5;
                this.ctx.globalAlpha = trailAlpha;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            });

            // Draw main particle with glow
            this.ctx.globalAlpha = particle.life;

            // Outer glow (smaller for subtlety)
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.5, particle.color + '44');  // More transparent
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Inner bright core
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();

            // Main particle
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Reset alpha
        this.ctx.globalAlpha = 1;

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.draw());
    }

    start() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        // Add container to body
        if (!this.container.parentNode) {
            document.body.appendChild(this.container);
        }

        // Start animation
        this.animationId = requestAnimationFrame(() => this.draw());
    }

    stop() {
        this.isAnimating = false;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Clear particles
        this.particles = [];

        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Remove container
        setTimeout(() => {
            if (this.container.parentNode) {
                this.container.remove();
            }
        }, 100);
    }
}