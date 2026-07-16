// import './styles/main.scss'
import { ElectricBorder } from './electricBorder.js'

const ACCENT_COLOR = "#D2AA62";
const TRACKER_XP_INITIAL_PERCENT = 40;
const TRACKER_XP_REMAINING_PERCENT = 100 - TRACKER_XP_INITIAL_PERCENT;

function applyBrandAccent() {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--yellow", ACCENT_COLOR);
    rootStyle.setProperty("--electric-light-color", ACCENT_COLOR);
    rootStyle.setProperty("--electric-glow-color", ACCENT_COLOR);

    if (document.getElementById("brand-accent-overrides")) return;

    const accentOverrides = document.createElement("style");
    accentOverrides.id = "brand-accent-overrides";
    accentOverrides.textContent = `
        .color-2 {
            color: ${ACCENT_COLOR} !important;
        }

        .wait-message-span.is--glow {
            background-image: linear-gradient(
                105deg,
                rgba(173, 173, 173, .48) 0%,
                rgba(173, 173, 173, .48) 37%,
                rgba(169, 121, 47, .9) 43%,
                ${ACCENT_COLOR} 47%,
                #f7e8bd 50%,
                ${ACCENT_COLOR} 53%,
                rgba(169, 121, 47, .9) 57%,
                rgba(173, 173, 173, .48) 63%,
                rgba(173, 173, 173, .48) 100%
            );
            background-size: 300% 100%;
            background-position: 125% 0;
            animation: gold-wait-sweep 2.8s linear infinite;
            filter: drop-shadow(0 0 .16rem rgba(210, 170, 98, .24));
        }

        .niveaux .level.is--gold-level {
            color: ${ACCENT_COLOR} !important;
            background-image: linear-gradient(
                105deg,
                #a97932 0%,
                ${ACCENT_COLOR} 34%,
                #f7e8bd 48%,
                ${ACCENT_COLOR} 60%,
                #a97932 100%
            );
            background-size: 240% 100%;
            background-position: 120% 0;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 .22rem rgba(210, 170, 98, .5));
            animation: gold-level-shimmer 3.2s cubic-bezier(.55, 0, .25, 1) infinite;
        }

        .niveaux {
            align-items: center !important;
            justify-content: flex-end !important;
            left: auto !important;
            right: .5rem !important;
            width: auto !important;
            text-align: right;
            white-space: nowrap;
            translate: 0 .45rem;
        }

        .niveaux .level {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            line-height: 1 !important;
            vertical-align: middle;
            transform-box: border-box;
            transform-origin: 50% 50% !important;
        }

        .tracker-wrapper > :not(.iphone-wrapper):not(.niveaux) {
            translate: 0 -1rem;
        }

        .tracker-row .day.is--first {
            color: rgba(255, 255, 255, .55) !important;
        }

        .section.is--tracker .wait-message {
            translate: 0 -.5rem;
        }

        .barcelona-date-card__calendar {
            display: none;
        }

        .section.is--timeline .timeline-panel.is--1 .timeline-access-preparation {
            display: flex;
            width: min(68vw, 56rem);
            box-sizing: border-box;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .section.is--timeline .timeline-access-preparation__title {
            margin: 0 0 .25rem;
        }

        .section.is--timeline .timeline-access-preparation__text {
            width: min(100%, 52rem);
            margin: 0;
        }

        .section.is--timeline .timeline-access-preparation__image {
            display: flex;
            width: min(100%, 35rem);
            height: clamp(12rem, 32vh, 22rem);
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;
        }

        .section.is--timeline .timeline-access-preparation__image img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: left center;
        }

        .section.is--timeline .timeline-panel.is--2.is--merged-source {
            display: none !important;
        }

        .section.is--fields.is--terminal-offers {
            display: grid !important;
            position: relative;
            z-index: 1000;
            width: 100%;
            height: 100svh;
            min-height: 100svh;
            overflow: hidden;
            background: #0d0d0d;
            place-items: center;
            isolation: isolate;
        }

        .section.is--fields.is--terminal-offers.is--terminal-active {
            position: fixed !important;
            z-index: 2147483000 !important;
            inset: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            min-height: 100dvh !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #0d0d0d !important;
        }

        .section.is--fields.is--terminal-offers .container.is--fields {
            display: flex;
            width: 100%;
            height: 100%;
            min-height: 100%;
            max-height: 100%;
            box-sizing: border-box;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin: 0;
            padding: 1.5rem 1.25rem;
            text-align: center;
        }

        .section.is--fields.is--terminal-offers .h2-fields {
            width: min(100%, 48rem);
            margin: 0;
            padding: 0;
            font-size: clamp(2.5rem, 4vw, 4rem);
            line-height: 1.02;
            text-align: center;
        }

        .section.is--fields.is--terminal-offers .link-container {
            width: min(100%, 28rem);
            justify-content: center;
            margin: 0 auto;
        }

        .section.is--fields.is--terminal-offers .div-2,
        .section.is--fields.is--terminal-offers .form-field-icon,
        .section.is--fields.is--terminal-offers .form-group,
        .section.is--fields.is--terminal-offers .form-notifcation,
        .section.is--faq.is--terminal-hidden,
        .section.is--footerlast.is--terminal-hidden {
            display: none !important;
        }

        @media (min-width: 48rem) {
            .text-wrapper-date.is--date-card {
                box-sizing: border-box;
                align-items: flex-start;
                gap: .2rem;
                width: max-content;
                max-width: none;
                margin-left: 0;
                padding: .85rem 1.15rem .8rem 3rem;
                overflow: hidden;
                border: 1px solid rgba(210, 170, 98, .45);
                border-radius: .4rem;
                background: linear-gradient(
                    135deg,
                    rgba(210, 170, 98, .1) 0%,
                    rgba(18, 18, 18, .78) 48%,
                    rgba(8, 8, 8, .9) 100%
                );
                box-shadow:
                    inset 0 0 0 1px rgba(255, 255, 255, .025),
                    0 .6rem 1.6rem rgba(0, 0, 0, .24);
                backdrop-filter: blur(4px);
            }

            .text-wrapper-date.is--date-card::after {
                content: "";
                position: absolute;
                inset: 0;
                pointer-events: none;
                background: linear-gradient(
                    110deg,
                    transparent 0%,
                    rgba(247, 232, 189, .08) 38%,
                    transparent 62%
                );
            }

            .text-wrapper-date.is--date-card .paragraph,
            .text-wrapper-date.is--date-card .lineInner {
                position: relative;
                z-index: 1;
                text-align: left !important;
            }

            .text-wrapper-date.is--date-card .paragraph:first-of-type {
                color: rgba(255, 255, 255, .96);
                letter-spacing: .025em;
            }

            .text-wrapper-date.is--date-card .paragraph:last-of-type {
                color: ${ACCENT_COLOR};
                letter-spacing: .055em;
            }

            .text-wrapper-date.is--date-card .barcelona-date-card__calendar {
                position: absolute;
                z-index: 1;
                top: 50%;
                left: 1rem;
                display: grid;
                width: 1.15rem;
                height: 1.15rem;
                translate: 0 -50%;
                place-items: center;
                color: ${ACCENT_COLOR};
                filter: drop-shadow(0 0 .2rem rgba(210, 170, 98, .3));
            }

            .text-wrapper-date.is--date-card .barcelona-date-card__calendar svg {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        @media (max-width: 47.99rem) {
            .page-wrapper {
                --mobile-section-title-top: 8svh;
                --mobile-section-copy-gap: .85rem;
            }

            .title-intro {
                font-size: 2.2rem;
            }

            .big-title-section {
                font-size: 2.3rem;
            }

            .section.is--tracker .big-title-section {
                position: relative;
                top: -1rem;
                margin-top: 0;
            }

            .section.is--tracker .wrapper-p {
                position: relative;
                top: -1rem;
                margin-top: var(--mobile-section-copy-gap);
            }

            .section.is--tracker .container.is--tracker {
                box-sizing: border-box;
                padding-top: var(--mobile-section-title-top);
                border-top: 0 !important;
                background-image: none !important;
                box-shadow: none !important;
            }

            .section.is--tracker[data-mobile-tracker-overlay="true"] {
                position: fixed;
                z-index: 40;
                inset: 0;
                width: 100%;
                height: 100svh;
                overflow: hidden;
                background-color: var(--black);
            }

            .section.is--tracker[data-mobile-tracker-overlay="true"]
            .container.is--tracker {
                height: 100svh;
                padding-top: var(--mobile-section-title-top);
            }

            .mobile-tracker-placeholder {
                width: 100%;
                height: 100svh;
                pointer-events: none;
            }

            .section.is--tracker .header-section.is--tracker,
            .section.is--tracker .container.is--tracker .header-line {
                display: none !important;
                border-top: 0 !important;
                background: none !important;
                box-shadow: none !important;
            }

            .section.is--tracker .container.is--tracker::before,
            .section.is--tracker .container.is--tracker::after,
            .section.is--tracker .header-section.is--tracker::before,
            .section.is--tracker .header-section.is--tracker::after {
                display: none !important;
                content: none !important;
            }

            .big-title-section.is--timeline {
                max-width: none;
                font-size: clamp(1.5rem, 6.6vw, 1.65rem);
                line-height: .95;
                white-space: nowrap;
            }

            .section.is--timeline .timeline-panel.is--1 {
                padding-bottom: .5rem;
            }

            .section.is--timeline .timeline-panel.is--5 .text-block-4.is--label {
                display: none !important;
            }

            .section.is--timeline .dot-wrapper-new {
                width: .7rem;
                height: .7rem;
            }

            .section.is--timeline .timeline-panel.is--1 .timeline-access-preparation {
                width: 88vw;
                gap: .7rem;
            }

            .section.is--timeline .timeline-access-preparation__title {
                margin-bottom: .1rem;
            }

            .section.is--timeline .timeline-access-preparation__text {
                font-size: clamp(.72rem, 3.15vw, .82rem);
                line-height: 1.35;
            }

            .section.is--timeline .timeline-access-preparation__image {
                width: 80%;
                height: clamp(8rem, 20vh, 12rem);
                box-sizing: border-box;
                justify-content: flex-start;
                margin-right: auto;
                border: 1px solid rgba(255, 255, 255, .22);
            }

            .section.is--timeline .timeline-access-preparation__image img {
                object-position: left center;
            }

            .section.is--timeline .timeline-panel.is--2.is--fixed {
                padding-top: 0;
            }

            .section.is--timeline .timeline-panel.is--2 .div-block-3 {
                gap: .4rem;
                margin-bottom: 0;
            }

            .section.is--timeline .timeline-panel.is--2 .div-block-3 > .text-block-4:first-child,
            .section.is--timeline .timeline-panel.is--2 .big-title-section.is--timeline.materiel.is--mobile {
                display: none !important;
            }

            .section.is--timeline .timeline-panel.is--2 .gif-container.is--mobile {
                margin-top: 0;
            }

            .section.is--timeline .timeline-panel.is--2 .lower-block {
                margin-top: .25rem;
            }

            .section.is--timeline .timeline-panel.is--4.is--mobile-schedule-removed {
                display: none !important;
            }

            .section.is--timeline .mobile-week-recurring-schedule {
                display: contents;
            }

            .section.is--timeline .timeline-panel.is--8 .text-block-4.is--mobile-friday-suppressed {
                display: none !important;
            }

            body.is-hidden .section.is--timeline .timeline-panel,
            body.is-hidden .section.is--timeline .line-container,
            body.is-hidden .section.is--timeline .grey-line-new {
                opacity: 0 !important;
                transition: opacity .5s ease-in-out;
            }

            body.is-visible .section.is--timeline .timeline-panel,
            body.is-visible .section.is--timeline .line-container,
            body.is-visible .section.is--timeline .grey-line-new {
                opacity: 1 !important;
                transition: opacity .5s ease-in-out;
            }

            .parent-section > .section.is--section,
            .parent-section > .section.is--groupe {
                z-index: 20;
                pointer-events: none;
            }

            .parent-section > .section.is--personnes .header-section,
            .parent-section > .section.is--personnes [data-split="lines"] {
                display: none !important;
            }

            .mobile-tree-redesign {
                position: absolute;
                z-index: 30;
                inset: 0;
                display: block;
                width: 100%;
                height: 100svh;
                pointer-events: none;
                color: rgba(255, 255, 255, .92);
                font-family: inherit;
            }

            .mobile-tree-redesign__copy {
                position: absolute;
                z-index: 2;
                top: var(--mobile-section-title-top);
                right: auto;
                left: 1.25rem;
                display: flex;
                width: min(calc(100% - 2.5rem), 25rem);
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }

            .mobile-tree-redesign__copy-title {
                width: 100%;
                margin: 0;
                padding: 0;
                color: rgba(255, 255, 255, .96);
                font-size: 2.3rem;
                font-weight: inherit;
                line-height: .95;
                text-align: left;
                text-transform: uppercase;
            }

            .mobile-tree-redesign__copy-title-accent {
                color: ${ACCENT_COLOR};
            }

            .mobile-tree-redesign__copy-text {
                width: 100%;
                margin: var(--mobile-section-copy-gap) auto 0 0;
                padding: 0;
                color: #fff;
                font-size: .9375rem;
                line-height: 1.25;
                letter-spacing: 0;
                text-align: left;
                text-transform: uppercase;
            }

            .mobile-tree-redesign__formula-copy {
                position: absolute;
                z-index: 3;
                top: var(--mobile-section-title-top);
                right: auto;
                left: 1.25rem;
                display: flex;
                width: min(calc(100% - 2.5rem), 25rem);
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }

            .mobile-tree-redesign__formula-title {
                width: 100%;
                margin: 0;
                padding: 0;
                color: rgba(255, 255, 255, .96);
                font-size: 2.3rem;
                font-weight: inherit;
                line-height: .95;
                text-align: left;
                text-transform: uppercase;
            }

            .mobile-tree-redesign__formula-title-accent {
                display: block;
                color: ${ACCENT_COLOR};
            }

            .mobile-tree-redesign__formula-text {
                width: calc(100% - .12rem);
                margin: .65rem auto 0 0;
                padding: 0 0 0 .12rem;
                color: #fff;
                font-size: .9375rem;
                line-height: 1.25;
                letter-spacing: 0;
                text-align: left;
                text-transform: uppercase;
            }

            .mobile-tree-redesign__formula-text:first-of-type {
                margin-top: var(--mobile-section-copy-gap);
            }

            .mobile-tree-redesign__formula-label {
                color: ${ACCENT_COLOR};
            }

            .section.is--compare .header-pres.is--compare {
                position: absolute;
                z-index: 4;
                top: var(--mobile-section-title-top);
                right: auto;
                left: 1.25rem;
                width: min(calc(100% - 2.5rem), 25rem);
                margin: 0;
                align-items: flex-start;
                text-align: left;
            }

            .section.is--compare .big-title-section.is--compare {
                margin: 0;
                text-align: left;
            }

            /* The redesigned TOI remains the single visible label throughout
               the hand-off and the complete comparison-diagram drawing. */
            .section.is--compare .label.color.is--compare {
                visibility: hidden !important;
                opacity: 0 !important;
            }

            .mobile-tree-redesign__diagram {
                --mobile-first-diagram-offset: 2rem;
                position: absolute;
                top: 39svh;
                left: 50%;
                width: min(90vw, 24rem);
                height: 26rem;
                translate: -50% 0;
            }

            .mobile-tree-redesign__node,
            .mobile-tree-redesign__label {
                position: absolute;
                left: 50%;
                translate: -50% 0;
                font-size: 1rem;
                line-height: 1.2;
                letter-spacing: .025em;
                text-align: center;
                white-space: nowrap;
            }

            .mobile-tree-redesign__node {
                top: 0;
            }

            .mobile-tree-redesign__root {
                top: var(--mobile-first-diagram-offset);
                backface-visibility: hidden;
                transform: translate3d(0, 0, 0);
            }

            .mobile-tree-redesign__line {
                position: absolute;
                display: block;
                background: rgba(255, 255, 255, .72);
                transform-origin: top center;
            }

            .mobile-tree-redesign__line.is--vertical {
                width: 1px;
            }

            .mobile-tree-redesign__line.is--horizontal {
                height: 1px;
                transform-origin: center center;
            }

            .mobile-tree-redesign__first-trunk {
                top: calc(2rem + var(--mobile-first-diagram-offset));
                left: 50%;
                height: 3.15rem;
            }

            .mobile-tree-redesign__first-horizontal {
                top: calc(5.15rem + var(--mobile-first-diagram-offset));
                left: 15%;
                width: 70%;
            }

            .mobile-tree-redesign__first-leg {
                top: calc(5.15rem + var(--mobile-first-diagram-offset));
                height: 2.5rem;
            }

            .mobile-tree-redesign__first-leg.is--left {
                left: 15%;
            }

            .mobile-tree-redesign__first-leg.is--right {
                left: 85%;
            }

            .mobile-tree-redesign__section-label {
                top: calc(8rem + var(--mobile-first-diagram-offset));
            }

            .mobile-tree-redesign__section-label.is--left {
                left: 15%;
            }

            .mobile-tree-redesign__section-label.is--right {
                left: 85%;
            }

            .mobile-tree-redesign__label-prefix {
                display: block;
                color: rgba(255, 255, 255, .9);
            }

            .mobile-tree-redesign__label-accent,
            .mobile-tree-redesign__current,
            .mobile-tree-redesign__toi {
                display: block;
                color: ${ACCENT_COLOR};
            }

            .mobile-tree-redesign__center-line {
                top: calc(5.15rem + var(--mobile-first-diagram-offset));
                left: 50%;
                height: calc(5.7rem - var(--mobile-first-diagram-offset));
            }

            .mobile-tree-redesign__subtree {
                position: absolute;
                top: 11.35rem;
                left: 0;
                width: 100%;
                height: 14rem;
            }

            .mobile-tree-redesign__second-trunk {
                top: 2rem;
                left: 50%;
                height: 3.15rem;
            }

            .mobile-tree-redesign__second-horizontal {
                top: 5.15rem;
                left: 15%;
                width: 70%;
            }

            .mobile-tree-redesign__second-leg {
                top: 5.15rem;
                height: 2.5rem;
            }

            .mobile-tree-redesign__second-leg.is--left {
                left: 15%;
            }

            .mobile-tree-redesign__second-leg.is--right {
                left: 85%;
            }

            .mobile-tree-redesign__choice-label {
                top: 8rem;
            }

            .mobile-tree-redesign__choice-label.is--left {
                left: 15%;
            }

            .mobile-tree-redesign__choice-label.is--right {
                left: 85%;
            }

            .mobile-tree-redesign__toi-line {
                top: 5.15rem;
                left: 50%;
                height: 5.2rem;
            }

            .mobile-tree-redesign__toi {
                top: 10.75rem;
            }

            .container.is--map .map-wrapper::after {
                content: "";
                position: absolute;
                z-index: 30;
                top: 0;
                right: 0;
                left: 0;
                height: 68%;
                pointer-events: none;
                opacity: 0;
                background: linear-gradient(
                    to bottom,
                    rgba(13, 13, 13, .78) 0%,
                    rgba(13, 13, 13, .58) 36%,
                    rgba(13, 13, 13, .24) 68%,
                    rgba(13, 13, 13, 0) 100%
                );
                -webkit-backdrop-filter: blur(14px);
                backdrop-filter: blur(14px);
                -webkit-mask-image: linear-gradient(
                    to bottom,
                    #000 0%,
                    #000 28%,
                    rgba(0, 0, 0, .72) 58%,
                    transparent 100%
                );
                mask-image: linear-gradient(
                    to bottom,
                    #000 0%,
                    #000 28%,
                    rgba(0, 0, 0, .72) 58%,
                    transparent 100%
                );
                transition: opacity .75s ease-out;
            }

            .container.is--map .map-wrapper.is--barcelona-focus::after {
                opacity: 1;
            }

            .section.is--map .click-me,
            .section.is--map .text-wrapper-spotify {
                display: none !important;
            }

            .section.is--map .dot-video {
                pointer-events: none !important;
                cursor: default !important;
            }

            .section.is--fields.is--terminal-offers .h2-fields {
                width: min(100%, 22rem);
                font-size: clamp(1.75rem, 8vw, 2.25rem);
            }

            .section.is--fields.is--terminal-offers .link-container {
                width: min(100%, 22rem);
            }

            .section.is--tracker .tracker-header .tracker-wrapper-mobile > :first-child,
            .section.is--tracker .tracker-row .tracker-wrapper-mobile > :first-child {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }

            .tracker-row.is--mobile-hidden {
                display: none !important;
            }

            /* Lift the habit rows and their highlight without moving the XP UI. */
            .tracker-wrapper > .tracker-header,
            .tracker-wrapper > .tracker-row,
            .tracker-wrapper > .tracker-highlight {
                translate: 0 -1.35rem;
            }

            /* Give the mobile status block more air below the explanatory copy. */
            .tracker-wrapper > .tracker-pompes.tracker-xp-shell {
                translate: 0 1.5rem;
            }

            .section.is--tracker .niveaux {
                translate: 0 .95rem;
            }

            .section.is--tracker .svg-wrapper {
                display: flex !important;
                align-items: center;
                justify-content: flex-start;
                gap: .5rem;
                margin-top: 2rem;
                color: #fff;
                opacity: 1;
            }

            .section.is--tracker .wait-message {
                display: none !important;
            }

            .section.is--tracker .tracker-checkbox.is--button.is--glow {
                border: .0625rem solid #fff !important;
                background-color: #2f2f2f !important;
                box-shadow: none !important;
                transform: none !important;
                animation: none !important;
            }

            .section.is--tracker .tracker-checkbox.is--button.is--glow::before {
                display: none !important;
                content: none !important;
                animation: none !important;
            }

            .section.is--tracker .tracker-checkbox.is--button.is--glow
            .tracker-checkbox-inside.is--button {
                background-color: #fff !important;
                animation: tracker-center-square-pulse 2.1s ease-in-out infinite;
            }

            .section.is--tracker[data-xp-cycle-complete="true"]
            .tracker-checkbox.is--button {
                border-color: ${ACCENT_COLOR} !important;
                background-color: rgba(210, 170, 98, .16) !important;
                box-shadow:
                    0 0 .25rem rgba(247, 232, 189, .42),
                    0 0 .65rem rgba(210, 170, 98, .38) !important;
                transition:
                    border-color .22s ease-out,
                    background-color .22s ease-out,
                    box-shadow .22s ease-out;
            }

            .section.is--tracker[data-xp-cycle-complete="true"]
            .tracker-checkbox.is--button
            .tracker-checkbox-inside.is--button {
                opacity: 1 !important;
                background-color: ${ACCENT_COLOR} !important;
                box-shadow: 0 0 .4rem rgba(247, 232, 189, .65);
                animation: none !important;
            }

            @keyframes tracker-center-square-pulse {
                0%,
                100% {
                    opacity: .28;
                }

                50% {
                    opacity: 1;
                }
            }
        }

        html.is--terminal-offers-locked,
        body.is--terminal-offers-locked {
            overflow: hidden !important;
            overscroll-behavior: none;
        }

        @keyframes gold-wait-sweep {
            0% {
                background-position: 125% 0;
            }

            100% {
                background-position: -125% 0;
            }
        }

        @keyframes gold-level-shimmer {
            0%, 18% {
                background-position: 120% 0;
                filter: drop-shadow(0 0 .18rem rgba(210, 170, 98, .38));
            }

            58% {
                filter: drop-shadow(0 0 .3rem rgba(247, 232, 189, .65));
            }

            82%, 100% {
                background-position: -120% 0;
                filter: drop-shadow(0 0 .18rem rgba(210, 170, 98, .38));
            }
        }
    `;
    document.head.appendChild(accentOverrides);
}

