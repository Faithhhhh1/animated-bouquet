/**
 * ============================================================================
 * Animated Bouquet
 * File: blueFlower.js
 * ============================================================================
 */

import {
    createGroup,
    createPath,
    appendChildren
} from "./svg.js";

import {
    STEM_COLORS
} from "./stems.js";

/* ============================================================================
   Blue Flower Configuration
============================================================================ */

export const BLUE_FLOWER_CONFIG = Object.freeze({

    PETAL_COUNT: 10,

    LAYERS: 2,

    PETAL_LENGTH: 82,

    PETAL_WIDTH: 36,

    STEM_ATTACH_OFFSET: -28

});

/* ============================================================================
   Petal Shape (soft clustered curves)
============================================================================ */

export function createBluePetalPath(x, y, length, width, twist = 0) {

    const tipX = x;
    const tipY = y - length;

    const leftX = x - width;
    const rightX = x + width;

    return `
        M ${x} ${y}

        C ${leftX} ${y - length * 0.25},
          ${leftX + twist} ${y - length * 0.75},
          ${tipX} ${tipY}

        C ${rightX - twist} ${y - length * 0.75},
          ${rightX} ${y - length * 0.25},
          ${x} ${y}
    `;
}

/* ============================================================================
   Single Blue Petal
============================================================================ */

export function createBluePetal(x, y, angle, layer = 0) {

    const path = createBluePetalPath(
        x,
        y,
        BLUE_FLOWER_CONFIG.PETAL_LENGTH - layer * 6,
        BLUE_FLOWER_CONFIG.PETAL_WIDTH - layer * 2,
        layer * 5
    );

    const colors = [
        "#1E4D8C", // deep blue
        "#2F6FB3", // mid blue
        "#5FA8D3"  // light cyan-blue
    ];

    return createPath(path, {

        fill: colors[layer % colors.length],
        stroke: STEM_COLORS.DARK,
        strokeWidth: 0.8,
        opacity: 0.88,
        transform: `rotate(${angle} ${x} ${y})`

    });
}

/* ============================================================================
   Full Blue Flower (layered bloom)
============================================================================ */

export function createBlueFlower(x, y) {

    const group = createGroup({

        class: "blue-flower"

    });

    const petals = [];

    const angleStep = 360 / BLUE_FLOWER_CONFIG.PETAL_COUNT;

    for (let layer = 0; layer < BLUE_FLOWER_CONFIG.LAYERS; layer++) {

        for (let i = 0; i < BLUE_FLOWER_CONFIG.PETAL_COUNT; i++) {

            const angle = i * angleStep + layer * 8;

            petals.push(
                createBluePetal(x, y, angle, layer)
            );

        }

    }

    appendChildren(
        group,
        ...petals
    );

    return group;
}

/* ============================================================================
   Attach Blue Flower to Stem
============================================================================ */

export function attachBlueFlowerToStem(stemEndX, stemEndY) {

    return createBlueFlower(
        stemEndX,
        stemEndY + BLUE_FLOWER_CONFIG.STEM_ATTACH_OFFSET
    );
}
