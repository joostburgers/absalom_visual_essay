import { CONFIG } from './config/app-config.js';
import { waitForDependencies, debounce } from './utils/chart-utilities.js';
import { cacheElements, calculateColorMappings, handleResize } from './utils/dom-utilities.js';
import { EventsChartManager } from './managers/events-chart-manager.js';
import { VideoManager } from './managers/video-manager.js';
import { LanguageChartsManager } from './managers/language-chart-manager.js';
import { ScrollytellProgressManager } from './managers/scrollytell-manager.js';
import { initializeCharts, createLegend, createSunburstPlot, updateChartHighlighting, updateLegendHighlighting } from './character_charts.js';
import { setupUnifiedScrolly } from './handlers/scroll-handlers.js';

console.log('🚀 app.js loaded - starting execution');

// ==========================================================================
// MAIN APPLICATION - COORDINATION ONLY
// ==========================================================================
console.log('🚀 Calling waitForDependencies...');
waitForDependencies().then(() => {
    console.log('🚀 Dependencies loaded, starting app...');

    $(function () {
        console.log('🚀 jQuery ready, initializing...');

        try {
            // Initialize shared state
            const scrollyManagers = new Map();
            let animationTimeouts = [];
            let cachedLegendSpans = null;

            console.log('🚀 About to cache elements...');
            // Cache DOM elements and calculate colors
            const chartElements = cacheElements();
            console.log('🚀 Elements cached:', chartElements);

            console.log('🚀 About to calculate color mappings...');
            const colorMappings = calculateColorMappings();
            console.log('🚀 Color mappings calculated:', colorMappings);

            // Initialize all managers
            console.log('🚀 Creating managers...');
            const eventsChartManager = new EventsChartManager();
            const videoManager = new VideoManager();
            const progressManager = new ScrollytellProgressManager();
            const languageChartsManager = new LanguageChartsManager();
            console.log('🚀 Managers created');

            // Create wrapper functions that include dependencies
            const updateChartHighlightingWithDeps = (stepIndex) => {
                updateChartHighlighting(stepIndex, colorMappings, animationTimeouts);
            };

            const updateLegendHighlightingWithDeps = (stepIndex) => {
                updateLegendHighlighting(stepIndex, cachedLegendSpans);
            };

            // Initialize character charts
            console.log('🚀 About to initialize charts...');
            console.log('🚀 Calling initializeCharts with:', chartElements, colorMappings);
            initializeCharts(chartElements, colorMappings);

            console.log('🚀 About to create legend...');
            cachedLegendSpans = createLegend(chartElements);

            console.log('🚀 About to create sunburst...');
            createSunburstPlot();

            // Initialize all managers
            if (document.getElementById('plotchart')) {
                console.log('🚀 Initializing events chart...');
                eventsChartManager.makePlot();
            }

            console.log('🚀 Initializing other managers...');
            videoManager.init();
            progressManager.init();
            languageChartsManager.init();

            // Setup scrolling with dependencies
            setupUnifiedScrolly(
                chartElements,
                scrollyManagers,
                progressManager,
                eventsChartManager,
                updateChartHighlightingWithDeps,
                updateLegendHighlightingWithDeps
            );

            // Global exposure for compatibility
            window.eventsChartManager = eventsChartManager;
            window.updateChartHighlighting = updateChartHighlightingWithDeps;
            window.updateLegendHighlighting = updateLegendHighlightingWithDeps;

            // Setup resize handling
            const debouncedResize = debounce(() => {
                handleResize(chartElements, eventsChartManager, languageChartsManager, scrollyManagers);
            }, CONFIG.DEBOUNCE_DELAY);

            window.addEventListener('resize', debouncedResize);

            // Cleanup on page unload
            window.addEventListener('beforeunload', () => {
                if (videoManager) {
                    videoManager.destroy();
                }
            });

            console.log('🚀 App initialization complete!');

        } catch (error) {
            console.error('❌ Error during app initialization:', error);
            console.error('❌ Error stack:', error.stack);
        }
    });
}).catch(error => {
    console.error('❌ Error waiting for dependencies:', error);
    console.error('❌ Error stack:', error.stack);
});

