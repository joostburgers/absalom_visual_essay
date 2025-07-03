// JavaScript source code
// Configuration for charts

// ==========================================================================
// ENHANCED CONFIGURATION CONSTANTS
// ==========================================================================
const CONFIG = {
    ANIMATION: {
        OPACITY_STEPS: ['50', '90', 'B0', 'FF'],
        STEP_DELAY: 70,
        BASE_OPACITY: '33',
        FULL_OPACITY: 'FF'
    },
    STEP_MAPPINGS: {
        // Characters section mappings
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

    // Consolidated styling configuration
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
        EVENTS_STEPS: 9
    },
    

    // Events chart configuration
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

    // Unified opacity handling
    OPACITY: {
        BASE: '33',     // 20% - charts & leaves
        PARENT: 'FF',   // 100% - sunburst parents
        FULL: 'FF',     // 100% - highlighted state
        TOTAL: 'B3'     // 70% - sunburst total node
    }
};

// ==========================================================================
// DATA CONSTANTS
// ==========================================================================
const demographyChartData = [
    { "Race": "Black", "total": 36, "percent": 0.23 },
    { "Race": "Indian", "total": 3, "percent": 0.02 },
    { "Race": "Mixed Ancestry", "total": 9, "percent": 0.06 },
    { "Race": "Multiracial Group", "total": 5, "percent": 0.03 },
    { "Race": "White", "total": 101, "percent": 0.66 }
];

const demographyPresentData = [
    { "Race": "Black", "total": 27666, "percent": 0.07 },
    { "Race": "Indian", "total": 2075, "percent": 0 },
    { "Race": "Mixed Ancestry", "total": 66452, "percent": 0.16 },
    { "Race": "Multiracial Group", "total": 2083, "percent": 0 },
    { "Race": "White", "total": 320567, "percent": 0.77 }
];

// Filtered data for second chart (removes 0% entries)
const demographyPresentDataFiltered = demographyPresentData.filter(item =>
    item.Race !== "Indian" && item.Race !== "Multiracial Group"
);

