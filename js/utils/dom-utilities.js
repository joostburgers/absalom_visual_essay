import { demographyChartData, demographyPresentDataFiltered } from '../data/chart-data.js';
import { CONFIG } from '../config/app-config.js';
import { createRaceColorArray} from './chart-utilities.js';

//These functions help manage the layout and responsiveness of the charts and other DOM elements. Plotly has its own "responsive" charts, but in practice they often need to be manually resized when the window size changes or when other elements on the page change size. The resize forces a container resize.


export function cacheElements() {
    return {
        chart1: document.getElementById('scrollychart1'),
        chart2: document.getElementById('scrollychart2'),
        legend: document.getElementById('legend'),
        scrolly: $("#characters-scrolly")[0],
        eventsScrolly: $("#event-scrolly")[0]
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