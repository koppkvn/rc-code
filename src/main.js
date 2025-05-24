
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
        end: "+=200%", // Enough space for all animations
        pin: true,

        // markers: true,
        id: "masterPin"

    });

    const barsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--intro",
            start: "top top",
            end: "+=150%", // Just for the bar animations
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
    gsap.set(".purgatoire-message", {
        autoAlpha: 0,
    })

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
        .to(".container.is--tracker .header-line", {
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

    tl.to(".container.is--tracker .tracker-row .tracker-row-line", {
        xPercent: 100,
        duration: 1,
        ease: "easeOutQuart",
        stagger: 0.03,

        onComplete: function () {
            gsap.to(".purgatoire-message .wordInner", {
                duration: 1,

                scrambleText: {
                    text: "{original}",
                    speed: 0.65,
                },
            });

            gsap.to(".purgatoire-message", {
                autoAlpha: 1,
                duration: 1,
                ease: "easeOutQuart",
            })

            gsap.to('.tracker-highlight', {
                autoAlpha: 1,
                duration: 1,
                ease: "easeOutQuart",
            });

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

    // tl.from(".container.is--tracker .tracker-row div:not(.tracker-row-line)", {


}

function initTrackerCheckboxes() {
    const trackerButtons = document.querySelectorAll('.tracker-checkbox.is--button');
    const pompeCounterEl = document.querySelector('.tracker-pompes .color');
    let pompeCount = 50; // Initial count

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
                    duration: 1.2,
                    ease: "power1.out",
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
    console.log(allSectionsAfterTracker);

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
        gsap.set(".tree-container.is--timeline", {
            width: "400vw",
            flexDirection: "row",
        })

        gsap.set(".tree-container.is--timeline .timeline-wrapper", {
            width: "400vw",
            left: `${window.innerWidth / 2}px`,
            opacity: 1,
        })

        gsap.set(".section.is--timeline, .section.is--timeline .container.is--timeline, .section.is--timeline .container.is--timeline .tree-container", {
            height: "100vh"
        })
        gsap.set(".section.is--timeline .container.is--timeline .tree-container", {
            position: "absolute",
        })
    })

    // hide split lines on panels
    gsap.set(".panel [data-split='lines'] .lineInner", {
        yPercent: 100,
    })
    mm.add("(max-width: 47.9375rem)", () => {



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

        scrollTrigger: {
            trigger: ".parent-section",
            start: "top top",
            end: "+=2000%",
            pin: true,
            pinSpacing: "margin",
            scrub: true,
            // markers: false,
            // invalidateOnRefresh: true,
            onLeave: () => {

                // mm.add("(max-width: 48rem)", () => {
                //     if (!hasCreatedTriggers) {

                //         hasCreatedTriggers = true; // ✅ set the flag so it only runs once

                //         document.querySelectorAll(".panel .text-wrapper").forEach(wrapper => {
                //             ScrollTrigger.create({
                //                 trigger: wrapper,
                //                 start: "top center+=10%",
                //                 end: "bottom center",
                //                 markers: false,
                //                 onEnter: () => {
                //                     gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
                //                         yPercent: 0,
                //                     })
                //                     if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
                //                         gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
                //                             autoAlpha: 1,
                //                             yPercent: 0,
                //                             duration: 1,
                //                             ease: "power2.out"
                //                         })
                //                     }
                //                     console.log("entered");

                //                 }, onLeaveBack: () => {
                //                     gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
                //                         yPercent: 100,
                //                     })

                //                     if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
                //                         gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
                //                             autoAlpha: 0,
                //                             yPercent: 10,
                //                             duration: 1,
                //                             ease: "power2.out"
                //                         })
                //                     }
                //                     console.log("exited"); // 👈 this triggers when scrolling back up
                //                 }

                //             });
                //         });
                //     }
                // })
            }
        },
        // ease: "linear",
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

    // hide header title and number on groupe section
    gsap.set(".section.is--groupe .header-title, .section.is--groupe .header-number", {
        autoAlpha: 0
    });


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
        .to(".tree-container.is--first .tree-header-wrapper .label", {
            autoAlpha: 1,
            onStart: function () {
                scrambleLabel.play(0);
            }
        })
        .to(".tree-container.is--first .tree-header-wrapper .line", {
            scaleY: 1,

        })
        .to(".tree-container.is--first .tree-horizontal-line", {
            scaleX: 1,
            duration: 2,
            onStart: function () {
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                // Add scramble text animation 
                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    duration: 1,
                    onStart: function () {
                        gsap.set(".section.is--section .header-title, .section.is--section .header-number", {
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
            },
            onReverseComplete: function () {
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    autoAlpha: 0
                },);
            }
        })
        .to(".tree-container.is--first .tree-child-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--first .tree-child-wrapper .label", {
            autoAlpha: 1,
            onStart: function () {
                scrambleChildLabel.play(0);
            }
        })
        // end of first tree container
        .addLabel("focusSection", "+=1")
        // hiding of first tree container
        .to(".tree-container.is--first .tree-child-wrapper:not(.is--three)", {
            autoAlpha: 0
        }, "focusSection")
        .to(" .tree-container.is--first .tree-horizontal-line", {
            // width: "+=12.5rem",
            autoAlpha: 0,
            transformOrigin: "center"
        }, "focusSection")

        .to(".tree-container.is--first .tree-header-wrapper", {
            transformOrigin: "top",
            autoAlpha: 0
        }, "focusSection")
        .to(".tree-container.is--first .tree-child-wrapper.is--three", {
            yPercent: -302,
            duration: 2,
            onComplete: function () {
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe .header-title, .section.is--groupe .header-number", {
                    duration: 1,
                    onStart: function () {
                        gsap.set(".section.is--groupe .header-title, .section.is--groupe .header-number", {
                            autoAlpha: 1
                        });
                        gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                            autoAlpha: 0
                        })
                    },

                    scrambleText: {
                        text: "{original}",
                        chars: 'upperCase',
                        speed: 1,
                        // tweenLength: false,
                    }
                },);

            },
            onReverseComplete: function () {
                gsap.to(".section.is--section [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".section.is--groupe .header-title, .section.is--groupe .header-number", {
                    autoAlpha: 0
                },);

                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    duration: 1,
                    onStart: function () {
                        gsap.set(".section.is--section .header-title, .section.is--section .header-number", {
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
            }
        }, "focusSection")
        .to(".tree-container.is--first .tree-child-wrapper.is--three .line", {
            autoAlpha: 0,
            duration: 0.1,
        }, "focusSection")


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
            }
        })

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
            onComplete: function () {
                gsap.to(".section.is--groupe [data-split='lines'] .lineInner", {
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
                gsap.to(".section.is--groupe [data-split='lines'] .lineInner", {
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
            }
        })
        .addLabel("focusSection", "+=1")

        // hiding of third tree container
        .to(".tree-container.is--three .tree-child-wrapper:not(.is--one), .tree-container.is--three .tree-horizontal-line, .tree-container.is--three .tree-header-wrapper, .tree-container.is--three .tree-child-wrapper.is--one .line", {
            autoAlpha: 0,
            duration: 1.2,

        }, "focusSection")

        .to({}, {
            onComplete: function () {
                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                gsap.to(".header-section.is--groupe", {
                    autoAlpha: 0,
                })

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

            },
            onReverseComplete: function () {
                gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
                gsap.to(".header-section.is--groupe", {
                    autoAlpha: 1,
                })

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 0,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            }
        }, "<+.2")


    // we move "toi" to the top on mobile only
    mm.add("(max-width: 767px)", () => {
        console.log("mobile");
        treeTlOne.to(".tree-container.is--three .tree-child-wrapper.is--one", {
            yPercent: -770, // adjust as needed
            duration: 1.2,
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


        .addLabel("timeline", "+=1")

    // desktop only
    mm.add("(min-width: 768px)", () => {

        // we move the line to the position of the other line
        treeTlOne.add(Flip.fit(".section.is--compare .tree-right-wrapper .line-wrapper-bottom", ".section.is--timeline .timeline-wrapper", {
            ease: "none",
            duration: 2,
            onStart: function () {
                gsap.to(".section.is--compare [data-split='lines'] ", {
                    autoAlpha: 0,
                })
            },
            onReverseComplete: function () {
                gsap.to(".section.is--compare [data-split='lines'] ", {
                    autoAlpha: 1,
                })
            }
        },))

        // we make the long line grow
        treeTlOne.to(".section.is--compare .is--reallywant", {

            width: "+=400",
            transformOrigin: "left",
            duration: 2,
            ease: "none"
        }, "<")

            // we push the label at the end of the line to the right
            .to(".section.is--compare .label.is--compare3", {

                x: "+=400",
                transformOrigin: "left",
                duration: 2,
                ease: "none"
            }, "<")
            //we hide the rest at the same time
            .to(".section.is--compare .line-wrapper-top, .section.is--compare .line.is--vertical, .section.is--compare .tree-left-side", {
                autoAlpha: 0,
                // scale: .5
            }, "<")
            .to(".section.is--personnes .is--toi", {
                autoAlpha: 0
            }, "<")

            // we move the the right trough the 400vw container
            .to(".section.is--timeline .tree-container.is--timeline", {
                xPercent: -100,
                ease: "none",
                duration: 20,
                onStart: function () {
                    // we hide the long line
                    gsap.set(".section.is--compare .is--reallywant", {
                        autoAlpha: 0
                    })

                    // we show the new long line that takes the full width
                    gsap.set(".section.is--timeline .timeline-wrapper", {
                        autoAlpha: 1
                    })

                },
                onReverseComplete: function () {
                    gsap.set(".section.is--compare .is--reallywant", {
                        autoAlpha: 1
                    })
                    gsap.set(".section.is--timeline .timeline-wrapper", {
                        autoAlpha: 0
                    })
                    // gsap.to(".section.is--compare .inscription-rc", {
                    //     autoAlpha: 1
                    // })
                },

            }, "horizontal")
            .to(".section.is--compare .inscription-rc", {
                autoAlpha: 0,
            }, "<")

            // we scale the white line to the full width with the scroll
            .from(".section.is--timeline .white-line", {
                scaleX: 0,
                transformOrigin: "left",
                ease: "none",
                duration: 20,
            }, "horizontal")


            //we make the different element appear trough the timeline
            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                onReverseComplete: function () {
                    // gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
                    //     yPercent: 100,
                    //     duration: 1,
                    //     ease: "power2.out"
                    // },)

                    gsap.to(".panel.is--first .text-wrapper.is--first [data-split='lines'] .lineInner", {
                        yPercent: 100,
                        duration: 1,
                        ease: "power2.out"
                    },)
                }
            }, "<")
            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--second .text-wrapper.is--second [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                onReverseComplete: function () {
                    // gsap.to(".panel.is--second .text-wrapper.is--second [data-split='lines'] .lineInner", {
                    //     yPercent: 100,
                    //     duration: 1,
                    //     ease: "power2.out"
                    // },)
                }
            }, "<+=3")

            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--third .text-wrapper.is--third [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                    gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                // onReverseComplete: function () {
                //     gsap.to(".panel.is--third .text-wrapper.is--third [data-split='lines'] .lineInner", {
                //         yPercent: 100,
                //         duration: 1,
                //         ease: "power2.out"
                //     },)
                //     gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
                //         autoAlpha: 0,
                //         yPercent: 10,
                //         duration: 1,
                //         ease: "power2.out"
                //     },)
                // }
            }, "<+=3")

            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--third .text-wrapper.is--fourth [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                // onReverseComplete: function () {
                //     gsap.to(".panel.is--third .text-wrapper.is--fourth [data-split='lines'] .lineInner", {
                //         yPercent: 100,
                //         duration: 1,
                //         ease: "power2.out"
                //     },)
                // }
            }, "<+=3")

            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--fourth .text-wrapper.is--fifth [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },
                // onReverseComplete: function () {
                //     gsap.to(".panel.is--fourth .text-wrapper.is--fifth [data-split='lines'] .lineInner", {
                //         yPercent: 100,
                //         duration: 1,
                //         ease: "power2.out"
                //     },)
                // }
            }, "<+=3")
            .to({}, {
                duration: 0.001,
                onStart: function () {
                    gsap.to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                },

                // onReverseComplete: function () {
                //     gsap.to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
                //         yPercent: 100,
                //         duration: 1,
                //         ease: "power2.out"
                //     },)
                // }
            }, "<+=3")

            .to(".panel.is--fifth .text-wrapper.is--sixth [data-split='lines'] .lineInner", {
                autoAlpha: 0,
            },)
            .to(".timeline-wrapper", {
                autoAlpha: 0,
            },)
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
            },) // Adjust the timing if needed

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
            .to(".map-container", {
                yPercent: -50,
                xPercent: 30,
                scale: 1.6,
                duration: 10,
                ease: "power1.out"
            },)
            .to(".map-container mask rect", {
                xPercent: 10,
                yPercent: 50,
                scale: .5,
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
            },
            onReverseComplete: function () {
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: 100,
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
            markers: true,
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

        const pinDuration = window.innerHeight * 5; // because +=300%

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
                markers: { startColor: "pink", endColor: "blue", fontSize: 20 }
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
                stagger: 0.5,
                autoAlpha: 0,
                duration: 5,
            }, "<")
            .to(".section.is--map .map-container", {
                scale: 2,
                duration: 2,
            }, "<")
            .to(".map-container", {
                yPercent: -85,
                xPercent: 45,
                scale: 2.6,
                duration: 2,
                ease: "power1.out"
            },)
            .to(".map-container mask rect", {
                xPercent: -10,
                yPercent: 25,
                duration: 1,
            }, "<")

        const allDots = gsap.utils.toArray(".dot-video, .dot-normal");
        const barcelonaDot = document.querySelector(".dot-barcelona");

        allDots.forEach(dot => {
            mapTl.add(
                Flip.fit(dot, barcelonaDot, {
                    duration: 1, // needed for Flip to work but overwritten by scrub
                    ease: "none"
                }), "<+=.3"
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
            },
            onReverseComplete: function () {
                gsap.to(".text-wrapper-map .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".text-wrapper-barca .lineInner", {
                    yPercent: -100,
                })
            }
        }, "<")

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
        backdropFilter: "blur(10px)",
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
        .to(".container.is--hero .scroll-arrow", {
            y: 2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "easeOutQuart"
        })
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

document.addEventListener("DOMContentLoaded", () => {
    // Scroll to top immediately
    scrollToTop();
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase, MorphSVGPlugin);


    // document.fonts.ready.then(() => {
    initLenis();
    initSplit();
    initAgeGate();
    tlHeroAnimation = initHeroAnimation();
    initIntro();
    initTrackerCheckboxes();
    initScrollLock();
    initTrackerSection();
    initVideoMap();
    //to remove
    // initTreeDiagramWrapper(); // on page load
    // initVideoMap();
    // document.body.removeAttribute('data-preload');

    // to remove top 



    scrollToTop();
    // })
});

// Also add a window load event to catch any late scroll restoration
// window.addEventListener('load', scrollToTop);

// Re-init on resize with debounce
// let resizeTimeout;
// window.addEventListener("resize", () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//         initTreeDiagramWrapper();
//     }, 300);
// });