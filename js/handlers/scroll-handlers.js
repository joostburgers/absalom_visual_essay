import { CONFIG, currentCharactersStep, currentEventsStep, setCurrentCharactersStep, setCurrentEventsStep } from '../config/app-config.js';


// Scrollama has its own set of step handlers for scrolling up and down the page and keeping track of which step is active. The possibility of "clicking" through the steps using the buttons under the chart required additional step handlers. These step handlers need to be aware of whether the user has recently clicked a button to navigate to a specific step, in which case the scroll handlers should not trigger any updates. This is managed through the ProgressManager class, which tracks recent tile clicks and suppresses scroll events accordingly.


export function handleCharactersStepEnter(response, progressManager, updateChartHighlighting, updateLegendHighlighting) {
    
    if (progressManager && progressManager.wasRecentTileClick('characters')) {
        console.log('Characters scroll handler ignored due to recent tile click');
        return;
    }

    // Only update if we're not already at this step
    if (currentCharactersStep === response.index) {
          return;
    }

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

    if (progressManager && progressManager.wasRecentTileClick('events')) {
        console.log('🚫 Events scroll handler suppressed due to recent tile click/navigation');
        return;
    }



    // Check if we're already at this step
    if (currentEventsStep === response.index) {
        console.log('Events step already at target, skipping scroll update');
        return;
    }

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

//The piecharts and the event chart work along many of the same principles and are setup here through one unified scroll. The language chart ended up being too much of an edge case to include here.
export function setupUnifiedScrolly(chartElements, scrollyManagers, progressManager, eventsChartManager, updateChartHighlighting, updateLegendHighlighting) {
    // Characters section scrolly
    if (chartElements.scrolly) {
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
    if (chartElements.eventsScrolly) {
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