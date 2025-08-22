import { CONFIG, setCurrentCharactersStep, setCurrentEventsStep, currentCharactersStep, currentEventsStep } from '../config/app-config.js';


export class ScrollytellProgressManager {
    constructor() {
        this.sections = new Map();
        this.initialized = false;
        this.clickHandlers = new Map();
        // ✅ IMPROVED: More robust tile click tracking
        this.lastTileClickTime = 0;
        this.tileClickCooldown = 1000; // ✅ Increased to 1 second
        this.lastClickedSection = null;
        this.isNavigatingToStep = false; // ✅ NEW: Flag to indicate active navigation
        this.targetStepIndex = null; // ✅ NEW: Track target step during navigation
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

    // ✅ ENHANCED: Better navigation with proper scroll suppression
    navigateToStep(sectionName, targetStepIndex) {
        console.log(`🎯 TILE NAVIGATION: Jumping to ${sectionName} step ${targetStepIndex + 1}`);

        // ✅ Set navigation flags to suppress scroll handlers
        this.isNavigatingToStep = true;
        this.targetStepIndex = targetStepIndex;
        this.lastTileClickTime = Date.now();
        this.lastClickedSection = sectionName;

        // Update global step immediately
        if (sectionName === 'characters') {
            setCurrentCharactersStep(targetStepIndex);
            console.log(`Set currentCharactersStep to: ${targetStepIndex}`);
        } else if (sectionName === 'events') {
            setCurrentEventsStep(targetStepIndex);
            console.log(`Set currentEventsStep to: ${targetStepIndex}`);
        }

        // Update progress immediately
        this.updateProgress(sectionName, targetStepIndex);

        // Trigger the chart/text updates immediately
        if (sectionName === 'characters') {
            this.triggerCharactersStep(targetStepIndex);
        } else if (sectionName === 'events') {
            this.triggerEventsStep(targetStepIndex);
        }

        // ✅ IMPROVED: Scroll with better timing
        this.scrollToStepWithSuppressionTimeout(sectionName, targetStepIndex);
    }

    // ✅ NEW: Scroll with proper timeout to clear navigation flags
    scrollToStepWithSuppressionTimeout(sectionName, stepIndex) {
        // Do the scroll
        this.scrollToSectionInstant(sectionName, stepIndex);
        
        // ✅ Clear navigation flags after a delay to allow scroll to complete
        setTimeout(() => {
            this.isNavigatingToStep = false;
            this.targetStepIndex = null;
            console.log(`🎯 Navigation to ${sectionName} step ${stepIndex + 1} complete - scroll handlers re-enabled`);
        }, this.tileClickCooldown); // Use the same timeout as debouncing
    }

    // ✅ ENHANCED: Much more robust debouncing
    wasRecentTileClick(sectionName = null) {
        const timeSinceClick = Date.now() - this.lastTileClickTime;
        const isRecent = timeSinceClick < this.tileClickCooldown;
        
        // ✅ IMPROVED: Multiple conditions for suppression
        const shouldSuppress = 
            isRecent || // Recent tile click
            this.isNavigatingToStep || // Currently in navigation
            (sectionName && this.lastClickedSection === sectionName && isRecent); // Section-specific recent click

        if (shouldSuppress) {
            console.log(`🚫 Scroll handler suppressed: recent=${isRecent}, navigating=${this.isNavigatingToStep}, section=${sectionName}`);
        }

        return shouldSuppress;
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
        console.log(`🎯 TILE CLICK: Triggering events step ${stepIndex}`);
        console.log(`🎯 Previous events step was: ${currentEventsStep}`);



        const eventsStepTexts = document.querySelectorAll('#event-scrolly .step-text');
        eventsStepTexts.forEach(text => text.classList.remove('active'));

        const activeEventsText = document.querySelector(`#event-scrolly .step-text[data-step="${stepIndex}"]`);
        if (activeEventsText) {
            activeEventsText.classList.add('active');
        }

        // Use the globally exposed events chart manager
        if (window.eventsChartManager && window.eventsChartManager.chartReady) {
          
            console.log(`🎯 Chart manager last animated step: ${window.eventsChartManager.lastAnimatedStep}`);

            window.eventsChartManager.createChart(stepIndex); // ✅ Changed method name
        } else {
            console.warn('Events chart manager not ready for tile navigation');
        }

        console.log(`Events step ${stepIndex + 1} activated via tile click`);
    }

    // ✅ ENHANCED: Better scroll targeting to avoid intermediate triggers
    scrollToSectionInstant(sectionName, stepIndex) {
        console.log(`🎯 Scrolling to ${sectionName} step ${stepIndex}`);
        
        let stepElement;

        if (sectionName === 'events') {
            stepElement = document.querySelector(`#event-scrolly .scroll-triggers .step[data-step="${stepIndex}"]`);
        } else {
            stepElement = document.querySelector(`#${sectionName}-scrolly .scroll-triggers .step[data-step="${stepIndex}"]`);
        }

        if (stepElement) {
            // ✅ IMPROVED: Use scrollIntoView with more precise timing
            stepElement.scrollIntoView({
                behavior: 'auto', // Instant scroll
                block: 'center',
                inline: 'nearest'
            });
            
            console.log(`✅ Scrolled to step element for ${sectionName} step ${stepIndex}`);
        } else {
            console.warn(`⚠️ Step element not found for ${sectionName} step ${stepIndex}`);
            
            // Fallback to section scroll
            const sectionElement = document.getElementById(`${sectionName}-scrolly`) ||
                document.getElementById(`event-scrolly`);
            if (sectionElement) {
                sectionElement.scrollIntoView({
                    behavior: 'auto',
                    block: 'center'
                });
            }
        }
    }

    // ✅ ENHANCED: Add navigation state to progress updates
    updateProgress(sectionName, stepIndex) {
        const section = this.sections.get(sectionName);
        if (!section) return;

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

        section.currentStep = currentStep;

        const navState = this.isNavigatingToStep ? ' (navigating)' : '';
        console.log(`Progress updated for ${sectionName}: Step ${currentStep}/${section.totalSteps}${navState}`);
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