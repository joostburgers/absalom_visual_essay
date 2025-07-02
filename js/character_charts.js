// JavaScript source code
// Configuration for charts

// ==========================================================================
// CONFIGURATION CONSTANTS
// ==========================================================================
const CONFIG = {
    ANIMATION: {
        OPACITY_STEPS: ['50', '90', 'B0', 'FF'],
        STEP_DELAY: 70,
        BASE_OPACITY: '33',
        FULL_OPACITY: 'FF'
    },
    STEP_MAPPINGS: {
        1: { race: 'White', chart1Index: 4, colorIndex: 4 },
        2: { race: 'Mixed Ancestry', chart1Index: 2, colorIndex: 2 },
        3: { race: 'Black', chart1Index: 0, colorIndex: 0 }
    },
    SCROLLAMA: {
        OFFSET: 0.5,
        DEBUG: false
    },
    RESIZE_DELAY: 100,
    DEBOUNCE_DELAY: 250
};

// ==========================================================================
// DATA CONSTANTS
// ==========================================================================
const demographyChartData = [
    {"Race": "Black", "total": 36, "percent": 0.23},
    {"Race": "Indian", "total": 3, "percent": 0.02},
    {"Race": "Mixed Ancestry", "total": 9, "percent": 0.06},
    {"Race": "Multiracial Group", "total": 5, "percent": 0.03},
    {"Race": "White", "total": 101, "percent": 0.66}
];

const demographyPresentData = [
    {"Race": "Black", "total": 27666, "percent": 0.07},
    {"Race": "Indian", "total": 2075, "percent": 0},
    {"Race": "Mixed Ancestry", "total": 66452, "percent": 0.16},
    {"Race": "Multiracial Group", "total": 2083, "percent": 0},
    {"Race": "White", "total": 320567, "percent": 0.77}
];

