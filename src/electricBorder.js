// Canvas-based electric border effect that works on all devices including iOS
export class ElectricBorder {
    constructor(options = {}) {
        // Configuration with defaults
        this.lineColor = options.color || "#dd8448";
        this.lineWidth = options.lineWidth || 2;
        this.displacement = options.displacement || 8;
        this.octaves = options.octaves || 6;
        this.lacunarity = options.lacunarity || 1.8;
        this.gain = options.gain || 0.5;
        this.amplitude = options.amplitude || 0.15;
        this.frequency = options.frequency || 8;
        this.speed = options.speed || 1.5;
        this.baseFlatness = options.baseFlatness || 0.1;
        
        // Canvas setup
        this.canvas = null;
        this.ctx = null;
        this.container = null;
        
        // Animation state
        this.animationId = null;
        this.time = 0;
        this.lastFrameTime = 0;
        this.isAnimating = false;
        
        // Line dimensions
        this.lineLength = 0;
        this.lineHeight = 2;
        
        this.init();
    }
    
    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'electric-canvas-container';
        this.container.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 51;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'electric-border-canvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        // Create glow layers
        this.createGlowLayers();
        
        // Handle resize
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    createGlowLayers() {
        // Glow layer 1 (inner)
        const glow1 = document.createElement('div');
        glow1.className = 'electric-canvas-glow-1';
        glow1.style.cssText = `
            position: absolute;
            top: 50%;
            left: 0;
            width: 50%;
            height: 4px;
            transform: translateY(-50%);
            background: ${this.lineColor};
            filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s;
        `;
        this.container.appendChild(glow1);
        
        // Glow layer 2 (outer)
        const glow2 = document.createElement('div');
        glow2.className = 'electric-canvas-glow-2';
        glow2.style.cssText = `
            position: absolute;
            top: 50%;
            left: 0;
            width: 50%;
            height: 8px;
            transform: translateY(-50%);
            background: ${this.lineColor};
            filter: blur(12px);
            opacity: 0;
            transition: opacity 0.3s;
        `;
        this.container.appendChild(glow2);
        
        // Background glow
        const bgGlow = document.createElement('div');
        bgGlow.className = 'electric-canvas-background-glow';
        bgGlow.style.cssText = `
            position: absolute;
            top: 50%;
            left: -2%;
            width: 54%;
            height: 40px;
            transform: translateY(-50%);
            background: radial-gradient(ellipse at center, ${this.lineColor}88 0%, ${this.lineColor}44 40%, transparent 70%);
            filter: blur(20px);
            opacity: 0;
            transition: opacity 0.3s;
        `;
        this.container.appendChild(bgGlow);
    }
    
    handleResize() {
        // Update canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Update line position based on progress line
        this.updatePosition();
    }
    
    updatePosition() {
        const progressLine = document.querySelector('.line-progress');
        if (progressLine) {
            const rect = progressLine.getBoundingClientRect();
            this.lineY = rect.top + rect.height / 2;
            this.lineLength = rect.width;
            
            // Update glow positions
            const glows = this.container.querySelectorAll('[class*="electric-canvas-"]');
            glows.forEach(glow => {
                glow.style.top = this.lineY + 'px';
            });
        }
    }
    
    // Random function for noise generation
    random(x) {
        return (Math.sin(x * 12.9898) * 43758.5453) % 1;
    }
    
    // 2D noise function
    noise2D(x, y) {
        const i = Math.floor(x);
        const j = Math.floor(y);
        const fx = x - i;
        const fy = y - j;
        
        const a = this.random(i + j * 57);
        const b = this.random(i + 1 + j * 57);
        const c = this.random(i + (j + 1) * 57);
        const d = this.random(i + 1 + (j + 1) * 57);
        
        const ux = fx * fx * (3.0 - 2.0 * fx);
        const uy = fy * fy * (3.0 - 2.0 * fy);
        
        return a * (1 - ux) * (1 - uy) +
               b * ux * (1 - uy) +
               c * (1 - ux) * uy +
               d * ux * uy;
    }
    
