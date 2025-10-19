
import "./styles/main.scss";


function initLenis() {
    window.lenis = new Lenis();
    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { window.lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    CustomEase.create("easeOutQuad", "0.25,0.46,0.45,0.94");
    CustomEase.create("easeOutQuart", ".165, .84, .44, 1");
    CustomEase.create("easeInOutQuad", ".455, .03, .515, .955");
    CustomEase.create("easeInOutQuart", ".77, 0, .175, 1");

}

// Add this function to handle scroll to top
function scrollToTop() {
    // Prevent browser scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Scroll to top immediately when the page loads
    window.scrollTo(0, 0);

    // If lenis is available, also use it to scroll
    if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
    }
}

function initIntro() {
    const bars = Array.from(document.querySelectorAll('.bar')).filter(bar => {
        return window.getComputedStyle(bar).display !== "none";
    });

    const iciWrapper = document.querySelector('.ici-wrapper');
    const iciSvg = iciWrapper.querySelector('svg');
    const iciText = iciWrapper.querySelector('.ici-wrapper-text');

    // Create audio element for the sound effect
    // const flashSound = new Audio('https://cdn.jsdelivr.net/gh/koppkvn/rc-code@master/src/assets/dig-typ2.mp3');

    gsap.set(iciWrapper, { autoAlpha: 0 });

    gsap.set(bars, { autoAlpha: 0, scaleY: 0, transformOrigin: "bottom" });

    // Create a master ScrollTrigger for pinning
    ScrollTrigger.create({
        trigger: ".section.is--intro",
        start: "top top",
        end: "+=220%", // Enough space for all animations
        pin: true,

        // markers: true,
        id: "masterPin"

    });

    const barsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--intro",
            start: "top top",
            end: "+=130%", // Just for the bar animations
            scrub: true,
            // markers: { startColor: "blue", endColor: "blue" },
            id: "barsScrub",
            onLeave: function () {
                // When the scrubbed animation completes, play the flash animation
                flashAndScrambleTl.play(0);
                // Play the sound effect
                // flashSound.currentTime = 0; // Reset sound to beginning
                // flashSound.play();
            },
            onEnterBack: function () {
                // When scrolling back into the bars section, reset the flash animation
                flashAndScrambleTl.reverse();
                // flashSound.currentTime = 0; // Reset sound to beginning
                // flashSound.play();
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
            speed: 1,
            tweenLength: false,
        }
    }, "label");

}

function initTrackerSection() {

    const buttonsToGlow = document.querySelectorAll(".is--glow");

    buttonsToGlow.forEach(button => {
        button.classList.toggle("is--glow");
    });

    // gsap.set(".purgatoire-message", {
    //     autoAlpha: 0,
    // })

    gsap.set(".tracker-highlight", {
        autoAlpha: 0,
    })

    gsap.from(".section.is--tracker [data-split='lines'] .lineInner", {
        yPercent: 100,
        duration: 1,
        ease: "easeOutQuart",
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".section.is--tracker",
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false
        }
    })

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--tracker .tracker-container",
            start: "top 80%",
            end: "bottom bottom",
            toggleActions: "play none none none",
            // markers: true
        }
    })

    tl.from(".container.is--tracker .tracker-row > div:not(.tracker-row-line)", {
        autoAlpha: 0,
        duration: 1,
        ease: "easeOutQuart",
        stagger: 0.03,
    })


    tl.to(".container.is--tracker .tracker-row .tracker-row-line", {
        xPercent: 100,
        duration: 1,
        ease: "easeOutQuart",
        stagger: 0.03,

        onComplete: function () {
            // gsap.to(".purgatoire-message .wordInner", {
            //     duration: 1,

            //     scrambleText: {
            //         text: "{original}",
            //         speed: 0.65,
            //     },
            // });

            // gsap.to(".purgatoire-message", {
            //     autoAlpha: 1,
            //     duration: 1,
            //     ease: "easeOutQuart",
            // })

            gsap.to('.tracker-highlight', {
                autoAlpha: 1,
                duration: 1,
                ease: "easeOutQuart",
            });

            setTimeout(() => {
                buttonsToGlow.forEach(button => {
                    button.classList.toggle("is--glow");
                });

            }, 2000);


            // gsap.fromTo(".tracker-checkbox.is--button", {
            //     backgroundColor: "#5f5f5f",

            // }, {
            //     backgroundColor: "#2f2f2f",

            //     duration: 1,
            //     ease: "power1.out",
            //     stagger: .4,
            //     repeat: -1,
            // })
        }
    }, "<")
        .from(".iphone-wrapper", {
            opacity: 0,
            duration: 1,
            ease: "easeOutQuart",
        }, "-=1")

        .from(".svg-wrapper svg", {
            opacity: 0,
            duration: 1,
            stagger: .2,

            ease: "easeOutQuart",
        }, "-=1")



    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--tracker",
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "play none none none",
            // markers: true,
        }
    })

    tl2.to(".container.is--tracker .header-line", {
        scaleX: 0,
        duration: 1,
        transformOrigin: "right",
        ease: "easeOutQuart",
    }, "<")

        .to(".container.is--tracker .header-subtitle, .container.is--tracker .header-title, .container.is--tracker .header-number", {
            scrambleText: {
                text: "{original}",
            },
        }, "<")
    // tl.from(".container.is--tracker .tracker-row div:not(.tracker-row-line)", {


}

function initTrackerCheckboxes() {
    const trackerButtons = document.querySelectorAll('.tracker-checkbox.is--button');
    const pompeCounterEl = document.querySelector('.tracker-pompes .color');
    let pompeCount = 40; // Initial count

    // Object to use for GSAP animation of the counter
    let counterObj = { value: pompeCount };

    // Set up the counter with a fixed width container for the number
    if (pompeCounterEl) {
        // Create and insert a span for the number with fixed width
        const originalText = pompeCounterEl.textContent;
        const numberMatch = originalText.match(/\d+/);

        if (numberMatch) {
            // Extract the prefix and suffix text
            const beforeNumber = originalText.substring(0, numberMatch.index);
            const afterNumber = originalText.substring(numberMatch.index + numberMatch[0].length);

            // Clear the original content
            pompeCounterEl.textContent = '';

            // Add the prefix text
            if (beforeNumber) {
                pompeCounterEl.appendChild(document.createTextNode(beforeNumber));
            }

            // Create a fixed-width span for the number
            const numberSpan = document.createElement('span');
            numberSpan.style.display = 'inline-block';
            numberSpan.style.minWidth = '1.1em'; // Adjust width as needed
            numberSpan.style.textAlign = 'center';
            numberSpan.textContent = numberMatch[0];

            // Add a data attribute to easily find this span later
            numberSpan.setAttribute('data-pompe-counter', 'true');
            pompeCounterEl.appendChild(numberSpan);

            // Add the suffix text
            if (afterNumber) {
                pompeCounterEl.appendChild(document.createTextNode(afterNumber));
            }
        }
    }

    trackerButtons.forEach(button => {
        // Add hover animations
        button.addEventListener('mouseenter', function () {
            // Skip hover effect if button was already clicked
            if (this.getAttribute('data-clicked') === 'true') {
                return;
            }

            // Subtle glow/pulse effect on hover
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                border: '.0625rem solid white'
            });
        });

        button.addEventListener('mouseleave', function () {
            // Skip if button was already clicked
            if (this.getAttribute('data-clicked') === 'true') {
                return;
            }

            // Return to normal state
            gsap.to(this, {
                border: '.0625rem solid transparent',
                scale: 1,
                duration: 0.2
            });
        });

        button.addEventListener('click', function () {
            // Check if button was already clicked
            if (this.getAttribute('data-clicked') === 'true') {
                return; // Do nothing if already clicked
            }
            document.querySelectorAll(".is--glow").forEach(el => {
                el.classList.remove("is--glow");
            });
            // Mark as clicked
            this.setAttribute('data-clicked', 'true');

            // Toggle white border on the button
            this.style.border = '.0625rem solid white';

            // Remove any hover effects when clicked
            gsap.to(this, {
                boxShadow: 'none',
                scale: 1,
                duration: 0.2
            });

            // Find the inside div and set its opacity to 1
            const inside = this.querySelector('.tracker-checkbox-inside');
            if (inside) {
                // Animate the inside div with GSAP
                gsap.fromTo(inside,
                    { opacity: 0, scale: 1.6 },
                    { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
                );
            }

            // Decrease push-up count by 10 (if above 0)
            if (pompeCount > 0) {
                // Store the starting value
                const startValue = pompeCount;
                // Calculate target value (never below 0)
                const targetValue = Math.max(0, pompeCount - 10);

                // Update the actual count
                pompeCount = targetValue;

                // Reset the counter object to the start value
                counterObj.value = startValue;

                // Animate the counter down
                gsap.to(counterObj, {
                    value: targetValue,
                    duration: .8,
                    ease: "easeOutQuart",
                    onUpdate: function () {
                        // Update the display with the rounded current value
                        const currentValue = Math.round(counterObj.value);
                        // Find the number span we created
                        const numberSpan = document.querySelector('[data-pompe-counter="true"]');
                        if (numberSpan) {
                            numberSpan.textContent = currentValue;
                        }
                    }
                });
            }
        });
    });
}

function initScrollLock() {
    const trackerSection = document.querySelector('.section.is--tracker');
    const allSectionsAfterTracker = Array.from(document.querySelectorAll('.section, .parent-section')).filter(section => {
        // Get all sections that appear after the tracker in the DOM
        return section.compareDocumentPosition(trackerSection) & Node.DOCUMENT_POSITION_PRECEDING;
    });
    const trackerButtons = document.querySelectorAll('.tracker-checkbox.is--button');

    // Flag to track if content has been unlocked
    let contentUnlocked = false;

    // Hide all sections after the tracker
    allSectionsAfterTracker.forEach(section => {
        section.style.display = 'none';
    });

    // Function to check if all buttons clicked and counter is zero
    function checkTrackerComplete() {
        // Get the counter value
        // const counterEl = document.querySelector('[data-pompe-counter="true"]');
        // const counterValue = counterEl ? parseInt(counterEl.textContent, 10) : 0;

        // Check if all buttons are clicked
        const allButtonsClicked = Array.from(trackerButtons).every(btn =>
            btn.getAttribute('data-clicked') === 'true'
        );

        return allButtonsClicked;
    }

    // Function to unlock content and execute JavaScript for other sections
    function unlockContent() {
        // If content is already unlocked, do nothing
        if (contentUnlocked) {
            return;
        }

        // Set flag to true to prevent future executions
        contentUnlocked = true;

        // Show all sections after tracker
        allSectionsAfterTracker.forEach(section => {
            section.style.display = '';
        });

        // Scramble the wait message
        const waitMessage = document.querySelector('.wait-message');
        if (waitMessage) {
            // Simple scramble animation of the existing text
            gsap.to(waitMessage, { duration: 1, color: "#fc0", scrambleText: "Parfait! Tu peux continuer." });
        }

        // Restart Lenis
        window.lenis.destroy();
        initLenis();

        // Here you would call functions to initialize other sections
        // Example:

        // initTreeDiagram();

        initTreeDiagramWrapper(); // on page load
        // initVideoMap();
        // initSectionTwo();
        // initSectionThree();
        // etc.
    }

    // Check on each button click if tracker is complete
    trackerButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Only check completion if content hasn't been unlocked yet
            if (!contentUnlocked && checkTrackerComplete()) {
                unlockContent();
            }
        });
    });
}


