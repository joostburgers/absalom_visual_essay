import { demographyChartData, demographyPresentDataFiltered } from '../data/chart-data.js';
import { CONFIG } from '../config/app-config.js';
import { createRaceColorArray, debounce } from './chart-utilities.js';

export function cacheElements() {
    return {
        chart1: document.getElementById('scrollychart1'),
        chart2: document.getElementById('scrollychart2'),
        legend: document.getElementById('legend'),
        scrolly: d3.select("#characters-scrolly"),
        eventsScrolly: d3.select("#event-scrolly")
    };
}

export function calculateColorMappings() {
    return {
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

export function handleResize(chartElements, eventsChartManager, languageChartsManager, scrollyManagers) {
    setTimeout(() => {
        if (chartElements.chart1) Plotly.Plots.resize('scrollychart1');
        if (chartElements.chart2) Plotly.Plots.resize('scrollychart2');
        if (document.getElementById('sunburst')) Plotly.Plots.resize('sunburst');
        if (document.getElementById('plotchart') && eventsChartManager?.chartReady) {
            Plotly.Plots.resize('plotchart');
        }
    }, CONFIG.RESIZE_DELAY);

    if (languageChartsManager) {
        languageChartsManager.resize();
    }

    // Resize all active scrollers
    scrollyManagers.forEach(scroller => scroller.resize());
}