import { CONFIG, setCurrentCharactersStep, setCurrentEventsStep, currentCharactersStep, currentEventsStep } from '../config/app-config.js';


export class ScrollytellProgressManager {
    constructor() {
        this.sections = new Map();
        this.initialized = false;
        this.clickHandlers = new Map();
        // IMPROVED: Use longer cooldown for events due to animation complexity
        this.lastTileClickTime = 0;
        this.tileClickCooldown = 500; // Increased to 500ms for events
        this.lastClickedSection = null; // Track which section was clicked
    }

    init() {
        if (this.initialized) return;

        // Initialize Characters section
        this.setupSection('characters', {
            totalSteps: CONFIG.SCROLLYTELL.CHARACTERS_STEPS,
            tilesContainer: document.getElementById('characters-progress-tiles')
        });

        // Initialize Events section
        this.setupSection('events', {
            totalSteps: CONFIG.SCROLLYTELL.EVENTS_STEPS,
            tilesContainer: document.getElementById('events-progress-tiles')
        });

        this.initialized = true;

    }

    setupSection(sectionName, config) {
        if (!config.tilesContainer) {
            console.warn(`Missing tiles container for ${sectionName} progress tracking`);
            return;
        }

        // Store section config
        this.sections.set(sectionName, {
            ...config,
            currentStep: 1
        });

        // Create progress tiles with click handlers
        this.createProgressTiles(sectionName, config);

        // Set initial progress (step 1)
        this.updateProgress(sectionName, 0);
    }

