import { CONFIG, currentCharactersStep, currentEventsStep, setCurrentCharactersStep, setCurrentEventsStep } from '../config/app-config.js';

export function handleCharactersStepEnter(response, progressManager, updateChartHighlighting, updateLegendHighlighting) {
    // ENHANCED: Section-specific debouncing
    if (progressManager && progressManager.wasRecentTileClick('characters')) {
        console.log('Characters scroll handler ignored due to recent tile click');
        return;
    }

    console.log(`Characters scroll handler: response.index=${response.index}, currentCharactersStep=${currentCharactersStep}`);

    // Only update if we're not already at this step
    if (currentCharactersStep === response.index) {
        console.log('Characters step already at target, skipping scroll update');
        return;
    }

    console.log(`Updating characters from scroll: ${currentCharactersStep} -> ${response.index}`);
    //  FIXED: Use setter function instead of direct assignment
    setCurrentCharactersStep(response.index);

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

export function handleEventsStepEnter(response, progressManager, eventsChartManager) {
    // ✅ ENHANCED: More comprehensive scroll suppression
    if (progressManager && progressManager.wasRecentTileClick('events')) {
        console.log('🚫 Events scroll handler suppressed due to recent tile click/navigation');
        return;
    }

    console.log(`Events scroll handler: response.index=${response.index}, currentEventsStep=${currentEventsStep}`);

    // ✅ ENHANCED: Check if we're already at this step
    if (currentEventsStep === response.index) {
        console.log('Events step already at target, skipping scroll update');
        return;
    }

    console.log(`✅ Updating events from scroll: ${currentEventsStep} -> ${response.index}`);
    setCurrentEventsStep(response.index);

    // Rest of the handler logic...
    const eventsStepTexts = document.querySelectorAll('#event-scrolly .step-text');
    eventsStepTexts.forEach(text => text.classList.remove('active'));

    const activeEventsText = document.querySelector(`#event-scrolly .step-text[data-step="${response.index}"]`);
    if (activeEventsText) {
        activeEventsText.classList.add('active');
    }

    if (eventsChartManager && eventsChartManager.chartReady) {
        eventsChartManager.createChart(response.index);
    }

    if (progressManager) {
        progressManager.updateProgress('events', response.index);
    }
}

export function setupUnifiedScrolly(chartElements, scrollyManagers, progressManager, eventsChartManager, updateChartHighlighting, updateLegendHighlighting) {
    // Characters section scrolly
    if (chartElements.scrolly && chartElements.scrolly.node()) {
        const charactersScroller = scrollama();
        charactersScroller
            .setup({
                step: "#characters-scrolly .scroll-triggers .step",
                offset: CONFIG.SCROLLAMA.OFFSET,
                debug: CONFIG.SCROLLAMA.DEBUG
            })
            .onStepEnter((response) => handleCharactersStepEnter(response, progressManager, updateChartHighlighting, updateLegendHighlighting));

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
            .onStepEnter((response) => handleEventsStepEnter(response, progressManager, eventsChartManager));

        scrollyManagers.set('events', eventsScroller);
    }
}