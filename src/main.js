gsap.registerPlugin(ScrollTrigger);

function initLenis() {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

}

function initIntro() {
    const bars = Array.from(document.querySelectorAll('.bar')).filter(bar => {
        return window.getComputedStyle(bar).display !== "none";
    });

    const iciWrapper = document.querySelector('.ici-wrapper');
    const iciSvg = iciWrapper.querySelector('svg');
    const iciText = iciWrapper.querySelector('[data-scramble="scroll"]');

    // Create audio element for the sound effect
    const flashSound = new Audio('/path/to/your-sound-effect.mp3');

    gsap.set(iciWrapper, { autoAlpha: 0 });

    gsap.set(bars, { autoAlpha: 0, scaleY: 0, transformOrigin: "bottom" });

    // Create a master ScrollTrigger for pinning
    ScrollTrigger.create({
        trigger: ".section.is--intro",
        start: "top top",
        end: "+=200%", // Enough space for all animations
        pin: true,
        markers: true,
        id: "masterPin"
    });

    const barsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--intro",
            start: "top top",
            end: "+=150%", // Just for the bar animations
            scrub: true,
            markers: { startColor: "blue", endColor: "blue" },
            id: "barsScrub",
            onLeave: function () {
                // When the scrubbed animation completes, play the flash animation
                flashAndScrambleTl.play(0);
                // Play the sound effect
                flashSound.currentTime = 0; // Reset sound to beginning
                flashSound.play();
                console.log("complete");
            },
            onEnterBack: function () {
                // When scrolling back into the bars section, reset the flash animation
                flashAndScrambleTl.reverse();
                // Reset visibility states
                // gsap.set(iciWrapper, { autoAlpha: 0 });
                // gsap.set(iciSvg, { visibility: "hidden" });
            }
        }
    });

    const durationPerBar = 1 / bars.length;
    bars.forEach((bar, index) => {
        barsTl.to(bar, {
            autoAlpha: 1,
            scaleY: 1,
            duration: durationPerBar,
            ease: "power1.out"
        }, index * durationPerBar);
    });


    const flashAndScrambleTl = gsap.timeline({
        paused: true,

    });
    flashAndScrambleTl
        .set(iciWrapper, { autoAlpha: 1 }, "label")
        .set(iciSvg, { visibility: "visible" })
        .to(iciSvg, { visibility: "hidden", duration: 0.05, ease: "none" })
        .to(iciSvg, { visibility: "visible", duration: 0.1, ease: "none" })
        .to(iciSvg, { visibility: "hidden", duration: 0.05, ease: "none" })
        .to(iciSvg, { visibility: "visible", duration: 0.1, ease: "none" })
        .to(iciSvg, { visibility: "hidden", duration: 0.05, ease: "none" })
        .to(iciSvg, { visibility: "visible", duration: 0.1, ease: "none" });

    // Split and prepare the text
    const split = new SplitText(iciText, {
        type: "words, chars",
        wordsClass: "word",
        charsClass: "char"
    });

    // Add scramble text animation 
    flashAndScrambleTl.to(split.words, {
        duration: 1,
        scrambleText: {
            text: "{original}",
            chars: 'upperCase',
            speed: 0.95,
            tweenLength: false,
        }
    }, "label");

}


document.addEventListener("DOMContentLoaded", () => {
    document.fonts.ready.then(() => {


        initLenis();
        initIntro();
    })
});