    createProgressTiles(sectionName, config) {
        if (!config.tilesContainer) return;

        const fragment = document.createDocumentFragment();
        const clickHandlers = [];

        for (let i = 1; i <= config.totalSteps; i++) {
            const tile = document.createElement('div');
            tile.className = 'progress-tile';
            tile.setAttribute('data-step', i);
            tile.setAttribute('data-section', sectionName);
            tile.setAttribute('aria-label', `Go to step ${i} of ${config.totalSteps}`);
            tile.setAttribute('role', 'button');
            tile.setAttribute('tabindex', '0');
            tile.title = `Jump to step ${i}`;

            // Create click handler for this tile
            const clickHandler = (event) => {
                event.preventDefault();
                event.stopPropagation();

                const targetStep = parseInt(tile.getAttribute('data-step'));
                const section = tile.getAttribute('data-section');


                this.navigateToStep(section, targetStep - 1); // Convert to 0-based index
            };

            // Add click and keyboard listeners
            tile.addEventListener('click', clickHandler);
            tile.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    clickHandler(event);
                }
            });

            // Store handlers for cleanup
            clickHandlers.push({ tile, handler: clickHandler });
            fragment.appendChild(tile);
        }

        // Store click handlers for this section
        this.clickHandlers.set(sectionName, clickHandlers);
        config.tilesContainer.appendChild(fragment);
    }

    // ENHANCED: More sophisticated navigation with section-specific handling
    navigateToStep(sectionName, targetStepIndex) {
        console.log(`Navigating to ${sectionName} step ${targetStepIndex + 1}`);

        // Record tile click time and section for section-specific debouncing
        this.lastTileClickTime = Date.now();
        this.lastClickedSection = sectionName;

        //  FIXED: Use setter functions instead of direct assignment
        if (sectionName === 'characters') {
            setCurrentCharactersStep(targetStepIndex);
            console.log(`Set currentCharactersStep to: ${currentCharactersStep}`);
        } else if (sectionName === 'events') {
            setCurrentEventsStep(targetStepIndex);
            console.log(`Set currentEventsStep to: ${currentEventsStep}`);
        }

        // Update progress immediately
        this.updateProgress(sectionName, targetStepIndex);

        // Trigger the appropriate chart/text updates
        if (sectionName === 'characters') {
            this.triggerCharactersStep(targetStepIndex);
        } else if (sectionName === 'events') {
            this.triggerEventsStep(targetStepIndex);
        }

        // Use INSTANT scroll to avoid triggering intermediate scroll events
        this.scrollToSectionInstant(sectionName, targetStepIndex);
    }

    // ENHANCED: Section-aware debouncing
    wasRecentTileClick(sectionName = null) {
        const timeSinceClick = Date.now() - this.lastTileClickTime;
        const isRecent = timeSinceClick < this.tileClickCooldown;

        // If section-specific check requested, also verify it matches
        if (sectionName && this.lastClickedSection) {
            return isRecent && (this.lastClickedSection === sectionName);
        }

        return isRecent;
    }

    triggerCharactersStep(stepIndex) {
        // Update step text
        const stepTexts = document.querySelectorAll('#characters-scrolly .step-text');
        stepTexts.forEach(text => text.classList.remove('active'));

        const activeText = document.querySelector(`#characters-scrolly .step-text[data-step="${stepIndex}"]`);
        if (activeText) {
            activeText.classList.add('active');
        }

        // Use the globally exposed functions
        if (window.updateChartHighlighting) {
            window.updateChartHighlighting(stepIndex);
        } else {
            console.warn('updateChartHighlighting not available globally');
        }

        if (window.updateLegendHighlighting) {
            window.updateLegendHighlighting(stepIndex);
        } else {
            console.warn('updateLegendHighlighting not available globally');
        }

        console.log(`Characters step ${stepIndex + 1} activated via tile click`);
    }

    triggerEventsStep(stepIndex) {
        // Update step text
        const eventsStepTexts = document.querySelectorAll('#event-scrolly .step-text');
        eventsStepTexts.forEach(text => text.classList.remove('active'));

        const activeEventsText = document.querySelector(`#event-scrolly .step-text[data-step="${stepIndex}"]`);
        if (activeEventsText) {
            activeEventsText.classList.add('active');
        }

        // Use the globally exposed events chart manager
        if (window.eventsChartManager && window.eventsChartManager.chartReady) {
            window.eventsChartManager.startAnimation(stepIndex);
        } else {
            console.warn('Events chart manager not ready for tile navigation');
        }

        console.log(`Events step ${stepIndex + 1} activated via tile click`);
    }

    // ENHANCED: Better step element targeting for events
    scrollToSectionInstant(sectionName, stepIndex) {
        // For events, be more specific about finding the right step element
        let stepElement;

        if (sectionName === 'events') {
            // Events section uses event-scrolly and might have different structure
            stepElement = document.querySelector(`#event-scrolly .scroll-triggers .step[data-step="${stepIndex}"]`);
        } else {
            // Characters section
            stepElement = document.querySelector(`#${sectionName}-scrolly .scroll-triggers .step[data-step="${stepIndex}"]`);
        }

        if (stepElement) {
            stepElement.scrollIntoView({
                behavior: 'auto', // INSTANT instead of smooth
                block: 'center'
            });
        } else {
            console.warn(`Step element not found for ${sectionName} step ${stepIndex}`);
            // Fallback to section scroll if step element not found
            const sectionElement = document.getElementById(`${sectionName}-scrolly`) ||
                document.getElementById(`event-scrolly`); // Special case for events
            if (sectionElement) {
                sectionElement.scrollIntoView({
                    behavior: 'auto', // INSTANT
                    block: 'center'
                });
            }
        }
    }

    updateProgress(sectionName, stepIndex) {
        const section = this.sections.get(sectionName);
        if (!section) return;

        // Convert to 1-based indexing for display
        const currentStep = stepIndex + 1;

        // Update progress tiles
        if (section.tilesContainer) {
            const tiles = section.tilesContainer.querySelectorAll('.progress-tile');
            tiles.forEach((tile, index) => {
                if (index === stepIndex) {
                    tile.classList.add('active');
                } else {
                    tile.classList.remove('active');
                }
            });
        }

        // Store current step
        section.currentStep = currentStep;

        console.log(`Progress updated for ${sectionName}: Step ${currentStep}/${section.totalSteps}`);
    }

    getSectionProgress(sectionName) {
        const section = this.sections.get(sectionName);
        if (!section) return null;

        return {
            currentStep: section.currentStep,
            totalSteps: section.totalSteps,
            progress: (section.currentStep / section.totalSteps) * 100
        };
    }

    destroy() {
        // Clean up click handlers
        this.clickHandlers.forEach((handlers, sectionName) => {
            handlers.forEach(({ tile, handler }) => {
                tile.removeEventListener('click', handler);
            });
        });

        this.clickHandlers.clear();
        this.sections.clear();
        this.initialized = false;

    }
}