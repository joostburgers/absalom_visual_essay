import { CONFIG } from './app-config.js';
import { faulknerBaseLayout, defaultConfig, faulknerChartStyles } from './faulkner-chart-styles.js';


export const CHART_CONFIGS = {
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
		responsive: true,
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
    },
    LANGUAGE: {
        WORDS_LAYOUT: {
            ...faulknerBaseLayout,
            title: { text: "" },
            showlegend: false,
            xaxis: { showgrid: false, title: { text: "Novel" } },
            yaxis: { title: { text: "Words per Sentence" }, showgrid: false, zeroline: false },
          
        },
        PARENTHESIS_LAYOUT: {
            ...faulknerBaseLayout,
            title: { text: "" },
            xaxis: { showgrid: false, zeroline: false, showline: false, tickmode: 'array' },
            yaxis: {
                text: "Nesting Level", showgrid: false, zeroline: false, showline: false,
                linewidth: 0, tickmode: "array", tickvals: [0, 1, 2, 3, 4],
                ticktext: ["Main Text", "1: ()", "2: (())", "3: ((()))", "4: (((())))"]
            }
        }
    }
};