// Pre-structured sunburst data with proper types
const SUNBURST_DATA = [
    { labels: "Total", values: 418843, parents: "", ids: "", race: "", percent: "" },
    { labels: "White", values: 320567, parents: "Total", ids: "Total - White", race: "Total", percent: "77" },
    { labels: "Mixed Ancestry", values: 66452, parents: "Total", ids: "Total - Mixed Ancestry", race: "Total", percent: "16" },
    { labels: "Black", values: 27666, parents: "Total", ids: "Total - Black", race: "Total", percent: "7" },
    { labels: "Multiracial Group", values: 2083, parents: "Total", ids: "Total - Multiracial Group", race: "Total", percent: "0" },
    { labels: "Indian", values: 2075, parents: "Total", ids: "Total - Indian", race: "Total", percent: "0" },
    { labels: "Thomas Sutpen", values: 48366, parents: "Total - White", ids: "Total - White - Thomas Sutpen", race: "White", percent: "15" },
    { labels: "Rosa Coldfield", values: 34327, parents: "Total - White", ids: "Total - White - Rosa Coldfield", race: "White", percent: "11" },
    { labels: "Henry Sutpen", values: 29893, parents: "Total - White", ids: "Total - White - Henry Sutpen", race: "White", percent: "9" },
    { labels: "Judith Sutpen", values: 27200, parents: "Total - White", ids: "Total - White - Judith Sutpen", race: "White", percent: "8" },
    { labels: "Charles Bon", values: 31996, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Charles Bon", race: "Mixed Ancestry", percent: "48" },
    { labels: "Clytemnestra", values: 16004, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Clytemnestra", race: "Mixed Ancestry", percent: "24" },
    { labels: "Mrs. Thomas Sutpen(1)", values: 7203, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Mrs. Thomas Sutpen(1)", race: "Mixed Ancestry", percent: "11" },
    { labels: "Charles Etienne Saint-Valery Bon", values: 5882, parents: "Total - Mixed Ancestry", ids: "Total - Mixed Ancestry - Charles Etienne Saint-Valery Bon", race: "Mixed Ancestry", percent: "9" },
    { labels: "Unnamed Twenty Original Sutpen Slaves", values: 7271, parents: "Total - Black", ids: "Total - Black - Unnamed Twenty Original Sutpen Slaves", race: "Black", percent: "26" },
    { labels: "Luster", values: 1632, parents: "Total - Black", ids: "Total - Black - Luster", race: "Black", percent: "6" },
    { labels: "Unnamed Slaves of Sutpen", values: 1322, parents: "Total - Black", ids: "Total - Black - Unnamed Slaves of Sutpen", race: "Black", percent: "5" },
    { labels: "Unnamed Enslaved Field Hands", values: 1233, parents: "Total - Black", ids: "Total - Black - Unnamed Enslaved Field Hands", race: "Black", percent: "4" },
    { labels: "Unnamed Passersby", values: 702, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Passersby", race: "Multiracial Group", percent: "34" },
    { labels: "Unnamed Customers at Sutpen's Store", values: 182, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Customers at Sutpen's Store", race: "Multiracial Group", percent: "9" },
    { labels: "Unnamed Four or Five Boys", values: 88, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed Four or Five Boys", race: "Multiracial Group", percent: "4" },
    { labels: "Unnamed People in the Reconstruction South", values: 201, parents: "Total - Multiracial Group", ids: "Total - Multiracial Group - Unnamed People in the Reconstruction South", race: "Multiracial Group", percent: "10" },
    { labels: "Doom", values: 151, parents: "Total - Indian", ids: "Total - Indian - Doom", race: "Indian", percent: "7" },
    { labels: "Unnamed Indians in Western Virginia", values: 697, parents: "Total - Indian", ids: "Total - Indian - Unnamed Indians in Western Virginia", race: "Indian", percent: "34" },
    { labels: "Others", values: 165, parents: "Total - Indian", ids: "Total - Indian - Others", race: "Indian", percent: "8" }
];

// ==========================================================================
// OPTIMIZED UTILITY FUNCTIONS
// ==========================================================================

// Memoized color calculations for performance
const colorCache = new Map();

function getRaceColor(race) {
    return faulknerChartStyles.raceColors[race] || faulknerChartStyles.colorway[5]; // Use muted cyan as fallback
}

function getRaceColorWithOpacity(race, opacity) {
    const cacheKey = `${race}-${opacity}`;
    if (colorCache.has(cacheKey)) {
        return colorCache.get(cacheKey);
    }

    const baseColor = getRaceColor(race);
    const result = baseColor + opacity;
    colorCache.set(cacheKey, result);
    return result;
}

function createRaceColorArray(dataArray, opacity = '') {
    return dataArray.map(item => getRaceColorWithOpacity(item.Race, opacity));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================================================
// CENTRALIZED CONFIGURATIONS USING FAULKNER STYLES
// ==========================================================================

// Leveraging faulknerBaseLayout and defaultConfig from faulkner_chart_styles.js
const CHART_CONFIGS = {
    // Base layout optimized for character charts
    PIE_LAYOUT: {
        ...faulknerBaseLayout,
        showlegend: false,
        margin: { l: 10, r: 10, b: 0, t: 0, pad: 0 },
        title: { text: "" } // Override title for pie charts
    },

    // Sunburst layout using faulkner styles
    SUNBURST_LAYOUT: {
        ...faulknerBaseLayout,
        margin: { l: 0, r: 0, b: 0, t: 0 },
        height: 500,
        title: { text: "" }, // Override title
        showlegend: false
    },

    // Events layout using faulkner styles
    EVENTS_LAYOUT_BASE: {
        ...faulknerBaseLayout,
        font: {
            ...faulknerBaseLayout.font,
            size: 14
        },
        showlegend: false,
        margin: { l: 75, r: 50, b: 100, t: 50, pad: 4 }
    },

    // Enhanced plotly config based on defaultConfig
    PLOTLY: {
        ...defaultConfig,
        staticPlot: false
    },

    // Font configurations leveraging faulkner styles - NO COLOR MANAGEMENT
    FONTS: {
        pieText: {
            family: faulknerBaseLayout.font.family,
            size: CONFIG.STYLING.FONTS.PIE_TEXT
            // Removed: color property - let Plotly auto-adjust
        },
        hoverLabel: {
            family: faulknerBaseLayout.font.family,
            size: CONFIG.STYLING.FONTS.HOVER_LABEL,

        },
        outsideText: {
            family: faulknerBaseLayout.font.family,
            size: CONFIG.STYLING.FONTS.OUTSIDE_TEXT,
            color: "white"
        }
    },

    // Sunburst specific config
    SUNBURST: {
        TOTAL_COLOR: faulknerChartStyles.colorway_bw[2] // Use gray from BW colorway
    }
};

// ==========================================================================
// DEPENDENCY CHECK FUNCTION
// ==========================================================================
function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDependencies = () => {
            if (typeof faulknerChartStyles !== 'undefined' &&
                typeof faulknerBaseLayout !== 'undefined' &&
                typeof defaultConfig !== 'undefined' &&
                typeof Plotly !== 'undefined' &&
                typeof $ !== 'undefined' &&
                typeof d3 !== 'undefined' &&
                typeof scrollama !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkDependencies, 50);
            }
        };
        checkDependencies();
    });
}

// ==========================================================================
// EVENTS CHART FUNCTIONALITY (Refactored and Optimized)
// ==========================================================================
class EventsChartManager {
    // Data field mappings for processing
    static FIELD_MAPPINGS = {
        'absalom_eventid': (d) => parseInt(d['absalom_eventid']) || null,
        'absalom_startdate': (d) => d['absalom_startdate'],
        'absalom_summary': (d) => d['absalom_summary'],
        'absalom_chapter': (d) => parseInt(d['absalom_chapter']) || null,
        'absalom_y_narrated': (d) => parseInt(d['absalom_y_narrated']) || null,
        'absalom_y_hypothesized': (d) => parseInt(d['absalom_y_hypothesized']) || null,
        'absalom_y_narratedconsciousness': (d) => parseInt(d['absalom_y_narratedconsciousness']) || null,
        'absalom_y_told': (d) => parseInt(d['absalom_y_told']) || null,
        'absalom_y_remembered': (d) => parseInt(d['absalom_y_remembered']) || null,
        'absalom_y_all': (d) => parseInt(d['absalom_y_all']) || null,
        'absalom_y_other': (d) => parseInt(d['absalom_y_other']) || null,
        'absalom_x_plot': (d) => parseInt(d['absalom_x_plot']) || null,
        'absalom_x_story': (d) => parseInt(d['absalom_x_story']) || null,
        'absalom_textposition_plot': (d) => d['absalom_textposition_plot'],
        'absalom_textposition_story': (d) => d['absalom_textposition_story'],
        'absalom_label': (d) => d['absalom_label'],
        'absalom_major_event': (d) => parseInt(d['absalom_major_event']) || null,
        'x_sutpen_plot': (d) => parseInt(d['x_sutpen_plot']) || null,
        'x_sutpen_story': (d) => parseInt(d['x_sutpen_story']) || null,
        'y_sutpen': (d) => parseInt(d['y_sutpen']) || null,
        'series_sutpen_plot': (d) => d['series_sutpen_plot'],
        'series_sutpen_story': (d) => d['series_sutpen_story'],
        'sutpen_label': (d) => d['sutpen_label'],
        'textposition_sutpen_plot': (d) => d['textposition_sutpen_plot'],
        'textposition_sutpen_story': (d) => d['textposition_sutpen_story'],
        'absalom_pagenumber': (d) => parseInt(d['absalom_pagenumber']) || null,
        'absalom_sentence_words': (d) => d['absalom_sentence_words'],
        'absalom_orderwithinpage': (d) => parseInt(d['absalom_orderwithinpage']) || null,
        'absalom_major_event_date': (d) => d['absalom_major_event_date']
    };

    constructor() {
        this.chartReady = false;
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
        this.hoverstring = [];
        // Use faulkner colorway instead of hardcoded colors
        this.scatterPlotColors = [
            faulknerChartStyles.colorway[2], // Vibrant Deep Red
            faulknerChartStyles.colorway[0], // Deep Blue  
            faulknerChartStyles.colorway[1], // Warm Orange
            faulknerChartStyles.colorway[3], // Saturated Green
            faulknerChartStyles.colorway[6], // Rich Maroon
            faulknerChartStyles.colorway[5]  // Muted Cyan
        ];
    }

    // ========== VALIDATION & ERROR HANDLING ==========

    validateData(data) {
        const requiredFields = ['x_sutpen_plot', 'y_sutpen', 'sutpen_label'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        return true;
    }

    // ========== ANIMATION HELPERS ==========

    canAnimate(stepIndex) {
        return this.chartReady &&
            this.lastAnimatedStep !== stepIndex &&
            !this.animationInProgress;
    }

    getAnimationConfig(stepIndex) {
        const isSlowStep = (stepIndex > 0 && stepIndex < 3) || stepIndex > 5;
        return {
            duration: isSlowStep ? CONFIG.EVENTS.ANIMATION.FAST_DURATION : 0,
            transition: isSlowStep ?
                [{ duration: CONFIG.EVENTS.ANIMATION.FAST_DURATION, easing: CONFIG.EVENTS.ANIMATION.EASING }] :
                [{ duration: CONFIG.EVENTS.ANIMATION.SLOW_DURATION, easing: CONFIG.EVENTS.ANIMATION.EASING }]
        };
    }

    startAnimation(stepIndex) {
        if (!this.canAnimate(stepIndex)) {
            console.log('Animation skipped:', {
                ready: this.chartReady,
                lastStep: this.lastAnimatedStep,
                currentStep: stepIndex,
                inProgress: this.animationInProgress
            });
            return;
        }

        this.animationInProgress = true;
        this.lastAnimatedStep = stepIndex;

        const currentFrame = 'frame' + stepIndex;
        const { duration, transition } = this.getAnimationConfig(stepIndex);

        console.log('Animating events chart to frame:', currentFrame);

        Plotly.animate('plotchart', [currentFrame], {
            frame: [{ duration: duration }],
            transition: transition,
            mode: 'afterall',
            ordering: 'traces first',
            redraw: true
        }).then(() => {
            this.animationInProgress = false;
        }).catch(error => {
            console.error('Events chart animation error:', error);
            this.animationInProgress = false;
        });
    }

    // ========== TRACE BUILDER METHODS ==========

    createMarkerTrace(x, y, color, name, options = {}) {
        const defaults = {
            size: CONFIG.EVENTS.MARKER_SIZES.SMALL,
            opacity: CONFIG.EVENTS.OPACITIES.MEDIUM,
            visible: true,
            useGrayBorder: true
        };
        const opts = { ...defaults, ...options };

        return {
            type: "scatter",
            mode: "markers",
            x, y, name,
            visible: opts.visible,
            marker: {
                color,
                opacity: opts.opacity,
                size: opts.size,
                line: {
                    width: 1,
                    color: opts.useGrayBorder ? 'rgba(88, 88, 88, 0.26)' : color
                }
            },
            hovertemplate: this.hoverstring
        };
    }

    createTextTrace(x, y, text, textposition, color, name, options = {}) {
        const defaults = {
            size: CONFIG.EVENTS.MARKER_SIZES.LARGE,
            opacity: CONFIG.EVENTS.OPACITIES.HIGH,
            visible: true,
            hoverTemplate: "<b>Major Event: </b>%{text}<extra></extra>",
            useGrayBorder: false
        };
        const opts = { ...defaults, ...options };

        return {
            type: "scatter",
            mode: "markers+text",
            x, y, text, textposition, name,
            visible: opts.visible,
            marker: {
                size: opts.size,
                color,
                opacity: opts.opacity,
                line: {
                    width: 1,
                    color: opts.useGrayBorder ? 'rgba(88, 88, 88, 0.26)' : color
                }
            },
            hovertemplate: opts.hoverTemplate
        };
    }

    createInvisibleTrace() {
        return { visible: false };
    }

    // ========== DATA PROCESSING ==========

    createHoverStrings(data) {
        const { absalom_sentence_words, absalom_startdate, absalom_pagenumber,
            absalom_orderwithinpage, absalom_summary } = data;

        this.hoverstring = absalom_sentence_words.map((_, i) =>
            `<b>Date: </b>${absalom_startdate[i]}<br>` +
            `<b>Page: </b>${absalom_pagenumber[i]} <b>Event on page: </b>${absalom_orderwithinpage[i]}<br>` +
            `<b>First Words: </b>${absalom_sentence_words[i]}<br>` +
            `<b>Summary: </b>${absalom_summary[i]}<extra></extra>`
        );
    }

    processData(response) {
        const data = $.csv.toObjects(response, { headers: true });
        const plotData = {};

        // Use field mappings for cleaner processing
        Object.entries(EventsChartManager.FIELD_MAPPINGS).forEach(([key, transformer]) => {
            plotData[key] = data.map(transformer);
        });

        return plotData;
    }

    // ========== FRAME BUILDERS ==========

    createSutpenFrames(data, layouts) {
        const { x_sutpen_plot, x_sutpen_story, y_sutpen, sutpen_label,
            textposition_sutpen_plot, textposition_sutpen_story } = data;

        return [
            {
                name: 'frame0',
                data: [
                    this.createTextTrace(
                        x_sutpen_plot, y_sutpen, sutpen_label,
                        textposition_sutpen_plot, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.sutpen_plot
            },
            {
                name: 'frame1',
                data: [
                    this.createTextTrace(
                        x_sutpen_story, y_sutpen, sutpen_label,
                        textposition_sutpen_story, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.sutpen_story
            }
        ];
    }

    createAbsalomProgressionFrames(data, layouts) {
        const { absalom_x_plot, absalom_y_all, absalom_major_event, absalom_label,
            absalom_textposition_plot, absalom_y_narrated, absalom_y_told,
            absalom_y_other } = data;

        return [
            // Frame 2: All Events + Major Events
            {
                name: 'frame2',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_all, this.scatterPlotColors[1],
                        "All Events", { opacity: 0.3, useGrayBorder: false }
                    ),
                    this.createTextTrace(
                        absalom_x_plot, absalom_major_event, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_plot
            },

            // Frame 3: Narrated Events Only
            {
                name: 'frame3',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated
            },

            // Frame 4: Narrated + Told
            {
                name: 'frame4',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
                        "Told"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated_told
            },

            // Frame 5: Narrated + Told + Other
            {
                name: 'frame5',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
                        "Told", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_other, this.scatterPlotColors[4],
                        "Other"
                    ),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated_told_other
            }
        ];
    }

    createCombinedAndDateFrames(data, layouts) {
        const { absalom_x_story, absalom_x_plot, absalom_y_narrated, absalom_y_told,
            absalom_y_other, absalom_major_event, absalom_label,
            absalom_textposition_plot, absalom_startdate, absalom_major_event_date } = data;

        return [
            // Frame 6: Story Order with Major Events
            {
                name: 'frame6',
                data: [
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_told, this.scatterPlotColors[3],
                        "Told", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_other, this.scatterPlotColors[4],
                        "Other"
                    ),
                    this.createTextTrace(
                        absalom_x_story, absalom_major_event, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events", { useGrayBorder: true }
                    )
                ],
                layout: layouts.absalom_story
            },

            // Frame 7: Date Order (Plot)
            {
                name: 'frame7',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_startdate, this.scatterPlotColors[5],
                        "Date Order"
                    ),
                    this.createTextTrace(
                        absalom_x_plot, absalom_major_event_date, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events",
                        { hoverTemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> " }
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_date
            },

            // Frame 8: Date Order (Story)
            {
                name: 'frame8',
                data: [
                    this.createMarkerTrace(
                        absalom_x_story, absalom_startdate, this.scatterPlotColors[5],
                        "Date Order"
                    ),
                    this.createTextTrace(
                        absalom_x_story, absalom_major_event_date, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events",
                        { hoverTemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> " }
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_date
            }
        ];
    }

    // ========== MAIN FRAME CREATION ==========

    createFrames(x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
        x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all, absalom_major_event,
        absalom_label, absalom_textposition_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
        absalom_x_story, absalom_startdate, absalom_major_event_date, hoverstring, layouts) {

        // Store hover strings for trace builders
        this.hoverstring = hoverstring;

        // Organize data for frame builders
        const data = {
            x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
            x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all,
            absalom_major_event, absalom_label, absalom_textposition_plot,
            absalom_y_narrated, absalom_y_told, absalom_y_other, absalom_x_story,
            absalom_startdate, absalom_major_event_date
        };

        return [
            ...this.createSutpenFrames(data, layouts),
            ...this.createAbsalomProgressionFrames(data, layouts),
            ...this.createCombinedAndDateFrames(data, layouts)
        ];
    }

    // ========== LAYOUT CREATION ==========

    createAxisConfig(title, tickvals, range, ticktext = null) {
        return {
            showgrid: false,
            title: { text: title },
            autotick: false,
            tickmode: 'array',
            tickvals,
            range,
            zeroline: false,
            ...(ticktext && { ticktext })
        };
    }

    createLayouts(sutpen_x_tickvals, sutpen_y_tickvals, sutpen_x_range, sutpen_y_range,
        absalom_x_tickvals, absalom_x_ticktext, absalom_x_range, absalom_y_tickvals, absalom_y_range) {

        return {
            sutpen_plot: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br>Major Events in Sutpen's Life in Plot Order" },
                xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
                yaxis: this.createAxisConfig("Chronology", sutpen_y_tickvals, sutpen_y_range)
            },
            sutpen_story: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br>Major Events in Sutpen's Life in Story Order" },
                xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
                yaxis: this.createAxisConfig("Chronology", sutpen_y_tickvals, sutpen_y_range)
            },
            absalom_plot: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> in Plot Order" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range)
            },
            absalom_narrated: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> Narrated Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), autotick: true }
            },
            absalom_narrated_told: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> Narrated and Told Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range)
            },
            absalom_narrated_told_other: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> Narrated, Told, and Other Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), autotick: true }
            },
            absalom_story: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> in Story Order with Major Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), type: 'linear', autotick: true }
            },
            absalom_date: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> in Date Order" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: {
                    title: { text: "Date" },
                    type: 'date',
                    showgrid: false,
                    tickmode: 'auto',
                    autosize: true,
                    rangemode: 'normal',
                    range: [new Date(1800, 0, 1), new Date(1920, 0, 1)],
                    zeroline: false
                }
            }
        };
    }

    // ========== MAIN PLOTLY CREATION ==========

    async makePlotly(data) {
        try {
            // Validate data first
            this.validateData(data);

            // Use CONFIG constants instead of hardcoded values
            const sutpen_x_tickvals = CONFIG.EVENTS.TICK_VALUES.SUTPEN_X;
            const sutpen_y_tickvals = CONFIG.EVENTS.TICK_VALUES.SUTPEN_Y;
            const sutpen_x_range = CONFIG.EVENTS.CHART_RANGES.SUTPEN_X;
            const sutpen_y_range = CONFIG.EVENTS.CHART_RANGES.SUTPEN_Y;

            const absalom_x_range = CONFIG.EVENTS.CHART_RANGES.ABSALOM_X;
            const absalom_y_range = CONFIG.EVENTS.CHART_RANGES.ABSALOM_Y;
            const absalom_x_tickvals = CONFIG.EVENTS.TICK_VALUES.ABSALOM_X;
            const absalom_x_ticktext = CONFIG.EVENTS.TICK_VALUES.ABSALOM_X_TEXT;
            const absalom_y_tickvals = CONFIG.EVENTS.TICK_VALUES.ABSALOM_Y;

            // Data extraction
            const x_sutpen_plot = data['x_sutpen_plot'];
            const y_sutpen = data['y_sutpen'];
            const x_sutpen_story = data['x_sutpen_story'];
            const textposition_sutpen_plot = data['textposition_sutpen_plot'];
            const sutpen_label = data['sutpen_label'];
            const textposition_sutpen_story = data['textposition_sutpen_story'];
            const absalom_y_all = data['absalom_y_all'];
            const absalom_x_plot = data['absalom_x_plot'];
            const absalom_x_story = data['absalom_x_story'];
            const absalom_label = data['absalom_label'];
            const absalom_textposition_plot = data['absalom_textposition_plot'];
            const absalom_y_narrated = data['absalom_y_narrated'];
            const absalom_y_told = data['absalom_y_told'];
            const absalom_y_other = data['absalom_y_other'];
            const absalom_major_event = data['absalom_major_event'];
            const absalom_summary = data['absalom_summary'];
            const absalom_startdate = data['absalom_startdate'];
            const absalom_sentence_words = data['absalom_sentence_words'];
            const absalom_pagenumber = data['absalom_pagenumber'];
            const absalom_orderwithinpage = data['absalom_orderwithinpage'];
            const absalom_major_event_date = data['absalom_major_event_date'];

            // Create hover strings using new method
            this.createHoverStrings(data);

            // Initial plot data
            const plotData = [{
                type: "scatter",
                mode: "markers+text",
                x: x_sutpen_plot,
                y: y_sutpen,
                marker: {
                    color: this.scatterPlotColors[0],
                    opacity: CONFIG.EVENTS.OPACITIES.HIGH,
                    size: CONFIG.EVENTS.MARKER_SIZES.LARGE,
                    line: {
                        width: 1,
                        color: this.scatterPlotColors[0]
                    }
                },
                text: sutpen_label,
                textposition: textposition_sutpen_plot
            }];

            // Create layouts using Faulkner styles
            const layouts = this.createLayouts(sutpen_x_tickvals, sutpen_y_tickvals, sutpen_x_range, sutpen_y_range,
                absalom_x_tickvals, absalom_x_ticktext, absalom_x_range, absalom_y_tickvals, absalom_y_range);

            // Use Faulkner config
            const config = {
                ...CHART_CONFIGS.PLOTLY,
                responsive: true,
                displayModeBar: false
            };

            // Create the plot
            await Plotly.newPlot('plotchart', {
                data: plotData,
                layout: layouts.sutpen_plot,
                config: config
            });

            // Add empty traces for frame consistency
            await Plotly.addTraces('plotchart', [
                { x: [0, 0], y: [0, 0], visible: false },
                { x: [0, 0], y: [0, 0], visible: false },
                { x: [0, 0], y: [0, 0], visible: false }
            ]);

            // Add all frames using refactored method
            const frames = this.createFrames(x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
                x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all, absalom_major_event,
                absalom_label, absalom_textposition_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
                absalom_x_story, absalom_startdate, absalom_major_event_date, this.hoverstring, layouts);

            await Plotly.addFrames('plotchart', frames);

            this.chartReady = true;
            console.log('Events chart loaded successfully');

        } catch (error) {
            console.error('Error setting up events chart:', error);
            this.chartReady = false;
            throw error; // Re-throw for upstream handling
        }
    }

    // ========== PUBLIC API ==========

    makePlot() {
        $.ajax({
            type: "GET",
            url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/sutpen_absalom_plot_major_events.csv",
            dataType: "text",
            success: (response) => {
                const allData = this.processData(response);
                this.makePlotly(allData);
            }
        }).done(() => {
            console.log("Events data loaded successfully");
        }).fail(() => {
            console.warn("Events data could not be loaded");
            this.chartReady = false;
        });
    }

    // ========== CLEANUP METHODS ==========

    destroy() {
        if (this.chartReady) {
            Plotly.purge('plotchart');
        }
        this.chartReady = false;
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
        this.hoverstring = null;
    }

    reset() {
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
    }
}

