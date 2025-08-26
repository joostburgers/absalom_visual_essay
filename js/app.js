import { CONFIG } from './config/app-config.js';
import { waitForDependencies, debounce } from './utils/chart-utilities.js';
import { cacheElements, calculateColorMappings, handleResize } from './utils/dom-utilities.js';
import { EventsChartManager } from './managers/events-chart-manager.js';
import { VideoManager } from './managers/video-manager.js';
import { LanguageChartsManager } from './managers/language-chart-manager.js';
import { ScrollytellProgressManager } from './managers/scrollytell-manager.js';
import { initializeCharts, createLegend, createSunburstPlot, updateChartHighlighting, updateLegendHighlighting } from './managers/character-chart-manager.js';
import { setupUnifiedScrolly } from './handlers/scroll-handlers.js';
import { TOCManager } from './managers/toc-manager.js';

waitForDependencies().then(() => {
    $(function () {
        try {
            // Initialize shared state
            const scrollyManagers = new Map();
            let animationTimeouts = [];
            let cachedLegendSpans = null;

            // Cache DOM elements and calculate colors
            const chartElements = cacheElements();
            const colorMappings = calculateColorMappings();

            // Initialize all managers
            const eventsChartManager = new EventsChartManager();
            const videoManager = new VideoManager();
            const progressManager = new ScrollytellProgressManager();
            const languageChartsManager = new LanguageChartsManager();
            const tocManager = new TOCManager();

            // Create wrapper functions
            const updateChartHighlightingWithDeps = (stepIndex) => {
                updateChartHighlighting(stepIndex, colorMappings, animationTimeouts);
            };

            const updateLegendHighlightingWithDeps = (stepIndex) => {
                // Get cachedLegendSpans from the TOCManager instance
                const legendSpans = tocManager.cachedLegendSpans;
                updateLegendHighlighting(stepIndex, legendSpans);
            };

            // Initialize TOC with dependencies
            tocManager.init({
                chartElements,
                colorMappings,
                eventsChartManager,
                languageChartsManager,
                initializeCharts,
                createLegend,
                createSunburstPlot
            });

            // Initialize other managers
            videoManager.init();
            progressManager.init();

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

            console.log(' App initialization complete');

        } catch (error) {
            console.error('❌ Error during app initialization:', error);
            console.error('❌ Error stack:', error.stack);
        }
    });
}).catch(error => {
    console.error('❌ Error waiting for dependencies:', error);
    console.error('❌ Error stack:', error.stack);
});