function initTreeDiagram() {

    let mm = gsap.matchMedia();

    // set the height of the parent section to 100vh
    gsap.set(".parent-section", {
        height: "100vh"
    })
    gsap.set(".mask-2", {
        display: "inline",
    })

    // set the width of the timeline wrapper to 400vw on desktop only
    mm.add("(min-width: 48rem)", () => {

        gsap.set("section.is--timeline .timeline-container", {
            width: "200vw",

        })

        gsap.set("section.is--timeline .timeline-panels-wrapper", {
            flexDirection: "row"
        })
        // gsap.set(".tree-container.is--timeline", {
        //     width: "260vw",
        //     flexDirection: "row",
        // })

        // gsap.set(".tree-container.is--timeline .timeline-wrapper", {
        //     width: "260vw",
        //     left: `${window.innerWidth / 2}px`,
        //     opacity: 1,
        // })

        // gsap.set(".section.is--timeline, .section.is--timeline .container.is--timeline, .section.is--timeline .container.is--timeline .tree-container", {
        //     height: "100vh"
        // })
        // gsap.set(".section.is--timeline .container.is--timeline .tree-container", {
        //     position: "absolute",
        // })
    })

    // hide split lines on panels
    gsap.set(".panel [data-split='lines'] .lineInner", {
        yPercent: 100,
    })
    mm.add("(max-width: 47.9375rem)", () => {



    })

    const videoBarca = document.querySelector(".video-barca");
    console.log(videoBarca);
    gsap.set(".barca-video-wrapper", {
        autoAlpha: 0,
        yPercent: 20,
    })

    // create the master pin 
    // ScrollTrigger.create({
    //     trigger: ".parent-section",
    //     start: "top top",
    //     end: "+=2000%",
    //     pin: true,
    //     markers: true,
    //     id: "masterPin"
    // });

    gsap.set(".parent-section .section", { position: "absolute" })
    //ICIIIIII

    // Set the lines outside the view
    gsap.set(".section.is--section [data-split='lines'] .lineInner, .section.is--groupe [data-split='lines'] .lineInner, .section.is--personnes [data-split='lines'] .lineInner, .section.is--compare [data-split='lines'] .lineInner", {
        yPercent: 100
    })

    // hide all of the tree containers
    gsap.set(".tree-container", {
        autoAlpha: 0
    });

    gsap.set(".text-wrapper-barca", {
        position: "absolute",
        left: "unset",
    })

    gsap.set(".text-wrapper-barca .lineInner", {
        yPercent: 100,
    })


    // create the main timeline
    const treeTlOne = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "linear",
        },
        scrollTrigger: {
            trigger: ".parent-section",
            start: "top top",
            end: "+=4000%",
            pin: true,
            pinSpacing: "margin",
            scrub: true,


        },
    });


    // create scramble effects so that we can roll back on them
    const scrambleLabel = gsap.to(".tree-container.is--first .tree-header-wrapper .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });

    const scrambleChildLabel = gsap.to(".tree-container.is--first .tree-child-wrapper .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });

    const scrambleChildLabelTwo = gsap.to(".tree-container.is--second .tree-child-wrapper .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });

    const scrambleChildLabelThree = gsap.to(".tree-container.is--three .tree-child-wrapper .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });

    const scrambleChildLabelCompare = gsap.to(".tree-container.is--compare .tree-right-wrapper .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });

    const scrambleInscriptionRc = gsap.to(".tree-container.is--compare .inscription-rc", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });


    //TEST
    // gsap.set(".header-section.is--sections", {
    //     autoAlpha: 1
    // });

    gsap.set(".label.color.is--compare", {
        autoAlpha: 0,
    })


    //hide elements of the first tree container
    gsap.set(".tree-container.is--compare .tree-right-wrapper .label", {
        autoAlpha: 0,
    })
    gsap.set(".tree-container.is--compare .inscription-rc", {
        autoAlpha: 0,
    })

    gsap.set(".section.is--timeline .timeline-wrapper", {
        autoAlpha: 0
    })

    gsap.set(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
        yPercent: 100,
    })
    gsap.set(".map-svg path", { drawSVG: "0% 0%" });

    // hide spec list text on timeline
    gsap.set(".panel .t-inner-wrapper.is--spec", {
        yPercent: 10,
        autoAlpha: 0,
    })

    // hide header title and number on sections
    gsap.set(".section.is--section .header-title, .section.is--section .header-number", {
        autoAlpha: 0
    });

    gsap.set(".section.is--personnes .header-title, .section.is--personnes .header-number", {
        autoAlpha: 0
    });

    gsap.set(".section.is--compare .header-title, .section.is--compare .header-number", {
        autoAlpha: 0
    });

    gsap.set(".section.is--timeline .header-title, .section.is--timeline .header-number", {
        autoAlpha: 0
    });

    // hide header title and number on groupe section
    gsap.set(".section.is--groupe .header-title, .section.is--groupe .header-number", {
        autoAlpha: 0
    });

    gsap.set(".section.is--groupe p.is--second", {
        position: "absolute",
        right: 0
    })

    gsap.set(".timeline-panel.is--fixed", {
        position: "fixed",
        left: 0,
        top: 0,

    })


    treeTlOne.set(".tree-header-wrapper .label", {
        autoAlpha: 0,
    })
        .set(".tree-container", {
            autoAlpha: 1
        })
        .set(".tree-header-wrapper .line", {
            scaleY: 0,
            transformOrigin: "top",
        })
        .set(".tree-horizontal-line", {
            scaleX: 0,

        })
        .set(".tree-child-wrapper .line", {
            scaleY: 0,
            transformOrigin: "top",
        })
        .set(".tree-child-wrapper .label", {
            autoAlpha: 0,
        })
        // .to(".tree-container.is--first .tree-header-wrapper .label", {
        //     autoAlpha: 1,
        //     onStart: function () {
        //         scrambleLabel.play(0);
        //     }
        // })
        // .to(".tree-container.is--first .tree-header-wrapper .line", {
        //     scaleY: 1,

        // })
        // .to(".tree-container.is--first .tree-horizontal-line", {
        //     scaleX: 1,
        //     duration: 2,

        // })
        // .to(".tree-container.is--first .tree-child-wrapper .line", {
        //     scaleY: 1,
        // })
        // .to(".tree-container.is--first .tree-child-wrapper .label", {
        //     autoAlpha: 1,

        //     onStart: function () {
        //         scrambleChildLabel.play(0);
        //         console.log("LES SECTIONS ");

        //         gsap.to(".section.is--section [data-split='lines'] .lineInner", {
        //             yPercent: 0,
        //             duration: .6,
        //             stagger: 0.05,
        //             ease: "power1.out"
        //         })

        //         // Add scramble text animation 
        //         gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
        //             duration: 1,
        //             onStart: function () {
        //                 gsap.set(".section.is--section .header-title, .section.is--section .header-number", {
        //                     autoAlpha: 1
        //                 });
        //             },

        //             scrambleText: {
        //                 text: "{original}",
        //                 chars: 'upperCase',
        //                 speed: 1,
        //                 // tweenLength: false,
        //             }
        //         },);
        //     },
        //     onReverseComplete: function () {
        //         gsap.to(".section.is--section [data-split='lines'] .lineInner", {
        //             yPercent: 100,
        //             duration: .6,
        //             stagger: 0.05,
        //             ease: "power1.out"
        //         })

        //         gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
        //             autoAlpha: 0
        //         },);
        //     }
        // })
        // end of first tree container
        // .addLabel("focusSection", "+=1")
        // // hiding of first tree container
        // .to(".tree-container.is--first .tree-child-wrapper:not(.is--three)", {
        //     autoAlpha: 0
        // }, "focusSection")
        // .to(" .tree-container.is--first .tree-horizontal-line", {
        //     // width: "+=12.5rem",
        //     autoAlpha: 0,
        //     transformOrigin: "center"
        // }, "focusSection")

        // .to(".tree-container.is--first .tree-header-wrapper", {
        //     transformOrigin: "top",
        //     autoAlpha: 0
        // }, "focusSection")
        // .to(".tree-container.is--first .tree-child-wrapper.is--three", {
        //     yPercent: -302,
        //     duration: 2,

        // }, "<")
        // .to(".tree-container.is--first .tree-child-wrapper.is--three .line", {
        //     autoAlpha: 0,
        //     duration: 0.1,
        // }, "<")


        //  beginning of second tree container
        .to(".tree-container.is--first .tree-child-wrapper.is--three", {
            autoAlpha: 0,
        })
        .to(".tree-container.is--second .tree-header-wrapper .label", {
            autoAlpha: 1,
        }, "<")
        .to(".tree-container.is--second .tree-header-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--second .tree-horizontal-line", {
            scaleX: 1,
            duration: 2,
        })
        .to(".tree-container.is--second .tree-child-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--second .tree-child-wrapper .label", {
            autoAlpha: 1,
            onStart: function () {
                scrambleChildLabelTwo.play(0);
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            },
            onReverseComplete: function () {
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

            }
        })

        .to({}, {
            duration: 3, // Adjust this: 3 = more scroll distance to read
            ease: "none"
        })

        .addLabel("focusSection", "+=1")
        .to({}, {
            duration: 0.01, // Minimal duration
            onStart: function () {
                gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe p[data-split='lines'].is--first .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            },
            onReverseComplete: function () {
                gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe p[data-split='lines'].is--first .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            }
        })
        .to({}, {
            duration: 3, // Adjust this: 3 = more scroll distance to read
            ease: "none"
        })
        // .to({}, {
        //     duration: 0.01,
        //     onStart: function () {
        //         gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
        //             yPercent: -100,  // or 100 to slide down, -100 to slide up
        //             duration: .6,
        //             stagger: 0.05,
        //             ease: "power1.out"
        //         })
        //     },
        //     onReverseComplete: function () {
        //         // Show it again when scrolling back
        //         gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
        //             yPercent: 0,
        //             duration: .6,
        //             stagger: 0.05,
        //             ease: "power1.out"
        //         })
        //     }
        // })
        .addLabel("focusSection", "+=1")



        // hiding of second tree container
        .to(".tree-container.is--second .tree-child-wrapper:not(.is--three)", {
            autoAlpha: 0
        }, "focusSection")
        .to(" .tree-container.is--second .tree-horizontal-line", {
            // width: "+=12.5rem",
            autoAlpha: 0,
            transformOrigin: "center"
        }, "focusSection")
        .to(".tree-container.is--second .tree-header-wrapper", {
            transformOrigin: "top",
            autoAlpha: 0
        }, "focusSection")
        .to(".tree-container.is--second .tree-child-wrapper:not(.is--three)", {
            autoAlpha: 0
        }, "focusSection")
        .to(".tree-container.is--second .tree-child-wrapper.is--three", {
            yPercent: -302,
            duration: 2,

        }, "focusSection")
        .to(".tree-container.is--second .tree-child-wrapper.is--three .line", {
            autoAlpha: 0,
            duration: 0.1,
        }, "focusSection")


        // beginning of third tree container

        .to(".tree-container.is--second .tree-child-wrapper.is--three", {
            autoAlpha: 0,
        })
        .to(".tree-container.is--three .tree-header-wrapper .label", {
            autoAlpha: 1,
        }, "<")
        .to(".tree-container.is--three .tree-header-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--three .tree-horizontal-line", {
            scaleX: 1,
            duration: 2,
        })
        .to(".tree-container.is--three .tree-child-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--three .tree-child-wrapper .label", {
            autoAlpha: 1,

            onStart: function () {
                scrambleChildLabelThree.play(0);

                gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner, .section.is--groupe h2[data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })


                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })



            },
            onReverseComplete: function () {
                gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner, .section.is--groupe h2[data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            }
        })
        .addLabel("focusSection", "+=1")

        // hiding of third tree container
        .to(".tree-container.is--three .tree-child-wrapper:not(.is--one), .tree-container.is--three .tree-horizontal-line, .tree-container.is--three .tree-header-wrapper, .tree-container.is--three .tree-child-wrapper.is--one .line", {
            autoAlpha: 0,
            duration: 1.2,

        }, "focusSection")




    // we move "toi" to the top on mobile only
    mm.add("(max-width: 767px)", () => {
        console.log("mobile");
        treeTlOne.to(".tree-container.is--three .tree-child-wrapper.is--one", {
            yPercent: -770, // adjust as needed
            duration: 3,
        }, "focusSection");

    })


    treeTlOne.addLabel("focusSection", "+=1")

    // start of compare animation, we scale the lines depending on the width of the screen
    treeTlOne.from(".tree-left-side .line", {
        scaleX: window.innerWidth <= 767 ? 1 : 0,
        scaleY: window.innerWidth <= 767 ? 0 : 1,
        transformOrigin: window.innerWidth <= 767 ? "top" : "left",

    }, "focusSection")


        .from(".tree-container.is--compare .line.is--vertical", {
            scaleX: window.innerWidth <= 767 ? 0 : 1,
            scaleY: window.innerWidth <= 767 ? 1 : 0,
            transformOrigin: "center",

        })

        .from(".tree-container.is--compare .tree-right-wrapper .line", {
            scaleX: window.innerWidth <= 767 ? 1 : 0,
            scaleY: window.innerWidth <= 767 ? 0 : 1,
            transformOrigin: window.innerWidth <= 767 ? "top" : "left",
            duration: 1.2,
        })


        .to(".tree-container.is--compare .tree-right-wrapper .label", {
            autoAlpha: 1,


            onStart: function () {

                scrambleChildLabelCompare.play(0);
                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.set(".label.color.is--compare", {
                    autoAlpha: 1,
                })
                gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                    autoAlpha: 0,
                })
                // gsap.to(".header-section.is--groupe, .header-section", {
                //     autoAlpha: 0,
                // })

                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    autoAlpha: 0
                },);

                gsap.to(".section.is--compare .header-title, .section.is--compare .header-number", {
                    duration: 1,
                    onStart: function () {
                        gsap.set(".section.is--compare .header-title, .section.is--compare .header-number", {
                            autoAlpha: 1
                        });
                    },

                    scrambleText: {
                        text: "{original}",
                        chars: 'upperCase',
                        speed: 1,
                        // tweenLength: false,
                    }
                },);

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

            },
            onReverseComplete: function () {
                gsap.set(".label.color.is--compare", {
                    autoAlpha: 0,
                })
                gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                    autoAlpha: 1,
                })
                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
                gsap.to(".header-section.is--groupe, .header-section", {
                    autoAlpha: 1,
                })

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    autoAlpha: 1
                },);

                gsap.to(".section.is--compare .header-title, .section.is--compare .header-number", {
                    autoAlpha: 0
                },);
            }
        })

        .addLabel("focusSection", "+=1")

        // white line is coming in
        .from(".tree-container.is--compare .tree-left-side .line-clr", {
            scaleX: window.innerWidth <= 767 ? 1 : 0,
            scaleY: window.innerWidth <= 767 ? 0 : 1,
            transformOrigin: window.innerWidth <= 767 ? "top" : "left",
            duration: 1.2,
            ease: "linear",
        }, "focusSection")


        .from(".tree-container.is--compare .tree-left-side .line-vertical-clr", {
            scaleX: window.innerWidth <= 767 ? 0 : 1,
            scaleY: window.innerWidth <= 767 ? 1 : 0,
            transformOrigin: window.innerWidth <= 767 ? "right" : "top",
            duration: 1.2,
            ease: "linear",
        })

        //dot is coming in
        .from(".tree-container.is--compare .dot-wrapper", {
            autoAlpha: 0,
            onStart: function () {
                gsap.fromTo(".tree-container.is--compare .dot-wrapper .dot .dot-bg", {
                    scale: 0,
                    autoAlpha: 1
                }, {
                    scale: 1.2,
                    autoAlpha: 0,
                    duration: 1.2,
                    repeat: -1,
                    ease: "power1.inOut"
                })
            },

        })

        // scramble animation of inscription rc
        .to(".tree-container.is--compare .inscription-rc", {
            autoAlpha: 1,
            overwrite: true,
            onStart: function () {
                scrambleInscriptionRc.play(0);
            }
        })
        .to({}, {
            duration: 2,
        })
        .to(".tree-container.is--three .label", {
            autoAlpha: 0,
            duration: 0.1,
        }, "<")

        .addLabel("timeline", "+=1")

    // desktop only
    mm.add("(min-width: 768px)", () => {

        treeTlOne
            .to(".tree-wrapper.is--compare", {
                // Set transform origin with the offset
                duration: 5,
                transformOrigin: () => {
                    const treeLeftSide = document.querySelector(".tree-left-side");
                    const treeLeftSideWidth = treeLeftSide ? treeLeftSide.offsetWidth : 0;
                    // Set origin to the offset position from left, and bottom
                    return `${treeLeftSideWidth}px bottom`;
                },

                // Scale by 2
                scale: 2,

                // Now we don't need to subtract the offset since it's built into the transform origin
                x: () => {
                    const element = document.querySelector(".tree-wrapper.is--compare");
                    if (!element) return 0;

                    const rect = element.getBoundingClientRect();
                    const currentLeft = rect.left;

                    // Since transform origin is already offset, just center normally
                    const treeLeftSide = document.querySelector(".tree-left-side");
                    const treeLeftSideWidth = treeLeftSide ? treeLeftSide.offsetWidth : 0;
                    const targetLeft = window.innerWidth / 2;

                    // Adjust for the transform origin offset
                    return targetLeft - currentLeft - treeLeftSideWidth;
                },

                y: () => {
                    const element = document.querySelector(".tree-wrapper.is--compare");
                    if (!element) return 0;
                    const rect = element.getBoundingClientRect();
                    const currentBottom = rect.bottom;
                    const targetBottom = window.innerHeight / 2;
                    return targetBottom - currentBottom;
                },

                ease: "power2.inOut",

            }, "timeline")

            .to(".line.is--reallywant", {
                scaleY: .5,
                scaleX: 1,
                ease: "power2.inOut",
                duration: 5,
                transformOrigin: "left center"
            }, "<")

            .to(".dot-wrapper", {
                scale: .5,
                ease: "power2.inOut",
                duration: 5,
                transformOrigin: "left 70%"  // Changed from "bottom left" to "left center"
            }, "<")

            // Fade out animations remain the same
            .to(".tree-wrapper.is--compare .tree-left-side, .tree-wrapper.is--compare .line.is--vertical, .tree-wrapper.is--compare .line-wrapper-top", {
                autoAlpha: 0,
                duration: 5,
                ease: "power2.inOut",
                onStart: function () {
                    gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                        yPercent: -100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "expo.out"
                    })
                },
                onReverseComplete: function () {
                    gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "expo.out"
                    })
                },

            }, "<")



            .to(".tree-container.is--compare .inscription-rc", {
                autoAlpha: 0,
                duration: 1,
            }, "-=0.1")  // Slight overlap for smooth fade



        // we move the line to the position of the other line
        // treeTlOne.add(Flip.fit(".section.is--compare .tree-right-wrapper .line-wrapper-bottom", ".section.is--timeline .timeline-wrapper", {
        //     ease: "none",
        //     duration: 4,
        //     onStart: function () {
        //         gsap.to(".section.is--compare [data-split='lines'] ", {
        //             autoAlpha: 0,
        //         })
        //     },
        //     onReverseComplete: function () {
        //         gsap.to(".section.is--compare [data-split='lines'] ", {
        //             autoAlpha: 1,
        //         })
        //     }
        // },))

        // we make the long line grow

        // Helper function to create the SVG turbulence filter for electric effect
        function createElectricSVGFilter() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.position = 'absolute';
            svg.style.width = '0';
            svg.style.height = '0';

            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', 'turbulent-displace');
            filter.setAttribute('colorInterpolationFilters', 'sRGB');
            filter.setAttribute('x', '-20%');
            filter.setAttribute('y', '-20%');
            filter.setAttribute('width', '140%');
            filter.setAttribute('height', '140%');

            // Create first turbulence + offset pair (vertical)
            const turbulence1 = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence1.setAttribute('type', 'turbulence');
            turbulence1.setAttribute('baseFrequency', '0.02');
            turbulence1.setAttribute('numOctaves', '10');
            turbulence1.setAttribute('result', 'noise1');
            turbulence1.setAttribute('seed', '1');

            const offset1 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
            offset1.setAttribute('in', 'noise1');
            offset1.setAttribute('dx', '0');
            offset1.setAttribute('dy', '0');
            offset1.setAttribute('result', 'offsetNoise1');

            const animate1 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate1.setAttribute('attributeName', 'dy');
            animate1.setAttribute('values', '700; 0');
            animate1.setAttribute('dur', '6s');
            animate1.setAttribute('repeatCount', 'indefinite');
            animate1.setAttribute('calcMode', 'linear');
            offset1.appendChild(animate1);

            // Create second turbulence + offset pair (vertical opposite)
            const turbulence2 = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence2.setAttribute('type', 'turbulence');
            turbulence2.setAttribute('baseFrequency', '0.02');
            turbulence2.setAttribute('numOctaves', '10');
            turbulence2.setAttribute('result', 'noise2');
            turbulence2.setAttribute('seed', '1');

            const offset2 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
            offset2.setAttribute('in', 'noise2');
            offset2.setAttribute('dx', '0');
            offset2.setAttribute('dy', '0');
            offset2.setAttribute('result', 'offsetNoise2');

            const animate2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate2.setAttribute('attributeName', 'dy');
            animate2.setAttribute('values', '0; -700');
            animate2.setAttribute('dur', '6s');
            animate2.setAttribute('repeatCount', 'indefinite');
            animate2.setAttribute('calcMode', 'linear');
            offset2.appendChild(animate2);

            // Create third turbulence + offset pair (horizontal)
            const turbulence3 = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence3.setAttribute('type', 'turbulence');
            turbulence3.setAttribute('baseFrequency', '0.02');
            turbulence3.setAttribute('numOctaves', '10');
            turbulence3.setAttribute('result', 'noise3');
            turbulence3.setAttribute('seed', '2');

            const offset3 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
            offset3.setAttribute('in', 'noise3');
            offset3.setAttribute('dx', '0');
            offset3.setAttribute('dy', '0');
            offset3.setAttribute('result', 'offsetNoise3');

            const animate3 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate3.setAttribute('attributeName', 'dx');
            animate3.setAttribute('values', '490; 0');
            animate3.setAttribute('dur', '6s');
            animate3.setAttribute('repeatCount', 'indefinite');
            animate3.setAttribute('calcMode', 'linear');
            offset3.appendChild(animate3);

            // Create fourth turbulence + offset pair (horizontal opposite)
            const turbulence4 = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence4.setAttribute('type', 'turbulence');
            turbulence4.setAttribute('baseFrequency', '0.02');
            turbulence4.setAttribute('numOctaves', '10');
            turbulence4.setAttribute('result', 'noise4');
            turbulence4.setAttribute('seed', '2');

            const offset4 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
            offset4.setAttribute('in', 'noise4');
            offset4.setAttribute('dx', '0');
            offset4.setAttribute('dy', '0');
            offset4.setAttribute('result', 'offsetNoise4');

            const animate4 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate4.setAttribute('attributeName', 'dx');
            animate4.setAttribute('values', '0; -490');
            animate4.setAttribute('dur', '6s');
            animate4.setAttribute('repeatCount', 'indefinite');
            animate4.setAttribute('calcMode', 'linear');
            offset4.appendChild(animate4);

            // Composite the noise layers
            const composite1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            composite1.setAttribute('in', 'offsetNoise1');
            composite1.setAttribute('in2', 'offsetNoise2');
            composite1.setAttribute('result', 'part1');

            const composite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            composite2.setAttribute('in', 'offsetNoise3');
            composite2.setAttribute('in2', 'offsetNoise4');
            composite2.setAttribute('result', 'part2');

            // Blend the composites
            const blend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
            blend.setAttribute('in', 'part1');
            blend.setAttribute('in2', 'part2');
            blend.setAttribute('mode', 'color-dodge');
            blend.setAttribute('result', 'combinedNoise');

            // Displacement map
            const displace = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
            displace.setAttribute('in', 'SourceGraphic');
            displace.setAttribute('in2', 'combinedNoise');
            displace.setAttribute('scale', '30');
            displace.setAttribute('xChannelSelector', 'R');
            displace.setAttribute('yChannelSelector', 'B');

            // Append all elements
            filter.appendChild(turbulence1);
            filter.appendChild(offset1);
            filter.appendChild(turbulence2);
            filter.appendChild(offset2);
            filter.appendChild(turbulence3);
            filter.appendChild(offset3);
            filter.appendChild(turbulence4);
            filter.appendChild(offset4);
            filter.appendChild(composite1);
            filter.appendChild(composite2);
            filter.appendChild(blend);
            filter.appendChild(displace);

            defs.appendChild(filter);
            svg.appendChild(defs);
            document.body.appendChild(svg);
        }

        // Helper function to create electric effect elements
        function createElectricEffects() {
            const container = document.createElement('div');
            container.className = 'electric-container';
            
            // Get the position of the progress line
            const progressLine = document.querySelector(".line-progress");
            const grayLine = document.querySelector(".tree-wrapper.is--compare .line.is--reallywant");
            if (progressLine) {
                const rect = progressLine.getBoundingClientRect();
                container.style.top = rect.top + 'px';
                container.style.left = '0';
                container.style.width = '100%';
                container.style.height = rect.height + 'px';
            } else if (grayLine) {
                const rect = grayLine.getBoundingClientRect();
                container.style.top = (rect.top + rect.height / 2) + 'px';
                container.style.left = '0';
                container.style.width = '100%';
                container.style.height = '2px';
            }
            
            // Create electric border (with turbulence filter)
            const electricBorder = document.createElement('div');
            electricBorder.className = 'electric-border';
            
            // Create glow layers
            const glow1 = document.createElement('div');
            glow1.className = 'electric-glow-1';
            
            const glow2 = document.createElement('div');
            glow2.className = 'electric-glow-2';
            
            // Create overlay effects
            const overlay1 = document.createElement('div');
            overlay1.className = 'electric-overlay-1';
            
            const overlay2 = document.createElement('div');
            overlay2.className = 'electric-overlay-2';
            
            // Create background glow
            const backgroundGlow = document.createElement('div');
            backgroundGlow.className = 'electric-background-glow';
            
            // Append all elements to container
            container.appendChild(backgroundGlow);
            container.appendChild(glow2);
            container.appendChild(glow1);
            container.appendChild(electricBorder);
            container.appendChild(overlay1);
            container.appendChild(overlay2);
            
            // Append container to body
            document.body.appendChild(container);
            
            console.log('Electric elements created:', {
                container: container,
                border: electricBorder,
                filter: document.querySelector('#turbulent-displace')
            });
        }

        // START HORIZONTAL TIMELINE
        // const containerWidth = document.querySelector(".timeline-container").offsetWidth;
        // const containerMovement = containerWidth * 0.5; // 50% of container width
        // Get all panels and calculate total width
        const panels = gsap.utils.toArray(".timeline-panel");
        const containerEl = document.querySelector(".timeline-container");
        const panelsWrapper = document.querySelector(".timeline-panels-wrapper");

        // Calculate total panels width
        let totalPanelsWidth = 0;
        panels.forEach(panel => {
            totalPanelsWidth += panel.offsetWidth;
        });

        // Set container width to match content
        gsap.set(containerEl, {
            width: totalPanelsWidth + "px"
        });

        // Calculate how much to move (total width minus viewport width)
        const scrollDistance = totalPanelsWidth - window.innerWidth;
        const scrollPercentage = (scrollDistance / totalPanelsWidth) * 100;


        gsap.set(".timeline-panel.is--fixed", { autoAlpha: 0 })

        gsap.set(".timeline-panel.is--1", { minWidth: "150vw" })



        document.querySelectorAll('[data-target]').forEach(el => {
            const valueSpan = el.querySelector('.stat-value');
            if (valueSpan) {
                // Temporarily set to target value to measure width
                const target = el.dataset.target;
                valueSpan.textContent = target;
                const maxWidth = valueSpan.offsetWidth;

                // Set fixed width and reset to 0
                valueSpan.style.display = 'inline-block';
                valueSpan.style.width = maxWidth + 'px';
                valueSpan.style.textAlign = 'right'; // Align numbers to the right
                valueSpan.textContent = '0';
            }
        });

        treeTlOne
            .addLabel("horizontalStart")
            // First, create the white progress line before the animation starts
            .to({}, {
                duration: 0.001,
                onComplete: function () {
                    // Create the white progress line as a fixed element
                    if (!document.querySelector(".line-progress")) {
                        const progressLine = document.createElement("div");
                        progressLine.className = "line-progress";

                        // Get the actual position of the gray line after all transforms
                        const grayLine = document.querySelector(".tree-wrapper.is--compare .line.is--reallywant");
                        let grayLineTop = window.innerHeight / 2; // Default to center
                        if (grayLine) {
                            const grayLineRect = grayLine.getBoundingClientRect();
                            grayLineTop = grayLineRect.top + (grayLineRect.height / 2); // Get the vertical center of the gray line
                        }

                        progressLine.style.cssText = `
    position: fixed;
    top: ${grayLineTop}px;  /* Use the exact position of the gray line */
    left: 0;  /* Start from left edge of screen */
    width: 50%;  /* Width to center of screen */
    height: 2px;  /* Match the gray line height */
    background-color: white;
    transform: translateY(-50%) scaleX(0);  /* Center vertically and start scaled to 0 */
    transform-origin: right center;  /* Scale from right edge (at screen center) */
    z-index: 50;
`;
                        // Append to body instead of inside the scaled container
                        document.body.appendChild(progressLine);
                    }

                    // Make sure the timeline section is visible
                    gsap.set(".section.is--timeline", {
                        autoAlpha: 1
                    });

                    // Reset the gray line position
                    gsap.set(".tree-wrapper.is--compare .line.is--reallywant", {
                        transformOrigin: "left center",
                        x: 0
                    });
                }
            }, "horizontalStart")

            // Now animate the timeline container with the progress updates
            .to(".section.is--timeline .timeline-container", {
                x: -scrollDistance,
                ease: "none",
                duration: 35,

                onUpdate: function (self) {
                    // Get the progress directly from the tween (0 to 1)
                    const progress = this.progress();

                    // Debug log to see if it's updating

                    // White line grows quickly at the beginning
                    let whiteLineProgress;
                    if (progress < 0.2) {
                        // In the first 20% of scroll, white line grows to full size
                        whiteLineProgress = progress / 0.1;  // Goes from 0 to 1
                    } else {
                        // After that, white line stays at full size
                        whiteLineProgress = 1;
                    }

                    // Update the white progress line
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        // Use transform to maintain the vertical centering while scaling
                        gsap.set(progressLine, {
                            transform: `translateY(-50%) scaleX(${whiteLineProgress})`
                        });

                        // Update electric container position if it exists
                        const electricContainer = document.querySelector('.electric-container');
                        if (electricContainer && whiteLineProgress > 0) {
                            // Update the scaleX of all electric elements to match the progress line
                            const electricBorder = electricContainer.querySelector('.electric-border');
                            const electricGlow1 = electricContainer.querySelector('.electric-glow-1');
                            const electricGlow2 = electricContainer.querySelector('.electric-glow-2');
                            const electricOverlay1 = electricContainer.querySelector('.electric-overlay-1');
                            const electricOverlay2 = electricContainer.querySelector('.electric-overlay-2');
                            const electricBg = electricContainer.querySelector('.electric-background-glow');
                            
                            if (electricBorder && electricBorder.style.opacity !== '0') {
                                gsap.set(electricBorder, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                            if (electricGlow1 && electricGlow1.style.opacity !== '0') {
                                gsap.set(electricGlow1, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                            if (electricGlow2 && electricGlow2.style.opacity !== '0') {
                                gsap.set(electricGlow2, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                            if (electricOverlay1) {
                                gsap.set(electricOverlay1, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                            if (electricOverlay2) {
                                gsap.set(electricOverlay2, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                            if (electricBg) {
                                gsap.set(electricBg, {
                                    transform: `scaleX(${whiteLineProgress})`
                                });
                            }
                        }
                    }

                    // Move the gray line at the end
                    const grayLine = document.querySelector(".tree-wrapper.is--compare .line.is--reallywant");
                    if (grayLine) {
                        if (progress > 0.8) {
                            // In the last 20% of scroll, start moving the gray line
                            const endProgress = (progress - 0.8) / 0.2; // 0 to 1 for the last 20%

                            // Calculate how much to move the gray line
                            const grayLineWidth = grayLine.getBoundingClientRect().width;
                            const moveDistance = (grayLineWidth / 2); // Half the width to get right edge to center

                            gsap.set(grayLine, {
                                x: -endProgress * moveDistance
                            });
                        } else {
                            // Keep gray line in place
                            gsap.set(grayLine, {
                                x: 0
                            });
                        }
                    }
                },

                onStart: function () {
                    // Hide compare section headers
                    gsap.to(".section.is--compare .header-title, .section.is--compare .header-number", {
                        autoAlpha: 0
                    });

                    // Show timeline section headers
                    gsap.to(".section.is--timeline .header-title, .section.is--timeline .header-number", {
                        duration: 1,
                        onStart: function () {
                            gsap.set(".section.is--timeline .header-title, .section.is--timeline .header-number", {
                                autoAlpha: 1
                            });
                        },
                        scrambleText: {
                            text: "{original}",
                            chars: 'upperCase',
                            speed: 1,
                        }
                    });
                },

                onComplete: function () {
                    console.log("Timeline animation complete");
                    // Ensure final state
                    const grayLine = document.querySelector(".tree-wrapper.is--compare .line.is--reallywant");
                    if (grayLine) {
                        const grayLineWidth = grayLine.getBoundingClientRect().width;
                        gsap.set(grayLine, {
                            x: -(grayLineWidth / 2)
                        });
                    }
                },

                onReverseComplete: function () {
                    // Clean up the white line when reversing
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        progressLine.remove();
                    }
                }

            }, "<")  // Slight delay to ensure white line is created first

            // ADD THIS: Counter-animation for fixed panels
            .to(".timeline-panel.is--fixed", {
                x: scrollDistance, // Exact opposite of -50
                ease: "none",
                duration: 35, // Same duration as container
            }, "<") // Use same label to sync perfectly

            // Now you can animate it properly
            .to(".section.is--timeline, .section.is--compare", {
                autoAlpha: 0,
                duration: 2,
                ease: "power2.inOut",

                onStart: function () {
                    const element = document.querySelector(".line-progress");
                    console.log(element);

                    gsap.to(element, {
                        autoAlpha: 0
                    })

                },

                onReverseComplete: function () {
                    const element = document.querySelector(".line-progress");
                    console.log(element);

                    gsap.to(element, {
                        autoAlpha: 1
                    })

                }
            })

            .to(".timeline-panel.is--fixed.is--2", { autoAlpha: 1 }, "horizontalStart+=4")
            .to(".timeline-panel.is--fixed.is--2", { autoAlpha: 0 }, "horizontalStart+=9")
            .to(".timeline-panel.is--fixed.is--4", { autoAlpha: 1 }, "horizontalStart+=10")
            // When showing panel 4, SUPER SAIYAN MODE!
            .to(".timeline-panel.is--fixed.is--4", {
                autoAlpha: 1,
                onStart: function () {
                    console.log('Super Saiyan Mode Activating!');
                    
                    // Create SVG filter if it doesn't exist
                    if (!document.querySelector('#turbulent-displace')) {
                        console.log('Creating SVG filter...');
                        createElectricSVGFilter();
                        console.log('SVG filter created:', document.querySelector('#turbulent-displace'));
                    }
                    
                    // Create electric effect container if it doesn't exist
                    if (!document.querySelector('.electric-container')) {
                        console.log('Creating electric container...');
                        createElectricEffects();
                        console.log('Electric container created:', document.querySelector('.electric-container'));
                    }
                    
                    // Add base effect to the white line
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        console.log('Adding base effects to progress line');
                        progressLine.style.boxShadow = "0 0 20px #dd8448, 0 0 40px #dd8448";
                        progressLine.style.backgroundColor = "#dd8448";
                    }

                    // Activate Super Saiyan electric effects
                    const electricContainer = document.querySelector('.electric-container');
                    if (electricContainer) {
                        // Position the container based on progress line
                        const progressLine = document.querySelector(".line-progress");
                        if (progressLine) {
                            const rect = progressLine.getBoundingClientRect();
                            electricContainer.style.top = (rect.top - 2) + 'px'; // Adjust for border
                            electricContainer.style.height = (rect.height + 4) + 'px';
                        }
                        
                        // Get the current scale of the progress line and apply to electric elements
                        const progressLineTransform = progressLine ? window.getComputedStyle(progressLine).transform : '';
                        const electricBorder = document.querySelector('.electric-border');
                        if (electricBorder && progressLineTransform && progressLineTransform !== 'none') {
                            // Extract scaleX value from the transform matrix
                            const matrix = new DOMMatrix(progressLineTransform);
                            const scaleX = matrix.a; // 'a' is the scaleX component
                            electricBorder.style.transform = `scaleX(${scaleX})`;
                        }
                        
                        // Animate electric elements in
                        gsap.to('.electric-border', {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out",
                            onComplete: function() {
                                console.log('Electric border animated in:', document.querySelector('.electric-border'));
                            }
                        });

                        gsap.to('.electric-glow-1', {
                            opacity: 0.8,
                            duration: 0.4,
                            delay: 0.1,
                            ease: "power2.out"
                        });

                        gsap.to('.electric-glow-2', {
                            opacity: 0.6,
                            duration: 0.4,
                            delay: 0.15,
                            ease: "power2.out"
                        });

                        gsap.to('.electric-overlay-1', {
                            opacity: 0.4,
                            duration: 0.5,
                            delay: 0.2,
                            ease: "power2.out"
                        });

                        gsap.to('.electric-overlay-2', {
                            opacity: 0.3,
                            duration: 0.5,
                            delay: 0.25,
                            ease: "power2.out"
                        });

                        gsap.to('.electric-background-glow', {
                            opacity: 0.3,
                            duration: 0.6,
                            delay: 0.3,
                            ease: "power2.out"
                        });
                    }

                    // Add pulsing glow to the center dot
                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.to(centerDot, {
                            boxShadow: "0 0 30px rgb(255, 202, 28), 0 0 60px rgb(255, 201, 5)",
                            scale: 1.2,
                            duration: 0.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "power2.inOut",
                            zIndex: 100
                        });
                        centerDot.style.backgroundColor = "rgb(255, 196, 0)";
                    }
                },
                onReverseComplete: function () {
                    // Remove Super Saiyan effects when scrolling back
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        progressLine.style.boxShadow = "";
                        progressLine.style.backgroundColor = "white";
                    }

                    // Animate electric elements out
                    gsap.to('.electric-border, .electric-glow-1, .electric-glow-2, .electric-overlay-1, .electric-overlay-2, .electric-background-glow', {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });

                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.killTweensOf(centerDot);
                        centerDot.style.boxShadow = "";
                        centerDot.style.backgroundColor = "";
                        gsap.set(centerDot, { scale: 1 });
                    }
                }
            }, "horizontalStart+=10")
            .to({}, {
                duration: 25,
                onUpdate: function () {
                    const progress = this.progress();

                    // Update each stat based on progress
                    document.querySelectorAll('[data-target]').forEach(el => {
                        const target = parseFloat(el.dataset.target);
                        const currentValue = Math.round(target * progress);
                        const valueSpan = el.querySelector('.stat-value');

                        if (valueSpan) {
                            // Determine how many digits the target has
                            const targetLength = Math.abs(target).toString().length;

                            // Pad the current value with leading zeros
                            let paddedValue = Math.abs(currentValue).toString().padStart(targetLength, '0');

                            // Add negative sign back if needed
                            if (target < 0) {
                                paddedValue = '-' + paddedValue;
                            }

                            valueSpan.textContent = paddedValue;
                        }
                    });
                }
            }, "horizontalStart+=10")
            // .to({}, {
            //     duration: 1 // Pause before map
            // })

            // // we scale the white line to the full width with the scroll
            // .from(".section.is--timeline .white-line", {
            //     scaleX: 0,
            //     transformOrigin: "left",
            //     ease: "none",
            //     duration: 35,
            // }, "horizontal")


            //we make the different element appear trough the timeline
            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },
            //     onReverseComplete: function () {
            //         // gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
            //         //     yPercent: 100,
            //         //     duration: 1,
            //         //     ease: "power2.out"
            //         // },)

            //         gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
            //             yPercent: 100,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)

            //         gsap.to(".panel.is--second .text-wrapper.is--second [data-split='lines'] .lineInner", {
            //             yPercent: 100,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     }
            // }, "<")
            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--second .text-wrapper.is--second [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },
            //     onReverseComplete: function () {
            //         // gsap.to(".panel.is--second .text-wrapper.is--second [data-split='lines'] .lineInner", {
            //         //     yPercent: 100,
            //         //     duration: 1,
            //         //     ease: "power2.out"
            //         // },)
            //     }
            // }, "<+=3")

            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--third .text-wrapper.is--third [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //         gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
            //             autoAlpha: 1,
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },
            //     // onReverseComplete: function () {
            //     //     gsap.to(".panel.is--third .text-wrapper.is--third [data-split='lines'] .lineInner", {
            //     //         yPercent: 100,
            //     //         duration: 1,
            //     //         ease: "power2.out"
            //     //     },)
            //     //     gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
            //     //         autoAlpha: 0,
            //     //         yPercent: 10,
            //     //         duration: 1,
            //     //         ease: "power2.out"
            //     //     },)
            //     // }
            // }, "<+=3")

            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--third .text-wrapper.is--fourth [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },
            //     // onReverseComplete: function () {
            //     //     gsap.to(".panel.is--third .text-wrapper.is--fourth [data-split='lines'] .lineInner", {
            //     //         yPercent: 100,
            //     //         duration: 1,
            //     //         ease: "power2.out"
            //     //     },)
            //     // }
            // }, "<+=3")

            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--fourth .text-wrapper.is--fifth [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },
            //     // onReverseComplete: function () {
            //     //     gsap.to(".panel.is--fourth .text-wrapper.is--fifth [data-split='lines'] .lineInner", {
            //     //         yPercent: 100,
            //     //         duration: 1,
            //     //         ease: "power2.out"
            //     //     },)
            //     // }
            // }, "<+=3")
            // .to({}, {
            //     duration: 0.001,
            //     onStart: function () {
            //         gsap.to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
            //             yPercent: 0,
            //             duration: 1,
            //             ease: "power2.out"
            //         },)
            //     },

            //     // onReverseComplete: function () {
            //     //     gsap.to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
            //     //         yPercent: 100,
            //     //         duration: 1,
            //     //         ease: "power2.out"
            //     //     },)
            //     // }
            // }, "<+=3")

            // .to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
            //     autoAlpha: 0,
            // },)
            // .to(".timeline-wrapper", {
            //     autoAlpha: 0,

            //     onStart: function () {
            //         gsap.to(".section.is--timeline .header-title, .section.is--timeline .header-number", {
            //             autoAlpha: 0
            //         },);
            //     },
            //     onReverseComplete: function () {
            //         gsap.to(".section.is--timeline .header-title, .section.is--timeline .header-number", {
            //             autoAlpha: 1
            //         },);
            //     }
            // },)
            .to(".map-svg path", {
                drawSVG: "0% 100%", // or "0 100" depending on your preference
                duration: 5,
                stagger: 0.05,
                ease: "power1.inOut",
                onStart: function () {
                    gsap.set(".map-svg", { autoAlpha: 1 });
                    gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                onReverseComplete: function () {
                    gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
                        yPercent: 100,
                        duration: 1,
                        ease: "power2.out"
                    },)
                }
            }, "-=2")

            .to(".tree-right-wrapper .dot-wrapper", {
                autoAlpha: 0,
                duration: 5,
            }, "<")

            .from(".map-container .dot-normal, .map-container .dot-video", {
                onStart: function () {
                    gsap.fromTo(".map-container .dot-video .dot-bg", {
                        scale: 0,
                        autoAlpha: 1,
                    }, {
                        scale: 1.3,
                        autoAlpha: 0,
                        duration: 1,
                        repeat: -1,
                        ease: "power1.inOut"
                    })

                },
                scale: 1.3,
                stagger: 0.5,
                autoAlpha: 0,
                duration: 5,
            }, "<")
            .from(".click-me", {
                autoAlpha: 0,
            }, "<")
            .to(".map-container", {
                yPercent: -50,
                xPercent: 30,
                scale: 1.6,
                duration: 10,
                ease: "power1.out"
            },)
            .to(".click-me", {
                autoAlpha: 0,
            }, "<")
            .to(".map-container mask rect", {
                xPercent: 10,
                yPercent: 50,
                scale: 1,
                duration: 5,
            }, "<")
        // Get all the dots, except the Barcelona one
        const allDots = gsap.utils.toArray(".dot-video, .dot-normal");
        const barcelonaDot = document.querySelector(".dot-barcelona");

        allDots.forEach(dot => {
            treeTlOne.add(
                Flip.fit(dot, barcelonaDot, {
                    duration: 1, // needed for Flip to work but overwritten by scrub
                    ease: "none"
                }), "<+=.3"
                // add all tweens at the same point in the timeline
            );
        });

        treeTlOne.to({}, {
            onStart: function () {
                console.log("start")
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: -100,
                })
                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 1,
                    duration: 1,
                    yPercent: 0,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.play();
                    }
                })

            },
            onReverseComplete: function () {
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: 100,
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 0,
                    duration: 1,
                    yPercent: 20,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.pause();
                        videoBarca.currentTime = 0;
                    }
                })
            }
        }, "<")
    })

    // same as above but on mobile
    mm.add("(max-width: 767px)", () => {


        // gsap.set(".section.is--timeline", {
        //     position: "absolute",
        //     top: "0",
        // })
        // const timelineOne = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".parent-section",
        //         start: "bottom top",
        //         endTrigger: ".section.is--timeline",
        //         end: "bottom top",
        //         pin: true,
        //         scrub: true,
        //         markers: true,

        //     },
        // });
        // gsap.set(".map-svg path", { drawSVG: "0% 100%" });
        gsap.set(".parent-section .section.is--timeline", {
            position: "relative"
        })
        gsap.set(".section.is--placeholder", {
            height: () => document.querySelector(".section.is--timeline").offsetHeight
        })

        gsap.set(".dot-video, .dot-normal", {
            scale: .5,
        })

        treeTlOne.add(Flip.fit(".section.is--compare .tree-right-wrapper .line-wrapper-bottom", ".section.is--timeline .timeline-wrapper", {
            ease: "none",
            duration: 1,
            // duration: 2,
            onStart: function () {
                console.log("start");

                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: -100,
                })
            },



            onReverseComplete: function () {
                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: 0,
                })
            }
        },))

        treeTlOne.to(".section.is--compare .is--reallywant", {

            height: "+=100vh",
            transformOrigin: "top",
            duration: 1,
            ease: "none"
        }, "<")

            .to(".section.is--compare .label.is--compare3", {

                y: "+=100vh",
                transformOrigin: "top",
                duration: 1,
                ease: "none"
            }, "<")

            .to(".section.is--compare .line-wrapper-top, .section.is--compare .line.is--vertical, .section.is--compare .tree-left-side", {
                autoAlpha: 0,
                // scale: .5
            }, "<")
            .to(".section.is--personnes .is--toi", {
                autoAlpha: 0,
                y: "-=300",
                ease: "none"

            }, "<")

            .to(".section.is--compare .is--reallywant, .section.is--compare .dot-wrapper", {
                autoAlpha: 0,
                duration: 0.001,
            },)

            .to(".section.is--timeline .timeline-wrapper, .section.is--timeline .dot-wrapper", {
                autoAlpha: 1,
                duration: 0.001,

                onStart: function () {

                    gsap.to(".panel [data-split='lines'] .lineInner", {
                        yPercent: 0,
                    })

                    gsap.to(".panel .t-inner-wrapper.is--spec", {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    })
                    // if (!hasCreatedTriggers) {

                    //     hasCreatedTriggers = true; // ✅ set the flag so it only runs once

                    //     document.querySelectorAll(".panel .text-wrapper").forEach(wrapper => {
                    //         ScrollTrigger.create({
                    //             trigger: wrapper,
                    //             start: "top center+=10%",
                    //             end: "bottom center",
                    //             markers: true,
                    //             onEnter: () => {
                    //                 gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
                    //                     yPercent: 0,
                    //                 })
                    //                 if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
                    //                     gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
                    //                         autoAlpha: 1,
                    //                         yPercent: 0,
                    //                         duration: 1,
                    //                         ease: "power2.out"
                    //                     })
                    //                 }
                    //                 console.log("entered");

                    //             },

                    //         });
                    //     });
                    // }


                    gsap.fromTo(".tree-container.is--timeline .dot-wrapper .dot .dot-bg", {
                        scale: 0,
                        autoAlpha: 1
                    }, {
                        scale: 1.2,
                        autoAlpha: 0,
                        duration: 1.2,
                        repeat: -1,
                        ease: "power1.inOut"
                    })


                    gsap.to(".section.is--compare .inscription-rc", {
                        autoAlpha: 0,
                    })
                },
                onReverseComplete: function () {
                    // gsap.set(".panel [data-split='lines'] .lineInner", {
                    //     yPercent: 100,
                    // })

                    // gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
                    //     autoAlpha: 0,
                    //     duration: 1,
                    //     ease: "power2.out"
                    // },)
                    gsap.to(".section.is--compare .inscription-rc", {
                        autoAlpha: 1,
                    })

                    gsap.to(".section.is--timeline .timeline-wrapper .white-line", {
                        scaleY: 0,
                        transformOrigin: "bottom",
                        duration: .5,
                        ease: "power2.out"
                    }, "<")

                    gsap.to(".panel [data-split='lines'] .lineInner", {
                        yPercent: 100,
                    })

                    gsap.to(".panel .t-inner-wrapper.is--spec", {
                        autoAlpha: 0,
                        yPercent: 10,
                        duration: 1,
                        ease: "power2.out"
                    })

                },
                onComplete: function () {
                    gsap.fromTo(".section.is--timeline .timeline-wrapper .white-line", {
                        scaleY: 0,
                    }, {
                        scaleY: 1,
                        transformOrigin: "bottom",
                        duration: .5,
                        ease: "power2.out"
                    }, "<")




                    // gsap.to(".panel [data-split='lines'] .lineInner", {
                    //     yPercent: 0,
                    // })

                    // gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
                    //     autoAlpha: 1,
                    //     yPercent: 0,
                    //     duration: 1,
                    //     ease: "power2.out"
                    // },)

                }
            }, "<")

        // gsap.set(".section.is--timeline .timeline-wrapper .white-line", {
        //     scaleY: 0,
        //     transformOrigin: "top"
        // });
        ScrollTrigger.create({
            trigger: ".section.is--placeholder",
            start: "top bottom",
            end: `+=${document.querySelector(".section.is--timeline .timeline-wrapper").offsetHeight}`,
            // scrub: 0,
            pin: ".section.is--timeline .timeline-wrapper .white-line",
            pinSpacing: true,
            // anticipatePin: 1,
            pinReparent: true,
            markers: false,
            // onEnter: function () {
            //     gsap.to(".section.is--timeline .timeline-wrapper .white-line", {
            //         scaleY: 1,
            //         transformOrigin: "bottom",
            //         duration: 1,
            //         ease: "power2.out"
            //     })
            // },

        })
        let once = false;
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".section.is--placeholder",
                start: "top bottom",
                end: `+=${document.querySelector(".section.is--timeline .timeline-wrapper").offsetHeight}`,
                // scrub: 0,
                pin: ".dot-wrapper.is--timeline",
                // invalidateOnRefresh: true,
                // anticipatePin: 1,
                pinReparent: true,
                markers: false,

            },

        });

        const pinDuration = window.innerHeight * 7; // because +=300%

        document.querySelector(".map-spacer").style.height = `${pinDuration}px`;


        const mapTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".map-spacer",
                start: "top bottom",
                end: `+=${pinDuration}`,
                pin: ".section.is--map",
                pinReparent: true,
                scrub: true,
                // invalidateOnRefresh: true,
                // markers: { startColor: "pink", endColor: "blue", fontSize: 20 }
            }, defaults: {
                duration: 1,
            }


        });

        mapTl.to(".map-svg path", {
            drawSVG: "0% 100%",

            onStart: function () {
                gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: 1,
                    ease: "power2.out"
                },)
            },
            onReverseComplete: function () {
                gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: 1,
                    ease: "power2.out"
                },)
            }
        })

            .from(".map-container .dot-normal, .map-container .dot-video", {
                onStart: function () {
                    gsap.fromTo(".map-container .dot-video .dot-bg", {
                        scale: 0,
                        autoAlpha: 1,
                    }, {
                        scale: 1.3,
                        autoAlpha: 0,
                        duration: 1,
                        repeat: -1,
                        ease: "power1.inOut"
                    })

                },
                autoAlpha: 0,
                duration: 3,
            }, "<")
            .from(".click-me", {
                autoAlpha: 0,
            }, "<")
            .to(".section.is--map .map-container", {
                scale: 2,
                duration: 3,
            }, "<")
            .to(".map-container", {
                yPercent: -85,
                xPercent: 45,
                scale: 2.6,
                duration: 3,
                ease: "power1.out"
            },)
            .to(".click-me", {
                autoAlpha: 0,
            }, "<")
            .to(".map-container mask rect", {
                xPercent: -10,
                yPercent: 25,
                duration: 3,
            }, "<")

        const allDots = gsap.utils.toArray(".dot-video, .dot-normal");
        const barcelonaDot = document.querySelector(".dot-barcelona");

        allDots.forEach(dot => {
            mapTl.add(
                Flip.fit(dot, barcelonaDot, {
                    duration: 1, // needed for Flip to work but overwritten by scrub
                    ease: "none"
                }), "<+=.03"
                // add all tweens at the same point in the timeline
            );
        });

        mapTl.to({}, {
            onStart: function () {
                console.log("start")
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: -100,
                })
                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.play();
                    }
                })
            },
            onReverseComplete: function () {
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: -100,
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 0,
                    duration: 1,
                    yPercent: 20,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.pause();
                        videoBarca.currentTime = 0;
                    }
                })

            }
        }, "<+=1")
        mapTl.to({}, {
            duration: 1
        },)
    })


}

