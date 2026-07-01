/**
 * ============================================================================
 * Animated Bouquet
 * File: sunflower.js
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
   Sunflower Configuration
============================================================================ */

export const SUNFLOWER_CONFIG = Object.freeze({

    PETAL_COUNT: 18,

    PETAL_LENGTH: 70,

    PETAL_WIDTH: 22,

    CENTER_RADIUS: 22,

    STEM_ATTACH_OFFSET: -30

});

/* ============================================================================
   Petal Shape (Pointed radial leaf-like petal)
============================================================================ */

export function createSunflowerPetalPath(cx, cy, length, width) {

    const tipX = cx;
    const tipY = cy - length;

    const leftX = cx - width;
    const rightX = cx + width;

    return `
        M ${cx} ${cy}

        C ${leftX} ${cy - length * 0.3},
          ${leftX} ${cy - length * 0.8},
          ${tipX} ${tipY}

        C ${rightX} ${cy - length * 0.8},
          ${rightX} ${cy - length * 0.3},
          ${cx} ${cy}
    `;
}

/* ============================================================================
   Create Single Petal
============================================================================ */

export function createSunflowerPetal(x, y, angle) {

    const path = createSunflowerPetalPath(
        x,
        y,
        SUNFLOWER_CONFIG.PETAL_LENGTH,
        SUNFLOWER_CONFIG.PETAL_WIDTH
    );

    return createPath(path, {

        fill: "#F5C542",
        stroke: STEM_COLORS.DARK,
        strokeWidth: 0.8,
        opacity: 0.95,
        transform: `rotate(${angle} ${x} ${y})`

    });

}

/* ============================================================================
   Sunflower Center (seed disk)
============================================================================ */

export function createSunflowerCenter(x, y) {

    return createPath(`

        M ${x} ${y}
        m -${SUNFLOWER_CONFIG.CENTER_RADIUS}, 0
        a ${SUNFLOWER_CONFIG.CENTER_RADIUS},${SUNFLOWER_CONFIG.CENTER_RADIUS} 0 1,0 ${SUNFLOWER_CONFIG.CENTER_RADIUS * 2},0
        a ${SUNFLOWER_CONFIG.CENTER_RADIUS},${SUNFLOWER_CONFIG.CENTER_RADIUS} 0 1,0 -${SUNFLOWER_CONFIG.CENTER_RADIUS * 2},0

    `, {

        fill: "#5A3A1E",
        stroke: STEM_COLORS.DARK,
        strokeWidth: 1

    });

}

/* ============================================================================
   Create Full Sunflower
============================================================================ */

export function createSunflower(x, y) {

    const group = createGroup({

        class: "sunflower"

    });

    const petals = [];

    const step = 360 / SUNFLOWER_CONFIG.PETAL_COUNT;

    for (let i = 0; i < SUNFLOWER_CONFIG.PETAL_COUNT; i++) {

        const angle = i * step;

        petals.push(
            createSunflowerPetal(x, y, angle)
        );

    }

    const center = createSunflowerCenter(x, y);

    appendChildren(
        group,
        ...petals,
        center
    );

    return group;
}

/* ============================================================================
   Attach to Stem
============================================================================ */

export function attachSunflowerToStem(stemEndX, stemEndY) {

    return createSunflower(
        stemEndX,
        stemEndY + SUNFLOWER_CONFIG.STEM_ATTACH_OFFSET
    );
}
