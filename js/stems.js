import {
    createGroup,
    createPath,
    appendChildren
} from "./svg.js";

/* ============================================================================
   CONSTANTS
============================================================================ */

const STEM_COLOR = "#4F7152";
const STEM_DARK = "#355238";

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

    const path = createPath(buildPath(start, control, end), {
        fill: "none",
        stroke: STEM_COLOR,
        strokeWidth: 4,
        strokeLinecap: "round",
        ...extra
    });

    return path;
}

function createBranch(start, control, end) {

    return createStem(start, control, end, {
        stroke: STEM_DARK,
        strokeWidth: 3
    });
}

function createHeroStem(start, control, end) {

    const g = createGroup({ class: "hero-stem" });

    const shadow = createStem(start, control, end, {
        stroke: "#1f2f22",
        strokeWidth: 10,
        opacity: 0.25
    });

    const main = createStem(start, control, end, {
        strokeWidth: 8,
        stroke: STEM_COLOR
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

    const field = generateStemField(14);

    appendChildren(root, field);

    return root;
}
