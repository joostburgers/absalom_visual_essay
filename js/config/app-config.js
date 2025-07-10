// Configuration constants
export const CONFIG = {
    ANIMATION: {
        OPACITY_STEPS: ['50', '90', 'B0', 'FF'],
        STEP_DELAY: 70,
    },
    STEP_MAPPINGS: {
        1: { race: 'White' },
        2: { race: 'Mixed Ancestry' },
        3: { race: 'Black' }
    },
    SCROLLAMA: {
        OFFSET: 0.5,
        DEBUG: false
    },
    RESIZE_DELAY: 100,
    DEBOUNCE_DELAY: 250,
    STYLING: {
        LEGEND_BOX_SIZE: '20px',
        FONTS: {
            PIE_TEXT: 15,
            HOVER_LABEL: 13,
            OUTSIDE_TEXT: 20
        }
    },
    SCROLLYTELL: {
        CHARACTERS_STEPS: 4,
        EVENTS_STEPS: 9,
    },
    EVENTS: {
        CHART_RANGES: {
            SUTPEN_X: [0.5, 9],
            SUTPEN_Y: [0.5, 3.5],
            ABSALOM_X: [-25, 660],
            ABSALOM_Y: [-50, 699]
        },
        TICK_VALUES: {
            SUTPEN_X: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            SUTPEN_Y: [1, 2, 3],
            ABSALOM_X: [1, 40, 93, 150, 236, 287, 375, 496, 621],
            ABSALOM_X_TEXT: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            ABSALOM_Y: [100, 200, 300, 400, 500, 600, 700]
        },
        MARKER_SIZES: {
            SMALL: 5,
            LARGE: 20
        },
        OPACITIES: {
            LOW: 0.2,
            MEDIUM: 0.5,
            HIGH: 0.8
        },
        ANIMATION: {
            FAST_DURATION: 500,
            SLOW_DURATION: 200,
            EASING: 'cubic'
        }
    },
    LANGUAGE: {
        OPACITY: {
            FADE_IN_THRESHOLD: 0.2,
            FADE_OUT_THRESHOLD: 0.8,
            ACTIVE_THRESHOLD: 0.3
        }
    },
    OPACITY: {
        BASE: '33',
        PARENT: 'FF',
        FULL: 'FF',
        TOTAL: 'B3'
    }
};

// Global state
export let currentCharactersStep = 0;
export let currentEventsStep = 0;

export function setCurrentCharactersStep(value) {
    currentCharactersStep = value;
}

export function setCurrentEventsStep(value) {
    currentEventsStep = value;
}