function initVideoMap() {

    gsap.set(".video-modal", {
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    })
    gsap.set(".video-container", {
        autoAlpha: 0,
        yPercent: 20
    })

    gsap.set(".video-modal-bg", {
        autoAlpha: 0,
        // backdropFilter: "blur(10px)",
    })

    gsap.set(".video-2", {
        autoAlpha: 0,
    })
    gsap.set(".svg-play", {
        autoAlpha: 0,
    })

    gsap.set(".close-button", {
        top: 0,
    })
    const modal = document.querySelector('.video-modal');
    const playButton = modal.querySelector('.play-button');
    const video = modal.querySelector('video');
    const durationBox = modal.querySelector('.video-duration');
    const closeButton = document.querySelector('.close-button');
    const modalBg = document.querySelector('.video-modal-bg');
    const closeButtonText = closeButton.textContent.toUpperCase();
    let openingTl;


    function closeVideoModal() {
        const video = modal.querySelector('video');
        if (openingTl) {
            openingTl.kill();
        }

        window.lenis.start();
        const closeTl = gsap.timeline();

        closeTl
            .to(".close-button", {
                yPercent: 0,
                duration: 0.5,
                ease: "easeOutQuart"
            })
            .to(".video-container", {
                autoAlpha: 0,
                yPercent: 20,
                duration: 0.5,
                ease: "easeOutQuart"
            }, "<")
            .to(".video-modal-bg", {
                autoAlpha: 0,
                duration: 0.5,
                ease: "easeOutQuart"
            }, "<")
            .to(".video-2", {
                autoAlpha: 0,
                duration: 0.5,
                ease: "easeOutQuart"
            }, "<")
            .call(() => {
                video.pause();
                video.currentTime = 0;
                gsap.set(modal, {
                    pointerEvents: "none"
                });

                document.removeEventListener('keydown', handleEscKey);
            });
    }


    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    }
    closeButton.addEventListener('mouseenter', () => {
        gsap.to(closeButton, {
            duration: 0.5,
            scrambleText: {
                text: closeButtonText,
                chars: "upperCase",
                speed: 0.7,
            }
        });
    });

    closeButton.addEventListener('click', closeVideoModal);
    modalBg.addEventListener('click', closeVideoModal);
    playButton.addEventListener('click', () => {
        console.log("click");


        if (video.paused) {
            video.play();

            gsap.to(".svg-pause path", {
                morphSVG: ".svg-pause path",
                duration: 1,
                ease: "easeOutQuart"
            })
            // Here you could animate the play button to show pause state
        } else {
            video.pause();
            gsap.to(".svg-pause path", {
                morphSVG: ".svg-play path",
                duration: 1,
                ease: "easeOutQuart"
            })
            // Here you could animate the play button to show play state
        }
    });

    document.querySelectorAll('.dot-video').forEach(dot => {
        gsap.set(dot, {
            cursor: "pointer",
            pointerEvents: "auto",
        })
        dot.addEventListener('click', function () {
            const videoUrl = this.dataset.video;
            window.lenis.stop();

            video.src = videoUrl;
            video.currentTime = 0;


            gsap.set(modal, {
                pointerEvents: "auto",
            })
            // Create a single timeline for opening animations
            openingTl = gsap.timeline();

            openingTl
                .to(".video-container", {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "easeOutQuart"
                })
                .to(".video-modal-bg", {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "easeOutQuart"
                }, "<")
                .to(".close-button", {
                    yPercent: -140,
                    duration: 1,
                    ease: "easeOutQuart",
                },) // Changed delay to timeline position


            document.addEventListener('keydown', handleEscKey);

            video.addEventListener('canplay', () => {
                gsap.to(".video-2", {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "easeOutQuart"
                });



                // Start playing once ready
                video.play();
            }, { once: true }); // only listen once for initial load

            // Handle play/pause toggle



            video.addEventListener('timeupdate', () => {
                const currentTime = video.currentTime;
                const mins = Math.floor(currentTime / 60);
                const secs = Math.floor(currentTime % 60).toString().padStart(2, '0');
                durationBox.textContent = `${mins}:${secs} `;
            });
            // video.play();
            // modal.style.display = "flex";
            // Show duration (wait for metadata to load)
            // video.onloadedmetadata = function () {
            //     const duration = video.duration; // seconds
            //     const mins = Math.floor(duration / 60);
            //     const secs = Math.floor(duration % 60).toString().padStart(2, '0');
            //     durationBox.textContent = `${mins}:${secs} min`;
            // };
        });
    });
}


