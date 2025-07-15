import { demographyChartData, demographyPresentDataFiltered, SUNBURST_DATA } from '../data/chart-data.js';
import { CONFIG } from '../config/app-config.js';
import { CHART_CONFIGS } from '../config/chart-configs.js';
import { getRaceColor, getRaceColorWithOpacity, createRaceColorArray } from '../utils/chart-utilities.js';
// ADD THIS IMPORT:
import { faulknerBaseLayout } from '../config/faulkner-chart-styles.js';


export function initializeCharts(chartElements, colorMappings) {
   

    // Check if Plotly is available
    if (typeof Plotly === 'undefined') {
        console.error('❌ Plotly is not defined!');
        return;
    }
    console.log('✅ Plotly is available:', Plotly);

    const charts = [
        {
            id: 'scrollychart1',
            element: chartElements.chart1,
            data: createPieData(demographyChartData, 'Raw Demographic Total', colorMappings),
            layout: { ...CHART_CONFIGS.PIE_LAYOUT }
        },
        {
            id: 'scrollychart2',
            element: chartElements.chart2,
            data: createPieData(demographyPresentDataFiltered, 'Weighted Demographic Presence', colorMappings),
            layout: { ...CHART_CONFIGS.PIE_LAYOUT }
        }
    ];

    

    charts.forEach((chart, index) => {
        console.log(`🎯 Processing chart ${index + 1}: ${chart.id}`);
        console.log(`🎯 Element found:`, chart.element);
        console.log(`🎯 Chart data:`, chart.data);
        console.log(`🎯 Chart layout:`, chart.layout);

        if (chart.element) {
            console.log(`🎯 Creating Plotly chart: ${chart.id}`);
            try {
                Plotly.newPlot(chart.id, chart.data, chart.layout, CHART_CONFIGS.PLOTLY)
                    .then(() => {
                        console.log(`✅ Successfully created chart: ${chart.id}`);
                    })
                    .catch(error => {
                        console.error(`❌ Error creating chart ${chart.id}:`, error);
                        console.error(`❌ Error stack:`, error.stack);
                    });
            } catch (syncError) {
                console.error(`❌ Synchronous error creating chart ${chart.id}:`, syncError);
                console.error(`❌ Sync error stack:`, syncError.stack);
            }
        } else {
            console.error(`❌ Chart element not found for: ${chart.id}`);
            console.error(`❌ Looking for element with ID: ${chart.id}`);
            console.error(`❌ DOM element exists:`, document.getElementById(chart.id));
        }
    });
}

export function createPieData(data, chartTitle = '', colorMappings) {
    console.log('🎯 createPieData called');
    console.log('🎯 data:', data);
    console.log('🎯 colorMappings:', colorMappings);

    if (!colorMappings) {
        console.error('❌ colorMappings is undefined!');
        return null;
    }

    const isChart1 = data === demographyChartData;
    console.log('🎯 isChart1:', isChart1);

    const colors = isChart1 ? colorMappings.chart1?.base : colorMappings.chart2?.base;
    const borderColors = isChart1 ? colorMappings.chart1?.borders : colorMappings.chart2?.borders;

    console.log('🎯 colors:', colors);
    console.log('🎯 borderColors:', borderColors);

    if (!colors || !borderColors) {
        console.error('❌ Colors or borderColors missing!');
        console.error('❌ colors:', colors);
        console.error('❌ borderColors:', borderColors);
        return null;
    }

    const pieData = [{
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

    console.log('🎯 Created pie data:', pieData);
    return pieData;
}
export function createLegend(chartElements) {
    if (!chartElements.legend) {
        console.error('Legend container not found!');
        return null;
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

    return Array.from(chartElements.legend.getElementsByTagName('span'));
}

export function createColorArrays(targetOpacity, stepIndex, colorMappings) {
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

export function updateChartHighlighting(stepIndex, colorMappings, animationTimeouts) {
    animationTimeouts.forEach(clearTimeout);
    animationTimeouts.length = 0;

    if (stepIndex === 0) {
        const resetColors = createColorArrays(CONFIG.OPACITY.BASE, 0, colorMappings);
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
            const colors = createColorArrays(opacity, stepIndex, colorMappings);
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

export function updateLegendHighlighting(stepIndex, cachedLegendSpans) {
    if (!cachedLegendSpans) return;

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

// ... rest of your sunburst functions remain the same
export function createLegendItem(item) {
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

export function generateSunburstColors(data) {
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

export function createSunburstPlotData(data) {
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

export function createSunburstPlot() {
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