// ==========================================================================
// VIDEO INTERSECTION OBSERVER
// ==========================================================================
class VideoManager {
    constructor() {
        this.videos = new Map();
        this.observers = new Map();
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Find all videos in the document
        const videoElements = document.querySelectorAll('video');

        videoElements.forEach(video => {
            this.setupVideoObserver(video);
        });

        this.initialized = true;
        console.log(`VideoManager initialized with ${videoElements.length} videos`);
    }

    setupVideoObserver(video) {
        if (!video.id) {
            console.warn('Video element found without ID, skipping observer setup');
            return;
        }

        // Store video reference
        this.videos.set(video.id, video);

        // Create intersection observer for this video
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playVideo(video);
                } else {
                    this.pauseVideo(video);
                }
            });
        }, {
            threshold: 0.5, // Play when 50% of video is visible
            rootMargin: '0px 0px -50px 0px' // Slight margin to ensure it's truly in view
        });

        // Start observing the video
        observer.observe(video);
        this.observers.set(video.id, observer);

        console.log(`Observer setup for video: ${video.id}`);
    }

    playVideo(video) {
        if (video.paused) {
            video.play().then(() => {
                console.log(`Video ${video.id} started playing`);
            }).catch(error => {
                console.warn(`Could not auto-play video ${video.id}:`, error);
                // Auto-play might be blocked by browser policy
                // In this case, the user will need to manually start the video
            });
        }
    }

    pauseVideo(video) {
        if (!video.paused) {
            video.pause();
            console.log(`Video ${video.id} paused`);
        }
    }

    destroy() {
        // Clean up all observers
        this.observers.forEach((observer, videoId) => {
            observer.disconnect();
            console.log(`Observer disconnected for video: ${videoId}`);
        });

        this.videos.clear();
        this.observers.clear();
        this.initialized = false;
    }

    // Public method to manually control a specific video
    controlVideo(videoId, action) {
        const video = this.videos.get(videoId);
        if (!video) {
            console.warn(`Video with ID ${videoId} not found`);
            return;
        }

        switch (action) {
            case 'play':
                this.playVideo(video);
                break;
            case 'pause':
                this.pauseVideo(video);
                break;
            case 'reset':
                video.currentTime = 0;
                this.pauseVideo(video);
                break;
            default:
                console.warn(`Unknown video action: ${action}`);
        }
    }
}