function enhanceBarcelonaDateCard() {
    document.querySelectorAll('.text-wrapper-date').forEach(dateWrapper => {
        if (dateWrapper.classList.contains('is--date-card')) return;

        const dateParagraphs = dateWrapper.querySelectorAll(':scope > .paragraph');
        const titleParagraph = dateParagraphs[0];
        const dateParagraph = dateParagraphs[1];

        if (titleParagraph) {
            const eventTitle = 'Barcelone 2027';
            titleParagraph.textContent = eventTitle;
            titleParagraph.setAttribute('aria-label', eventTitle);
        }

        if (dateParagraph) {
            const dateLabel = 'Du 15.05 au 17.05';
            dateParagraph.textContent = dateLabel;
            dateParagraph.setAttribute('aria-label', dateLabel);
        }

        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'barcelona-date-card__calendar';
        calendarIcon.setAttribute('aria-hidden', 'true');
        calendarIcon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3V6M17 3V6M4.5 9H19.5M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 13H10M14 13H16M8 17H10M14 17H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;

        dateWrapper.prepend(calendarIcon);
        dateWrapper.classList.add('is--date-card');
    });
}

function rewriteMobileTrackerIntro() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const trackerIntro = document.querySelector(
        '.section.is--tracker .wrapper-p .text-section'
    ) || document.querySelector('.section.is--tracker .text-section');

    if (!trackerIntro) return;

    const mobileIntro = 'Renforce la structure de tes journées avec un tracker où streaks, bonus et classements te maintiennent engagé.';
    trackerIntro.textContent = mobileIntro;
    trackerIntro.setAttribute('aria-label', mobileIntro);
}

function removeTimelineInscriptionLabel() {
    document.querySelectorAll(
        '.tree-container.is--compare .inscription-rc'
    ).forEach(label => label.remove());
}

function mergeTimelineAccessAndPreparation() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const timelineSection = document.querySelector('.section.is--timeline');
    const accessPanel = timelineSection?.querySelector('.timeline-panel.is--1');
    const materialPanel = timelineSection?.querySelector('.timeline-panel.is--2.is--fixed');
    const preparationPanel = timelineSection?.querySelector('.timeline-panel.is--3');
    const accessContent = accessPanel?.querySelector('.div-block-3');

    if (!timelineSection || !accessPanel || !materialPanel || !accessContent) return;
    if (accessContent.classList.contains('timeline-access-preparation')) return;

    const sourceImage = materialPanel.querySelector(
        '.gif-container.is--mobile img, .gif-container img'
    );
    if (!sourceImage) return;

    const title = document.createElement('div');
    title.className = 'big-title-section is--timeline timeline-access-preparation__title';
    title.textContent = 'Accès et préparation';
    title.setAttribute('aria-label', title.textContent);

    const firstText = document.createElement('div');
    firstText.className = 'text-block-4 is--short timeline-access-preparation__text';
    firstText.textContent = 'Après ton inscription, tu reçois le coffret du Reboot Camp par la poste. À l’intérieur, tu trouveras ta carte d’accès, l’agenda du Reboot Camp, une lettre à ouvrir le jour J et une fiole en verre.';
    firstText.setAttribute('aria-label', firstText.textContent);

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'timeline-access-preparation__image';
    const image = sourceImage.cloneNode(true);
    image.classList.remove('is--mobile');
    image.loading = 'eager';
    imageWrapper.appendChild(image);

    const secondText = document.createElement('div');
    secondText.className = 'text-block-4 is--short timeline-access-preparation__text';
    secondText.textContent = 'Grâce à ta carte d’accès, tu rejoins la plateforme, télécharges l’application du tracker et découvres un premier contenu pour préparer ton départ du lundi suivant.';
    secondText.setAttribute('aria-label', secondText.textContent);

    accessContent.replaceChildren(title, firstText, imageWrapper, secondText);
    accessContent.classList.add('timeline-access-preparation');

    // The image source stays in the DOM because the existing GSAP sequence
    // references this fixed panel. Hiding it avoids duplicated content without
    // breaking those callbacks.
    materialPanel.classList.add('is--merged-source');
    materialPanel.setAttribute('aria-hidden', 'true');

    // Removing the obsolete preparation panel also removes its horizontal
    // footprint; the existing dynamic width calculation then keeps every
    // following week and the map hand-off aligned.
    preparationPanel?.remove();
}

function alignMobileAccessPreparationToTimelineDot() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const accessContent = document.querySelector(
        '.section.is--timeline .timeline-panel.is--1 .timeline-access-preparation'
    );
    const accessTitle = accessContent?.querySelector(
        '.timeline-access-preparation__title'
    );
    const timelineDot = document.querySelector(
        '.section.is--timeline .dot-wrapper-new'
    );

    if (!accessContent || !accessTitle || !timelineDot) return;

    // Measure from the unshifted position so refreshes never accumulate an
    // additional offset.
    gsap.set(accessContent, { y: 0 });

    const titleRect = accessTitle.getBoundingClientRect();
    const dotRect = timelineDot.getBoundingClientRect();
    const dotCenterY = dotRect.top + dotRect.height / 2;
    const titleCenterY = titleRect.top + titleRect.height / 2;

    gsap.set(accessContent, {
        y: dotCenterY - titleCenterY,
    });
}

function normalizeMobileTimelinePanelSpacing() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const accessLastText = document.querySelector(
        '.section.is--timeline .timeline-access-preparation__text:last-child'
    );
    const weekPanels = [5, 6, 7, 8]
        .map(index => document.querySelector(
            `.section.is--timeline .timeline-panel.is--${index}`
        ))
        .filter(Boolean);

    if (!accessLastText || weekPanels.length !== 4) return;

    const getPanelParts = panel => ({
        panel,
        content: panel.querySelector(':scope > .div-block-3') || panel,
        title: panel.querySelector('.big-title-section.is--timeline'),
    });
    const panelParts = weekPanels.map(getPanelParts);

    if (panelParts.some(({ title }) => !title)) return;

    // Restore the natural flow before measuring so refreshes never accumulate
    // either the former transform correction or the new margin correction.
    panelParts.forEach(({ panel }) => {
        gsap.set(panel, { clearProps: 'transform' });
        panel.style.marginTop = '0px';
    });

    const weekThree = panelParts[2];
    const weekFour = panelParts[3];
    const referenceGap = (
        weekFour.title.getBoundingClientRect().top
        - weekThree.content.getBoundingClientRect().bottom
    );
    const targetGap = Math.max(0, referenceGap * 0.6);

    // Apply a real flow-space correction rather than a visual translation.
    // Every complete block therefore keeps the same reduced gap and the
    // timeline/map hand-off remains based on the updated document height.
    let previousBottom = accessLastText.getBoundingClientRect().bottom;

    panelParts.forEach(({ panel, content, title }) => {
        const currentGap = title.getBoundingClientRect().top - previousBottom;
        panel.style.marginTop = `${targetGap - currentGap}px`;
        previousBottom = content.getBoundingClientRect().bottom;
    });
}

function alignMobileTimelineEndToLastSunday() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return null;

    const timelineWrapper = document.querySelector(
        '.section.is--timeline .timeline-panels-wrapper'
    );
    const greyLine = timelineWrapper?.querySelector('.grey-line-new');
    const lastSunday = timelineWrapper?.querySelector(
        '.timeline-panel.is--8 '
        + '.mobile-week-recurring-schedule__line:last-child'
    );

    if (!timelineWrapper || !greyLine || !lastSunday) return null;

    const wrapperRect = timelineWrapper.getBoundingClientRect();
    const sundayRect = lastSunday.getBoundingClientRect();
    const computedGreyTop = parseFloat(
        window.getComputedStyle(greyLine).top
    ) || 0;
    const sundayCenterInWrapper = (
        sundayRect.top
        + sundayRect.height / 2
        - wrapperRect.top
    );

    gsap.set(greyLine, {
        height: Math.max(0, sundayCenterInWrapper - computedGreyTop),
    });

    return lastSunday;
}

function alignMobileTimelineDotToCompareDot() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const outgoingDot = document.querySelector(
        '.tree-container.is--compare .line-wrapper-bottom > .dot-wrapper .dot'
    );
    const incomingDot = document.querySelector(
        '.section.is--timeline .dot-wrapper-new'
    );

    if (!outgoingDot || !incomingDot) return;

    // Always measure the incoming point from its native position so repeated
    // forward/reverse transitions cannot accumulate a transform offset.
    gsap.set(incomingDot, { x: 0, y: 0 });

    const outgoingRect = outgoingDot.getBoundingClientRect();
    const incomingRect = incomingDot.getBoundingClientRect();
    const outgoingCenterX = outgoingRect.left + outgoingRect.width / 2;
    const outgoingCenterY = outgoingRect.top + outgoingRect.height / 2;
    const incomingCenterX = incomingRect.left + incomingRect.width / 2;
    const incomingCenterY = incomingRect.top + incomingRect.height / 2;

    gsap.set(incomingDot, {
        x: outgoingCenterX - incomingCenterX,
        y: outgoingCenterY - incomingCenterY,
    });

    // The first timeline content uses this same point as its vertical anchor.
    alignMobileAccessPreparationToTimelineDot();
    normalizeMobileTimelinePanelSpacing();
}

function alignCompareWhiteProgressGeometry() {
    const compareTree = document.querySelector('.tree-container.is--compare');
    const initialLine = compareTree?.querySelector(
        '.tree-left-side .line.is--compare'
    );
    const whiteInitialLine = initialLine?.querySelector('.line-clr');
    const whiteConnector = initialLine?.querySelector('.line-vertical-clr');
    const greyAxis = compareTree?.querySelector('.line-vertical-wrapper');
    const targetWrapper = compareTree?.querySelector('.line-wrapper-bottom');
    const targetBar = targetWrapper?.querySelector('.line.is--reallywant');
    const dotWrapper = targetWrapper?.querySelector(':scope > .dot-wrapper');

    if (
        !initialLine
        || !whiteInitialLine
        || !whiteConnector
        || !greyAxis
        || !targetWrapper
        || !targetBar
        || !dotWrapper
    ) return;

    const isMobile = window.matchMedia('(max-width: 47.99rem)').matches;
    const initialRect = initialLine.getBoundingClientRect();
    const targetRect = targetBar.getBoundingClientRect();
    const targetWrapperRect = targetWrapper.getBoundingClientRect();

    if (isMobile) {
        // The responsive Webflow rule gives this horizontal white connector a
        // fixed width. Measure the real distance instead, so its leading edge
        // stops on the left border of the vertical grey branch on every phone.
        const connectorRect = whiteConnector.getBoundingClientRect();
        const connectorAnchorX = connectorRect.right;
        const targetLeftX = targetRect.left;

        whiteConnector.style.left = 'auto';
        whiteConnector.style.right = '0px';
        whiteConnector.style.width = `${Math.max(
            0,
            connectorAnchorX - targetLeftX
        )}px`;

        const alignedConnectorRect = whiteConnector.getBoundingClientRect();
        const intersectionX = targetRect.left + targetRect.width / 2;
        const intersectionY = (
            alignedConnectorRect.top + alignedConnectorRect.height / 2
        );

        dotWrapper.style.left = `${
            intersectionX - targetWrapperRect.left
        }px`;
        dotWrapper.style.top = `${
            intersectionY - targetWrapperRect.top
        }px`;
        return;
    }

    // On desktop the first white segment is horizontal. Stop it at the left
    // border of the central grey axis instead of inheriting the two-pixel
    // overlap applied to the underlying grey line.
    const greyAxisRect = greyAxis.getBoundingClientRect();
    whiteInitialLine.style.left = '0px';
    whiteInitialLine.style.right = 'auto';
    whiteInitialLine.style.width = `${Math.max(
        0,
        greyAxisRect.left - initialRect.left
    )}px`;

    // Keep the circle centred on the exact intersection between the vertical
    // grey axis and the lower horizontal branch.
    const intersectionX = greyAxisRect.left + greyAxisRect.width / 2;
    const intersectionY = targetRect.top + targetRect.height / 2;
    dotWrapper.style.left = `${intersectionX - targetWrapperRect.left}px`;
    dotWrapper.style.top = `${intersectionY - targetWrapperRect.top}px`;
}

function distributeMobileScheduleAcrossWeeks() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return;

    const timelineSection = document.querySelector('.section.is--timeline');
    const floatingSchedulePanel = timelineSection?.querySelector(
        '.timeline-panel.is--4.is--fixed'
    );
    const recurringLines = [
        'Vendredi – Méditation guidée',
        'Dimanche – Purgatoire (1–2h)',
    ];

    floatingSchedulePanel?.classList.add('is--mobile-schedule-removed');
    floatingSchedulePanel?.setAttribute('aria-hidden', 'true');

    [5, 6, 7, 8].forEach(panelIndex => {
        const panel = timelineSection?.querySelector(
            `.timeline-panel.is--${panelIndex}`
        );
        const modules = panel?.querySelector('.module-container');

        if (!modules) return;

        modules.querySelector('.mobile-week-recurring-schedule')?.remove();

        if (panelIndex === 8) {
            Array.from(modules.querySelectorAll('.text-block-4')).forEach(module => {
                if (
                    module.textContent
                        .trim()
                        .toLocaleLowerCase('fr')
                        .startsWith('vendredi')
                ) {
                    module.classList.add('is--mobile-friday-suppressed');
                }
            });
        }

        const recurringSchedule = document.createElement('div');
        recurringSchedule.className = 'mobile-week-recurring-schedule';

        recurringLines.forEach(label => {
            const line = document.createElement('div');
            line.className = (
                'text-block-4 mobile-week-recurring-schedule__line'
            );
            line.textContent = label;
            line.setAttribute('aria-label', label);
            recurringSchedule.appendChild(line);
        });

        modules.appendChild(recurringSchedule);
    });
}

function updateWeekFourFridayLabel() {
    const weekFourModules = document.querySelectorAll(
        '.section.is--timeline .timeline-panel.is--8 .module-container .text-block-4'
    );
    const fridayModule = Array.from(weekFourModules).find(module =>
        module.textContent.trim().toLocaleLowerCase('fr').startsWith('vendredi')
    );

    if (!fridayModule) return;

    const fridayLabel = 'Vendredi – Conclusion';
    fridayModule.textContent = fridayLabel;
    fridayModule.setAttribute('aria-label', fridayLabel);
}

function createMobileTreeRedesign() {
    if (!window.matchMedia('(max-width: 47.99rem)').matches) return null;

    const parentSection = document.querySelector('.parent-section');
    if (!parentSection) return null;

    const existingTree = parentSection.querySelector('.mobile-tree-redesign');
    if (existingTree) return existingTree;

    const mobileTree = document.createElement('div');
    mobileTree.className = 'mobile-tree-redesign';
    mobileTree.setAttribute('aria-hidden', 'true');
    mobileTree.innerHTML = `
        <div class="mobile-tree-redesign__copy">
            <h2 class="mobile-tree-redesign__copy-title">
                Une structure en <span class="mobile-tree-redesign__copy-title-accent">deux sections</span>
            </h2>
            <p class="mobile-tree-redesign__copy-text">Tous les membres sont affectés à une section dont ils influencent le score grâce au maintien de leurs habitudes.</p>
        </div>
        <div class="mobile-tree-redesign__formula-copy">
            <h2 class="mobile-tree-redesign__formula-title">
                Une expérience,
                <span class="mobile-tree-redesign__formula-title-accent">deux formules</span>
            </h2>
            <p class="mobile-tree-redesign__formula-text">
                <span class="mobile-tree-redesign__formula-label">Solo :</span>
                tu démarres quand tu veux, sans engagement vis-à-vis d’un groupe.
            </p>
            <p class="mobile-tree-redesign__formula-text">
                <span class="mobile-tree-redesign__formula-label">Groupe :</span>
                tu avances avec ton groupe et participes au visio obligatoire du dimanche.
            </p>
        </div>
        <div class="mobile-tree-redesign__diagram">
            <div class="mobile-tree-redesign__node mobile-tree-redesign__root">REBOOT CAMP</div>
            <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__first-trunk"></span>
            <span class="mobile-tree-redesign__line is--horizontal mobile-tree-redesign__first-horizontal"></span>
            <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__first-leg is--left"></span>
            <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__first-leg is--right"></span>

            <div class="mobile-tree-redesign__label mobile-tree-redesign__section-label is--left">
                <span class="mobile-tree-redesign__label-prefix">SECTION</span>
                <span class="mobile-tree-redesign__label-accent">KAOS</span>
            </div>
            <div class="mobile-tree-redesign__label mobile-tree-redesign__section-label is--right">
                <span class="mobile-tree-redesign__label-prefix">SECTION</span>
                <span class="mobile-tree-redesign__label-accent">COSMOS</span>
            </div>

            <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__center-line"></span>

            <div class="mobile-tree-redesign__subtree">
                <div class="mobile-tree-redesign__node mobile-tree-redesign__current">TA SECTION</div>
                <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__second-trunk"></span>
                <span class="mobile-tree-redesign__line is--horizontal mobile-tree-redesign__second-horizontal"></span>
                <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__second-leg is--left"></span>
                <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__second-leg is--right"></span>

                <div class="mobile-tree-redesign__label mobile-tree-redesign__choice-label is--left">EN GROUPE</div>
                <div class="mobile-tree-redesign__label mobile-tree-redesign__choice-label is--right">EN SOLO</div>

                <span class="mobile-tree-redesign__line is--vertical mobile-tree-redesign__toi-line"></span>
                <div class="mobile-tree-redesign__label mobile-tree-redesign__toi">TOI</div>
            </div>
        </div>
    `;

    parentSection.appendChild(mobileTree);
    return mobileTree;
}


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

    gsap.set(".title-intro", {
        opacity: 0,
        filter: "blur(10px)",
    });

    // Create a master ScrollTrigger for pinning
    ScrollTrigger.create({
        trigger: ".section.is--intro",
        start: "top top",
        end: "+=140%", // Enough space for all animations
        pin: true,

        // markers: true,
        id: "masterPin"

    });

    const barsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--intro",
            start: "top top",
            end: "+=400%", // Just for the bar animations
            scrub: true,
            // markers: { startColor: "blue", endColor: "blue" },
            id: "barsScrub",

        }
    });

    const durationPerBar = 1 / bars.length;
    const barTimings = bars.map((bar, index) => {
        const isLastSeven = index >= bars.length - 7;
        const duration = isLastSeven ? durationPerBar * 7 : durationPerBar;
        const delay = index === 0 ? 0 :
            index <= bars.length - 7 ?
                index * durationPerBar :
                (bars.length - 7) * durationPerBar + (index - (bars.length - 7)) * durationPerBar * 7;

        return { bar, duration, delay };
    });

    barTimings.forEach(({ bar, duration, delay }) => {
        barsTl.to(bar, {
            autoAlpha: 1,
            scaleY: 1,
            duration: duration,
            ease: "power1.out"
        }, delay);
    });

    const fourthBarFromEnd = barTimings[barTimings.length - 4];
    const secondBarFromEnd = barTimings[barTimings.length - 2];
    const titleRevealStart = fourthBarFromEnd?.delay ?? Math.max(0, barsTl.duration() - 1);
    const titleRevealEnd = secondBarFromEnd
        ? secondBarFromEnd.delay + secondBarFromEnd.duration
        : titleRevealStart + 1;
    const titleRevealDuration = Math.max(.01, titleRevealEnd - titleRevealStart);

    barsTl
        .to(".title-intro", {

            opacity: 1,
            filter: "blur(0px)",
            duration: titleRevealDuration,
            stagger: 0.1,
            ease: "easeOutQuart",
        }, titleRevealStart)
        .to({}, {
            onStart: function () {
                flashAndScrambleTl.play(0);
            },
            onReverseComplete: function () {
                flashAndScrambleTl.reverse();
            },
        }, "-=.8")
        .to({}, {
            duration: window.innerWidth > 767 ? 6 : 9,
            ease: "none"
        })

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
    });
}

