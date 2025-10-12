# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Webflow project** with custom JavaScript animations. The HTML structure and most CSS are managed in Webflow, while this repository contains the custom JavaScript code and animation logic that gets deployed to Webflow.

## Development Commands

### Install Dependencies
```bash
npm install
```
Installs Vite, GSAP (with bonus plugins from local gsap-bonus.tgz), Swiper, and SASS.

### Local Development
```bash
npm run dev
```
Starts Vite dev server at https://localhost:3000 with HTTPS and CORS enabled for testing animations locally.

### Build for Webflow
```bash
npm run build
```
Creates production-ready JavaScript bundle in `dist` directory for uploading to Webflow.

### Preview Build
```bash
npm run preview
```
Preview the production build locally before deploying to Webflow.

## Architecture

### Webflow Integration
- **HTML/DOM Structure**: Managed entirely in Webflow Designer
- **Base CSS**: Created in Webflow with class naming conventions
- **Custom JS**: Built locally and deployed to Webflow's custom code sections
- **Additional CSS**: `src/styles/main.scss` contains animation-specific styles and overrides

### Technology Stack
- **Vite**: Build tool configured for HTTPS development
- **GSAP**: Animation library with premium plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip, ScrambleText, CustomEase)
- **Lenis**: Smooth scrolling that integrates with GSAP
- **Swiper**: Carousel/slider functionality

## Key Files

- `src/main.js` - Primary animation logic targeting Webflow elements
- `src/main2.js` - Alternative/additional animations (possibly for different pages or versions)
- `src/styles/main.scss` - Custom styles for animations not achievable in Webflow
- `index.html` - Local development HTML (mimics Webflow structure for testing)
- `vite.config.js` - HTTPS setup with local SSL certificates for development

## Animation Systems

### 1. ScrollTrigger Animations
- Tree diagram morphing animations with complex timelines
- Horizontal scrolling timeline sections
- Pinned sections with scroll-based transitions
- Map zoom and dot convergence animations

### 2. Text Animations
- SplitText for line/word/character animations
- ScrambleText for dramatic text reveals
- Masked text reveals with `.lineInner` wrappers
- Staggered line animations on scroll

### 3. Interactive Components
- **Tracker Section**: Checkbox progression system with animated counter
- **Video Modals**: Click-triggered from map dots with custom play/pause controls
- **Age Gate**: Loading animation with percentage counter and scramble effects
- **Section Unlocking**: Content reveals based on tracker completion

### 4. Key Classes and Selectors
Common Webflow classes targeted by animations:
- `.section.is--[name]` - Main section containers
- `.lineInner` - Text animation wrappers
- `.tree-container` - Tree diagram containers
- `.panel` - Timeline panel sections
- `.dot-video`, `.dot-normal` - Interactive map points
- `.tracker-checkbox` - Interactive tracker elements

## Development Workflow

1. **Local Testing**: Use `npm run dev` with local HTML mockup
2. **Build**: Run `npm run build` to generate production bundle
3. **Deploy**: Upload built files from `dist` to Webflow's custom code
4. **Webflow Setup**: Include the built JS file in Webflow's site settings

## Important Notes

- GSAP plugins are loaded from local `gsap-bonus.tgz` (premium features)
- SSL certificates (`localhost+1.pem`, `localhost+1-key.pem`) enable HTTPS locally
- Vite config uses polling for file watching compatibility
- The codebase includes both `main.js` and `main2.js` for different animation sets
- All animations expect specific Webflow class structures to exist

## Common Animation Patterns

### Scroll-Based Reveals
```javascript
gsap.from(".section [data-split='lines'] .lineInner", {
    yPercent: 100,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".section",
        start: "top 80%"
    }
})
```

### Section Pinning
```javascript
ScrollTrigger.create({
    trigger: ".parent-section",
    start: "top top",
    end: "+=3000%",
    pin: true,
    scrub: true
})
```

### Content Unlocking
The tracker section controls visibility of subsequent sections through completion checks and dynamic DOM manipulation.