function initSplit() {
    let elementToSplit = document.querySelectorAll('[data-split="lines"]');

    elementToSplit.forEach(target => {
        let splitInstance = new SplitText(target, {
            type: "lines",
            mask: "lines",
            linesClass: "lineInner",
            ignore: ".sup",
        });


    });


    let elementToSplitWords = document.querySelectorAll('[data-split="words"]');

    elementToSplitWords.forEach(target => {
        let splitInstance = new SplitText(target, {
            type: "words",
            mask: "words",
            wordsClass: "wordInner",
            ignore: ".sup",
        });
    });

}


function initAgeGate() {

    // scrollToTop();

    window.lenis.stop();
    gsap.set(" .header .logo ", {
        autoAlpha: 0,
    });
    gsap.set(".overlay-logo-wrapper", {
        position: "absolute",
    })

    gsap.set(".overlay-load", {
        backgroundColor: "rgba(0, 0, 0, 0)",
        position: "fixed",
        pointerEvents: "none",
    });
    const yesBtn = document.querySelector('.button.is--yes');
    const noBtn = document.querySelector('.button.is--no');

    let tl = gsap.timeline({ defaults: { ease: "easeOutQuart" } });

    // Number animation: uses an object for the value, then updates the text
    let numberObj = { val: 0 };
    tl.to(".overlay-logo-div", {
        xPercent: 100,
        duration: 1.5,
        ease: "easeInOutQuart",
        onComplete: function () {
            gsap.set(".overlay-logo-div", {
                autoAlpha: 0,
            })
        }
    }, 0) // <--- Start at 0s

        .to(numberObj, {
            val: 100,
            duration: 2,
            onUpdate: function () {
                // Always round or floor for integers, and append "%"
                document.querySelector(".logo-number .lineInner").textContent = Math.round(numberObj.val) + "%";
            }
        }, 0)

        .to(".overlay-load .overlay-logo ", {
            y: -100,
            ease: "easeInOutQuart",
            duration: 1,
        })
        .to(".logo-number .lineInner", {
            yPercent: -100,
            duration: 1,
            ease: "easeInOutQuart",
        }, "<")


        .from(".overlay-text-wrapper [data-split='lines'] .lineInner", {
            yPercent: 100,
            stagger: 0.1,
            duration: 1,
            ease: "easeInOutQuart",
            onComplete: function () {
                gsap.set(".overlay-load", {
                    pointerEvents: "auto",
                })
            }
        }, "<")

        .from(".overlay-line", {
            transformOrigin: "center",
            scaleX: 0,
            opacity: 0,
            duration: 1,
            ease: "easeInOutQuart",
        }, "<")


    document.querySelectorAll('.overlay-button-wrapper .button .lineInner').forEach(btn => {
        let originalText = btn.textContent.toUpperCase();

        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.5,
                color: "#fc0",
                scrambleText: {
                    text: originalText,
                    chars: "upperCase", // or "alpha", "numbers", etc.
                    speed: 0.7,
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.5,
                color: "#878787",
            });
        });
    })
    // "Yes" → execute code (e.g., hide age gate, init site)
    yesBtn.addEventListener('click', () => {
        gsap.set(".overlay-load", {
            pointerEvents: "none",
        })

        tl.to(".overlay-line", {
            scaleX: 0,
            opacity: 0,
            duration: 1,
            ease: "easeOutQuart",
        },)


        tl.add(Flip.fit(".overlay-load .overlay-logo", ".header .logo", {
            duration: 1.2,
            ease: "easeOutQuart",
            scale: true,
            onComplete: function () {
                gsap.set(".overlay-load .overlay-logo", {
                    display: "none",
                })

                gsap.set(".header .logo", {
                    autoAlpha: 1,
                })
            }
        }), "<")

            .to(".overlay-text-wrapper .lineInner", {
                autoAlpha: 0,
                yPercent: -100,
            }, "<")
            .add(() => {
                tlHeroAnimation.play();
                window.lenis.start();
            }, "<+.2")
    });

    // "No" → redirect to another website
    noBtn.addEventListener('click', () => {
        window.location.href = 'https://www.elioavilamunoz.com'; // Change to your target URL
    });




}


