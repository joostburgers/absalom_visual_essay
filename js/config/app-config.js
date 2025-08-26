// Configuration constants for the overall app. This includes animation settings, step mappings, scrollama settings, debounce delays, styling constants, and specific configurations for different chart types. It also creates a globally exposed variable to deal with the current step in the scrollytelling process.


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