// Filtered data for second chart (removes 0% entries)
const demographyPresentDataFiltered = demographyPresentData.filter(item => 
    item.Race !== "Indian" && item.Race !== "Multiracial Group"
);

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================
function getColorIndex(race) {
    const raceToIndexMap = {
        "Black": 0,
        "Indian": 1, 
        "Mixed Ancestry": 2,
        "Multiracial Group": 3,
        "White": 4
    };
    return raceToIndexMap[race];
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
// DEPENDENCY CHECK FUNCTION
// ==========================================================================
function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDependencies = () => {
            if (typeof faulknerChartStyles !== 'undefined' && 
                typeof faulknerBaseLayout !== 'undefined' && 
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
        // CACHED DOM ELEMENTS
        // ==========================================================================
        const chartElements = {
            chart1: null,
            chart2: null,
            legend: null,
            scrolly: null
        };

        // Cache DOM elements after DOM is ready
        function cacheElements() {
            chartElements.chart1 = document.getElementById('scrollychart1');
            chartElements.chart2 = document.getElementById('scrollychart2');
            chartElements.legend = document.getElementById('legend');
            chartElements.scrolly = d3.select("#scrolly");
        }

        // ==========================================================================
        // PRE-CALCULATED COLOR MAPPINGS
        // ==========================================================================
        let colorMappings = {};

        function calculateColorMappings() {
            colorMappings = {
                chart1Base: demographyChartData.map((_, index) => 
                    faulknerChartStyles.colorway[index] + CONFIG.ANIMATION.BASE_OPACITY
                ),
                chart1Borders: demographyChartData.map((_, index) => 
                    faulknerChartStyles.colorway[index]
                ),
                chart2Base: demographyPresentDataFiltered.map(item => 
                    faulknerChartStyles.colorway[getColorIndex(item.Race)] + CONFIG.ANIMATION.BASE_OPACITY
                ),
                chart2Borders: demographyPresentDataFiltered.map(item => 
                    faulknerChartStyles.colorway[getColorIndex(item.Race)]
                )
            };
        }

        // ==========================================================================
        // CHART CONFIGURATION
        // ==========================================================================
        let animationTimeouts = [];
        
        const baseLayout = {
            showlegend: false,
            margin: { l: 10, r: 10, b: 0, t: 0, pad: 0 },
            paper_bgcolor: faulknerBaseLayout.paperBackground,
            plot_bgcolor: faulknerBaseLayout.plotBackground,
            autosize: true,
            width: undefined,
            height: undefined,
            font: {
                family: faulknerBaseLayout.font.family,
                size: 14,
                color: faulknerBaseLayout.font.color
            }
        };

        const plotlyConfig = {
            displayModeBar: false,
            responsive: true,
            staticPlot: false
        };

        // ==========================================================================
        // CHART CREATION FUNCTIONS
        // ==========================================================================
        function createPieData(data, useFiltered = false, chartTitle = '') {
            const colors = data.map((item, index) => {
                const colorIndex = useFiltered ? getColorIndex(item.Race) : index;
                return faulknerChartStyles.colorway[colorIndex] + CONFIG.ANIMATION.BASE_OPACITY;
            });

            return [{
                type: 'pie',
                hole: 0.4,
                values: data.map(d => d.total),
                labels: data.map(d => d.Race),
                textinfo: 'percent',
                texttemplate: '%{percent:.0%}',
                textposition: 'inside',
                textfont: {
                    family: faulknerBaseLayout.font.family,
                    size: 15
                },
                marker: {
                    colors: colors,
                    line: {
                        color: data.map((item, index) => {
                            const colorIndex = useFiltered ? getColorIndex(item.Race) : index;
                            return faulknerChartStyles.colorway[colorIndex];
                        }),
                        width: 1
                    }
                },
                hovertemplate: '<b>%{label}</b><br>' +
                              (chartTitle.includes('Raw') ? 'Count: %{value}' : 'Words: %{value:,}') + '<br>' +
                              'Percentage: %{percent}<br>' +
                              '<extra></extra>',
                hoverlabel: {
                    font: {
                        family: faulknerBaseLayout.font.family,
                        size: 13
                    }
                }
            }];
        }

        function initializeCharts() {
            const charts = [
                {
                    id: 'scrollychart1',
                    element: chartElements.chart1,
                    data: createPieData(demographyChartData, false, 'Raw Demographic Total'),
                    layout: { ...baseLayout }
                },
                {
                    id: 'scrollychart2',
                    element: chartElements.chart2,
                    data: createPieData(demographyPresentDataFiltered, true, 'Weighted Demographic Presence'),
                    layout: { ...baseLayout }
                }
            ];
            
            charts.forEach(chart => {
                if (chart.element) {
                    Plotly.newPlot(chart.id, chart.data, chart.layout, plotlyConfig);
                }
            });
        }

        // ==========================================================================
        // LEGEND CREATION
        // ==========================================================================
        function createLegendItem(item, index) {
            const li = document.createElement('li');
            
            Object.assign(li.style, {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '10px'
            });

            const boxSpan = document.createElement("span");
            Object.assign(boxSpan.style, {
                background: faulknerChartStyles.colorway[index] + CONFIG.ANIMATION.BASE_OPACITY,
                borderColor: faulknerChartStyles.colorway[index],
                borderWidth: '1px',
                borderStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '20px',
                marginRight: '10px',
                width: '20px',
                transition: 'all 0.3s ease'
            });
            boxSpan.id = index;

            const textContainer = document.createElement("p");
            Object.assign(textContainer.style, {
                margin: '0',
                padding: '0'
            });
            textContainer.appendChild(document.createTextNode(item.Race));

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
            demographyChartData.forEach((item, index) => {
                fragment.appendChild(createLegendItem(item, index));
            });
            listContainer.appendChild(fragment);
        }

        // ==========================================================================
        // ANIMATION FUNCTIONS
        // ==========================================================================
        function createColorArrays(targetOpacity, stepIndex) {
            const chart1Colors = [...colorMappings.chart1Base];
            const chart2Colors = [...colorMappings.chart2Base];
            
            const stepConfig = CONFIG.STEP_MAPPINGS[stepIndex];
            if (stepConfig) {
                chart1Colors[stepConfig.chart1Index] = faulknerChartStyles.colorway[stepConfig.colorIndex] + targetOpacity;
                
                const chart2Index = demographyPresentDataFiltered.findIndex(item => item.Race === stepConfig.race);
                if (chart2Index >= 0) {
                    chart2Colors[chart2Index] = faulknerChartStyles.colorway[stepConfig.colorIndex] + targetOpacity;
                }
            }
            
            return { chart1Colors, chart2Colors };
        }

        function updateChartHighlighting(stepIndex) {
            animationTimeouts.forEach(clearTimeout);
            animationTimeouts.length = 0;

            if (stepIndex === 0) {
                const resetColors = createColorArrays(CONFIG.ANIMATION.BASE_OPACITY, 0);
                Promise.all([
                    Plotly.restyle('scrollychart1', {'marker.colors': [resetColors.chart1Colors]}),
                    Plotly.restyle('scrollychart2', {'marker.colors': [resetColors.chart2Colors]})
                ]);
                return;
            }
            
            CONFIG.ANIMATION.OPACITY_STEPS.forEach((opacity, index) => {
                const timeout = setTimeout(() => {
                    const colors = createColorArrays(opacity, stepIndex);
                    Promise.all([
                        Plotly.restyle('scrollychart1', {'marker.colors': [colors.chart1Colors]}),
                        Plotly.restyle('scrollychart2', {'marker.colors': [colors.chart2Colors]})
                    ]);
                }, index * CONFIG.ANIMATION.STEP_DELAY);
                
                animationTimeouts.push(timeout);
            });
            
            console.log(`Chart colors smoothly animated for step ${stepIndex}`);
        }

        function updateLegendHighlighting(stepIndex) {
            if (!chartElements.legend) return;
            
            const spans = chartElements.legend.getElementsByTagName('span');

            Array.from(spans).forEach(span => {
                const id = parseInt(span.id);
                Object.assign(span.style, {
                    background: faulknerChartStyles.colorway[id] + CONFIG.ANIMATION.BASE_OPACITY,
                    borderWidth: '1px',
                    boxShadow: 'none',
                    transform: 'scale(1)'
                });
            });

            const stepConfig = CONFIG.STEP_MAPPINGS[stepIndex];
            if (stepConfig && spans[stepConfig.chart1Index]) {
                Object.assign(spans[stepConfig.chart1Index].style, {
                    background: faulknerChartStyles.colorway[stepConfig.colorIndex] + CONFIG.ANIMATION.FULL_OPACITY,
                    borderWidth: '2px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                    transform: 'scale(1.05)'
                });
            }
        }

        // ==========================================================================
        // SCROLLAMA FUNCTIONS
        // ==========================================================================
        function handleResize() {
            setTimeout(() => {
                if (chartElements.chart1) Plotly.Plots.resize('scrollychart1');
                if (chartElements.chart2) Plotly.Plots.resize('scrollychart2');
            }, CONFIG.RESIZE_DELAY);
            
            if (window.scroller) {
                window.scroller.resize();
            }
        }

        function handleStepEnter(response) {
            console.log('Step entered:', response.index);

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
        }

        init();
    });
});