function initHeroAnimation() {
    window.lenis.scrollTo(0, { immediate: true });
    document.body.removeAttribute('data-preload');

    const bgVideo = document.getElementById("hero-bg-video");



    gsap.set(".container.is--hero .scroll-circle", {
        rotation: -90,
        transformOrigin: "center"
    })
    gsap.set(".button.button--secondary, .hero-video", {
        autoAlpha: 0,
    })

    gsap.set(bgVideo, { opacity: 0 });

    let tl = gsap.timeline({ paused: true })



    tl.from(".hero-content [data-split='lines'] .lineInner", {
        yPercent: 100,
        duration: 1,
        ease: "easeOutQuart",
        stagger: 0.1,
        onStart: function () {
            gsap.set(".button.button--secondary, .hero-video", {
                autoAlpha: 1,
            })

            console.log("start")
            gsap.to(".scroll-arrow", {
                y: 45,
                duration: 1.2,
                ease: "easeOutQuart",
                repeat: -1,
                delay: 1.2,
                repeatDelay: 1
            })
        }
    })


        .from(".hero-content .button", {
            autoAlpha: 0,
            yPercent: 100,
            duration: 1,
            ease: "easeOutQuart"
        }, "<")
        .to(".header .button--secondary", {
            duration: 1,
            ease: "easeOutQuart",
            scrambleText: {
                text: "{original}",
                chars: "upperCase",
                speed: 1,
                tweenLength: false,
                revealDelay: 0.5
            }

        }, "<")

        .fromTo(".container.is--hero .scroll-circle", {
            drawSVG: "0% 0%"
        }, {
            drawSVG: "0% 100%",
            duration: 1,
            ease: "easeOutQuart"
        }, "<")
        .from(".container.is--hero .scroll-arrow", {
            autoAlpha: 0,
            duration: 1,
            ease: "power1.out"
        }, "<")

        .call(() => {
            if (bgVideo && bgVideo.paused) {
                // Start the video
                bgVideo.play().catch(() => { });

                // Wait for the video to actually start playing, then fade it in
                bgVideo.addEventListener('playing', () => {
                    gsap.to(bgVideo, {
                        opacity: 0.8,
                        duration: 0.5,
                        ease: "easeOutQuart"
                    });
                }, { once: true }); // Use once: true so the event only fires once
            }
        }, null, .2);

    // bgVideo.addEventListener('playing', () => {
    //     gsap.set(bgVideo, { opacity: 0.8 });
    // });
    const btn = document.querySelector('.button.is--main');
    const targetSection = document.querySelector('.container.is--intro');

    btn.addEventListener('click', () => {
        // Get the top position of the target section
        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
        // Add your offset (e.g., 50px)
        const offset = 400;
        // Use Lenis to scroll smoothly
        lenis.scrollTo(sectionTop + offset, { duration: 1.2, immediate: false });
    });


    document.querySelectorAll('.button.button--secondary').forEach(btn => {
        let originalText = btn.textContent.toUpperCase();

        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.5,
                color: "#fc0",
                scrambleText: {
                    text: originalText,
                    chars: "upperCase", // or "alpha", "numbers", etc.
                    speed: 0.7,
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.5,
                color: "white",
            });
        });
    })

    return tl;
}


