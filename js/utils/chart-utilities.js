import { faulknerChartStyles } from '../config/faulkner-chart-styles.js';


// Color utilities and caching
const colorCache = new Map();

export function getRaceColor(race) {
    return faulknerChartStyles.raceColors[race] || faulknerChartStyles.colorway[5];
}

export function getRaceColorWithOpacity(race, opacity) {
    const cacheKey = `${race}-${opacity}`;
    if (colorCache.has(cacheKey)) {
        return colorCache.get(cacheKey);
    }

    const baseColor = getRaceColor(race);
    const result = baseColor + opacity;
    colorCache.set(cacheKey, result);
    return result;
}

export function createRaceColorArray(dataArray, opacity = '') {
    return dataArray.map(item => getRaceColorWithOpacity(item.Race, opacity));
}

export function debounce(func, wait) {
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

export function processCSVData(response, fieldMappings) {
    const data = $.csv.toObjects(response, { headers: true });
    const plotData = {};
    Object.entries(fieldMappings).forEach(([key, transformer]) => {
        plotData[key] = data.map(transformer);
    });
    return plotData;
}

export function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDependencies = () => {
            if (typeof Plotly !== 'undefined' &&
                typeof $ !== 'undefined' &&
                typeof d3 !== 'undefined' &&
                typeof scrollama !== 'undefined') {
                console.log('All external dependencies ready!');
                resolve();
            } else {
                console.log('Still waiting for dependencies:', {
                    Plotly: typeof Plotly,
                    jQuery: typeof $,
                    d3: typeof d3,
                    scrollama: typeof scrollama
                });
                setTimeout(checkDependencies, 50);
            }
        };
        checkDependencies();
    });
}