function initTrackerSection() {

    const buttonsToGlow = document.querySelectorAll(".is--glow");
    const trackerTitleSelector = (
        ".section.is--tracker .big-title-section"
    );
    const trackerTextSelector = (
        ".section.is--tracker .wrapper-p .text-section"
    );
    const trackerCopy = `${trackerTitleSelector}, ${trackerTextSelector}`;
    const isMobile = window.matchMedia('(max-width: 47.99rem)').matches;

    buttonsToGlow.forEach(button => {
        button.classList.toggle("is--glow");
    });

    // gsap.set(".purgatoire-message", {
    //     autoAlpha: 0,
    // })

    gsap.set(".tracker-highlight", {
        autoAlpha: isMobile ? 1 : 0,
    })

    if (!isMobile) {
        gsap.set(trackerCopy, {
            autoAlpha: 0,
            y: 12,
        });
    }
    gsap.set(".section.is--tracker .big-title-section .lineInner, .section.is--tracker .wrapper-p .lineInner", {
        yPercent: 0,
    });

    if (isMobile) {
        const trackerContainer = document.querySelector(
            '.section.is--tracker .container.is--tracker'
        );
        const trackerSection = document.querySelector('.section.is--tracker');
        const trackerHeading = (
            ".section.is--tracker .container.is--tracker > " +
            ".big-title-section, " +
            ".section.is--tracker .container.is--tracker > .wrapper-p"
        );
        const trackerDetails = (
            ".section.is--tracker .container.is--tracker > .svg-wrapper, " +
            ".section.is--tracker .container.is--tracker > " +
            ".tracker-container"
        );
        if (!trackerContainer || !trackerSection) return;

        const trackerPlaceholder = document.createElement('div');
        trackerPlaceholder.className = 'mobile-tracker-placeholder';
        trackerPlaceholder.setAttribute('aria-hidden', 'true');
        trackerSection.before(trackerPlaceholder);
        trackerSection.setAttribute(
            'data-mobile-tracker-overlay',
            'true'
        );
        gsap.set(trackerSection, {
            autoAlpha: 0,
        });
        gsap.set(trackerContainer, {
            autoAlpha: 1,
        });
        gsap.set(trackerHeading, {
            autoAlpha: 0,
            y: 12,
        });
        gsap.set(trackerDetails, {
            autoAlpha: 0,
        });
        ScrollTrigger.create({
            // Begin just before the placeholder reaches the top so the reveal
            // feels continuous with the final movement of the intro.
            trigger: trackerPlaceholder,
            start: "top 5%",
            onEnter: () => {
                window.lenis?.stop();
                gsap.set(trackerSection, {
                    autoAlpha: 1,
                });
                gsap.timeline()
                    .to(trackerHeading, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 2.15,
                        ease: "none",
                        overwrite: true,
                    }, 0)
                    .to(trackerDetails, {
                        autoAlpha: 1,
                        duration: 2.15,
                        ease: "none",
                        overwrite: true,
                    }, 0);
                buttonsToGlow.forEach(button => {
                    button.classList.add("is--glow");
                });
            },
            markers: false,
        });
    } else {
        gsap.to(trackerCopy, {
            autoAlpha: 1,
            y: 0,
            duration: 2.15,
            ease: "none",
            scrollTrigger: {
                trigger: ".section.is--tracker",
                start: "top 80%",
                toggleActions: "play none none none",
                markers: false
            }
        });
    }

    if (!isMobile) {
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

        tl.from(".container.is--tracker .tracker-pompes", {
            autoAlpha: 0,
            duration: 1,
            ease: "easeOutQuart",
        }, "<")


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
    }



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

