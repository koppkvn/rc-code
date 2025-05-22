

function initLenis() {
    window.lenis = new Lenis();
    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { window.lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

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
                border: '1px solid white'
            });
        });

        button.addEventListener('mouseleave', function () {
            // Skip if button was already clicked
            if (this.getAttribute('data-clicked') === 'true') {
                return;
            }

            // Return to normal state
            gsap.to(this, {
                border: '1px solid transparent',
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
            this.style.border = '1px solid white';

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

    // set the width of the timeline wrapper to 400vw on desktop only
    mm.add("(min-width: 768px)", () => {
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
    mm.add("(max-width: 767px)", () => {
        gsap.set(".parent-section .section.is--timeline", {
            position: "relative"
        })
        gsap.set(".section.is--placeholder", {
            height: () => document.querySelector(".tree-container.is--timeline").offsetHeight * 1
        })


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


    let hasCreatedTriggers = false;
    // create the main timeline
    const treeTlOne = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent-section",
            start: "top top",
            end: "+=2000%",
            pin: true,
            scrub: true,
            markers: false,
            onLeave: () => {

                mm.add("(max-width: 768px)", () => {
                    if (!hasCreatedTriggers) {

                        hasCreatedTriggers = true; // ✅ set the flag so it only runs once

                        document.querySelectorAll(".panel .text-wrapper").forEach(wrapper => {
                            ScrollTrigger.create({
                                trigger: wrapper,
                                start: "top center+=10%",
                                end: "bottom center",
                                markers: false,
                                onEnter: () => {
                                    gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
                                        yPercent: 0,
                                    })
                                    if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
                                        gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
                                            autoAlpha: 1,
                                            yPercent: 0,
                                            duration: 1,
                                            ease: "power2.out"
                                        })
                                    }
                                    console.log("entered");

                                }, onLeaveBack: () => {
                                    gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
                                        yPercent: 100,
                                    })

                                    if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
                                        gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
                                            autoAlpha: 0,
                                            yPercent: 10,
                                            duration: 1,
                                            ease: "power2.out"
                                        })
                                    }
                                    console.log("exited"); // 👈 this triggers when scrolling back up
                                }

                            });
                        });
                    }
                })
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
            // width: "+=200px",
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
            // width: "+=200px",
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


    // we move "toi" to the top on mobile only
    mm.add("(max-width: 767px)", () => {
        console.log("mobile");
        treeTlOne.to(".tree-container.is--three .tree-child-wrapper.is--one", {
            yPercent: -650, // adjust as needed
            duration: 1.2,
        }, "focusSection");

    })


    treeTlOne.addLabel("focusSection", "+=1")

    // start of compare animation, we scale the lines depending on the width of the screen
    treeTlOne.from(".tree-left-side .line", {
        scaleX: window.innerWidth <= 767 ? 1 : 0,
        scaleY: window.innerWidth <= 767 ? 0 : 1,
        transformOrigin: window.innerWidth <= 767 ? "top" : "left",
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
                xPercent: -30,
                scale: 1.6,
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
                }), "<+=1"
                // add all tweens at the same point in the timeline
            );
        });


    })

    // same as above but on mobile
    mm.add("(max-width: 767px)", () => {

        treeTlOne.add(Flip.fit(".section.is--compare .tree-right-wrapper .line-wrapper-bottom", ".section.is--timeline .timeline-wrapper", {
            ease: "none",
            duration: 1,
            // duration: 2,
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

        treeTlOne.to(".section.is--compare .is--reallywant", {

            height: "+=400",
            transformOrigin: "top",
            duration: 1,
            ease: "none"
        }, "<")

            .to(".section.is--compare .label.is--compare3", {

                y: "+=400",
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
                y: "-=100",

            }, "<")

            .to(".section.is--compare .is--reallywant, .section.is--compare .dot-wrapper", {
                autoAlpha: 0,
                duration: 0.001,
            },)

            .to(".section.is--timeline .timeline-wrapper, .section.is--timeline .dot-wrapper", {
                autoAlpha: 1,
                duration: 0.001,

                onStart: function () {
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

                    gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
                        autoAlpha: 0,
                        duration: 1,
                        ease: "power2.out"
                    },)
                    gsap.to(".section.is--compare .inscription-rc", {
                        autoAlpha: 1,
                    })

                },
                onComplete: function () {

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
            .from(".section.is--timeline .timeline-wrapper .white-line", {
                scaleY: 0,
                transformOrigin: "bottom",
                duration: .5,
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
            anticipatePin: 1,
            pinReparent: true,
            markers: false,

        })
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".section.is--placeholder",
                start: "top bottom",
                end: `+=${document.querySelector(".section.is--timeline .timeline-wrapper").offsetHeight}`,
                // scrub: 0,
                pin: ".dot-wrapper.is--timeline",
                anticipatePin: 1,
                pinReparent: true,
                markers: false,

            }
        });


        // timeline.from(".section.is--timeline .timeline-wrapper .white-line", {
        //     scaleY: 0,
        //     transformOrigin: "top",
        //     ease: "none",
        //     overwrite: "auto"
        // })
        // const timeline = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".section.is--placeholder",
        //         start: "top bottom",
        //         end: `+=${document.querySelector(".section.is--timeline .timeline-wrapper").offsetHeight}`,
        //         scrub: true,
        //     }
        // })

        // timeline

        //     .to(".section.is--timeline .dot-wrapper", {
        //         y: () => document.querySelector(".section.is--timeline .timeline-wrapper").offsetHeight,
        //         ease: "none",
        //     }, "<")
    })


}