    // Octaved noise for more complex patterns
    octavedNoise(x, time = 0, seed = 0) {
        let y = 0;
        let amplitude = this.amplitude;
        let frequency = this.frequency;
        
        for (let i = 0; i < this.octaves; i++) {
            let octaveAmplitude = amplitude;
            
            if (i === 0) {
                octaveAmplitude *= this.baseFlatness;
            }
            
            y += octaveAmplitude * this.noise2D(
                frequency * x + seed * 100,
                time * frequency * 0.3
            );
            
            frequency *= this.lacunarity;
            amplitude *= this.gain;
        }
        
        return y;
    }
    
    draw(currentTime = 0) {
        if (!this.canvas || !this.ctx || !this.isAnimating) return;
        
        // Update time
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.time += deltaTime * this.speed;
        this.lastFrameTime = currentTime;
        
        // Update position in case progress line moved
        this.updatePosition();
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set line style
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.lineColor;
        
        // Get the progress line for accurate positioning
        const progressLine = document.querySelector('.line-progress');
        if (!progressLine) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
            return;
        }
        
        const rect = progressLine.getBoundingClientRect();
        const startX = rect.left;
        const endX = rect.right;
        const centerY = rect.top + rect.height / 2;
        
        // Number of points along the line
        const numPoints = Math.floor((endX - startX) / 2) || 100;
        
        this.ctx.beginPath();
        
        for (let i = 0; i <= numPoints; i++) {
            const progress = i / numPoints;
            const x = startX + progress * (endX - startX);
            
            // Generate noise for vertical displacement
            const yNoise = this.octavedNoise(progress * 10, this.time, 0);
            const y = centerY + yNoise * this.displacement;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        
        // Continue animation
        this.animationId = requestAnimationFrame((time) => this.draw(time));
    }
    
    start() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Add container to body if not already there
        if (!this.container.parentNode) {
            document.body.appendChild(this.container);
        }
        
        // Update scale to match progress line
        this.updateScale();
        
        // Show glow effects
        setTimeout(() => {
            const glow1 = this.container.querySelector('.electric-canvas-glow-1');
            const glow2 = this.container.querySelector('.electric-canvas-glow-2');
            const bgGlow = this.container.querySelector('.electric-canvas-background-glow');
            
            if (glow1) glow1.style.opacity = '0.8';
            if (glow2) glow2.style.opacity = '0.6';
            if (bgGlow) bgGlow.style.opacity = '0.4';
        }, 100);
        
        // Start animation
        this.lastFrameTime = performance.now();
        this.animationId = requestAnimationFrame((time) => this.draw(time));
    }
    
    stop() {
        this.isAnimating = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Hide glow effects
        const glow1 = this.container.querySelector('.electric-canvas-glow-1');
        const glow2 = this.container.querySelector('.electric-canvas-glow-2');
        const bgGlow = this.container.querySelector('.electric-canvas-background-glow');
        
        if (glow1) glow1.style.opacity = '0';
        if (glow2) glow2.style.opacity = '0';
        if (bgGlow) bgGlow.style.opacity = '0';
        
        // Remove container after animation fades
        setTimeout(() => {
            if (this.container.parentNode) {
                this.container.remove();
            }
        }, 300);
    }
    
    updateScale() {
        const progressLine = document.querySelector('.line-progress');
        if (!progressLine) return;
        
        // Get the current transform of the progress line
        const transform = window.getComputedStyle(progressLine).transform;
        if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            const scaleX = matrix.a;
            
            // Update glow elements scale
            const glows = this.container.querySelectorAll('[class*="electric-canvas-"]');
            glows.forEach(glow => {
                glow.style.transform = `translateY(-50%) scaleX(${scaleX})`;
                glow.style.transformOrigin = 'right center';
            });
        }
    }
    
    // Call this method during the timeline animation to keep scale in sync
    syncWithProgressLine() {
        this.updateScale();
        this.updatePosition();
    }
}