function createTrackerXpBar() {
    const xpContainer = document.querySelector('.tracker-pompes');
    if (!xpContainer) return null;

    if (!document.getElementById('tracker-xp-styles')) {
        const style = document.createElement('style');
        style.id = 'tracker-xp-styles';
        style.textContent = `
            .tracker-pompes.tracker-xp-shell {
                display: flex !important;
                align-items: stretch;
                left: .5rem !important;
                right: .5rem !important;
                width: calc(100% - 1rem) !important;
                max-width: none !important;
                height: auto !important;
            }

            .tracker-xp-track {
                position: relative;
                width: 100%;
                height: .32rem;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, .35);
                background: rgba(255, 255, 255, .08);
                transition:
                    border-color .4s ease-out,
                    box-shadow .4s ease-out;
            }

            .tracker-xp-fill {
                position: absolute;
                inset: 0;
                background-image: linear-gradient(
                    100deg,
                    #a97932 0%,
                    ${ACCENT_COLOR} 34%,
                    #f7e8bd 48%,
                    ${ACCENT_COLOR} 62%,
                    #a97932 100%
                );
                background-size: 220% 100%;
                background-position: 120% 0;
                box-shadow:
                    0 0 .25rem rgba(247, 232, 189, .55),
                    0 0 .65rem rgba(210, 170, 98, .75);
                transform: scaleX(0);
                transform-origin: left center;
                will-change: transform;
                animation: tracker-gold-shimmer 2.1s linear infinite;
            }

            .tracker-xp-track.is-charging {
                border-color: rgba(210, 170, 98, .9);
                box-shadow: 0 0 .85rem rgba(210, 170, 98, .45);
            }

            .tracker-xp-shell.is-complete .tracker-xp-track {
                border-color: ${ACCENT_COLOR};
                box-shadow:
                    0 0 .35rem rgba(247, 232, 189, .65),
                    0 0 1rem rgba(210, 170, 98, .8);
            }

            @keyframes tracker-gold-shimmer {
                0% {
                    background-position: 120% 0;
                }

                100% {
                    background-position: -120% 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    xpContainer.classList.add('tracker-xp-shell');
    xpContainer.setAttribute('role', 'progressbar');
    xpContainer.setAttribute('aria-label', 'Progression XP');
    xpContainer.setAttribute('aria-valuemin', '0');
    xpContainer.setAttribute('aria-valuemax', '100');
    xpContainer.setAttribute('aria-valuenow', String(TRACKER_XP_INITIAL_PERCENT));
    xpContainer.setAttribute('data-xp-progress', String(TRACKER_XP_INITIAL_PERCENT));
    xpContainer.innerHTML = `
        <div class="tracker-xp-track">
            <div class="tracker-xp-fill"></div>
        </div>
    `;

    const track = xpContainer.querySelector('.tracker-xp-track');
    const fill = xpContainer.querySelector('.tracker-xp-fill');
    gsap.set(fill, {
        scaleX: TRACKER_XP_INITIAL_PERCENT / 100,
    });

    return {
        container: xpContainer,
        track,
        fill,
    };
}

function configureTrackerRows() {
    const rows = document.querySelectorAll('.tracker-row');

    rows.forEach(row => {
        const label = row.querySelector('.day.is--first');
        const normalizedLabel = label?.textContent.trim().toLocaleLowerCase('fr');

        if (normalizedLabel === 'planifier le lendemain') {
            row.classList.add('is--mobile-hidden');
        }
    });
}

function getActiveTrackerButtons() {
    const isMobile = window.matchMedia('(max-width: 47.99rem)').matches;

    return Array.from(document.querySelectorAll('.tracker-checkbox.is--button'))
        .filter(button => {
            const row = button.closest('.tracker-row');
            return !isMobile || !row?.classList.contains('is--mobile-hidden');
        });
}

function compactTrackerHighlight() {
    const highlight = document.querySelector('.tracker-highlight');
    const highlightedDay = document.querySelector('.tracker-header .day.the-day');
    const highlightedCheckboxes = getActiveTrackerButtons();
    const bottomCheckbox = highlightedCheckboxes[highlightedCheckboxes.length - 1];

    if (!highlight || !highlightedDay || !bottomCheckbox) return;

    const highlightRect = highlight.getBoundingClientRect();
    const dayRect = highlightedDay.getBoundingClientRect();
    const bottomCheckboxRect = bottomCheckbox.getBoundingClientRect();
    const topGap = dayRect.top - highlightRect.top;
    const bottomGap = highlightRect.bottom - bottomCheckboxRect.bottom;

    if (topGap <= 0 || bottomGap <= 0) return;

    // Halve the top gap and apply the exact same inset to the bottom edge.
    const symmetricInset = Math.min(topGap / 2, bottomGap - 1);
    if (symmetricInset <= 0) return;

    const currentTop = highlight.offsetTop;
    const currentHeight = highlight.offsetHeight;

    highlight.style.top = `${currentTop + symmetricInset}px`;
    highlight.style.bottom = 'auto';
    highlight.style.height = `${currentHeight - symmetricInset * 2}px`;
}

function positionTrackerLevelOnMobile(levelContainer, xpContainer) {
    if (!levelContainer || !xpContainer || !window.matchMedia('(max-width: 47.99rem)').matches) return;

    const levelRect = levelContainer.getBoundingClientRect();
    const xpRect = xpContainer.getBoundingClientRect();
    const mobileGap = 8;
    const requiredShift = xpRect.top - mobileGap - levelRect.bottom;
    const computedTranslate = window.getComputedStyle(levelContainer).translate;
    const translateValues = computedTranslate && computedTranslate !== 'none'
        ? computedTranslate.split(' ')
        : [];
    const currentTranslateY = parseFloat(translateValues[1]) || 0;

    levelContainer.style.translate = `0 ${currentTranslateY + requiredShift}px`;
}

function animateXpBar(xpBar, targetPercent, onTargetReached) {
    return new Promise(resolve => {
        if (!xpBar) {
            onTargetReached?.();
            resolve();
            return;
        }

        xpBar.track.classList.add('is-charging');
        xpBar.container.setAttribute('aria-valuenow', String(targetPercent));
        xpBar.container.setAttribute('data-xp-progress', String(targetPercent));

        gsap.to(xpBar.fill, {
            scaleX: targetPercent / 100,
            duration: .6,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => {
                // Run the level-up synchronously in the exact frame where the
                // fill reaches the end of the gauge.
                onTargetReached?.();
                xpBar.track.classList.remove('is-charging');
                resolve();
            }
        });

        gsap.to(xpBar.container, {
            keyframes: [
                { scale: 1.012, duration: .3, ease: 'power2.in' },
                { scale: 1, duration: .3, ease: 'power2.out' }
            ],
            overwrite: 'auto'
        });
    });
}

function resetCompletedXpBar(xpBar, trackerSection) {
    return new Promise(resolve => {
        // Trigger the level-up on the exact frame the XP fill reaches 100%.
        // Resetting the gauge is now purely visual and never delays progression.
        trackerSection?.setAttribute('data-xp-cycle-complete', 'true');
        trackerSection?.dispatchEvent(new CustomEvent('tracker-xp-cycle-complete'));

        if (!xpBar) {
            resolve();
            return;
        }

        xpBar.container.classList.add('is-complete');
        gsap.to(xpBar.container, {
            scale: 1.055,
            duration: .2,
            repeat: 1,
            yoyo: true,
            ease: 'power2.out'
        });

        gsap.to(xpBar.fill, {
            scaleX: 0,
            duration: .24,
            delay: .12,
            ease: 'power2.inOut',
            onComplete: () => {
                xpBar.container.classList.remove('is-complete');
                xpBar.container.setAttribute('aria-valuenow', '0');
                xpBar.container.setAttribute('data-xp-progress', '0');
                resolve();
            }
        });
    });
}

function initTrackerCheckboxes() {
    configureTrackerRows();

    const trackerButtons = getActiveTrackerButtons();
    const trackerSection = document.querySelector('.section.is--tracker');
    const xpBar = createTrackerXpBar();
    let completedSteps = 0;
    let xpResetStarted = false;

    // Match the habit-label typography and keep the number separate so the
    // level-up can still replace only 4 with 5.
    const levelContainer = document.querySelector('.niveaux');
    const levelElement = document.querySelector('.niveaux .level');
    const habitLabel = document.querySelector('.tracker-row .day.is--first');

    if (levelContainer && levelElement) {
        Array.from(levelContainer.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .forEach(node => node.remove());
        levelContainer.insertBefore(document.createTextNode('NIV.'), levelElement);

        if (habitLabel) {
            const habitLabelStyle = window.getComputedStyle(habitLabel);
            levelContainer.style.fontSize = habitLabelStyle.fontSize;
            levelContainer.style.lineHeight = habitLabelStyle.lineHeight;
            levelElement.style.fontSize = 'inherit';
        }

        const computedStyle = window.getComputedStyle(levelElement);
        const fontSize = parseFloat(computedStyle.fontSize);
        const levelBoxSize = Math.max(14, Math.ceil(fontSize * 1.1));

        gsap.set(levelElement, {
            transformOrigin: "50% 50%",
            minWidth: `${levelBoxSize}px`,
            width: `${levelBoxSize}px`,
            height: `${levelBoxSize}px`,
            lineHeight: `${levelBoxSize}px`,
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
            boxSizing: "border-box",
            x: 0,
            y: 0
        });

        gsap.set(levelElement.parentElement, {
            alignItems: "center"
        });
    }

    compactTrackerHighlight();
    positionTrackerLevelOnMobile(levelContainer, xpBar?.container);

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

            completedSteps += 1;
            const isLastStep = completedSteps >= trackerButtons.length;
            const xpPerHabit = TRACKER_XP_REMAINING_PERCENT / trackerButtons.length;
            const targetPercent = isLastStep
                ? 100
                : TRACKER_XP_INITIAL_PERCENT + completedSteps * xpPerHabit;

            animateXpBar(xpBar, targetPercent, () => {
                if (targetPercent !== 100 || xpResetStarted) return;

                xpResetStarted = true;
                resetCompletedXpBar(xpBar, trackerSection);
            });
        });
    });
}

function initScrollLock() {
    const trackerSection = document.querySelector('.section.is--tracker');
    const allSectionsAfterTracker = Array.from(document.querySelectorAll('.section, .parent-section')).filter(section => {
        // Get all sections that appear after the tracker in the DOM
        return section.compareDocumentPosition(trackerSection) & Node.DOCUMENT_POSITION_PRECEDING;
    });
    const trackerButtons = getActiveTrackerButtons();

    // Flag to track if content has been unlocked
    let contentUnlocked = false;

    // Hide all sections after the tracker
    allSectionsAfterTracker.forEach(section => {
        section.style.display = 'none';
    });

    // Recalculate the page limit after hiding the following sections. On
    // mobile, the tracker overlay pauses Lenis until the habits unlock the
    // remaining sections.
    requestAnimationFrame(() => {
        window.lenis?.resize?.();
        ScrollTrigger.refresh();
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
            gsap.to(waitMessage, { duration: 1, color: ACCENT_COLOR, scrambleText: "Parfait! Tu peux continuer." });
        }

        // Animate level up from 4 to 5
        const levelElement = document.querySelector('.niveaux .level');
        if (levelElement) {
            // Replace 4 with 5 synchronously on the exact frame the gauge
            // reaches 100%. The animation now enhances the new value instead
            // of delaying its appearance with a scale-out of the old one.
            levelElement.textContent = "5";
            levelElement.style.color = ACCENT_COLOR;
            levelElement.classList.add('is--gold-level');
            gsap.set(levelElement, {
                transformOrigin: "50% 50%",
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                x: 0,
                y: 0
            });

            gsap.timeline()
                .to(levelElement, {
                    scaleX: 1.35,
                    scaleY: 1.35,
                    transformOrigin: "50% 50%",
                    y: 0,
                    duration: 0.24,
                    ease: "power2.out"
                })
                .to(levelElement, {
                    scaleX: 1,
                    scaleY: 1,
                    transformOrigin: "50% 50%",
                    y: 0,
                    duration: 0.22,
                    ease: "power2.out",
                    onComplete: function () {
                        levelElement.style.filter = "";
                    }
                });
        }

        const trackerPlaceholder = document.querySelector(
            '.mobile-tracker-placeholder'
        );
        let shouldNudgeMobileScroll = false;
        if (
            trackerSection?.getAttribute('data-mobile-tracker-overlay') ===
            'true' &&
            trackerPlaceholder
        ) {
            const trackerTop = (
                trackerPlaceholder.getBoundingClientRect().top +
                window.scrollY
            );
            window.lenis?.scrollTo(trackerTop, {
                immediate: true,
                force: true,
            });
            window.scrollTo(0, trackerTop);
            trackerPlaceholder.replaceWith(trackerSection);
            trackerSection.removeAttribute('data-mobile-tracker-overlay');
            shouldNudgeMobileScroll = true;
        }

        initTreeDiagramWrapper(); // on page load
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // The following sections and GSAP pin spacers now exist in
                // the rendered layout. Recalculate both systems only at this
                // point so Lenis receives the real, unlocked page height.
                window.lenis?.resize?.();
                ScrollTrigger.refresh(true);
                window.lenis?.resize?.();
                window.lenis?.start();

                if (!shouldNudgeMobileScroll) return;

                const nudgeDistance = Math.min(
                    48,
                    window.innerHeight * .045
                );
                window.lenis?.scrollTo(
                    window.scrollY + nudgeDistance,
                    {
                        duration: .85,
                        force: true,
                        easing: progress => (
                            1 - Math.pow(1 - progress, 3)
                        ),
                    }
                );
            });
        });
    }

    // Check on each button click if tracker is complete
    trackerButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Only check completion if content hasn't been unlocked yet
            if (!contentUnlocked && checkTrackerComplete()) {
                if (trackerSection?.getAttribute('data-xp-cycle-complete') === 'true') {
                    unlockContent();
                    return;
                }

                trackerSection?.addEventListener('tracker-xp-cycle-complete', unlockContent, { once: true });
            }
        });
    });
}

let spotifyTarget;
function initTreeDiagram() {

    let mm = gsap.matchMedia();

    // Check if the second text animation should be disabled
    const secondTextElement = document.querySelector(".section.is--groupe p[data-split='lines'].is--second");
    const shouldAnimateSecond = !secondTextElement || secondTextElement.dataset.showAnimation !== "false";

    // set the height of the parent section to 100vh
    gsap.set(".parent-section", {
        height: "100vh"
    })
    gsap.set(".mask-2", {
        display: "inline",
    })
    const spotifyNumberEl = document.querySelector('.spotify-number');
    spotifyTarget = spotifyNumberEl ? parseFloat(spotifyNumberEl.textContent) : 0;
    if (spotifyNumberEl) {
        spotifyNumberEl.textContent = "0";
    }

    // set the width of the timeline wrapper to 400vw on desktop only
    mm.add("(min-width: 48rem)", () => {
        gsap.set(".timeline-panel.is--fixed", {
            position: "fixed",
            left: 0,
            top: 0,

        })

        gsap.set("section.is--timeline .timeline-container", {
            width: "200vw",
            overflow: "visible",

        })

        gsap.set("section.is--timeline .timeline-panels-wrapper", {
            flexDirection: "row",
            overflow: "visible",
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

    const videoBarca = document.querySelector(".barca-video-wrapper");
    if (videoBarca) {
        gsap.set(videoBarca, {
            autoAlpha: 0,
            yPercent: 20,
        })
    }

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

    gsap.set(".text-wrapper-date", {
        position: "absolute",
        left: "unset",
        top: "15rem"
    })

    mm.add("(min-width: 48rem)", () => {
        gsap.set(".text-wrapper-date", {
            top: "13.5rem"
        })
    })

    gsap.set(".text-wrapper-barca .lineInner", {
        yPercent: 100,
    })

    gsap.set(".text-wrapper-date .lineInner", {
        yPercent: 100,
    })

    gsap.set(".text-wrapper-date.is--date-card", {
        autoAlpha: 0,
    })

    gsap.set(".text-wrapper-spotify .lineInner", {
        yPercent: 100,
    })

    gsap.set(".text-wrapper-spotify .lower-wrapper > *", {
        autoAlpha: 0,
    })

    // Add this to hide all Spotify images except the first one
    gsap.set(".img-spotify:not(.is--first)", {
        autoAlpha: 0,
    })
    gsap.set(".img-spotify.is--first", {
        autoAlpha: 1,
    })

    gsap.set(".text-wrapper-spotify", {
        position: "absolute",
        left: "unset",
    })

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    alignCompareWhiteProgressGeometry();

    let treeTlOne;
    mm.add("(min-width: 768px)", () => {



        treeTlOne = gsap.timeline({
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

            }
        });
    })


    mm.add("(max-width: 767px)", () => {
        gsap.set(".parent-section", {
            height: "unset"
        })
        treeTlOne = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "linear",
            },
            scrollTrigger: {
                trigger: ".parent-section",
                start: "top top",
                end: "+=1500%",
                pin: true,
                pinSpacing: "margin",
                scrub: true,
                // onRefreshInit: self => {
                //     const distance = self.end - self.start;
                //     document.querySelector(".stackspacer").style.height = distance + "px";
                // },
                // onKill: () => {
                //     document.querySelector(".stackspacer").style.height = "";
                // },
                // onLeave: self => {
                //     gsap.set(self.trigger, { clearProps: "height,maxHeight" });
                //     // Clear pin-spacer height
                //     if (self.pin && self.pin.parentElement && self.pin.parentElement.classList.contains("pin-spacer")) {
                //         gsap.set(self.pin.parentElement, { clearProps: "height" });
                //     }
                // },

                // onLeaveBack: self => {
                //     gsap.set(self.trigger, { clearProps: "height,maxHeight" });
                //     // Clear pin-spacer height
                //     if (self.pin && self.pin.parentElement && self.pin.parentElement.classList.contains("pin-spacer")) {
                //         gsap.set(self.pin.parentElement, { clearProps: "height" });
                //     }
                // },

            }
        });

    })
    // create the main timeline





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

    const scrambleChildLabelCompareOne = gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .label", {
        duration: 1,
        scrambleText: {
            text: "{original}",
            speed: 0.65,
        },
        paused: true
    });
    const scrambleChildLabelCompareTwo = gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom .label", {
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


    gsap.set(".section.is--groupe p[data-split='lines'].is--second", {
        autoAlpha: 0
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

    if (isMobile) {
        const mobileTree = createMobileTreeRedesign();
        const mobileSectionCopy = ".mobile-tree-redesign__copy-text";
        const mobileSectionHeader = ".mobile-tree-redesign__copy-title";
        const mobileGroupCopy = ".mobile-tree-redesign__formula-text";
        const mobileGroupHeader = ".mobile-tree-redesign__formula-title";

        gsap.set(".tree-container.is--first, .tree-container.is--second, .tree-container.is--three", {
            autoAlpha: 0,
        });
        gsap.set(".section.is--section", {
            autoAlpha: 1,
        });

        if (mobileTree) {
            gsap.set(mobileTree, { autoAlpha: 1 });
            gsap.set(".mobile-tree-redesign__root", {
                y: 0,
                yPercent: 0,
                force3D: false,
            });
            gsap.set(".mobile-tree-redesign__first-trunk, .mobile-tree-redesign__first-leg, .mobile-tree-redesign__center-line, .mobile-tree-redesign__second-trunk, .mobile-tree-redesign__second-leg, .mobile-tree-redesign__toi-line", {
                scaleY: 0,
                transformOrigin: "top",
            });
            gsap.set(".mobile-tree-redesign__first-horizontal, .mobile-tree-redesign__second-horizontal", {
                scaleX: 0,
                transformOrigin: "center",
            });
            gsap.set(".mobile-tree-redesign__section-label, .mobile-tree-redesign__current, .mobile-tree-redesign__choice-label, .mobile-tree-redesign__toi", {
                autoAlpha: 0,
            });
            gsap.set(".mobile-tree-redesign__copy-title, .mobile-tree-redesign__copy-text", {
                autoAlpha: 0,
                y: 12,
            });
            gsap.set(".mobile-tree-redesign__formula-title, .mobile-tree-redesign__formula-text", {
                autoAlpha: 0,
                y: 12,
            });
            gsap.set(".section.is--compare .header-pres.is--compare", {
                autoAlpha: 0,
                y: 12,
            });
            gsap.set(".section.is--compare .header-pres.is--compare [data-split='lines'] .lineInner", {
                yPercent: 0,
            });

            treeTlOne
                // Prevent the completed tracker section from bleeding through
                // the transparent hand-offs between the mobile diagrams and
                // the timeline. Reversing the scrub restores it naturally.
                .to(".section.is--tracker", {
                    autoAlpha: 0,
                    duration: .05,
                    ease: "none",
                }, 0)
                // Step 1: Reboot Camp splits into Chaos and Cosmos. No centre
                // branch exists until the following scroll phase.
                .addLabel("mobileFirstDiagramDraw")
                .to(".mobile-tree-redesign__first-trunk", {
                    scaleY: 1,
                    duration: .55,
                }, "mobileFirstDiagramDraw")
                .to(mobileSectionCopy, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 2.15,
                    ease: "none",
                }, "mobileFirstDiagramDraw")
                .to(mobileSectionHeader, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 2.15,
                    ease: "none",
                }, "mobileFirstDiagramDraw")
                .to(".mobile-tree-redesign__first-horizontal", {
                    scaleX: 1,
                    duration: .65,
                })
                .to(".mobile-tree-redesign__first-leg", {
                    scaleY: 1,
                    duration: .55,
                })
                .to(".mobile-tree-redesign__section-label", {
                    autoAlpha: 1,
                    duration: .4,
                })
                .to({}, { duration: .65 })

                // Step 2: the missing centre branch grows and reveals the
                // section assigned to the participant. The section title and
                // explanatory copy remain visible during this whole phase.
                .to(".mobile-tree-redesign__center-line", {
                    scaleY: 1,
                    duration: .7,
                })
                .to(".mobile-tree-redesign__current", {
                    autoAlpha: 1,
                    duration: .4,
                })
                .to({}, { duration: .55 })

                // Step 3: as soon as Ta section starts rising, the preceding
                // diagram and its explanatory copy fade quickly together.
                .addLabel("mobileSectionLift")
                .to(".mobile-tree-redesign__root, .mobile-tree-redesign__first-trunk, .mobile-tree-redesign__first-horizontal, .mobile-tree-redesign__first-leg, .mobile-tree-redesign__section-label, .mobile-tree-redesign__center-line", {
                    autoAlpha: 0,
                    y: -35,
                    duration: .32,
                    ease: "power2.inOut",
                }, "mobileSectionLift")
                .to(mobileSectionCopy, {
                    autoAlpha: 0,
                    y: -10,
                    duration: .3,
                    ease: "power1.in",
                }, "mobileSectionLift")
                .to(mobileSectionHeader, {
                    autoAlpha: 0,
                    y: -10,
                    duration: .3,
                    ease: "power1.in",
                }, "mobileSectionLift")
                .to(".mobile-tree-redesign__subtree", {
                    y: "-9.35rem",
                    duration: .8,
                    ease: "power2.inOut",
                }, "mobileSectionLift")
                .to({}, { duration: .45 })

                // Step 4: the group and solo branches draw, and their current
                // explanatory copy fades throughout the complete drawing.
                .addLabel("mobileFormulaDiagramDraw")
                .to(".mobile-tree-redesign__second-trunk", {
                    scaleY: 1,
                    duration: .55,
                }, "mobileFormulaDiagramDraw")
                .to(mobileGroupCopy, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 2.15,
                    stagger: .04,
                    ease: "none",
                }, "mobileFormulaDiagramDraw")
                .to(mobileGroupHeader, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 2.15,
                    ease: "none",
                }, "mobileFormulaDiagramDraw")
                .to(".mobile-tree-redesign__second-horizontal", {
                    scaleX: 1,
                    duration: .65,
                })
                .to(".mobile-tree-redesign__second-leg", {
                    scaleY: 1,
                    duration: .55,
                })
                .to(".mobile-tree-redesign__choice-label", {
                    autoAlpha: 1,
                    duration: .4,
                })
                .to({}, { duration: .65 })

                // Step 5: Toi appears in the centre, then hands off to the
                // existing transition without changing its choreography.
                .to(".mobile-tree-redesign__toi-line", {
                    scaleY: 1,
                    duration: .7,
                })
                .to(".mobile-tree-redesign__toi", {
                    autoAlpha: 1,
                    duration: .4,
                })
                .to({}, { duration: .5 })

                // The old intermediate TOI is no longer used for the hand-off.
                // Keep it hidden and target the actual TOI anchor of the
                // comparison diagram instead.
                .set(".tree-container.is--three .tree-child-wrapper.is--one.is--toi .label", {
                    autoAlpha: 0,
                })
                .addLabel("mobileToiLift")

                // Same transition as the previous step: when TOI starts
                // rising, its parent diagram and explanatory copy fade
                // together, directly controlled by the scroll.
                .to(".mobile-tree-redesign__current, .mobile-tree-redesign__second-trunk, .mobile-tree-redesign__second-horizontal, .mobile-tree-redesign__second-leg, .mobile-tree-redesign__choice-label, .mobile-tree-redesign__toi-line", {
                    autoAlpha: 0,
                    duration: .45,
                    ease: "power1.inOut",
                }, "mobileToiLift")
                .to(mobileGroupCopy, {
                    autoAlpha: 0,
                    y: -10,
                    duration: .45,
                    stagger: .04,
                    ease: "power1.in",
                }, "mobileToiLift")
                .to(mobileGroupHeader, {
                    autoAlpha: 0,
                    y: -10,
                    duration: .35,
                    ease: "power1.in",
                }, "mobileToiLift")
                .to(".mobile-tree-redesign__toi", {
                    x: function () {
                        const source = document.querySelector(".mobile-tree-redesign__toi");
                        const target = document.querySelector(
                            ".tree-container.is--compare .tree-left-side .label.color.is--compare"
                        );
                        if (!source || !target) return 0;

                        const sourceRect = source.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        return targetRect.left + targetRect.width / 2
                            - (sourceRect.left + sourceRect.width / 2);
                    },
                    y: function () {
                        const source = document.querySelector(".mobile-tree-redesign__toi");
                        const target = document.querySelector(
                            ".tree-container.is--compare .tree-left-side .label.color.is--compare"
                        );
                        if (!source || !target) return 0;

                        const sourceRect = source.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        return targetRect.top + targetRect.height / 2
                            - (sourceRect.top + sourceRect.height / 2);
                    },
                    duration: .85,
                    ease: "power2.inOut",
                }, "mobileToiLift")
                // Keep the redesigned TOI itself visible after it reaches the
                // exact anchor. The historical label stays hidden, so there is
                // never a duplicate or a one-frame visibility gap.
                .set(".tree-container.is--compare .tree-left-side .label.color.is--compare", {
                    autoAlpha: 0,
                });
        }

        // The comparison section must start on the very next scroll frame:
        // this label sits exactly where the persistent TOI finishes rising.
        treeTlOne.addLabel("mobileCompareStart");
    } else {
        treeTlOne
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
            }
        })
        .to({}, {
            duration: 1, // Adjust this: 3 = more scroll distance to read
            ease: "none",
        })
        .to({}, {
            duration: 2, // Adjust this: 3 = more scroll distance to read
            ease: "none",
            onStart: function () {

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
                //ON LE BOUGE ICI
                mm.add("(max-width: 767px)", () => {
                    gsap.to(".section.is--groupe .tree-container.is--second", {
                        y: 40,
                        duration: .6,
                        ease: "power1.out"
                    })
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
                mm.add("(max-width: 767px)", () => {
                    gsap.to(".section.is--groupe .tree-container.is--second", {
                        y: 0,
                        duration: .6,
                        ease: "power1.out"
                    })
                })

            }
        })

        .addLabel("focusSection", "+=1")
        .to({}, {
            duration: 1, // Adjust this: 3 = more scroll distance to read
            ease: "none"
        })
        .to({}, {
            duration: 0.01, // Minimal duration
            onStart: function () {
                if (shouldAnimateSecond) {
                    // Normal behavior: hide first, show second
                    gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out",
                    })

                    gsap.to(".tree-child-wrapper.is--five .label.is--last", {
                        border: "1px solid white",
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                        autoAlpha: 1,
                        duration: .6,
                        ease: "power1.out",
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--first .lineInner", {
                        yPercent: 100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out",
                    })
                }
                // If second is disabled, first text stays visible - no animation needed
            },
            onReverseComplete: function () {
                if (shouldAnimateSecond) {
                    // Normal behavior: hide second, show first
                    gsap.to(".section.is--groupe p[data-split='lines'].is--second .lineInner", {
                        yPercent: 100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                        autoAlpha: 0,
                        duration: .6,
                        ease: "power1.out",
                    })

                    gsap.to(".tree-child-wrapper.is--five .label.is--last", {
                        border: "1px solid transparent",
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--first .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }
                // If second is disabled, first text stays visible - no animation needed
            }
        })
        .to({}, {
            duration: 2, // Adjust this: 3 = more scroll distance to read
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

    //ICI
    mm.add("(max-width: 767px)", () => {
        treeTlOne.to(".tree-container.is--second .tree-child-wrapper.is--three", {
            yPercent: -405,
            duration: 1.5,

        }, "focusSection")
    }
    )

    mm.add("(min-width: 768px)", () => {

        treeTlOne.to(".tree-container.is--second .tree-child-wrapper.is--three", {
            yPercent: -302,
            duration: 1.5,

        }, "focusSection")
    })
    treeTlOne.to(".tree-container.is--second .tree-child-wrapper.is--three .line", {
        autoAlpha: 0,
        duration: 0.1,
    }, "focusSection")


        // beginning of third tree container

        .to(".tree-container.is--second .tree-child-wrapper.is--three", {
            autoAlpha: 0,
        })
        .to(".tree-container.is--three .tree-header-wrapper .label", {
            autoAlpha: 1,
            onStart: function () {
                scrambleChildLabelThree.play(0);

                if (shouldAnimateSecond) {
                    // Normal behavior: animate out second text
                    gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner", {
                        yPercent: -100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                        autoAlpha: 0,
                        duration: .6,
                        ease: "power1.out",
                    })


                } else {
                    // If second is disabled, animate out first text instead
                    gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                        yPercent: -100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }

                // Always animate h2
                gsap.to(".section.is--groupe h2[data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })

                // gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                //     yPercent: 0,
                //     duration: .6,
                //     stagger: 0.05,
                //     ease: "power1.out"
                // })



            },
            onReverseComplete: function () {


                if (shouldAnimateSecond) {
                    // Normal behavior: bring back second text
                    gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                        autoAlpha: 1,
                        duration: .6,
                        ease: "power1.out",
                    })
                } else {
                    // If second is disabled, bring back first text
                    gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }

                // Always animate h2
                gsap.to(".section.is--groupe h2[data-split='lines'] .lineInner", {
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
        }, "<")
        .to(".tree-container.is--three .tree-header-wrapper .line", {
            scaleY: 1,
        })
        .to(".tree-container.is--three .tree-horizontal-line", {
            scaleX: 1,

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
        .to({}, {
            duration: 1,
            ease: "none",

        })
        .to({}, {
            duration: 2,
            ease: "none",

            onStart: function () {
                mm.add("(max-width: 767px)", () => {
                    gsap.to(".section.is--personnes .tree-container.is--three", {
                        y: 40,
                        duration: .6,
                        ease: "power1.out"
                    })
                })
                if (shouldAnimateSecond) {
                    // Normal behavior: animate out second text
                    gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner", {
                        yPercent: -100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })

                    gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                        autoAlpha: 0,
                        duration: .6,
                        ease: "power1.out",
                    })
                } else {
                    // If second is disabled, animate out first text instead
                    gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                        yPercent: -100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }

                // Always animate h2
                gsap.to(".section.is--groupe h2[data-split='lines'] .lineInner", {
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

                mm.add("(max-width: 767px)", () => {
                    gsap.to(".section.is--personnes .tree-container.is--three", {
                        y: 0,
                        duration: .6,
                        ease: "power1.out"
                    })
                })
                if (shouldAnimateSecond) {
                    // Normal behavior: bring back second text
                    // gsap.to(".section.is--groupe [data-split='lines'].is--second .lineInner", {
                    //     yPercent: 0,
                    //     duration: .6,
                    //     stagger: 0.05,
                    //     ease: "power1.out"
                    // })

                    // gsap.to(".section.is--groupe p[data-split='lines'].is--second", {
                    //     autoAlpha: 1,
                    //     duration: .6,
                    //     ease: "power1.out",
                    // })
                } else {
                    // If second is disabled, bring back first text
                    // gsap.to(".section.is--groupe [data-split='lines'].is--first .lineInner", {
                    //     yPercent: 0,
                    //     duration: .6,
                    //     stagger: 0.05,
                    //     ease: "power1.out"
                    // })
                }

                // // Always animate h2
                // gsap.to(".section.is--groupe h2[data-split='lines'] .lineInner", {
                //     yPercent: 0,
                //     duration: .6,
                //     stagger: 0.05,
                //     ease: "power1.out"
                // })

                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: 100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            }
        })

        // hiding of third tree container
        .to(".tree-container.is--three .tree-child-wrapper:not(.is--one), .tree-container.is--three .tree-horizontal-line, .tree-container.is--three .tree-header-wrapper, .tree-container.is--three .tree-child-wrapper.is--one .line", {
            autoAlpha: 0,
            duration: 1.2,

        })




    // we move "toi" to the top on mobile only
    mm.add("(max-width: 767px)", () => {
        //DELAY ENLEVE
        treeTlOne.to({}, {
            duration: .5,
        })
        treeTlOne.to(".tree-container.is--three .tree-child-wrapper.is--one", {
            yPercent: -564, // adjust as needed
            duration: 3,
            onComplete: function () {
                gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                    yPercent: -100,
                    duration: .6,
                    stagger: 0.05,
                    ease: "power1.out"
                })
            },

        },);
    })

    }

    treeTlOne.addLabel(
        "focusSection",
        isMobile ? "mobileCompareStart" : "+=1"
    )
    const compareGrayMainDuration = .75;
    const compareGrayLowerDuration = 1.8;
    const compareGrayLabelDuration = .55;
    const compareWhiteStartOffset = (
        compareGrayLowerDuration + compareGrayLabelDuration
    );

    if (isMobile) {
        // Match the two preceding mobile headings: a long, natural opacity
        // fade that progresses throughout the first diagram branch.
        treeTlOne
            .to(".section.is--compare .header-pres.is--compare", {
                autoAlpha: 1,
                y: 0,
                duration: 2.15,
                ease: "none",
            }, "focusSection");
    }

    // start of compare animation, we scale the lines depending on the width of the screen
    treeTlOne.from(".tree-left-side .line", {
        scaleX: window.innerWidth <= 767 ? 1 : 0,
        scaleY: window.innerWidth <= 767 ? 0 : 1,
        duration: compareGrayMainDuration,
        transformOrigin: window.innerWidth <= 767 ? "top" : "left",
        onStart: function () {




            // mm.add("(min-width: 768px)", () => {
            gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                yPercent: -100,
                duration: .6,
                stagger: 0.05,
                ease: "power1.out"
            })
            // })

        },
        onReverseComplete: function () {


            // mm.add("(min-width: 768px)", () => {
            gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                yPercent: 0,
                duration: .6,
                stagger: 0.05,
                ease: "power1.out"
                // })
            })

            // mm.add("(max-width: 767px)", () => {
            //     gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
            //         yPercent: 0,
            //         duration: .6,
            //         stagger: 0.05,
            //         ease: "power1.out"
            //     })
            // })


        }
    }, "focusSection")


        .from(".tree-container.is--compare .line.is--vertical.is--top", {
            scaleX: window.innerWidth <= 767 ? 0 : 1,
            scaleY: window.innerWidth <= 767 ? 1 : 0,
            transformOrigin: window.innerWidth <= 767 ? "right" : "bottom",
            duration: compareGrayMainDuration,
        }, `focusSection+=${compareGrayMainDuration}`)
        .from(".tree-container.is--compare .line.is--vertical.is--bottom", {
            scaleX: window.innerWidth <= 767 ? 0 : 1,
            scaleY: window.innerWidth <= 767 ? 1 : 0,
            transformOrigin: window.innerWidth <= 767 ? "left" : "top",
            duration: compareGrayMainDuration,
        }, "<")

        .addLabel(
            "equal",
            `focusSection+=${compareGrayMainDuration * 2}`
        )
        .from(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .line", {
            scaleX: window.innerWidth <= 767 ? 1 : 0,
            scaleY: window.innerWidth <= 767 ? 0 : 1,
            transformOrigin: window.innerWidth <= 767 ? "top" : "left",
            duration: .3,
            onComplete: function () {
                // scrambleChildLabelCompareOne.play(0);
                gsap.set(".label.color.is--compare", {
                    autoAlpha: 1,
                })
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 0,
                    })
                }

                // gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .label", {
                //     autoAlpha: 1,
                // })
            },

            onReverseComplete: function () {
                gsap.set(".label.color.is--compare", {
                    autoAlpha: 0,
                })
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 1,
                    })
                }

                // gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .label", {
                //     autoAlpha: 0,
                // })

            }
        }, "equal")
        .to({}, {
            duration: .1,
            onStart: function () {
                scrambleChildLabelCompareOne.play(0);

                gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .label", {
                    autoAlpha: 1,
                })
            },
            onReverseComplete: function () {
                gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-top .label", {
                    autoAlpha: 0,
                })
            }
        })
        .from(".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom .line", {
            scaleX: window.innerWidth <= 767 ? 1 : 0,
            scaleY: window.innerWidth <= 767 ? 0 : 1,
            transformOrigin: window.innerWidth <= 767 ? "top" : "left",
            duration: compareGrayLowerDuration,
            onComplete: function () {
                scrambleChildLabelCompareTwo.play(0);
                gsap.set(".label.color.is--compare", {
                    autoAlpha: 1,
                })
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 0,
                    })
                }

                gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom .label", {
                    autoAlpha: 1,
                })
            },

            onReverseComplete: function () {
                gsap.set(".label.color.is--compare", {
                    autoAlpha: 0,
                })
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 1,
                    })
                }

                // gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom .label", {
                //     autoAlpha: 0,
                // })
            }
        }, "equal")

        .to({}, {
            duration: compareGrayLabelDuration,
            onReverseComplete: function () {

                gsap.to(".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom .label", {
                    autoAlpha: 0,
                })
            }
        })

        .to({}, {
            duration: 1,

            onStart: function () {

                // scrambleChildLabelCompare.play(0);
                if (!isMobile) {
                    gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                        yPercent: 0,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }

                gsap.set(".label.color.is--compare", {
                    autoAlpha: 1,
                })
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 0,
                    })
                }
                // gsap.to(".header-section.is--groupe, .header-section", {
                //     autoAlpha: 0,
                // })

                gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                    autoAlpha: 0
                },);

                if (!isMobile) {
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
                        }
                    },);
                }

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
                if (!isMobile) {
                    gsap.set(".tree-child-wrapper.is--one.is--toi .label", {
                        autoAlpha: 1,
                    })
                    gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                        yPercent: 100,
                        duration: .6,
                        stagger: 0.05,
                        ease: "power1.out"
                    })
                }
                gsap.to(".header-section.is--groupe, .header-section", {
                    autoAlpha: 1,
                })

                // mm.add("(min-width: 768px)", () => {
                //     gsap.to(".section.is--personnes [data-split='lines'] .lineInner", {
                //         yPercent: 0,
                //         duration: .6,
                //         stagger: 0.05,
                //         ease: "power1.out"
                //     })
                // })
                // gsap.to(".section.is--section .header-title, .section.is--section .header-number", {
                //     autoAlpha: 1
                // },);

                // gsap.to(".section.is--compare .header-title, .section.is--compare .header-number", {
                //     autoAlpha: 0
                // },);
            }
        })

        // Start the white pass as soon as the accelerated grey branch and its
        // label reveal are complete, without leaving a dead scroll phase.
        .addLabel(
            "compareWhiteStart",
            `equal+=${compareWhiteStartOffset}`
        )

        // white line is coming in
        .from(".tree-container.is--compare .tree-left-side .line-clr", {
            scaleX: window.innerWidth <= 767 ? 1 : 0,
            scaleY: window.innerWidth <= 767 ? 0 : 1,
            transformOrigin: window.innerWidth <= 767 ? "top" : "left",
            duration: 1.5,
            ease: "linear",
        }, "compareWhiteStart")


        .from(".tree-container.is--compare .tree-left-side .line-vertical-clr", {
            scaleX: window.innerWidth <= 767 ? 0 : 1,
            scaleY: window.innerWidth <= 767 ? 1 : 0,
            transformOrigin: window.innerWidth <= 767 ? "right" : "top",
            duration: 1.5,
            ease: "linear",
        })

        // The point is the single hand-off cue for the mobile diagram.
        .addLabel("compareDotReveal")
        .from(".tree-container.is--compare .dot-wrapper", {
            autoAlpha: 0,
            duration: .6,
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

        }, "compareDotReveal");

    if (isMobile) {
        // As the point fades in, remove every diagram element to its right in
        // the same interval. The page heading deliberately stays untouched.
        treeTlOne
            .to([
                ".mobile-tree-redesign__toi",
                ".tree-container.is--compare .tree-left-side .line.is--compare",
                ".tree-container.is--compare .line.is--vertical.is--top",
                ".tree-container.is--compare .line.is--vertical.is--bottom",
                ".tree-container.is--compare .tree-right-wrapper .line-wrapper-top > .line",
                ".tree-container.is--compare .tree-right-wrapper .line-wrapper-top > .label",
                ".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom > .line",
                ".tree-container.is--compare .tree-right-wrapper .line-wrapper-bottom > .label",
            ], {
                autoAlpha: 0,
                duration: .6,
                ease: "power1.inOut",
            }, "compareDotReveal")
            // The white route into the point clears first, so it never lingers
            // over the rest of the fading grey diagram.
            .to([
                ".tree-container.is--compare .tree-left-side .line-clr",
                ".tree-container.is--compare .tree-left-side .line-vertical-clr",
            ], {
                autoAlpha: 0,
                duration: .24,
                ease: "power2.out",
            }, "compareDotReveal");
    }

    treeTlOne
        .to({}, {
            onStart: function () {
                mm.add("(max-width: 767px)", () => {
                    createMapTimeline();
                    initFormAnimaton();
                })
            }
        }, "<")
        // .to({}, {
        //     duration: 2,
        // })
        .to(".tree-container.is--three .label, .mobile-tree-redesign__toi", {
            autoAlpha: 0,
            duration: 0.1,
        }, "<")

        .addLabel("timeline", "+=1")

    // desktop only
    mm.add("(min-width: 768px)", () => {

        initFormAnimaton();

        // The map sits behind the pinned sections and must be revealed
        // explicitly during the timeline hand-off. Without this initial state,
        // fading the timeline out can leave only the black page background.
        gsap.set(".section.is--map", {
            autoAlpha: 0,
        });

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

                x: () => {
                    const timelineDot = document.querySelector(
                        ".tree-container.is--compare .line-wrapper-bottom > .dot-wrapper .dot"
                    );
                    if (!timelineDot) return 0;

                    const dotRect = timelineDot.getBoundingClientRect();
                    const dotCenter = dotRect.left + dotRect.width / 2;

                    return window.innerWidth / 2 - dotCenter;
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

        // Store the electric border instance for later use
        let electricBorderInstance = null;



        gsap.set(".timeline-panel.is--fixed", { autoAlpha: 0 })

        gsap.set(".timeline-panel.is--1", { marginLeft: "85vw" })
        gsap.set(".timeline-panel.is--3", { marginLeft: "0vw" })

        // Size every scrolling panel dynamically so adding or removing a week
        // keeps the horizontal distance and the exit transition in sync.
        gsap.set(".timeline-panel:not(.is--fixed)", { minWidth: "80vw", width: "80vw" })

        // START HORIZONTAL TIMELINE
        // const containerWidth = document.querySelector(".timeline-container").offsetWidth;
        // const containerMovement = containerWidth * 0.5; // 50% of container width
        // Fixed overlays move in the opposite direction but do not occupy
        // horizontal layout space. Counting them here makes the container
        // overshoot into an empty black area once the final week is removed.
        const scrollingPanels = gsap.utils.toArray(".timeline-panel:not(.is--fixed)");
        const containerEl = document.querySelector(".timeline-container");
        const panelsWrapper = document.querySelector(".timeline-panels-wrapper");
        const horizontalDuration = 44;
        const timelineFadeDuration = 2;
        const mapPathDuration = 5;
        const mapPathStagger = 0.05;
        const mapPathCount = gsap.utils.toArray(".map-svg path").length;
        const mapDrawDuration = mapPathDuration + Math.max(0, mapPathCount - 1) * mapPathStagger;

        const wrapperStyles = window.getComputedStyle(panelsWrapper);
        const panelGap = parseFloat(wrapperStyles.columnGap || wrapperStyles.gap) || 0;
        const totalPanelsWidth = scrollingPanels.reduce((total, panel) => {
            const panelStyles = window.getComputedStyle(panel);
            const marginLeft = parseFloat(panelStyles.marginLeft) || 0;
            const marginRight = parseFloat(panelStyles.marginRight) || 0;

            return total + panel.offsetWidth + marginLeft + marginRight;
        }, panelGap * Math.max(0, scrollingPanels.length - 1));

        // Set container width to match content
        gsap.set(containerEl, {
            width: totalPanelsWidth + "px"
        });






        // Finish with the final week aligned on the left, matching the former
        // week 5 hand-off. Measuring its real position avoids timing drift when
        // panels are added or removed.
        const lastScrollingPanel = scrollingPanels[scrollingPanels.length - 1];
        const containerRect = containerEl.getBoundingClientRect();
        const lastPanelRect = lastScrollingPanel.getBoundingClientRect();
        const lastPanelInitialLeft = lastPanelRect.left - containerRect.left;
        const lastPanelTargetLeft = window.innerWidth * -0.05;
        const scrollDistance = Math.max(0, lastPanelInitialLeft - lastPanelTargetLeft);


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
            // Start the hand-off only after the horizontal movement has placed
            // the final week on the left side of the viewport.
            .addLabel("timelineExit", `horizontalStart+=${horizontalDuration}`)
            // Wait until every timeline element and line has fully faded before
            // revealing or drawing any part of the map.
            .addLabel("mapRevealStart", `timelineExit+=${timelineFadeDuration}`)
            // Testimonials start as soon as the complete staggered map drawing
            // finishes, without waiting for the longer dot reveal sequence.
            .addLabel("mapDrawComplete", `mapRevealStart+=${mapDrawDuration}`)
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
    width: 50%;  /* End exactly at the horizontal center */
    height: 2px;  /* Match the gray line height */
    background-color: white;
    transform: translateY(-50%) scaleX(0);  /* Center vertically and start scaled to 0 */
    transform-origin: right center;  /* Scale from right edge (at screen center) */
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
                duration: horizontalDuration,

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

                        // No electric border to update anymore
                    }

                    // Move the gray line at the end
                    // Move the gray line at the end
                    // Move the gray line at the end
                    const grayLine = document.querySelector(".tree-wrapper.is--compare .line.is--reallywant");
                    if (grayLine) {
                        // Start at 90%, finish at 100% (last 10% of scroll)
                        if (progress > 0.9) {
                            // Animation happens in 10% of scroll (1.0 - 0.9 = 0.1)
                            const endProgress = (progress - 0.9) / 0.1; // 0 to 1 for 0.9 to 1.0

                            // Calculate how much to move the gray line
                            const grayLineWidth = grayLine.getBoundingClientRect().width;
                            const moveDistance = (grayLineWidth / 2);

                            gsap.set(grayLine, {
                                x: -endProgress * moveDistance
                            });
                        } else {
                            // Keep gray line in place before 90%
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
                duration: horizontalDuration, // Same duration as container
            }, "<") // Use same label to sync perfectly

            // Now you can animate it properly
            .to(".section.is--timeline, .section.is--compare", {
                autoAlpha: 0,
                duration: timelineFadeDuration,
                ease: "power2.inOut",

                onStart: function () {
                    // Fade out the progress line
                    const element = document.querySelector(".line-progress");
                    console.log(element);

                    gsap.to(element, {
                        autoAlpha: 0,
                        duration: timelineFadeDuration,
                        ease: "power2.inOut",
                    })

                    // Fade out the subtle effects when reaching the end
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        progressLine.style.boxShadow = "";
                        progressLine.style.backgroundColor = "white";
                    }

                    // Remove center dot effects
                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.killTweensOf(centerDot);
                        centerDot.style.boxShadow = "";
                        centerDot.style.backgroundColor = "";
                        gsap.set(centerDot, { scale: 1 });
                    }
                },

                onReverseComplete: function () {
                    // When scrolling back, restore the progress line
                    const element = document.querySelector(".line-progress");
                    console.log(element);

                    gsap.to(element, {
                        autoAlpha: 1
                    })

                    // Re-enable subtle effects when scrolling back into the timeline
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        // Keep subtle white glow
                        progressLine.style.boxShadow = "0 0 8px rgba(255,255,255,0.6)";
                        progressLine.style.backgroundColor = "white";
                    }

                    // Re-enable center dot glow (yellow)
                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.to(centerDot, {
                            boxShadow: `0 0 10px ${ACCENT_COLOR}, 0 0 20px ${ACCENT_COLOR}`,
                            scale: 1.1,
                            duration: 0.8,
                            repeat: -1,
                            yoyo: true,
                            ease: "power2.inOut",
                            zIndex: 100
                        });
                        centerDot.style.backgroundColor = ACCENT_COLOR;
                    }
                }
            }, "timelineExit")
            .to(".section.is--map", {
                autoAlpha: 1,
                duration: 2,
                ease: "power2.inOut",
            }, "mapRevealStart")
            .to(".timeline-panel.is--fixed.is--2", {
                autoAlpha: 1,
                onStart: function () {
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--2");

                    // Set initial states for text animations
                    gsap.set(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 100
                    });

                    // Hide separator lines initially
                    gsap.set(panel.querySelectorAll(".separator-line"), {
                        scaleX: 0,
                        transformOrigin: "left center"
                    });

                    // Hide and prepare image/gif
                    gsap.set(panel.querySelector(".gif-container"), {
                        autoAlpha: 0,
                        filter: "blur(10px)",
                    });

                    // Animate image/gif in with bounce
                    gsap.to(panel.querySelector(".gif-container"), {
                        autoAlpha: 1,
                        filter: "blur(0px)",

                        duration: 0.8,
                        ease: "back.out(1.7)"
                    });

                    // Play video if present
                    const video = panel.querySelector(".gif-container video");
                    if (video) {
                        video.currentTime = 0;
                        video.play().catch(() => {});
                    }

                    // Animate all text lines with stagger
                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power2.out",
                        delay: 0.2
                    });

                    // Animate separator lines with stagger
                    gsap.to(panel.querySelectorAll(".separator-line"), {
                        scaleX: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power3.inOut",
                        delay: 0.4
                    });
                },
                onReverseComplete: function () {
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--2");

                    // Pause video when scrolling back past panel
                    const video = panel?.querySelector(".gif-container video");
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }

                    // Animate out image/gif with slight rotation
                    gsap.to(panel.querySelector(".gif-container"), {
                        autoAlpha: 0,
                        filter: "blur(10px)",
                        duration: 0.4,
                        ease: "power2.in"
                    });

                    // Animate text lines out upward
                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: -100,
                        duration: 0.4,
                        stagger: 0.03,
                        ease: "power2.in"
                    });

                    // Animate separator lines out from right
                    gsap.to(panel.querySelectorAll(".separator-line"), {
                        scaleX: 0,
                        transformOrigin: "right center",
                        duration: 0.3,
                        stagger: 0.03,
                        ease: "power2.in"
                    });
                }
            }, "horizontalStart+=4")

            .to(".timeline-panel.is--fixed.is--2", {
                autoAlpha: 0,
                onStart: function () {
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--2");

                    // Pause video when panel fades out
                    const video = panel?.querySelector(".gif-container video");
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }

                    // Exit animation when panel fades out
                    gsap.to(panel.querySelector(".gif-container"), {
                        autoAlpha: 0,
                        filter: "blur(10px)",
                        duration: 0.5,
                        ease: "power2.in"
                    });

                    // Text lines exit upward
                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: -100,
                        duration: 0.4,
                        stagger: -0.03,
                        ease: "power2.in"
                    });

                    // Lines scale out from center
                    gsap.to(panel.querySelectorAll(".separator-line"), {
                        scaleX: 0,
                        transformOrigin: "center",
                        duration: 0.3,
                        stagger: -0.03,
                        ease: "power2.in"
                    });
                },
                onReverseComplete: function () {
                    // THIS IS THE KEY PART - Re-animate when scrolling back
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--2");

                    // Reset and re-animate everything when scrolling back
                    gsap.set(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 100
                    });

                    gsap.set(panel.querySelectorAll(".separator-line"), {
                        scaleX: 0,
                        transformOrigin: "left center"
                    });

                    gsap.set(panel.querySelector(".gif-container"), {
                        autoAlpha: 0,
                        filter: "blur(10px)",
                    });

                    // Re-animate everything in
                    gsap.to(panel.querySelector(".gif-container"), {
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    });

                    // Play video when scrolling back into panel
                    const video = panel.querySelector(".gif-container video");
                    if (video) {
                        video.currentTime = 0;
                        video.play().catch(() => {});
                    }

                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power2.out",
                        delay: 0.2
                    });

                    gsap.to(panel.querySelectorAll(".separator-line"), {
                        scaleX: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power3.inOut",
                        delay: 0.4
                    });
                }
            }, "horizontalStart+=11")
            // .to(".timeline-panel.is--fixed.is--2", { autoAlpha: 1 }, "horizontalStart+=4")
            // .to(".timeline-panel.is--fixed.is--2", { autoAlpha: 0 }, "horizontalStart+=9")
            // .to(".timeline-panel.is--fixed.is--4", { autoAlpha: 1 }, "horizontalStart+=10")
            .to(".timeline-panel.is--fixed.is--4", {
                autoAlpha: 1,
                onStart: function () {
                    console.log('Panel 4 Animation Starting');
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--4");

                    // Set initial states for all text
                    gsap.set(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 100
                    });

                    gsap.set(".stat-title", {
                        borderBottomColor: "#0d0d0d",
                    })

                    // Hide structure wrappers initially
                    gsap.set(panel.querySelectorAll(".structure-wrapper"), {
                        autoAlpha: 0,
                        x: -30
                    });

                    // Hide stats initially
                    gsap.set(panel.querySelectorAll(".stat"), {
                        autoAlpha: 0,
                        y: 20
                    });

                    // Reset stat values for counting animation
                    panel.querySelectorAll(".stat-value").forEach(el => {
                        el.setAttribute('data-original', el.textContent);
                        el.textContent = '0000'.slice(-el.textContent.length);
                    });

                    // Animate structure wrappers in sequence
                    gsap.to(panel.querySelectorAll(".structure-wrapper"), {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power2.out",
                        delay: 0.1
                    });

                    gsap.to(".stat-title", {
                        borderBottomColor: "#2e2e2e",
                        ease: "power2.out",
                        delay: 1,
                    });

                    // Animate all text lines with stagger
                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: 0,
                        duration: 0.7,
                        stagger: 0.03,
                        ease: "power2.out",
                        delay: 0.2
                    });

                    // Animate stats in with stagger
                    gsap.to(panel.querySelectorAll(".stat"), {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                        delay: 0.5,
                        onComplete: function () {
                            // Animate stat counters
                            panel.querySelectorAll(".stat").forEach((stat, index) => {
                                const valueEl = stat.querySelector(".stat-value");
                                const target = parseInt(stat.getAttribute("data-target")) || parseInt(valueEl.getAttribute('data-original'));

                                gsap.to({}, {
                                    duration: 1.5,
                                    delay: index * 0.1,
                                    onUpdate: function () {
                                        const progress = this.progress();
                                        const currentValue = Math.floor(target * progress);
                                        valueEl.textContent = String(currentValue).padStart(3, '0');
                                    },
                                    ease: "power2.out"
                                });
                            });
                        }
                    });

                    // Keep the line white, don't make it yellow
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        // Just a subtle white glow, no yellow
                        progressLine.style.boxShadow = "0 0 8px rgba(255,255,255,0.6)";
                        // Keep it white
                        progressLine.style.backgroundColor = "white";
                    }

                    // Add pulsing glow to the center dot (yellow color, no sparks)
                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.to(centerDot, {
                            boxShadow: `0 0 10px ${ACCENT_COLOR}, 0 0 20px ${ACCENT_COLOR}`,
                            scale: 1.1,
                            duration: 0.8,
                            repeat: -1,
                            yoyo: true,
                            ease: "power2.inOut",
                            zIndex: 100
                        });
                        centerDot.style.backgroundColor = ACCENT_COLOR;
                    }
                },
                onReverseComplete: function () {
                    const panel = document.querySelector(".timeline-panel.is--fixed.is--4");

                    // Animate text lines out
                    gsap.to(panel.querySelectorAll("[data-split='lines'] .lineInner"), {
                        yPercent: -100,
                        duration: 0.4,
                        stagger: 0.02,
                        ease: "power2.in"
                    });

                    // Animate structure wrappers out
                    gsap.to(panel.querySelectorAll(".structure-wrapper"), {
                        autoAlpha: 0,
                        x: 30,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power2.in"
                    });

                    // Animate stats out
                    gsap.to(panel.querySelectorAll(".stat"), {
                        autoAlpha: 0,
                        y: -20,
                        duration: 0.3,
                        stagger: 0.03,
                        ease: "power2.in"
                    });

                    // Remove subtle effects when scrolling back
                    const progressLine = document.querySelector(".line-progress");
                    if (progressLine) {
                        progressLine.style.boxShadow = "";
                        progressLine.style.backgroundColor = "white";
                    }

                    // Reset center dot
                    const centerDot = document.querySelector(".dot-wrapper .dot");
                    if (centerDot) {
                        gsap.killTweensOf(centerDot);
                        centerDot.style.boxShadow = "";
                        centerDot.style.backgroundColor = "";
                        gsap.set(centerDot, { scale: 1 });
                    }
                }
            }, "horizontalStart+=13.7")

            .to({}, {
                duration: 27,
                onUpdate: function () {
                    const progress = this.progress();

                    // Update each stat based on progress
                    document.querySelectorAll('[data-target]').forEach(el => {
                        const target = parseFloat(el.dataset.target);
                        const currentValue = Math.round(target * progress);
                        const valueSpan = el.querySelector('.stat-value');

                        if (valueSpan) {
                            let paddedValue = Math.abs(currentValue).toString().padStart(3, '0');

                            if (target < 0) {
                                paddedValue = '-' + paddedValue;
                            }

                            valueSpan.textContent = paddedValue;

                            // Interpolate color from white to the brand accent.
                            const colorInterpolate = gsap.utils.interpolate("white", ACCENT_COLOR, progress);
                            valueSpan.style.color = colorInterpolate;
                        }
                    });
                }
            }, "horizontalStart+=13.7")
            .to(".section.is--timeline .timeline-panel, .section.is--timeline .line-container, .section.is--timeline .grey-line-new", {
                autoAlpha: 0,
                duration: timelineFadeDuration,
                ease: "power2.inOut",
            }, "timelineExit")
            .to(".map-svg path", {
                drawSVG: "0% 100%", // or "0 100" depending on your preference
                duration: mapPathDuration,
                stagger: mapPathStagger,
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
            }, "mapRevealStart")

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


            //SPOTIFY
            .to(".click-me", {
                autoAlpha: 0,
                onComplete: function () {
                    gsap.set(".map-container .dot-video", {
                        pointerEvents: "none",
                    })

                    //interrupt the dot-video animation
                    gsap.killTweensOf(".map-container .dot-video .dot-bg");
                    gsap.set(".map-container .dot-video .dot-bg", {
                        autoAlpha: 0,
                    })
                },
                onReverseComplete: function () {
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
                }
            }, "mapDrawComplete")
            .to({}, {
                duration: 0.8,
                onStart: function () {

                    gsap.to(".text-wrapper-spotify .lower-wrapper > *", {
                        autoAlpha: 1,
                        duration: 0.8,
                    })
                    gsap.to(".text-wrapper-map .lineInner", {
                        yPercent: -100,
                        duration: 0.8,
                    })
                    gsap.to(".text-wrapper-spotify .lineInner", {
                        yPercent: 0,
                        duration: 0.8,
                    })
                },
                onReverseComplete: function () {
                    gsap.to(".text-wrapper-spotify .lower-wrapper > *", {
                        autoAlpha: 0,
                        duration: 0.8,
                    })
                    gsap.to(".text-wrapper-map .lineInner", {
                        yPercent: 0,
                        duration: 0.8,
                    })
                    gsap.to(".text-wrapper-spotify .lineInner", {
                        yPercent: 100,
                        duration: 0.8,
                    })
                    gsap.set(".map-container .dot-video", {
                        pointerEvents: "auto",
                    })
                }
            }, "mapDrawComplete")

            // Add this NEW animation to sequentially reveal images
            .to(".img-spotify:not(.is--first)", {
                autoAlpha: 1,
                duration: 0.3,
                stagger: 0.5,
                ease: "power2.inOut",


            }, "mapDrawComplete+=1.3")
            // Add number counter and color animation

            .to({}, {
                duration: 8,
                onUpdate: function () {
                    const progress = this.progress();
                    const spotifyNumber = document.querySelector('.spotify-number');

                    if (spotifyNumber) {
                        // Use the pre-captured target value
                        const currentValue = Math.round(spotifyTarget * progress);
                        spotifyNumber.textContent = currentValue;

                        spotifyNumber.style.color = gsap.utils.interpolate("white", ACCENT_COLOR, progress);
                    }
                }
            }, "<")



            .to(".map-container", {
                yPercent: -50,
                xPercent: 30,
                scale: 1.6,
                duration: 10,
                ease: "power1.out",

                onStart: function () {
                    gsap.to(".text-wrapper-spotify .lineInner", {
                        yPercent: -100,
                    })

                    gsap.to(".text-wrapper-spotify .lower-wrapper > *", {
                        autoAlpha: 0,
                    })

                },
                onReverseComplete: function () {
                    gsap.to(".text-wrapper-spotify .lineInner", {
                        yPercent: 0,
                    })

                    gsap.to(".text-wrapper-spotify .lower-wrapper > *", {
                        autoAlpha: 1,
                    })
                }
            }, "-=3")

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
                // gsap.to(".text-wrapper-map .lineInner", {
                //     yPercent: -100,
                // })
                gsap.to(".text-wrapper-barca .lineInner, .text-wrapper-date .lineInner", {
                    yPercent: 0,
                })

                gsap.to(".text-wrapper-date.is--date-card", {
                    autoAlpha: 1,
                    duration: .45,
                    ease: "power1.out",
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 1,
                    duration: 1,
                    yPercent: 0,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.firstChild.play();
                    }
                })

            },
            onReverseComplete: function () {
                // gsap.to(".text-wrapper-map .lineInner", {
                //     yPercent: 0,
                // })

                gsap.to(".text-wrapper-barca .lineInner, .text-wrapper-date .lineInner", {
                    yPercent: 100,
                })

                gsap.to(".text-wrapper-date.is--date-card", {
                    autoAlpha: 0,
                    duration: .3,
                    ease: "power1.out",
                })

                gsap.to(".barca-video-wrapper", {
                    autoAlpha: 0,
                    duration: 1,
                    yPercent: 20,
                    ease: "easeOutQuart",
                    onStart: function () {
                        videoBarca.firstChild.pause();
                        videoBarca.firstChild.currentTime = 0;
                    }
                })
            }
        }, "<")
    })

    // same as above but on mobile
    mm.add("(max-width: 767px)", () => {

        const childElement = document.querySelector(".tree-wrapper.is--compare .line-vertical-wrapper");
        const parentElement = document.querySelector(".section.is--compare");
        let distanceBetween = 0;
        if (childElement && parentElement) {
            const childTop = childElement.getBoundingClientRect().top;
            const parentTop = parentElement.getBoundingClientRect().top;

            distanceBetween = childTop - parentTop;

            console.log(distanceBetween); // Distance in pixels
        }
        alignMobileAccessPreparationToTimelineDot();
        normalizeMobileTimelinePanelSpacing();
        document.body.classList.remove('is-hidden');
        document.body.classList.add('is-visible');

        const timelineHeight = document.querySelector(
            ".section.is--timeline .timeline-panels-wrapper"
        ).offsetHeight;
        console.log("timelineHeight:", timelineHeight);
        console.log("distanceBetween:", distanceBetween);
        gsap.set(".grey-line-new", {
            top: `${distanceBetween}px`,
            height: timelineHeight * 2,
        })
        const lastSunday = alignMobileTimelineEndToLastSunday();

        gsap.set(".line-container", {
            height: `${distanceBetween - 2}px`,
        })


        // Only set styles for second text if enabled
        if (shouldAnimateSecond) {
            gsap.set(".section.is--groupe p.is--second", {
                marginTop: 85,
                right: "unset",
                left: 0,
                // paddingLeft: 0
            })
        }
        gsap.set(".section.is--timeline .timeline-container", {
            autoAlpha: 0,
        })

        gsap.set(".timeline-panel", {
            autoAlpha: 1
        });

        // Reveal each panel when it reaches the center
        // gsap.utils.toArray(".timeline-panel").forEach(panel => {
        //     console.log(panel);
        //     gsap.to(panel, {
        //         autoAlpha: 0,
        //         // filter: "blur(10px)",
        //         // scale: 0,
        //         duration: 0.5,
        //         scrollTrigger: {
        //             trigger: panel,
        //             start: "top 30%",
        //             toggleActions: "play none none none",
        //             // markers: true,
        //             pinnedContainer: ".parent-section",

        //         }
        //     });
        // });

        // gsap.to(".timeline-panel.is--4.is--fixed .structure-container", {
        //     autoAlpha: 0,

        //     duration: 0.5,
        //     scrollTrigger: {
        //         trigger: ".timeline-panel.is--4.is--fixed .structure-container",
        //         start: "bottom 50%",
        //         toggleActions: "play reverse play reverse",
        //         markers: true,
        //         pinnedContainer: ".parent-section",

        //     }
        // });

        gsap.set(".section.is--groupe p.is--first", {
            paddingLeft: 0
        })


        gsap.set(".parent-section .section.is--timeline", {
            position: "relative",
        })

        gsap.set(".parent-section .section.is--map", {
            position: "relative",
        })

        gsap.set(".section.is--timeline .timeline-container", {
            autoAlpha: 0,
        })

        gsap.set(".dot-video, .dot-normal", {
            scale: .5,
        })

        gsap.set(".text-wrapper-spotify .lower-wrapper", {
            autoAlpha: 0,
        })

        // let mapTl = null;

        treeTlOne.to({}, {
            duration: 2,
            ease: "linear",
        })
        treeTlOne.to({}, {
            ease: "none",
            // duration: 1,
            onStart: function () {
                console.log("start");
                gsap.set(".parent-section", {
                    overflow: "visible",
                })
                // gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                //     yPercent: -100,
                // })
            },



            onReverseComplete: function () {
                // gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
                //     yPercent: 0,
                // })
            }
        },)


            // .to(".section.is--compare .is--reallywant", {
            //     scaleY: 3,
            //     transformOrigin: "top"

            // })


            .to(".line.is--reallywant", {
                scaleY: 2.35,
                duration: 2,
                transformOrigin: "top left"

            }, "<+=.5")
            .to(".section.is--compare .label.is--compare3", {

                y: "+=70dvh",
                duration: 3,
                transformOrigin: "top",
                ease: "none"
            }, "<")
            .to(".section.is--compare .line-wrapper-top, .section.is--compare .line.is--vertical, .section.is--compare .tree-left-side", {
                autoAlpha: 0,
                // scale: .5
                onComplete: function () {
                    //HELP I wanna pin ".line-wrapper-bottom" at this moment

                }
            }, "<")
        // gsap.set(".line-container", {
        //     opacity: 0,
        // })
        treeTlOne
            .addLabel("mobileTimelineReveal", "+=1")
            .to(".section.is--timeline .timeline-container", {
                autoAlpha: 1,
                onStart: function () {
                    document.body.classList.remove('is-hidden');
                    document.body.classList.add('is-visible');
                    gsap.set(".section.is--timeline .timeline-panel", {
                        autoAlpha: 1,
                    });
                    alignMobileTimelineDotToCompareDot();
                },
            }, "mobileTimelineReveal")
            // Keep the comparison heading throughout the completed diagram.
            // It only yields once "Accès et préparation" approaches during
            // the timeline hand-off.
            .to(".section.is--compare .header-pres.is--compare", {
                autoAlpha: 0,
                y: -10,
                duration: .6,
                ease: "power1.inOut",
            }, "mobileTimelineReveal")
            .to(".panel [data-split='lines'] .lineInner", {
                yPercent: 0,
                duration: .6,
                ease: "power2.out",
            }, "mobileTimelineReveal")
            .to(".panel .t-inner-wrapper.is--spec", {
                autoAlpha: 1,
                yPercent: 0,
                duration: .6,
                ease: "power2.out",
            }, "mobileTimelineReveal")
            .to(".section.is--compare .line-wrapper-bottom > .line, .section.is--compare .line-wrapper-bottom > .label, .section.is--compare .line-wrapper-bottom > .dot-wrapper", {
                autoAlpha: 0,
                ease: "none"
            }, "mobileTimelineReveal")



        gsap.set(".line-container .line-new", {
            scaleY: 0,
            transformOrigin: "bottom",
        })

        ScrollTrigger.create({
            trigger: ".section.is--compare",
            start: "bottom bottom",
            endTrigger: ".section.is--timeline .timeline-panel.is--8",
            end: `bottom top`,
            pin: ".section.is--timeline .line-container",
            pinSpacing: true,
            pinReparent: true,
            pinnedContainer: ".parent-section",
            markers: false,
            anticipatePin: 1,

            // onEnter: function () {
            //     gsap.to(".line-container", {
            //         opacity: 1,
            //     })
            // },
            // onLeave: function () {
            //     gsap.to(".line-container", {
            //         opacity: 0,
            //     })
            // }

            // onLeave: function () {
            //     gsap.to(".line-container .line-new", {
            //         scaleY: 0,
            //         duration: .5,
            //         ease: "expo.out"
            //     })
            // }

        })



        // Separate trigger for the line animation


        if (lastSunday) {
            const updateMobileTimelineExitVisibility = () => {
                const timelineContainer = document.querySelector(
                    '.section.is--timeline .timeline-container'
                );
                const timelineDot = document.querySelector(
                    '.section.is--timeline .dot-wrapper-new'
                );
                if (!timelineContainer || !timelineDot) return;
                if (Number(gsap.getProperty(timelineContainer, 'opacity')) < .5) {
                    return;
                }

                const sundayRect = lastSunday.getBoundingClientRect();
                const dotRect = timelineDot.getBoundingClientRect();
                const sundayCenterY = sundayRect.top + sundayRect.height / 2;
                const dotCenterY = dotRect.top + dotRect.height / 2;
                const reachedTimelineEnd = sundayCenterY <= dotCenterY + 1;

                document.body.classList.toggle(
                    'is-hidden',
                    reachedTimelineEnd
                );
                document.body.classList.toggle(
                    'is-visible',
                    !reachedTimelineEnd
                );
            };

            ScrollTrigger.create({
                trigger: lastSunday,
                start: () => {
                    const timelineDot = document.querySelector(
                        '.section.is--timeline .dot-wrapper-new'
                    );
                    if (!timelineDot) return 'center center';

                    const dotRect = timelineDot.getBoundingClientRect();
                    const dotCenterY = dotRect.top + dotRect.height / 2;
                    return `center ${dotCenterY}px`;
                },
                pinnedContainer: ".parent-section",
                invalidateOnRefresh: true,
                onRefresh: alignMobileTimelineEndToLastSunday,
                onUpdate: updateMobileTimelineExitVisibility,
                onEnter: updateMobileTimelineExitVisibility,
                onLeaveBack: () => {
                    document.body.classList.remove('is-hidden');
                    document.body.classList.add('is-visible');
                },
            });
        }



        ScrollTrigger.create({
            trigger: ".grey-line-new",
            start: `top ${distanceBetween}px`,
            end: "top top",
            pinnedContainer: ".parent-section",
            pin: true,
            pinSpacing: true,
            pinReparent: true,
            invalidateOnRefresh: true,
            // markers: true,
            scrub: true,
            animation: gsap.to(".line-container .line-new", {
                scaleY: 1,
                duration: .3,
                ease: "none"
            }),

        })


        // gsap.to(".line-container .line-new", {
        //     // scaleY: 0,
        //     // transformOrigin: "top",
        //     scrollTrigger: {
        //         trigger: ".section.is--timeline",
        //         start: "bottom bottom",
        //         end: `bottom top+=50%`,
        //         scrub: true,

        //         pinnedContainer: ".parent-section",
        //     }
        // })

        // const pinDuration = window.innerHeight * 7; // because +=300%

        // document.querySelector(".map-spacer").style.height = `${pinDuration}px`;


    })

    // mm.add("(min-width: 20000px)", () => {

    //     gsap.set(".section.is--groupe p.is--second", {
    //         marginTop: 50
    //     })


    //     // const timelineOne = gsap.timeline({
    //     //     scrollTrigger: {
    //     //         trigger: ".parent-section",
    //     //         start: "bottom top",
    //     //         endTrigger: ".section.is--timeline",
    //     //         end: "bottom top",
    //     //         pin: true,
    //     //         scrub: true,
    //     //         markers: true,

    //     //     },
    //     // });
    //     // gsap.set(".map-svg path", { drawSVG: "0% 100%" });


    //     gsap.set(".parent-section .section.is--timeline", {
    //         position: "relative",
    //         paddingTop: "100vh"
    //     })
    //     gsap.set(".section.is--placeholder", {
    //         height: () => document.querySelector(".section.is--timeline").offsetHeight
    //     })

    //     gsap.set(".dot-video, .dot-normal", {
    //         scale: .5,
    //     })

    //     // treeTlOne.add(Flip.fit(".section.is--compare .tree-right-wrapper .line-wrapper-bottom", ".section.is--timeline .timeline-container", {
    //     //     ease: "none",
    //     //     duration: 1,
    //     //     // duration: 2,
    //     //     onStart: function () {
    //     //         console.log("start");

    //     //         gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
    //     //             yPercent: -100,
    //     //         })
    //     //     },



    //     //     onReverseComplete: function () {
    //     //         gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
    //     //             yPercent: 0,
    //     //         })
    //     //     }
    //     // },))

    //     treeTlOne.to({}, {
    //         ease: "none",
    //         duration: 1,
    //         // duration: 2,
    //         onStart: function () {
    //             console.log("start");

    //             gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
    //                 yPercent: -100,
    //             })
    //         },



    //         onReverseComplete: function () {
    //             gsap.to(".section.is--compare [data-split='lines'] .lineInner", {
    //                 yPercent: 0,
    //             })
    //         }
    //     },)


    //     treeTlOne.to(".section.is--compare .is--reallywant", {

    //         height: "+=100vh",
    //         transformOrigin: "top",
    //         duration: 1,
    //         ease: "none"
    //     }, "<")

    //         .to(".section.is--compare .label.is--compare3", {

    //             y: "+=100vh",
    //             transformOrigin: "top",
    //             duration: 1,
    //             ease: "none"
    //         }, "<")

    //         .to(".section.is--compare .line-wrapper-top, .section.is--compare .line.is--vertical, .section.is--compare .tree-left-side", {
    //             autoAlpha: 0,
    //             // scale: .5
    //         }, "<")
    //         // .to(".section.is--personnes .is--toi", {
    //         //     autoAlpha: 0,
    //         //     y: "-=300",
    //         //     ease: "none"

    //         // }, "<")

    //         // .to(".section.is--compare .is--reallywant, .section.is--compare .dot-wrapper", {
    //         //     autoAlpha: 0,
    //         //     duration: 0.001,
    //         // },)

    //         .to(".section.is--timeline .timeline-wrapper, .section.is--timeline .dot-wrapper", {
    //             autoAlpha: 1,
    //             duration: 0.001,

    //             onStart: function () {

    //                 gsap.to(".panel [data-split='lines'] .lineInner", {
    //                     yPercent: 0,
    //                 })

    //                 gsap.to(".panel .t-inner-wrapper.is--spec", {
    //                     autoAlpha: 1,
    //                     yPercent: 0,
    //                     duration: 1,
    //                     ease: "power2.out"
    //                 })
    //                 // if (!hasCreatedTriggers) {

    //                 //     hasCreatedTriggers = true; // ✅ set the flag so it only runs once

    //                 //     document.querySelectorAll(".panel .text-wrapper").forEach(wrapper => {
    //                 //         ScrollTrigger.create({
    //                 //             trigger: wrapper,
    //                 //             start: "top center+=10%",
    //                 //             end: "bottom center",
    //                 //             markers: true,
    //                 //             onEnter: () => {
    //                 //                 gsap.to(wrapper.querySelectorAll(".panel [data-split='lines'] .lineInner"), {
    //                 //                     yPercent: 0,
    //                 //                 })
    //                 //                 if (wrapper.querySelector(".panel .t-inner-wrapper.is--spec")) {
    //                 //                     gsap.to(wrapper.querySelectorAll(".panel .t-inner-wrapper.is--spec"), {
    //                 //                         autoAlpha: 1,
    //                 //                         yPercent: 0,
    //                 //                         duration: 1,
    //                 //                         ease: "power2.out"
    //                 //                     })
    //                 //                 }
    //                 //                 console.log("entered");

    //                 //             },

    //                 //         });
    //                 //     });
    //                 // }


    //                 gsap.fromTo(".tree-container.is--timeline .dot-wrapper .dot .dot-bg", {
    //                     scale: 0,
    //                     autoAlpha: 1
    //                 }, {
    //                     scale: 1.2,
    //                     autoAlpha: 0,
    //                     duration: 1.2,
    //                     repeat: -1,
    //                     ease: "power1.inOut"
    //                 })


    //                 gsap.to(".section.is--compare .inscription-rc", {
    //                     autoAlpha: 0,
    //                 })
    //             },
    //             onReverseComplete: function () {
    //                 // gsap.set(".panel [data-split='lines'] .lineInner", {
    //                 //     yPercent: 100,
    //                 // })

    //                 // gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
    //                 //     autoAlpha: 0,
    //                 //     duration: 1,
    //                 //     ease: "power2.out"
    //                 // },)
    //                 gsap.to(".section.is--compare .inscription-rc", {
    //                     autoAlpha: 1,
    //                 })

    //                 gsap.to(".section.is--timeline .timeline-wrapper .white-line", {
    //                     scaleY: 0,
    //                     transformOrigin: "bottom",
    //                     duration: .5,
    //                     ease: "power2.out"
    //                 }, "<")

    //                 gsap.to(".panel [data-split='lines'] .lineInner", {
    //                     yPercent: 100,
    //                 })

    //                 gsap.to(".panel .t-inner-wrapper.is--spec", {
    //                     autoAlpha: 0,
    //                     yPercent: 10,
    //                     duration: 1,
    //                     ease: "power2.out"
    //                 })

    //             },
    //             onComplete: function () {
    //                 gsap.fromTo(".section.is--timeline .timeline-wrapper .white-line", {
    //                     scaleY: 0,
    //                 }, {
    //                     scaleY: 1,
    //                     transformOrigin: "bottom",
    //                     duration: .5,
    //                     ease: "power2.out"
    //                 }, "<")




    //                 // gsap.to(".panel [data-split='lines'] .lineInner", {
    //                 //     yPercent: 0,
    //                 // })

    //                 // gsap.to(".panel.is--third .text-wrapper.is--third .t-inner-wrapper.is--spec", {
    //                 //     autoAlpha: 1,
    //                 //     yPercent: 0,
    //                 //     duration: 1,
    //                 //     ease: "power2.out"
    //                 // },)

    //             }
    //         }, "<")

    //     // gsap.set(".section.is--timeline .timeline-wrapper .white-line", {
    //     //     scaleY: 0,
    //     //     transformOrigin: "top"
    //     // });
    //     ScrollTrigger.create({
    //         trigger: ".section.is--placeholder",
    //         start: "top bottom",
    //         end: `+=${document.querySelector(".section.is--timeline .timeline-container").offsetHeight}`,
    //         // scrub: 0,
    //         pin: ".section.is--timeline .timeline-container .white-line",
    //         pinSpacing: true,
    //         // anticipatePin: 1,
    //         pinReparent: true,
    //         markers: false,
    //         // onEnter: function () {
    //         //     gsap.to(".section.is--timeline .timeline-wrapper .white-line", {
    //         //         scaleY: 1,
    //         //         transformOrigin: "bottom",
    //         //         duration: 1,
    //         //         ease: "power2.out"
    //         //     })
    //         // },

    //     })
    //     let once = false;
    //     const timeline = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".section.is--placeholder",
    //             start: "top bottom",
    //             end: `+=${document.querySelector(".section.is--timeline .timeline-container").offsetHeight}`,
    //             // scrub: 0,
    //             pin: ".dot-wrapper.is--timeline",
    //             // invalidateOnRefresh: true,
    //             // anticipatePin: 1,
    //             pinReparent: true,
    //             markers: false,

    //         },

    //     });

    //     const pinDuration = window.innerHeight * 7; // because +=300%

    //     document.querySelector(".map-spacer").style.height = `${pinDuration}px`;


    //     const mapTl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".map-spacer",
    //             start: "top bottom",
    //             end: `+=${pinDuration}`,
    //             pin: ".section.is--map",
    //             pinReparent: true,
    //             scrub: true,
    //             // invalidateOnRefresh: true,
    //             // markers: { startColor: "pink", endColor: "blue", fontSize: 20 }
    //         }, defaults: {
    //             duration: 1,
    //         }


    //     });

    //     mapTl.to(".map-svg path", {
    //         drawSVG: "0% 100%",

    //         onStart: function () {
    //             gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
    //                 yPercent: 0,
    //                 duration: 1,
    //                 ease: "power2.out"
    //             },)
    //         },
    //         onReverseComplete: function () {
    //             gsap.to(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
    //                 yPercent: 100,
    //                 duration: 1,
    //                 ease: "power2.out"
    //             },)
    //         }
    //     })

    //         .from(".map-container .dot-normal, .map-container .dot-video", {
    //             onStart: function () {
    //                 gsap.fromTo(".map-container .dot-video .dot-bg", {
    //                     scale: 0,
    //                     autoAlpha: 1,
    //                 }, {
    //                     scale: 1.3,
    //                     autoAlpha: 0,
    //                     duration: 1,
    //                     repeat: -1,
    //                     ease: "power1.inOut"
    //                 })

    //             },
    //             autoAlpha: 0,
    //             duration: 3,
    //         }, "<")
    //         .from(".click-me", {
    //             autoAlpha: 0,
    //         }, "<")
    //         .to(".section.is--map .map-container", {
    //             scale: 2,
    //             duration: 3,
    //         }, "<")
    //         .to(".map-container", {
    //             yPercent: -85,
    //             xPercent: 45,
    //             scale: 2.6,
    //             duration: 3,
    //             ease: "power1.out"
    //         },)
    //         .to(".click-me", {
    //             autoAlpha: 0,
    //         }, "<")
    //         .to(".map-container mask rect", {
    //             xPercent: -10,
    //             yPercent: 25,
    //             duration: 3,
    //         }, "<")

    //     const allDots = gsap.utils.toArray(".dot-video, .dot-normal");
    //     const barcelonaDot = document.querySelector(".dot-barcelona");

    //     allDots.forEach(dot => {
    //         mapTl.add(
    //             Flip.fit(dot, barcelonaDot, {
    //                 duration: 1, // needed for Flip to work but overwritten by scrub
    //                 ease: "none"
    //             }), "<+=.03"
    //             // add all tweens at the same point in the timeline
    //         );
    //     });

    //     mapTl.to({}, {
    //         onStart: function () {
    //             console.log("start")
    //             gsap.to(".text-wrapper-map .lineInner", {
    //                 yPercent: -100,
    //             })
    //             gsap.to(".text-wrapper-barca .lineInner", {
    //                 yPercent: 0,
    //             })

    //             gsap.to(".barca-video-wrapper", {
    //                 autoAlpha: 1,
    //                 yPercent: 0,
    //                 duration: 1,
    //                 ease: "easeOutQuart",
    //                 onStart: function () {
    //                     videoBarca.play();
    //                 }
    //             })
    //         },
    //         onReverseComplete: function () {
    //             gsap.to(".text-wrapper-map .lineInner", {
    //                 yPercent: 0,
    //             })

    //             gsap.to(".text-wrapper-barca .lineInner", {
    //                 yPercent: -100,
    //             })

    //             gsap.to(".barca-video-wrapper", {
    //                 autoAlpha: 0,
    //                 duration: 1,
    //                 yPercent: 20,
    //                 ease: "easeOutQuart",
    //                 onStart: function () {
    //                     videoBarca.pause();
    //                     videoBarca.currentTime = 0;
    //                 }
    //             })

    //         }
    //     }, "<+=1")
    //     mapTl.to({}, {
    //         duration: 1
    //     },)
    // })


}

let mapTl = null;
function createMapTimeline() {
    if (mapTl) {
        return
    }

    mapTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--map",
            start: "top top",
            end: `+=1000%`,
            pin: true,

            pinnedContainer: ".parent-section",
            pinReparent: true,
            scrub: true,
            // markers: true,
            // markers: { startColor: "pink", endColor: "blue", fontSize: 20 }
        }, defaults: {
            duration: 1,
        }


    });
    gsap.set(".map-svg path", { drawSVG: "0% 100%" });
    // mapTl.to(".map-svg path", {
    //     drawSVG: "0% 100%",
    gsap.set(".section.is--map .map-container", {
        scale: 2,
        willChange: "transform",
    })
    gsap.set(".section.is--map .text-wrapper-map .t-inner-wrapper", {
        autoAlpha: 0,
        y: 12,
    });
    gsap.set(".section.is--map .text-wrapper-map [data-split='lines'] .lineInner", {
        yPercent: 0,
    });

    mapTl
        .addLabel("mapDrawStart")
        .from(".map-svg", {
            opacity: 0,
        }, "mapDrawStart")
        // Same natural fade used by “Une expérience de groupe” and
        // “Deux formules”: title and paragraph appear together while the map
        // is being revealed, with no separate line-by-line jump.
        .to(".section.is--map .text-wrapper-map .t-inner-wrapper", {
            autoAlpha: 1,
            y: 0,
            duration: .5,
            ease: "none",
        }, "mapDrawStart")
        .addLabel("mapDrawComplete", "mapDrawStart+=.5")

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
            duration: .5,
        }, "mapDrawStart")
        .set(".click-me, .text-wrapper-spotify", {
            display: "none",
        }, "mapDrawStart")
        .set(".map-container .dot-video", {
            pointerEvents: "none",
            cursor: "default",
        }, "mapDrawStart")
        .to({}, {
            duration: .5,
        }, "mapDrawComplete")


    gsap.set(".map-container", {
        willChange: "transform",
    })
    // Fade the map title and its paragraph as one block, using the same
    // natural exit as the previous mobile section headers.
    mapTl.to(".section.is--map .text-wrapper-map .t-inner-wrapper", {
        autoAlpha: 0,
        y: -10,
        duration: .45,
        ease: "power1.in",
    }, ">")
    mapTl.to(".map-container", {
        yPercent: -85,
        xPercent: 45,
        scale: 2.6,
        duration: 2.1,
        ease: "power1.out",
    }, "<")
    // .to(".map-container mask rect", {
    //     xPercent: -10,
    //     yPercent: 25,
    //     duration: 3,
    // }, "<")

    // const allDots = gsap.utils.toArray(".dot-video, .dot-normal");
    const allDots = gsap.utils.toArray(".dot-normal.gebs, .dot-video.gebs");

    console.log("allDots:", allDots);


    const barcelonaDot = document.querySelector(".dot-barcelona");
    console.log("barcelonaDot:", barcelonaDot);

    allDots.forEach(dot => {
        console.log("dot:", dot);

        mapTl.add(
            Flip.fit(dot, barcelonaDot, {
                duration: 1.25, // Faster convergence once the hold is complete.
                ease: "none"
            }), "<+=.03"
            // add all tweens at the same point in the timeline
        );
    });

    mapTl.to({}, {
        duration: .3,
        onStart: function () {
            console.log("start")
            document.querySelector('.container.is--map .map-wrapper')
                ?.classList.add('is--barcelona-focus');
            gsap.to(".text-wrapper-barca .lineInner, .text-wrapper-date .lineInner", {
                yPercent: 0,
            })
            gsap.to(".text-wrapper-date.is--date-card", {
                autoAlpha: 1,
                duration: .45,
                ease: "power1.out",
            })
            gsap.to(".dot-normal:not(.gebs), .dot-video:not(.gebs)", {
                autoAlpha: 0,
                duration: .5,
                ease: "power1.out"
            })

            gsap.to(".barca-video-wrapper", {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1,
                ease: "easeOutQuart",

            })
        },
        onReverseComplete: function () {
            document.querySelector('.container.is--map .map-wrapper')
                ?.classList.remove('is--barcelona-focus');

            gsap.to(".text-wrapper-barca .lineInner, .text-wrapper-date .lineInner", {
                yPercent: -100,
            })

            gsap.to(".text-wrapper-date.is--date-card", {
                autoAlpha: 0,
                duration: .3,
                ease: "power1.out",
            })

            gsap.to(".dot-normal:not(.gebs), .dot-video:not(.gebs)", {
                autoAlpha: 1,
                duration: .5,
                ease: "power1.out"
            })

            gsap.to(".barca-video-wrapper", {
                autoAlpha: 0,
                duration: 1,
                yPercent: 20,
                ease: "easeOutQuart",

            })

        }
    }, "<+=2")
    mapTl.to({}, {
        duration: .3
    },)
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

    const mobileMapVideosDisabled = window.matchMedia('(max-width: 47.99rem)').matches;

    document.querySelectorAll('.dot-video').forEach(dot => {
        if (mobileMapVideosDisabled) {
            dot.removeAttribute('data-video');
            dot.setAttribute('aria-disabled', 'true');
            dot.setAttribute('tabindex', '-1');
            gsap.set(dot, {
                cursor: "default",
                pointerEvents: "none",
            });
            return;
        }

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
let hasCreatedTriggers = false;
let offersSnapTrigger = null;
let offersSnapInProgress = false;
let mobileTerminalOffersLocked = false;

function preventMobileTerminalScroll(event) {
    if (!mobileTerminalOffersLocked) return;
    event.preventDefault();
}

function preventMobileTerminalKeyboardScroll(event) {
    if (!mobileTerminalOffersLocked) return;

    const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
    if (scrollKeys.includes(event.key)) {
        event.preventDefault();
    }
}

function lockMobileTerminalOffers() {
    if (mobileTerminalOffersLocked) return;

    mobileTerminalOffersLocked = true;
    document.documentElement.classList.add('is--terminal-offers-locked');
    document.body.classList.add('is--terminal-offers-locked');
    window.addEventListener('wheel', preventMobileTerminalScroll, { passive: false });
    window.addEventListener('touchmove', preventMobileTerminalScroll, { passive: false });
    window.addEventListener('keydown', preventMobileTerminalKeyboardScroll, { passive: false });
}

function initTerminalOffers() {
    const isMobile = window.matchMedia('(max-width: 47.99rem)').matches;
    const offersSection = document.querySelector('.section.is--fields');
    const offersTitle = offersSection?.querySelector('.h2-fields');
    const offersContent = offersSection?.querySelector('.container.is--fields');
    const faqSection = document.querySelector('.section.is--faq');
    const footerSection = document.querySelector('.section.is--footerlast');

    if (!offersSection || !offersTitle) return;

    offersSection.querySelectorAll('.link-container .link-pay').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    const offersQuestion = 'Quelle formule te parle le plus ?';
    offersTitle.textContent = offersQuestion;
    offersTitle.setAttribute('aria-label', offersQuestion);
    offersSection.classList.add('is--terminal-offers');

    if (isMobile && offersContent) {
        gsap.set(offersContent, {
            autoAlpha: 0,
            yPercent: 24,
            willChange: 'transform, opacity',
        });
    }

    [faqSection, footerSection].forEach(section => {
        if (!section) return;
        section.setAttribute('aria-hidden', 'true');
        section.classList.add('is--terminal-hidden');
        gsap.set(section, { display: 'none' });
    });

    offersSnapTrigger?.kill();
    offersSnapTrigger = ScrollTrigger.create({
        trigger: offersSection,
        start: 'top 98%',
        onEnter: () => {
            if (offersSnapInProgress || !window.lenis) return;

            offersSnapInProgress = true;
            const offersTop = window.scrollY + offersSection.getBoundingClientRect().top;
            offersSection.classList.add('is--terminal-active');

            if (offersContent) {
                gsap.to(offersContent, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: .9,
                    ease: 'power3.out',
                    overwrite: true,
                    onComplete: () => {
                        gsap.set(offersContent, { clearProps: 'willChange' });
                    },
                });
            }

            window.lenis.scrollTo(offersTop, {
                duration: .9,
                immediate: false,
                lock: true,
                force: true,
                onComplete: () => {
                    offersSnapInProgress = false;
                    lockMobileTerminalOffers();
                    window.lenis.stop();
                },
            });
        },
        onLeaveBack: () => {
            offersSnapInProgress = false;
        },
    });
}

function initFormAnimaton() {
    if (hasCreatedTriggers) return;
    hasCreatedTriggers = true;

    // The old application-intro section is hidden in Webflow. Its checkbox
    // gate used to hide every section that follows, making it impossible to
    // leave "Les rassemblements". Skip that obsolete step and continue
    // directly to the real application section.
    gsap.set(".section.is--form", {
        display: "none",
    });

    gsap.set(".section.is--fields, .section.is--achat, .section.is--faq, .section.is--footerlast", {
        display: "block",
    });

    requestAnimationFrame(() => {
        // Turn the offers block into the terminal screen, then recalculate the
        // smooth-scroll limits and ScrollTrigger positions for the new ending.
        initTerminalOffers();
        if (window.lenis && typeof window.lenis.resize === "function") {
            window.lenis.resize();
        }
        ScrollTrigger.refresh(true);
        initAccordionCSS();
    });

    return;

    gsap.set(".section.is--fields, .section.is--achat, .section.is--faq, .section.is--footerlast", {
        display: "none",
    })





    // Add button/checkbox logic
    const textButton = document.querySelector('.text-checkbox.is--button');

    if (textButton) {
        // Add hover animations
        textButton.addEventListener('mouseenter', function () {
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

        textButton.addEventListener('mouseleave', function () {
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

        textButton.addEventListener('click', function () {
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

            // Find the inside div and animate it
            const inside = this.querySelector('.tracker-checkbox-inside.is--button');
            if (inside) {
                // Animate the inside div with GSAP
                gsap.fromTo(inside,
                    { opacity: 0, scale: 1.6 },
                    { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
                );
            }


            //EXECUTE CODE AFTER CHECKBOX

            gsap.set(".section.is--fields, .section.is--achat, .section.is--faq, .section.is--footerlast", {
                display: "block",
            })

            ScrollTrigger.refresh();

            setTimeout(() => {
                window.lenis.scrollTo(".section.is--fields", {
                    duration: 1.2,
                    immediate: false
                });
                initAccordionCSS();

            }, 300);
        });
    }

    let animationLocked = false;

    //here
    gsap.set(".section.is--form", {
        opacity: 0,
    })
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--form",
            start: "top center",
            end: "bottom top",
            scrub: true,
            // markers: true,
        }
    })

    // Add your animations here
    tl2.to(".section.is--map", {
        // your animation properties
        opacity: 0,

    })
        .to(".section.is--form", {
            opacity: 1,
            duration: 1,
        })

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section.is--form",
            start: "top top",
            end: "+=300%",
            pin: ".section.is--form .container.is--form",
            pinSpacing: true,
            scrub: true,
            // pinReparent: true,
            // markers: true,
            onUpdate: (self) => {
                // Lock the timeline at 100% once it reaches the end
                if (self.progress >= 0.99 && !animationLocked) {
                    animationLocked = true;
                    tl.progress(1);
                }
                // Prevent scrubbing backwards once locked
                if (animationLocked) {
                    tl.progress(1);
                }
            }
        }
    })

    tl.from(".section.is--form .container.is--form [data-split='chars'] .charInner", {
        opacity: 0.2,
        duration: 1,
        stagger: 0.1,
        ease: "easeOutQuart",
    })



}

function initBasicFormValidation() {
    const forms = document.querySelectorAll('[data-form-validate]');




    // Helpers for birthdate
    const isValidDDMMYYYY = (val) => {
        const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(val.trim());
        if (!m) return false;
        const day = parseInt(m[1], 10);
        const month = parseInt(m[2], 10);
        const year = parseInt(m[3], 10);

        if (year < 1900 || year > 2100) return false;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;

        const d = new Date(year, month - 1, day);
        return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
    };

    const toISOFromDDMMYYYY = (val) => {
        const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(val.trim());
        if (!m) return val.trim();
        const [_, dd, mm, yyyy] = m;
        return `${yyyy}-${mm}-${dd}`;
    };

    forms.forEach((form) => {

        const hasMultiStep = form.querySelectorAll('.form-step').length > 0;
        if (hasMultiStep) {
            // Skip this form, multi-step handler will take care of it
            return;
        }

        const fields = form.querySelectorAll('[data-validate] input, [data-validate] textarea');
        const submitButtonDiv = form.querySelector('[data-submit]');
        const submitInput = submitButtonDiv.querySelector('input[type="submit"]');

        const formLoadTime = new Date().getTime();

        // Optional: normalize birthdate fields right before submit if they carry data-birthdate-normalize
        const normalizeBirthdatesIfNeeded = () => {
            form.querySelectorAll('[data-birthdate-normalize]').forEach((el) => {
                const v = el.value.trim();
                if (v && isValidDDMMYYYY(v)) {
                    // Put ISO back into the same field or into a hidden mirror
                    // Here we overwrite the same field value. Remove this line if you prefer hidden inputs.
                    el.value = toISOFromDDMMYYYY(v);
                }
            });
        };

        const validateField = (field) => {
            const parent = field.closest('[data-validate]');
            const minLength = field.getAttribute('min');
            const maxLength = field.getAttribute('max');
            const type = field.getAttribute('type');
            const placeholder = field.getAttribute('placeholder') || '';
            const isBirthdateField = field.hasAttribute('data-birthdate') || placeholder.includes('dd.mm.');
            const isPhoneField = type === 'tel';

            // E.164 international phone format validator
            const isValidPhone = (val) => {
                // E.164 international format: +[country code][number]
                // Examples: +41 79 123 45 67, +1 555 123 4567, +33 6 12 34 56 78
                const cleaned = val.replace(/\s/g, '');
                // Must start with +, followed by 1-3 digit country code, then 4-12 more digits
                // Total length after + should be between 7-15 digits (E.164 standard)
                return /^\+[1-9]\d{6,14}$/.test(cleaned);
            };

            let isValid = true;

            // Filled state
            if (field.value.trim() !== '') parent.classList.add('is--filled');
            else parent.classList.remove('is--filled');

            // Length rules
            if (minLength && field.value.length < parseInt(minLength, 10)) isValid = false;
            if (maxLength && field.value.length > parseInt(maxLength, 10)) isValid = false;

            // Email format
            if (type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) isValid = false;

            // Phone format (E.164 international format)
            if (isPhoneField && field.value.trim() !== '' && !isValidPhone(field.value)) {
                isValid = false;
            }

            // Birthdate format dd.mm.yyyy
            if (isBirthdateField && field.value.trim() !== '' && !isValidDDMMYYYY(field.value)) {
                isValid = false;
            }

            // UI classes
            if (isValid) {
                parent.classList.remove('is--error');
                parent.classList.add('is--success');
            } else {
                parent.classList.remove('is--success');
                parent.classList.add('is--error');
            }

            return isValid;
        };

        const startLiveValidation = (field) => {
            field.addEventListener('input', function () {
                validateField(field);
            });
        };

        const validateAndStartLiveValidationForAll = () => {
            let allValid = true;
            let firstInvalidField = null;

            fields.forEach((field) => {
                const valid = validateField(field);
                if (!valid && !firstInvalidField) firstInvalidField = field;
                if (!valid) allValid = false;
                startLiveValidation(field);
            });

            if (firstInvalidField) firstInvalidField.focus();
            return allValid;
        };

        const isSpam = () => {
            const currentTime = new Date().getTime();
            const timeDifference = (currentTime - formLoadTime) / 1000;
            return timeDifference < 5;
        };

        // ADD THIS NEW FUNCTION
        const isHoneypotFilled = () => {
            const honeypotField = form.querySelector('[data-honeypot]');
            if (!honeypotField) return false; // No honeypot field, skip check
            return honeypotField.value.trim() !== '';
        };

        submitButtonDiv.addEventListener('click', function () {
            if (validateAndStartLiveValidationForAll()) {
                if (isSpam()) {
                    alert('Form submitted too quickly. Please try again.');
                    return;
                }
                // ADD THIS CHECK
                if (isHoneypotFilled()) {
                    console.log('Bot detected via honeypot');
                    return; // Silently fail for bots
                }
                normalizeBirthdatesIfNeeded();
                submitInput.click();
            }
        });

        form.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
                if (validateAndStartLiveValidationForAll()) {
                    if (isSpam()) {
                        alert('Form submitted too quickly. Please try again.');
                        return;
                    }
                    // ADD THIS CHECK
                    if (isHoneypotFilled()) {
                        console.log('Bot detected via honeypot');
                        return; // Silently fail for bots
                    }
                    normalizeBirthdatesIfNeeded();
                    submitInput.click();
                }
            }
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


    let elementToSplitChars = document.querySelectorAll('[data-split="chars"]');

    elementToSplitChars.forEach(target => {
        let splitInstance = new SplitText(target, {
            type: "words, chars",
            mask: "chars",
            charsClass: "charInner",
            wordsClass: "wordWrapper",
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

    gsap.set(".overlay-load", {
        opacity: 1
    })

    //WATCH OUT

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
                color: ACCENT_COLOR,
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
    //WATCH OUT
    // document.body.removeAttribute('data-preload');

    const bgVideo = document.getElementById("hero-bg-video");



    gsap.set(".container.is--hero .scroll-circle", {
        rotation: -90,
        transformOrigin: "center"
    })
    gsap.set(".button.button--secondary, .hero-video", {
        autoAlpha: 0,
    })

    gsap.set(".hero-content .title--1, .hero-content .p-hero", {
        autoAlpha: 0,
        y: 12,
    });
    gsap.set(".hero-content .title--1 .lineInner, .hero-content .p-hero .lineInner", {
        yPercent: 0,
    });

    gsap.set(bgVideo, { opacity: 0 });

    let tl = gsap.timeline({ paused: true })



    tl.to(".hero-content .title--1, .hero-content .p-hero", {
        autoAlpha: 1,
        y: 0,
        duration: 2.15,
        ease: "none",
        onStart: function () {
            gsap.set(".button.button--secondary, .hero-video", {
                autoAlpha: 1,
            })

            console.log("start")
            // gsap.to(".scroll-arrow", {
            //     y: 45,
            //     duration: 1.2,
            //     ease: "easeOutQuart",
            //     repeat: -1,
            //     delay: 1.2,
            //     repeatDelay: 1
            // })
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
        .from(".header .shop", {
            autoAlpha: 0,
            duration: 1,
            ease: "easeOutQuart"
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
                        opacity: 0.45,
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
                color: ACCENT_COLOR,
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



function initMultiStepForm() {
    const forms = document.querySelectorAll('[data-form-validate]');

    forms.forEach((form) => {
        const allSteps = Array.from(form.querySelectorAll('.form-step'));
        const navigationContainer = form.querySelector('.form-navigation');
        const originalSubmitBtn = form.querySelector('[data-submit]');

        if (allSteps.length === 0 || !navigationContainer) return;

        let currentStepIndex = 0;

        // Hide original submit button's parent
        if (originalSubmitBtn) {
            const submitParent = originalSubmitBtn.closest('.form-field-group');
            if (submitParent) submitParent.style.display = 'none';
        }

        // Map steps with their data-step values and conditions
        const stepConfig = allSteps.map(step => ({
            element: step,
            id: step.getAttribute('data-step'),
            condition: null // Will be set for conditional steps
        }));

        // Set condition for step 2-2 (only show if entrepreneur selected)
        const step22 = stepConfig.find(s => s.id === '2-2');
        if (step22) {
            step22.condition = () => {
                const entrepreneurRadio = form.querySelector('input[value="entrepreneur"]');
                return entrepreneurRadio && entrepreneurRadio.checked;
            };
        }

        // Get visible steps based on current form state
        const getVisibleSteps = () => {
            return stepConfig.filter(step => {
                if (!step.condition) return true;
                return step.condition();
            });
        };

        // Create navigation buttons
        const createNavigationButtons = () => {
            navigationContainer.innerHTML = '';
            const visibleSteps = getVisibleSteps();
            const currentVisibleIndex = visibleSteps.findIndex(s => s === stepConfig[currentStepIndex]);

            // Main wrapper - stack vertically on mobile
            const navWrapper = document.createElement('div');
            navWrapper.className = 'form-step-navigation';

            // Step indicator at the top
            const stepIndicator = document.createElement('div');
            stepIndicator.className = 'form-step-indicator';
            stepIndicator.innerHTML = `<p style="margin: 0; opacity: 0.7;">Étape ${currentVisibleIndex + 1} / ${visibleSteps.length}</p>`;
            stepIndicator.style.color = 'white';
            navWrapper.appendChild(stepIndicator);

            // Buttons container
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'form-step-buttons';

            // Check if current step is valid (without showing errors)
            const isStepCurrentlyValid = () => {
                const currentStepElement = stepConfig[currentStepIndex].element;
                const textFields = currentStepElement.querySelectorAll('[data-validate] input[type="text"], [data-validate] input[type="email"], [data-validate] input[type="tel"], [data-validate] textarea');
                const radioGroups = new Set();
                const radioInputs = currentStepElement.querySelectorAll('[data-validate] input[type="radio"]');

                radioInputs.forEach(radio => {
                    if (radio.name) radioGroups.add(radio.name);
                });

                let allValid = true;

                textFields.forEach((field) => {
                    if (field.hasAttribute('required')) {
                        if (field.value.trim() === '') {
                            allValid = false;
                        } else {
                            const type = field.getAttribute('type');
                            const value = field.value.trim();

                            if (type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                                allValid = false;
                            }
                        }
                    }
                });

                radioGroups.forEach(groupName => {
                    const radios = form.querySelectorAll(`input[name="${groupName}"]`);
                    const isChecked = Array.from(radios).some(radio => radio.checked);
                    if (!isChecked) {
                        allValid = false;
                    }
                });

                return allValid;
            };

            // Previous button (if not first step)
            // Previous button (if not first step)
            if (currentVisibleIndex > 0) {
                const prevBtn = document.createElement('button');
                prevBtn.type = 'button';
                prevBtn.className = 'form-nav-btn form-nav-btn--prev';
                prevBtn.innerHTML = '<p style="margin: 0;">← Précédent</p>';
                prevBtn.style.cssText = 'padding: 1rem 1.2rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.3); background: transparent; color: white; transition: all 0.3s; ';
                prevBtn.addEventListener('mouseenter', () => {
                    prevBtn.style.borderColor = 'white';
                });
                prevBtn.addEventListener('mouseleave', () => {
                    prevBtn.style.borderColor = 'rgba(255,255,255,0.3)';
                });
                prevBtn.addEventListener('click', () => goToPreviousStep());
                buttonsContainer.appendChild(prevBtn);
            } else {
                // Invisible spacer to keep step indicator centered on desktop
                const spacer = document.createElement('div');
                spacer.className = 'form-nav-spacer';
                spacer.style.cssText = 'padding: 1rem 1.2rem; visibility: hidden; pointer-events: none;';
                spacer.innerHTML = '<p style="margin: 0;">← Précédent</p>'; // Same size as prev button
                buttonsContainer.appendChild(spacer);
            }

            // Next or Submit button
            if (currentVisibleIndex < visibleSteps.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.type = 'button';
                nextBtn.className = 'form-nav-btn form-nav-btn--next';
                nextBtn.innerHTML = '<p style="margin: 0;">Suivant →</p>';
                nextBtn.style.flex = '1';

                const updateButtonState = () => {
                    const isValid = isStepCurrentlyValid();

                    if (isValid) {
                        nextBtn.style.cssText = ' padding: 1rem 1.2rem; cursor: pointer; border: 1px solid white; background: white; color: black; transition: all 0.3s; opacity: 1;';
                        nextBtn.disabled = false;
                    } else {
                        nextBtn.style.cssText = ' padding: 1rem 1.2rem; cursor: not-allowed; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; transition: all 0.3s; opacity: 0.3;';
                        nextBtn.disabled = true;
                    }
                };

                updateButtonState();

                nextBtn.addEventListener('mouseenter', () => {
                    if (!nextBtn.disabled) {
                        // nextBtn.style.transform = 'translateX(4px)';
                    }
                });
                nextBtn.addEventListener('mouseleave', () => {
                    if (!nextBtn.disabled) {
                        nextBtn.style.transform = 'translateX(0)';
                    }
                });

                nextBtn.addEventListener('click', () => {
                    if (validateCurrentStep()) {
                        goToNextStep();
                    }
                });

                const currentStepElement = stepConfig[currentStepIndex].element;
                const allFields = currentStepElement.querySelectorAll('input, textarea');
                allFields.forEach(field => {
                    field.addEventListener('input', updateButtonState);
                    field.addEventListener('change', updateButtonState);
                });

                buttonsContainer.appendChild(nextBtn);
            } else {
                // Final step - submit button
                const submitBtn = document.createElement('button');
                submitBtn.type = 'button';
                submitBtn.className = 'form-nav-btn form-nav-btn--submit';
                submitBtn.innerHTML = '<p style="margin: 0;">Envoyer</p>';
                submitBtn.style.flex = '1';

                const updateSubmitState = () => {
                    const isValid = isStepCurrentlyValid();

                    if (isValid) {
                        submitBtn.style.cssText = 'padding: 1rem 1.2; cursor: pointer; border: 1px solid white; background: white; color: black; transition: all 0.3s; font-weight: 500; opacity: 1;';
                        submitBtn.disabled = false;
                    } else {
                        submitBtn.style.cssText = 'padding: 1rem 1.2rem; cursor: not-allowed; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; transition: all 0.3s; font-weight: 500; opacity: 0.3;';
                        submitBtn.disabled = true;
                    }
                };

                updateSubmitState();

                submitBtn.addEventListener('mouseenter', () => {
                    if (!submitBtn.disabled) {
                        submitBtn.style.transform = 'scale(1.05)';
                    }
                });
                submitBtn.addEventListener('mouseleave', () => {
                    if (!submitBtn.disabled) {
                        submitBtn.style.transform = 'scale(1)';
                    }
                });

                const isHoneypotFilled = () => {
                    const honeypotField = form.querySelector('[data-honeypot]');
                    if (!honeypotField) return false;
                    return honeypotField.value.trim() !== '';
                };

                submitBtn.addEventListener('click', () => {
                    console.log('🔵 Submit button clicked!');

                    const isValid = validateCurrentStep();
                    console.log('🔵 Current step valid?', isValid);

                    if (isHoneypotFilled()) {
                        console.log('Bot detected via honeypot');
                        return; // Silently fail for bots
                    }

                    if (isValid) {
                        console.log('🔵 Validation passed, attempting to submit...');

                        if (originalSubmitBtn) {
                            console.log('🔵 Found submit button, clicking it...');
                            originalSubmitBtn.click();

                            const submitInput = originalSubmitBtn.querySelector('input[type="submit"]');
                            if (submitInput) {
                                console.log('🔵 Also clicking submit input directly...');
                                setTimeout(() => {
                                    submitInput.click();
                                }, 100);
                            }
                        } else {
                            console.error('❌ originalSubmitBtn not found!');
                        }
                    } else {
                        console.log('❌ Validation failed, not submitting');
                    }
                });

                const currentStepElement = stepConfig[currentStepIndex].element;
                const allFields = currentStepElement.querySelectorAll('input, textarea');
                allFields.forEach(field => {
                    field.addEventListener('input', updateSubmitState);
                    field.addEventListener('change', updateSubmitState);
                });

                buttonsContainer.appendChild(submitBtn);
            }

            navWrapper.appendChild(buttonsContainer);
            navigationContainer.appendChild(navWrapper);
        };

        // Navigate to specific step
        const goToStepIndex = (newIndex) => {
            const currentStep = stepConfig[currentStepIndex].element;
            const newStep = stepConfig[newIndex].element;

            // Animate out current step
            gsap.to(currentStep, {
                opacity: 0,
                scale: 0.9,
                filter: "blur(5px)",
                duration: 0.2,
                onComplete: () => {
                    allSteps.forEach(step => step.style.display = 'none');
                    newStep.style.display = 'block';

                    currentStepIndex = newIndex;

                    // Animate in new step
                    gsap.fromTo(newStep,
                        { opacity: 0, filter: "blur(5px)", scale: 0.9 },
                        { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.2 }
                    );

                    createNavigationButtons();
                }
            });
        };

        // Go to next visible step
        const goToNextStep = () => {
            const visibleSteps = getVisibleSteps();
            const currentVisibleIndex = visibleSteps.findIndex(s => s === stepConfig[currentStepIndex]);

            if (currentVisibleIndex < visibleSteps.length - 1) {
                const nextVisibleStep = visibleSteps[currentVisibleIndex + 1];
                const nextIndex = stepConfig.indexOf(nextVisibleStep);
                goToStepIndex(nextIndex);
            }
        };

        // Go to previous visible step
        const goToPreviousStep = () => {
            const visibleSteps = getVisibleSteps();
            const currentVisibleIndex = visibleSteps.findIndex(s => s === stepConfig[currentStepIndex]);

            if (currentVisibleIndex > 0) {
                const prevVisibleStep = visibleSteps[currentVisibleIndex - 1];
                const prevIndex = stepConfig.indexOf(prevVisibleStep);
                goToStepIndex(prevIndex);
            }
        };

        // Validate radio button group
        const validateRadioGroup = (groupName, parent) => {
            const radios = form.querySelectorAll(`input[name="${groupName}"]`);
            const isChecked = Array.from(radios).some(radio => radio.checked);

            if (isChecked) {
                parent.classList.remove('is--error');
                parent.classList.add('is--success');
                return true;
            } else {
                parent.classList.remove('is--success');
                parent.classList.add('is--error');
                return false;
            }
        };

        // Validate current step
        const validateCurrentStep = () => {
            const currentStepElement = stepConfig[currentStepIndex].element;
            const textFields = currentStepElement.querySelectorAll('[data-validate] input[type="text"], [data-validate] input[type="email"], [data-validate] input[type="tel"], [data-validate] textarea');
            const radioGroups = new Set();
            const radioInputs = currentStepElement.querySelectorAll('[data-validate] input[type="radio"]');

            // Collect unique radio group names
            radioInputs.forEach(radio => {
                if (radio.name) radioGroups.add(radio.name);
            });

            let allValid = true;
            let firstInvalidField = null;

            // Validate text fields
            textFields.forEach((field) => {
                const valid = validateTextField(field);
                if (!valid) {
                    allValid = false;
                    if (!firstInvalidField) firstInvalidField = field;
                }
            });

            // Validate radio groups
            radioGroups.forEach(groupName => {
                const firstRadio = currentStepElement.querySelector(`input[name="${groupName}"]`);
                const parent = firstRadio?.closest('[data-validate]');
                if (parent) {
                    const valid = validateRadioGroup(groupName, parent);
                    if (!valid) {
                        allValid = false;
                        if (!firstInvalidField) firstInvalidField = firstRadio;
                    }
                }
            });

            if (!allValid && firstInvalidField) {
                firstInvalidField.focus();
            }

            return allValid;
        };

        // Validation helpers
        const isValidDDMMYYYY = (val) => {
            const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(val.trim());
            if (!m) return false;
            const day = parseInt(m[1], 10);
            const month = parseInt(m[2], 10);
            const year = parseInt(m[3], 10);

            if (year < 1900 || year > 2100) return false;
            if (month < 1 || month > 12) return false;
            if (day < 1 || day > 31) return false;

            const d = new Date(year, month - 1, day);
            return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
        };

        const isValidPhone = (val) => {
            // E.164 international format: +[country code][number]
            // Examples: +41 79 123 45 67, +1 555 123 4567, +33 6 12 34 56 78
            const cleaned = val.replace(/\s/g, '');
            // Must start with +, followed by 1-3 digit country code, then 4-12 more digits
            // Total length after + should be between 7-15 digits (E.164 standard)
            return /^\+[1-9]\d{6,14}$/.test(cleaned);
        };

        const validateTextField = (field) => {
            const parent = field.closest('[data-validate]');
            if (!parent) return true;

            const minLength = field.getAttribute('min');
            const type = field.getAttribute('type');
            const placeholder = field.getAttribute('placeholder') || '';
            const isBirthdateField = field.hasAttribute('data-birthdate') || placeholder.includes('jj.mm.');
            const isPhoneField = type === 'tel';
            const isRequired = field.hasAttribute('required');

            let isValid = true;
            const value = field.value.trim();

            // Filled state
            if (value !== '') {
                parent.classList.add('is--filled');
            } else {
                parent.classList.remove('is--filled');
            }

            // Required check
            if (isRequired && value === '') {
                isValid = false;
            }

            // Only validate format if field has value
            if (value !== '') {
                // Length rules
                if (minLength && value.length < parseInt(minLength, 10)) isValid = false;

                // Email format
                if (type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                    isValid = false;
                }

                // Phone format
                if (isPhoneField && !isValidPhone(value)) {
                    isValid = false;
                }

                // Birthdate format
                if (isBirthdateField && !isValidDDMMYYYY(value)) {
                    isValid = false;
                }
            }

            // UI classes
            if (isValid) {
                parent.classList.remove('is--error');
                if (value !== '') {
                    parent.classList.add('is--success');
                } else {
                    parent.classList.remove('is--success');
                }
            } else {
                parent.classList.remove('is--success');
                parent.classList.add('is--error');
            }

            return isValid;
        };

        // Enable live validation
        const enableLiveValidation = () => {
            // Text fields
            const allTextFields = form.querySelectorAll('[data-validate] input[type="text"], [data-validate] input[type="email"], [data-validate] input[type="tel"], [data-validate] textarea');
            allTextFields.forEach((field) => {
                field.addEventListener('input', () => validateTextField(field));
                field.addEventListener('blur', () => validateTextField(field));
            });

            // Radio buttons - also refresh navigation when selection changes (for conditional steps)
            const allRadios = form.querySelectorAll('[data-validate] input[type="radio"]');
            const radioGroups = new Set();
            allRadios.forEach(radio => {
                if (radio.name) radioGroups.add(radio.name);
            });

            radioGroups.forEach(groupName => {
                const radios = form.querySelectorAll(`input[name="${groupName}"]`);
                radios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        const parent = radio.closest('[data-validate]');
                        if (parent) validateRadioGroup(groupName, parent);

                        // If this is the situation radio group, refresh navigation
                        if (groupName === 'situation') {
                            createNavigationButtons();
                        }

                        // If this is the formule radio group, toggle .price visibility
                        if (groupName === 'formule') {
                            const priceSpans = form.querySelectorAll('.form-field-group .price');
                            if (radio.value === 'solo') {
                                priceSpans.forEach(span => span.style.display = 'none');
                            } else {
                                priceSpans.forEach(span => span.style.display = '');
                            }
                        }

                        // NEW CODE: Handle data-info attribute
                        const rowFormRadio = radio.closest('.row-form.is--radio');
                        if (rowFormRadio) {
                            // Remove any existing info text
                            const existingInfo = rowFormRadio.querySelector('.radio-info-text');
                            if (existingInfo) {
                                existingInfo.remove();
                            }

                            // Check if we're in step 2-2 and "solo" is selected
                            const isInStep2_2 = radio.closest('[data-step="2-2"]');
                            const soloSelected = form.querySelector('input[name="formule"][value="solo"]:checked');

                            // If clicked radio has data-info, display it (but not in step 2-2 if solo is selected)
                            const dataInfo = radio.getAttribute('data-info');
                            if (dataInfo && !(isInStep2_2 && soloSelected)) {
                                const infoDiv = document.createElement('div');
                                infoDiv.className = 'radio-info-text';
                                infoDiv.textContent = dataInfo;
                                rowFormRadio.appendChild(infoDiv);
                            }
                        }
                    });
                });
            });
        };

        // Initialize
        allSteps.forEach(step => step.style.display = 'none');
        stepConfig[0].element.style.display = 'block';
        gsap.set(stepConfig[0].element, { opacity: 1, y: 0 });
        createNavigationButtons();
        enableLiveValidation();
    });
}

function centerMap() {
    const mapWrapper = document.querySelector('.container.is--map .map-wrapper');
    const mapContainer = document.querySelector('.container.is--map .map-container');
    const centeredDot = document.querySelector('.container.is--map .dot-video.is--centered');

    if (!mapWrapper || !mapContainer || !centeredDot) {
        console.warn('Map wrapper, container, or centered dot not found');
        return;
    }

    // Get bounding rectangles
    const wrapperRect = mapWrapper.getBoundingClientRect();
    const dotRect = centeredDot.getBoundingClientRect();

    console.log("wrapperRect", wrapperRect);
    console.log("dotRect", dotRect);

    // Calculate the dot's position relative to the map-wrapper
    const dotRelativeLeft = dotRect.left - wrapperRect.left;
    const dotRelativeTop = dotRect.top - wrapperRect.top;

    console.log("dotRelativeLeft", dotRelativeLeft);
    console.log("dotRelativeTop", dotRelativeTop);

    // Account for the dot's own dimensions to get its center point
    const dotCenterX = dotRelativeLeft + (dotRect.width / 2);
    const dotCenterY = dotRelativeTop + (dotRect.height / 2);

    console.log("dotCenterX", dotCenterX);
    console.log("dotCenterY", dotCenterY);

    // Calculate the center of the map-wrapper
    const wrapperCenterX = wrapperRect.width / 2;
    const wrapperCenterY = wrapperRect.height / 2;

    console.log("wrapperCenterX", wrapperCenterX);
    console.log("wrapperCenterY", wrapperCenterY);

    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    console.log("scrollbarWidth", scrollbarWidth);
    // Calculate how much we need to shift the map-container
    // To center the dot, we move the container by (wrapper center - dot position)
    let offsetLeft = wrapperCenterX - dotCenterX;
    const offsetTop = wrapperCenterY - dotCenterY;

    // Adjust for scrollbar width (shift left by half the scrollbar width)

    console.log("offsetLeft", offsetLeft);
    console.log("offsetTop", offsetTop);

    document.body.style.setProperty('--map-container-left', `${offsetLeft - 2 + scrollbarWidth / 2}px`);
    document.body.style.setProperty('--map-container-top', `${offsetTop}px`);
}

function initAccordionCSS() {
    document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
        const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

        accordion.addEventListener('click', (event) => {
            const toggle = event.target.closest('[data-accordion-toggle]');
            if (!toggle) return; // Exit if the clicked element is not a toggle

            const singleAccordion = toggle.closest('[data-accordion-status]');
            if (!singleAccordion) return; // Exit if no accordion container is found

            const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
            singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');

            // When [data-accordion-close-siblings="true"]
            if (closeSiblings && !isActive) {
                accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
                    if (sibling !== singleAccordion) sibling.setAttribute('data-accordion-status', 'not-active');
                });
            }
        });
    });

    // ScrollTrigger animations for accordion items
    document.querySelectorAll('.accordion-css__item').forEach((item) => {
        const lineInner = item.querySelectorAll('.lineInner');
        const icon = item.querySelector('.accordion-css__item-icon');
        const lineBottom = item.querySelector('.bottom-line');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                // markers: true,
            }
        });

        tl.from(lineInner, {
            yPercent: 100,
            duration: 1,
            ease: "power2.out"
        })
        tl.from(icon, {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "<");

        tl.to(lineBottom, {
            scaleX: 0,
            duration: 1,
            transformOrigin: "right",
            ease: "power2.out"
        }, "<");
    });
}

let mm;
document.addEventListener("DOMContentLoaded", () => {




    applyBrandAccent();

    // let initialWidth = window.innerWidth;

    // window.addEventListener('resize', () => {
    //     if (window.innerWidth !== initialWidth) {
    //         // Show a message (optional)
    //         // alert('Window size changed. Reloading page for optimal experience.');
    //         location.reload();
    //     }
    // });


    // Scroll to top immediately
    scrollToTop();
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase, MorphSVGPlugin);

    // Call it before the matchMedia setup
    initLenis();
    // initAchat();
    gsap.set(".overlay-load", {
        opacity: 0
    })
    document.body.removeAttribute('data-preload');

    document.fonts.ready.then(() => {
        enhanceBarcelonaDateCard();
        removeTimelineInscriptionLabel();
        mergeTimelineAccessAndPreparation();
        rewriteMobileTrackerIntro();
        distributeMobileScheduleAcrossWeeks();
        updateWeekFourFridayLabel();
        initSplit();
        mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            centerMap();



        });
        // TO COMMENT
        initAgeGate();
        tlHeroAnimation = initHeroAnimation();
        // TO COMMENT
        initIntro();
        initTrackerCheckboxes();
        // TO COMMENT
        initScrollLock();
        initTrackerSection();
        initVideoMap();


        //to remove
        // initTreeDiagramWrapper(); // on page load


        initMultiStepForm();
        initBasicFormValidation();


    });
    // initVideoMap();

    // to remove top 

});

// Also add a window load event to catch any late scroll restoration
window.addEventListener('load', () => {


    scrollToTop();

    mm.add("(min-width: 768px)", () => {

        const initialWidth = window.innerWidth;
        document.body.style.width = `${initialWidth}px`;
        document.body.style.minWidth = `${initialWidth}px`;
        document.body.style.maxWidth = `${initialWidth}px`;
        // Only clip horizontal overflow. Using the shorthand `overflow:
        // hidden` also blocks the vertical journey and makes the FAQ
        // unreachable after the offers section.
        document.body.style.overflowX = 'clip';
        document.body.style.overflowY = 'visible';
        document.documentElement.style.overflowX = 'clip';

        ScrollTrigger.config({
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });
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
