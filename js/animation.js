/**
 * ============================================================================
 * Animated Bouquet
 * File: animation.js
 * ============================================================================
 */

import {
    createScene
} from "./svg.js";

import {
    createStemLayer
} from "./stems.js";

import {
    attachLilyToStem
} from "./lily.js";

import {
    attachTulipToStem
} from "./tulip.js";

import {
    attachSunflowerToStem
} from "./sunflower.js";

import {
    attachRedFlowerToStem
} from "./redFlower.js";

import {
    attachLeavesToStem
} from "./leaves.js";

import {
    createIntroMessage
} from "./messages.js";

/* ============================================================================
   Scene Setup
============================================================================ */

const { svg } = createScene();

document.body.appendChild(svg);

/* ============================================================================
   Build Base Layer
============================================================================ */

const stemLayer = createStemLayer();
svg.appendChild(stemLayer);

/* ============================================================================
   Flower Placement System
============================================================================ */

/**
 * Extracts approximate stem endpoints from SVG paths.
 * (simple heuristic version — upgrade later if needed)
 */
function getRandomStemPoint() {

    const width = 1080;
    const height = 1920;

    return {

        x: width / 2 + (Math.random() - 0.5) * 400,
        y: height / 2 + Math.random() * 300

    };

}

/* ============================================================================
   Populate Bouquet
============================================================================ */

function populateBouquet() {

    const flowers = [];

    const flowerFactories = [
        attachLilyToStem,
        attachTulipToStem,
        attachSunflowerToStem,
        attachRedFlowerToStem
    ];

    for (let i = 0; i < 18; i++) {

        const { x, y } = getRandomStemPoint();

        const factory = flowerFactories[i % flowerFactories.length];

        flowers.push(factory(x, y));

        // Add leaves around each flower
        flowers.push(attachLeavesToStem([
            { x, y }
        ]));

    }

    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    group.setAttribute("id", "flowers");

    flowers.forEach(f => group.appendChild(f));

    svg.appendChild(group);
}

/* ============================================================================
   Messages Layer
============================================================================ */

function addMessages() {

    const message = createIntroMessage();

    svg.appendChild(message);

}

/* ============================================================================
   Animation Loop (basic foundation)
============================================================================ */

function animate() {

    let t = 0;

    function loop() {

        t += 0.01;

        const stems = document.querySelectorAll(".stem");

        stems.forEach((stem, i) => {

            const sway = Math.sin(t + i) * 0.5;

            stem.setAttribute(
                "transform",
                `rotate(${sway})`
            );

        });

        requestAnimationFrame(loop);

    }

    loop();

}

/* ============================================================================
   INIT
============================================================================ */

function init() {

    populateBouquet();
    addMessages();
    animate();

}

init();