// ==========================================================================
// MAIN APPLICATION
// ==========================================================================
waitForDependencies().then(() => {
    $(function () {
        // ==========================================================================
        // SHARED SCROLLAMA SETUP
        // ==========================================================================
        const scrollyManagers = new Map();
        let eventsChartManager = null;
        let videoManager = null;
        let progressManager = null;

        window.eventsChartManager = null;
        window.updateChartHighlighting = null;
        window.updateLegendHighlighting = null;


        // Cache DOM elements
        const chartElements = {
            chart1: null,
            chart2: null,
            legend: null,
            scrolly: null,
            eventsScrolly: null
        };

        let colorMappings = {};
        let animationTimeouts = [];
        let cachedLegendSpans = null;

        function cacheElements() {
            chartElements.chart1 = document.getElementById('scrollychart1');
            chartElements.chart2 = document.getElementById('scrollychart2');
            chartElements.legend = document.getElementById('legend');
            chartElements.scrolly = d3.select("#characters-scrolly");
            chartElements.eventsScrolly = d3.select("#event-scrolly");
        }

        // ==========================================================================
        // ENHANCED SCROLLYTELL PROGRESS MANAGER WITH CLICKABLE TILES
        // ==========================================================================
        class ScrollytellProgressManager {
            constructor() {
                this.sections = new Map();
                this.initialized = false;
                this.clickHandlers = new Map(); // Store click handlers for cleanup
            }

            init() {
                if (this.initialized) return;

                // Initialize Characters section
                this.setupSection('characters', {
                    totalSteps: CONFIG.SCROLLYTELL.CHARACTERS_STEPS,
                    tilesContainer: document.getElementById('characters-progress-tiles')
                });

                // Initialize Events section
                this.setupSection('events', {
                    totalSteps: CONFIG.SCROLLYTELL.EVENTS_STEPS,
                    tilesContainer: document.getElementById('events-progress-tiles')
                });

                this.initialized = true;
                console.log('ScrollytellProgressManager initialized with clickable tiles');
            }

            setupSection(sectionName, config) {
                if (!config.tilesContainer) {
                    console.warn(`Missing tiles container for ${sectionName} progress tracking`);
                    return;
                }

                // Store section config
                this.sections.set(sectionName, {
                    ...config,
                    currentStep: 1
                });

                // Create progress tiles with click handlers
                this.createProgressTiles(sectionName, config);

                // Set initial progress (step 1)
                this.updateProgress(sectionName, 0);
            }

            createProgressTiles(sectionName, config) {
                if (!config.tilesContainer) return;

                const fragment = document.createDocumentFragment();
                const clickHandlers = [];

                for (let i = 1; i <= config.totalSteps; i++) {
                    const tile = document.createElement('div');
                    tile.className = 'progress-tile';
                    tile.setAttribute('data-step', i);
                    tile.setAttribute('data-section', sectionName);
                    tile.setAttribute('aria-label', `Go to step ${i} of ${config.totalSteps}`);
                    tile.setAttribute('role', 'button');
                    tile.setAttribute('tabindex', '0');
                    tile.title = `Jump to step ${i}`;

                    // Create click handler for this tile
                    const clickHandler = (event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        const targetStep = parseInt(tile.getAttribute('data-step'));
                        const section = tile.getAttribute('data-section');

                        console.log(`Tile clicked: ${section} step ${targetStep}`);
                        this.navigateToStep(section, targetStep - 1); // Convert to 0-based index
                    };

                    // Add click and keyboard listeners
                    tile.addEventListener('click', clickHandler);
                    tile.addEventListener('keydown', (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            clickHandler(event);
                        }
                    });

                    // Store handlers for cleanup
                    clickHandlers.push({ tile, handler: clickHandler });

                    fragment.appendChild(tile);
                }

                // Store click handlers for this section
                this.clickHandlers.set(sectionName, clickHandlers);
                config.tilesContainer.appendChild(fragment);
            }

            navigateToStep(sectionName, targetStepIndex) {
                console.log(`Navigating to ${sectionName} step ${targetStepIndex + 1}`);

                // Update progress immediately
                this.updateProgress(sectionName, targetStepIndex);

                // Trigger the appropriate chart/text updates based on section
                if (sectionName === 'characters') {
                    this.triggerCharactersStep(targetStepIndex);
                } else if (sectionName === 'events') {
                    this.triggerEventsStep(targetStepIndex);
                }

                // Optional: Scroll to the section to ensure it's visible
                this.scrollToSection(sectionName);
            }

            // Replace these methods in the ScrollytellProgressManager class:

            triggerCharactersStep(stepIndex) {
                // Update step text
                const stepTexts = document.querySelectorAll('#characters-scrolly .step-text');
                stepTexts.forEach(text => text.classList.remove('active'));

                const activeText = document.querySelector(`#characters-scrolly .step-text[data-step="${stepIndex}"]`);
                if (activeText) {
                    activeText.classList.add('active');
                }

                // FIXED: Use the globally exposed functions
                if (window.updateChartHighlighting) {
                    window.updateChartHighlighting(stepIndex);
                } else {
                    console.warn('updateChartHighlighting not available globally');
                }

                if (window.updateLegendHighlighting) {
                    window.updateLegendHighlighting(stepIndex);
                } else {
                    console.warn('updateLegendHighlighting not available globally');
                }

                console.log(`Characters step ${stepIndex + 1} activated via tile click`);
            }

            triggerEventsStep(stepIndex) {
                // Update step text
                const eventsStepTexts = document.querySelectorAll('#event-scrolly .step-text');
                eventsStepTexts.forEach(text => text.classList.remove('active'));

                const activeEventsText = document.querySelector(`#event-scrolly .step-text[data-step="${stepIndex}"]`);
                if (activeEventsText) {
                    activeEventsText.classList.add('active');
                }

                // FIXED: Use the globally exposed events chart manager
                if (window.eventsChartManager && window.eventsChartManager.chartReady) {
                    window.eventsChartManager.startAnimation(stepIndex);
                } else {
                    console.warn('Events chart manager not ready for tile navigation');
                }

                console.log(`Events step ${stepIndex + 1} activated via tile click`);
            }

            scrollToSection(sectionName) {
                const sectionElement = document.getElementById(`${sectionName}-scrolly`);
                if (sectionElement) {
                    const rect = sectionElement.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                    if (!isVisible) {
                        sectionElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
            }

            updateProgress(sectionName, stepIndex) {
                const section = this.sections.get(sectionName);
                if (!section) return;

                // Convert to 1-based indexing for display
                const currentStep = stepIndex + 1;

                // Update progress tiles
                if (section.tilesContainer) {
                    const tiles = section.tilesContainer.querySelectorAll('.progress-tile');
                    tiles.forEach((tile, index) => {
                        if (index === stepIndex) {
                            tile.classList.add('active');
                        } else {
                            tile.classList.remove('active');
                        }
                    });
                }

                // Store current step
                section.currentStep = currentStep;

                console.log(`Progress updated for ${sectionName}: Step ${currentStep}/${section.totalSteps}`);
            }

            getSectionProgress(sectionName) {
                const section = this.sections.get(sectionName);
                if (!section) return null;

                return {
                    currentStep: section.currentStep,
                    totalSteps: section.totalSteps,
                    progress: (section.currentStep / section.totalSteps) * 100
                };
            }

            destroy() {
                // Clean up click handlers
                this.clickHandlers.forEach((handlers, sectionName) => {
                    handlers.forEach(({ tile, handler }) => {
                        tile.removeEventListener('click', handler);
                        // Note: keydown handlers are anonymous, so they'll be cleaned up when tiles are removed
                    });
                });

                this.clickHandlers.clear();
                this.sections.clear();
                this.initialized = false;
                console.log('ScrollytellProgressManager destroyed');
            }
        }


        // ==========================================================================
        // SHARED UTILITY FUNCTIONS
        // ==========================================================================
        function calculateColorMappings() {
            colorMappings = {
                chart1: {
                    base: createRaceColorArray(demographyChartData, CONFIG.OPACITY.BASE),
                    borders: createRaceColorArray(demographyChartData)
                },
                chart2: {
                    base: createRaceColorArray(demographyPresentDataFiltered, CONFIG.OPACITY.BASE),
                    borders: createRaceColorArray(demographyPresentDataFiltered)
                }
            };
        }

        function handleResize() {
            setTimeout(() => {
                if (chartElements.chart1) Plotly.Plots.resize('scrollychart1');
                if (chartElements.chart2) Plotly.Plots.resize('scrollychart2');
                if (document.getElementById('sunburst')) Plotly.Plots.resize('sunburst');
                if (document.getElementById('plotchart') && eventsChartManager?.chartReady) {
                    Plotly.Plots.resize('plotchart');
                }
            }, CONFIG.RESIZE_DELAY);

            // Resize all active scrollers
            scrollyManagers.forEach(scroller => scroller.resize());
        }

        function setupUnifiedScrolly() {
            // Characters section scrolly
            if (chartElements.scrolly && chartElements.scrolly.node()) {
                const charactersScroller = scrollama();
                charactersScroller
                    .setup({
                        step: "#characters-scrolly .scroll-triggers .step",
                        offset: CONFIG.SCROLLAMA.OFFSET,
                        debug: CONFIG.SCROLLAMA.DEBUG
                    })
                    .onStepEnter(handleCharactersStepEnter);

                scrollyManagers.set('characters', charactersScroller);
            }

            // Events section scrolly
            if (chartElements.eventsScrolly && chartElements.eventsScrolly.node()) {
                const eventsScroller = scrollama();

                eventsScroller
                    .setup({
                        step: "#event-scrolly .scroll-triggers .step",
                        offset: 0.5,
                        debug: false,
                        threshold: 1
                    })
                    .onStepEnter(handleEventsStepEnter)
                    .onStepExit(function (response) {
                        console.log('Step exit:', response.index);
                    });

                scrollyManagers.set('events', eventsScroller);
            }
        }

        function handleCharactersStepEnter(response) {
            const stepTexts = document.querySelectorAll('#characters-scrolly .step-text');
            stepTexts.forEach(text => text.classList.remove('active'));

            const activeText = document.querySelector(`#characters-scrolly .step-text[data-step="${response.index}"]`);
            if (activeText) {
                activeText.classList.add('active');
            }

            updateChartHighlighting(response.index);
            updateLegendHighlighting(response.index);

            if (progressManager) {
                progressManager.updateProgress('characters', response.index);
            }
        }

        function handleEventsStepEnter(response) {
            console.log('Events step enter:', response.index);

            // Debounce rapid fire events
            if (handleEventsStepEnter.timeout) {
                clearTimeout(handleEventsStepEnter.timeout);
            }

            handleEventsStepEnter.timeout = setTimeout(() => {
                // Handle step text visibility for events
                const eventsStepTexts = document.querySelectorAll('#event-scrolly .step-text');
                eventsStepTexts.forEach(text => text.classList.remove('active'));

                const activeEventsText = document.querySelector(`#event-scrolly .step-text[data-step="${response.index}"]`);
                if (activeEventsText) {
                    activeEventsText.classList.add('active');
                    console.log('Activated text for step:', response.index);
                } else {
                    console.warn('No text element found for step:', response.index);
                }

                // Animate the chart with additional checks
                if (eventsChartManager && eventsChartManager.chartReady) {
                    eventsChartManager.startAnimation(response.index);
                } else {
                    console.warn('Events chart manager not ready');
                }

                if (progressManager) {
                    progressManager.updateProgress('events', response.index);
                }
            }, 50);
        }

        // ==========================================================================
        // CHARACTER CHART FUNCTIONS
        // ==========================================================================
        function createPieData(data, chartTitle = '') {
            const isChart1 = data === demographyChartData;
            const colors = isChart1 ? colorMappings.chart1.base : colorMappings.chart2.base;
            const borderColors = isChart1 ? colorMappings.chart1.borders : colorMappings.chart2.borders;

            return [{
                type: 'pie',
                hole: 0.4,
                values: data.map(d => d.total),
                labels: data.map(d => d.Race),
                textinfo: 'percent',
                texttemplate: '%{percent:.0%}',
                textposition: 'inside',
                textfont: CHART_CONFIGS.FONTS.pieText,
                marker: {
                    colors: colors,
                    line: {
                        color: borderColors,
                        width: 1
                    }
                },
                hovertemplate: `<b>%{label}</b><br>${chartTitle.includes('Raw') ? 'Count: %{value}' : 'Words: %{value:,}'
                    }<br>Percentage: %{percent}<br><extra></extra>`,
                hoverlabel: {
                    font: CHART_CONFIGS.FONTS.hoverLabel
                }
            }];
        }

        function initializeCharts() {
            const charts = [
                {
                    id: 'scrollychart1',
                    element: chartElements.chart1,
                    data: createPieData(demographyChartData, 'Raw Demographic Total'),
                    layout: { ...CHART_CONFIGS.PIE_LAYOUT }
                },
                {
                    id: 'scrollychart2',
                    element: chartElements.chart2,
                    data: createPieData(demographyPresentDataFiltered, 'Weighted Demographic Presence'),
                    layout: { ...CHART_CONFIGS.PIE_LAYOUT }
                }
            ];

            charts.forEach(chart => {
                if (chart.element) {
                    Plotly.newPlot(chart.id, chart.data, chart.layout, CHART_CONFIGS.PLOTLY);
                }
            });
        }

        function createLegendItem(item) {
            const li = document.createElement('li');
            const boxSpan = document.createElement("span");
            const textContainer = document.createElement("p");

            Object.assign(li.style, {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '10px'
            });

            Object.assign(boxSpan.style, {
                background: getRaceColorWithOpacity(item.Race, CONFIG.OPACITY.BASE),
                borderColor: getRaceColor(item.Race),
                borderWidth: '1px',
                borderStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: CONFIG.STYLING.LEGEND_BOX_SIZE,
                marginRight: '10px',
                width: CONFIG.STYLING.LEGEND_BOX_SIZE,
                transition: 'all 0.3s ease'
            });

            boxSpan.id = item.Race;

            Object.assign(textContainer.style, {
                margin: '0',
                padding: '0',
                fontFamily: faulknerBaseLayout.font.family,
                color: faulknerBaseLayout.font.color
            });

            textContainer.textContent = item.Race;

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            return li;
        }

        function createLegend() {
            if (!chartElements.legend) {
                console.error('Legend container not found!');
                return;
            }

            let listContainer = chartElements.legend.querySelector("ul");

            if (!listContainer) {
                listContainer = document.createElement("ul");
                Object.assign(listContainer.style, {
                    display: "flex",
                    flexDirection: "row",
                    flexFlow: "wrap",
                    margin: "0",
                    padding: "0"
                });
                chartElements.legend.appendChild(listContainer);
            }

            const fragment = document.createDocumentFragment();
            demographyChartData.forEach(item => {
                fragment.appendChild(createLegendItem(item));
            });
            listContainer.appendChild(fragment);

            cachedLegendSpans = Array.from(chartElements.legend.getElementsByTagName('span'));
        }

        function createColorArrays(targetOpacity, stepIndex) {
            const chart1Colors = [...colorMappings.chart1.base];
            const chart2Colors = [...colorMappings.chart2.base];

            const stepConfig = CONFIG.STEP_MAPPINGS[stepIndex];
            if (stepConfig) {
                const chart1Index = demographyChartData.findIndex(item => item.Race === stepConfig.race);
                if (chart1Index >= 0) {
                    chart1Colors[chart1Index] = getRaceColorWithOpacity(stepConfig.race, targetOpacity);
                }

                const chart2Index = demographyPresentDataFiltered.findIndex(item => item.Race === stepConfig.race);
                if (chart2Index >= 0) {
                    chart2Colors[chart2Index] = getRaceColorWithOpacity(stepConfig.race, targetOpacity);
                }
            }

            return { chart1Colors, chart2Colors };
        }

        function updateChartHighlighting(stepIndex) {
            animationTimeouts.forEach(clearTimeout);
            animationTimeouts.length = 0;

            if (stepIndex === 0) {
                const resetColors = createColorArrays(CONFIG.OPACITY.BASE, 0);
                Promise.all([
                    Plotly.restyle('scrollychart1', {
                        'marker.colors': [resetColors.chart1Colors]
                    }),
                    Plotly.restyle('scrollychart2', {
                        'marker.colors': [resetColors.chart2Colors]
                    })
                ]);
                return;
            }

            CONFIG.ANIMATION.OPACITY_STEPS.forEach((opacity, index) => {
                const timeout = setTimeout(() => {
                    const colors = createColorArrays(opacity, stepIndex);
                    Promise.all([
                        Plotly.restyle('scrollychart1', {
                            'marker.colors': [colors.chart1Colors]
                        }),
                        Plotly.restyle('scrollychart2', {
                            'marker.colors': [colors.chart2Colors]
                        })
                    ]);
                }, index * CONFIG.ANIMATION.STEP_DELAY);

                animationTimeouts.push(timeout);
            });
        }

        function updateLegendHighlighting(stepIndex) {
            if (!chartElements.legend || !cachedLegendSpans) return;

            cachedLegendSpans.forEach(span => {
                const race = span.id;
                Object.assign(span.style, {
                    background: getRaceColorWithOpacity(race, CONFIG.OPACITY.BASE),
                    borderWidth: '1px',
                    boxShadow: 'none',
                    transform: 'scale(1)'
                });
            });

            const stepConfig = CONFIG.STEP_MAPPINGS[stepIndex];
            if (stepConfig) {
                const activeSpan = cachedLegendSpans.find(span => span.id === stepConfig.race);
                if (activeSpan) {
                    Object.assign(activeSpan.style, {
                        background: getRaceColorWithOpacity(stepConfig.race, CONFIG.OPACITY.FULL),
                        borderWidth: '2px',
                        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                        transform: 'scale(1.05)'
                    });
                }
            }
        }

        function setupStickyfill() {
            d3.selectAll(".sticky").each(function () {
                Stickyfill.add(this);
            });
        }

        // ==========================================================================
        // SUNBURST CHART FUNCTIONS
        // ==========================================================================
        function generateSunburstColors(data) {
            return data.map(item => {
                if (item.labels === "Total") {
                    return CHART_CONFIGS.SUNBURST.TOTAL_COLOR + CONFIG.OPACITY.TOTAL;
                }

                if (item.parents === "Total") {
                    return getRaceColorWithOpacity(item.labels, CONFIG.OPACITY.PARENT);
                }

                return getRaceColorWithOpacity(item.race, CONFIG.OPACITY.BASE);
            });
        }

        function createSunburstPlotData(data) {
            const colors = generateSunburstColors(data);

            return [{
                type: "sunburst",
                labels: data.map(item => item.labels),
                parents: data.map(item => item.parents),
                values: data.map(item => item.values),
                ids: data.map(item => item.ids),
                customdata: data.map(item => item.percent),
                outsidetextfont: CHART_CONFIGS.FONTS.outsideText,
                marker: {
                    colors: colors,
                    line: { width: 1 }
                },
                branchvalues: 'remainder',
                hovertemplate: '%{customdata}%<extra></extra>'
            }];
        }

        function createSunburstPlot() {
            const sunburstElement = document.getElementById('sunburst');
            if (!sunburstElement) {
                console.error('Sunburst container element not found!');
                return;
            }

            const plotData = createSunburstPlotData(SUNBURST_DATA);
            Plotly.newPlot('sunburst', plotData, CHART_CONFIGS.SUNBURST_LAYOUT, CHART_CONFIGS.PLOTLY)
                .catch(error => {
                    console.error('Error initializing sunburst chart:', error);
                });
        }

        // ==========================================================================
        // INITIALIZATION
        // ==========================================================================
        function init() {
            cacheElements();
            calculateColorMappings();
            setupStickyfill();

            // Initialize character charts
            initializeCharts();
            createLegend();
            createSunburstPlot();

            // Initialize events chart manager
            eventsChartManager = new EventsChartManager();
            if (document.getElementById('plotchart')) {
                eventsChartManager.makePlot();
            }

            videoManager = new VideoManager();
            videoManager.init();

            // IMPORTANT: Expose functions globally BEFORE creating progress manager
            window.eventsChartManager = eventsChartManager;
            window.updateChartHighlighting = updateChartHighlighting;
            window.updateLegendHighlighting = updateLegendHighlighting;

            // THEN create the progress manager
            progressManager = new ScrollytellProgressManager();
            progressManager.init();

            // Setup unified scrolly functionality
            setupUnifiedScrolly();

          

            // Setup resize handling
            const debouncedResize = debounce(handleResize, CONFIG.DEBOUNCE_DELAY);
            window.addEventListener('resize', debouncedResize);
            handleResize();

            window.addEventListener('beforeunload', () => {
                if (videoManager) {
                    videoManager.destroy();
                }
            });
            console.log('=== Final Debug Check ===');
            console.log('Global functions ready:', {
                updateChartHighlighting: typeof window.updateChartHighlighting,
                updateLegendHighlighting: typeof window.updateLegendHighlighting,
                eventsChartManager: typeof window.eventsChartManager
            });

            const tiles = document.querySelectorAll('.progress-tile');
            console.log('Total tiles found:', tiles.length);

            if (tiles.length > 0) {
                // Test just one tile
                const testTile = tiles[1]; // Second tile (characters step 2)
                console.log('Testing tile:', {
                    step: testTile.getAttribute('data-step'),
                    section: testTile.getAttribute('data-section'),
                    className: testTile.className
                });

                // Add a temporary listener to see if clicks are working
                testTile.addEventListener('click', function (e) {
                    console.log('DIRECT CLICK DETECTED on tile:', e.target);
                });

                console.log('Simulating click...');
                testTile.click();
            }
        }

        init();
    });
});