// function initFadeText() {
//     gsap.utils.toArray(".fade-in").forEach((text) => {
//         ScrollTrigger.create({
//             trigger: text,
//             start: "left center", // when the left edge of the text hits center of viewport
//             horizontal: true,
//             scrub: false,
//             toggleActions: "play none none reverse",
//             onEnter: () => {
//                 gsap.to(text, {
//                     opacity: 1,
//                     y: 0,
//                     duration: 1,
//                     ease: "power2.out"
//                 });
//             },
//             onLeaveBack: () => {
//                 gsap.to(text, {
//                     opacity: 0,
//                     y: 20,
//                     duration: 1,
//                     ease: "power2.out"
//                 });
//             }
//         });
//     });
// }

function initSplit() {
    let elementToSplit = document.querySelectorAll('[data-split="lines"]');

    elementToSplit.forEach(target => {
        let splitInstance = new SplitText(target, {
            type: "lines",
            mask: "lines",
            linesClass: "lineInner",
        });

        // splitInstance.words.forEach(word => {

        //     const placeholder = document.createElement('div');
        //     placeholder.className = 'skeleton-overlay';

        //     word.parentElement.appendChild(placeholder);
        // })

    });

    // Create a skeleton animation for each target element


}

// function initSkeletonLoad() {
//     const skeletonLoadTargets = document.querySelectorAll('[data-load-skeleton="load"]');
//     skeletonLoadTargets.forEach(target => {
//         // Get the words and skeleton overlays for this specific target
//         const words = target.querySelectorAll('.word');
//         const skeletonOverlays = target.querySelectorAll('.skeleton-overlay');

//         // Calculate a proportional delay based on the number of words
//         // This ensures the animation timing remains consistent regardless of word count
//         const wordCount = words.length;
//         const staggerTime = 0.02; // Time between each word animation
//         const totalFromDuration = 1; // Base duration for the from animation

//         // Create the timeline with ScrollTrigger
//         const targetTimeline = gsap.timeline({
//             scrollTrigger: {
//                 trigger: target,
//                 start: "top bottom", // when target's top hits the bottom of viewport
//             },
//         });

//         // Set up the animation sequence with proportional timing
//         targetTimeline
//             .set(words, {
//                 autoAlpha: 0
//             })
//             .from(skeletonOverlays, {
//                 autoAlpha: 0,
//                 stagger: staggerTime,
//                 duration: totalFromDuration,
//                 onStart: function () {
//                     // Create a delayed call that triggers exactly at the midpoint of the "from" animation
//                     // This ensures the "to" animation starts halfway through, regardless of word count
//                     const totalFromAnimTime = totalFromDuration + (wordCount - 1) * staggerTime;
//                     const halfwayPoint = totalFromAnimTime / 2;

//                     gsap.delayedCall(halfwayPoint, function () {
//                         gsap.to(skeletonOverlays, {
//                             autoAlpha: 0,
//                             stagger: staggerTime,
//                             duration: totalFromDuration,
//                             overwrite: true
//                         });
//                     });
//                 }
//             })
//             .to(words, {
//                 autoAlpha: 1,
//                 stagger: 0.02,
//                 duration: 1
//             }, "-=.3");
//     });
// }



let treeDiagramContext;

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
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin);
    document.fonts.ready.then(() => {
        initLenis();
        initSplit();
        // initTreeDiagram();

        initTreeDiagramWrapper(); // on page load
        // initFadeText();

        // initIntro();
        // initTrackerCheckboxes(); // Initialize tracker checkboxes
        // initScrollLock(); // Initialize scroll lock
    })
});

// Re-init on resize with debounce
// let resizeTimeout;
// window.addEventListener("resize", () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//         initTreeDiagramWrapper();
//     }, 300);
// });