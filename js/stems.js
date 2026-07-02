import {
    createGroup,
    createPath,
    appendChildren
} from "./svg.js";

/* ============================================================================
   EXPORTED CONSTANTS (FIX FOR YOUR ERROR)
============================================================================ */

export const STEM_COLORS = Object.freeze({
    BASE: "#4F7152",
    DARK: "#355238",
    LIGHT: "#739679",
    HIGHLIGHT: "#8DBA92",
    SHADOW: "#29402C"
});

export const STEM_WIDTHS = Object.freeze({
    THIN: 2,
    SMALL: 3,
    MEDIUM: 5,
    LARGE: 7,
    HERO: 9
});

/* ============================================================================
   GEOMETRY
============================================================================ */

function createControlPoint(start, end) {
    return {
        x: (start.x + end.x) / 2 + (Math.random() - 0.5) * 120,
        y: (start.y + end.y) / 2 - Math.random() * 100
    };
}

function buildPath(start, control, end) {
    return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
}

/* ============================================================================
   STEM CREATION
============================================================================ */

function createStem(start, control, end, extra = {}) {

    return createPath(buildPath(start, control, end), {
        fill: "none",
        stroke: STEM_COLORS.BASE,
        strokeWidth: STEM_WIDTHS.MEDIUM,
        strokeLinecap: "round",
        ...extra
    });
}

function createBranch(start, control, end) {

    return createStem(start, control, end, {
        stroke: STEM_COLORS.DARK,
        strokeWidth: STEM_WIDTHS.SMALL
    });
}

function createHeroStem(start, control, end) {

    const g = createGroup({ class: "hero-stem" });

    const shadow = createStem(start, control, end, {
        stroke: STEM_COLORS.SHADOW,
        strokeWidth: STEM_WIDTHS.HERO,
        opacity: 0.25
    });

    const main = createStem(start, control, end, {
        stroke: STEM_COLORS.BASE,
        strokeWidth: STEM_WIDTHS.HERO
    });

    appendChildren(g, shadow, main);

    return g;
}

/* ============================================================================
   STEM GENERATION
============================================================================ */

function generateStem(type, origin) {

    const start = { ...origin };

    const end = {
        x: origin.x + (Math.random() - 0.5) * 300,
        y: origin.y - (500 + Math.random() * 300)
    };

    const control = createControlPoint(start, end);

    if (type === "hero") return createHeroStem(start, control, end);
    if (type === "branch") return createBranch(start, control, end);

    return createStem(start, control, end);
}

function generateStemField(count = 14, origin = { x: 540, y: 1760 }) {

    const group = createGroup({ id: "generated-stems" });

    const stems = [];

    for (let i = 0; i < count; i++) {

        const type =
            i === 0 ? "hero" :
            i % 4 === 0 ? "branch" :
            "main";

        stems.push(generateStem(type, origin));
    }

    appendChildren(group, stems);

    return group;
}

/* ============================================================================
   MAIN EXPORT
============================================================================ */

export function createStemLayer() {

    const root = createGroup({
        id: "stems-layer"
    });

    appendChildren(root, generateStemField());

    return root;
}
