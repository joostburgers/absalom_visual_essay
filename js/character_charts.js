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
// MAIN APPLICATION
// ==========================================================================
waitForDependencies().then(() => {
    $(function () {
        // ==========================================================================
        // CACHED DOM ELEMENTS AND STATE
        // ==========================================================================
        const chartElements = {
            chart1: null,
            chart2: null,
            legend: null,
            scrolly: null
        };

        let colorMappings = {};
        let animationTimeouts = [];
        let cachedLegendSpans = null;

        // Cache DOM elements after DOM is ready
        function cacheElements() {
            chartElements.chart1 = document.getElementById('scrollychart1');
            chartElements.chart2 = document.getElementById('scrollychart2');
            chartElements.legend = document.getElementById('legend');
            chartElements.scrolly = d3.select("#scrolly");
        }

        // ==========================================================================
        // OPTIMIZED COLOR MAPPING GENERATION
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

        // ==========================================================================
        // OPTIMIZED CHART CREATION FUNCTIONS - NO FONT COLOR MANAGEMENT
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
                textfont: CHART_CONFIGS.FONTS.pieText, // No color property - Plotly auto-adjusts
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

        // ==========================================================================
        // OPTIMIZED LEGEND CREATION
        // ==========================================================================
        function createLegendItem(item) {
            const li = document.createElement('li');
            const boxSpan = document.createElement("span");
            const textContainer = document.createElement("p");

            // Consolidated styling application
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

            // Cache spans for performance
            cachedLegendSpans = Array.from(chartElements.legend.getElementsByTagName('span'));
        }

        // ==========================================================================
        // SIMPLIFIED ANIMATION FUNCTIONS - NO FONT COLOR MANAGEMENT
        // ==========================================================================
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

            // Reset all legend items
            cachedLegendSpans.forEach(span => {
                const race = span.id;
                Object.assign(span.style, {
                    background: getRaceColorWithOpacity(race, CONFIG.OPACITY.BASE),
                    borderWidth: '1px',
                    boxShadow: 'none',
                    transform: 'scale(1)'
                });
            });

            // Highlight active race
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

        // ==========================================================================
        // SCROLLAMA FUNCTIONS
        // ==========================================================================
        function handleResize() {
            setTimeout(() => {
                if (chartElements.chart1) Plotly.Plots.resize('scrollychart1');
                if (chartElements.chart2) Plotly.Plots.resize('scrollychart2');
                if (document.getElementById('sunburst')) Plotly.Plots.resize('sunburst');
            }, CONFIG.RESIZE_DELAY);

            if (window.scroller) {
                window.scroller.resize();
            }
        }

        function handleStepEnter(response) {
            const stepTexts = document.querySelectorAll('.step-text');
            stepTexts.forEach(text => text.classList.remove('active'));

            const activeText = document.querySelector(`.step-text[data-step="${response.index}"]`);
            if (activeText) {
                activeText.classList.add('active');
            }

            updateChartHighlighting(response.index);
            updateLegendHighlighting(response.index);
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
                    // Race category (parent nodes) - use full opacity
                    return getRaceColorWithOpacity(item.labels, CONFIG.OPACITY.PARENT);
                }

                // Character (leaf nodes) - use base opacity to match demographic charts
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
            initializeCharts();
            createLegend();

            const scroller = scrollama();

            scroller
                .setup({
                    step: ".scroll-triggers .step",
                    offset: CONFIG.SCROLLAMA.OFFSET,
                    debug: CONFIG.SCROLLAMA.DEBUG
                })
                .onStepEnter(handleStepEnter);

            window.scroller = scroller;

            const debouncedResize = debounce(handleResize, CONFIG.DEBOUNCE_DELAY);
            window.addEventListener('resize', debouncedResize);

            handleResize();

            // Initialize the sunburst chart
            createSunburstPlot();
        }

        init();
    });
});