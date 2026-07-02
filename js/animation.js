import { createScene } from "./svg.js";
import { createStemLayer } from "./stems.js";

import { attachLilyToStem } from "./lily.js";
import { attachTulipToStem } from "./tulip.js";
import { attachSunflowerToStem } from "./sunflower.js";
import { attachBlueFlowerToStem } from "./blueFlower.js";

import { attachLeavesToStem } from "./leaves.js";
import { createIntroMessage } from "./messages.js";

/* ========================= */

const svg = document.getElementById("bouquet-svg");

/* ========================= */

const stems = createStemLayer();
svg.appendChild(stems);

/* ========================= */

function getPoint() {
    return {
        x: 540 + (Math.random() - 0.5) * 300,
        y: 900 + Math.random() * 300
    };
}

/* ========================= */

const factories = [
    attachLilyToStem,
    attachTulipToStem,
    attachSunflowerToStem,
    attachBlueFlowerToStem
];

const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
group.setAttribute("id", "flowers");

/* ========================= */

for (let i = 0; i < 18; i++) {

    const { x, y } = getPoint();

    const flower = factories[i % factories.length](x, y);
    group.appendChild(flower);

    const leaves = attachLeavesToStem([{ x, y }]);
    group.appendChild(leaves);
}

svg.appendChild(group);

/* ========================= */

svg.appendChild(createIntroMessage());