let treeDiagramContext;
let tlHeroAnimation;
function initTreeDiagramWrapper() {
    // Clear old animations & ScrollTriggers
    if (treeDiagramContext) {
        treeDiagramContext.revert(); // kills all gsap stuff inside the context
    }

    treeDiagramContext = gsap.context(() => {
        initTreeDiagram(); // your full setup function
    });
}


function initAchat() {
    // Webflow Checkout Integration Script
    // Add this to your Webflow site's custom code section

    (function () {
        'use strict';

        // Configuration - Update this with your deployed Astro site URL
        const CHECKOUT_URL = 'https://astro-rc-paiement.vercel.app/checkout';

        // Product pricing and discount logic
        const PRODUCTS = {
            'reboot-camp': { name: 'Reboot Camp', price: 800 },
            'agenda': { name: 'Agenda', price: 60 },
            'drapeau': { name: 'Drapeau', price: 40 },
            'tshirt': { name: 'T-shirt', price: 50 },
            'cours-finance': { name: 'Cours Finance', price: 49 },
            'contenu-anglais': { name: 'Contenu Anglais', price: 149 },
            'appel-1': { name: '1 appel avec Elio', price: 200 },
            'appel-2': { name: '2 appels avec Elio', price: 400 },
            'appel-3': { name: '3 appels avec Elio', price: 600 }
        };

        // Discount rules
        const DISCOUNTS = {
            material: {
                condition: (selectedItems) => {
                    const materialItems = selectedItems.filter(id => ['agenda', 'drapeau', 'tshirt'].includes(id));
                    return materialItems.length === 3;
                },
                discount: 51
            },
            formation: {
                condition: (selectedItems) => {
                    const hasRebootCamp = selectedItems.includes('reboot-camp');
                    const hasCoursFinance = selectedItems.includes('cours-finance');
                    const hasContenuAnglais = selectedItems.includes('contenu-anglais');
                    return hasRebootCamp && hasCoursFinance && hasContenuAnglais;
                },
                discount: 251
            }
        };

        // Calculate total with discounts
        function calculateTotal(selectedItems) {
            let total = 0;

            // Add selected items
            selectedItems.forEach(itemId => {
                const product = PRODUCTS[itemId];
                if (product) {
                    total += product.price;
                }
            });

            // Apply discounts
            let totalDiscount = 0;
            for (const [category, discountRule] of Object.entries(DISCOUNTS)) {
                if (discountRule.condition(selectedItems)) {
                    totalDiscount += discountRule.discount;
                }
            }

            return total - totalDiscount;
        }

        // Get selected items from form
        function getSelectedItems(form) {
            const selectedItems = [];

            // Check checkboxes
            const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(checkbox => {

                console.log(checkbox.name);

                if (PRODUCTS[checkbox.name]) {
                    selectedItems.push(checkbox.name);
                }
            });

            // Check radio buttons
            // const radios = form.querySelectorAll('input[type="radio"]:checked');
            // radios.forEach(radio => {
            //     if (PRODUCTS[radio.value]) {
            //         selectedItems.push(radio.value);
            //     }
            // });


            const slider = form.querySelector('#appel-slider');
            if (slider) {
                const sliderValue = parseInt(slider.value);
                const callValues = ['', 'appel-1', 'appel-2', 'appel-3'];

                if (sliderValue > 0 && callValues[sliderValue] && PRODUCTS[callValues[sliderValue]]) {
                    selectedItems.push(callValues[sliderValue]);
                }
            }

            return selectedItems;
        }

        // Update total display (if you have a total element)
        function updateTotal(selectedItems) {
            const totalElement = document.querySelector('[data-total]');
            if (totalElement) {
                const total = calculateTotal(selectedItems);
                totalElement.textContent = `${total.toFixed(2)}€`;
            }
        }

        // Handle form submission
        function handleFormSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const selectedItems = getSelectedItems(form);

            // Validate that at least one item is selected
            if (selectedItems.length === 0) {
                alert('Veuillez sélectionner au moins un produit.');
                return false;
            }

            // Validate engagement checkbox
            const engagementCheckbox = form.querySelector('[name="engagement"]');
            if (engagementCheckbox && !engagementCheckbox.checked) {
                alert('Vous devez accepter de respecter vos engagements.');
                return false;
            }

            // Build URL with form data
            const params = new URLSearchParams();
            selectedItems.forEach(itemId => {
                params.append(itemId, 'on');
            });

            // Add engagement if checked
            if (engagementCheckbox && engagementCheckbox.checked) {
                params.append('engagement', 'on');
            }

            // Redirect to checkout
            const checkoutUrl = `${CHECKOUT_URL}?${params.toString()}`;
            window.location.href = checkoutUrl;

            return false;
        }

        // Initialize when DOM is ready
        function init() {
            // Find the checkout form
            const form = document.querySelector('.form-achat');
            if (!form) {
                console.warn('Checkout form not found. Make sure your form has the class "form-achat"');
                return;
            }

            // Add submit handler
            form.addEventListener('submit', handleFormSubmit);

            // Add change handlers for real-time total updates
            const inputs = form.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    const selectedItems = getSelectedItems(form);
                    updateTotal(selectedItems);
                });
            });

            // Initialize total
            const selectedItems = getSelectedItems(form);
            updateTotal(selectedItems);
        }

        // Run initialization
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

    })();
}

document.addEventListener("DOMContentLoaded", () => {
    // Scroll to top immediately
    scrollToTop();
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase, MorphSVGPlugin);


    initLenis();
    initAchat();
    document.fonts.ready.then(() => {
        initSplit();

        // TO COMMENT
        // initAgeGate();
        tlHeroAnimation = initHeroAnimation();
        // TO COMMENT
        // initIntro();
        initTrackerCheckboxes();
        // TO COMMENT
        // initScrollLock();
        initTrackerSection();
        initVideoMap();



        //to remove
        initTreeDiagramWrapper(); // on page load
    });
    // initVideoMap();
    document.body.removeAttribute('data-preload');

    // to remove top 

});

// Also add a window load event to catch any late scroll restoration
window.addEventListener('load', scrollToTop);

// Re-init on resize with debounce
// let resizeTimeout;
// window.addEventListener("resize", () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//         initTreeDiagramWrapper();
//     }, 300);
// });