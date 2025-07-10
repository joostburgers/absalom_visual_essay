import { CONFIG } from '../config/app-config.js';
import { processCSVData } from '../utils/chart-utilities.js';
import { CHART_CONFIGS } from '../config/chart-configs.js';
import { faulknerChartStyles } from '../config/faulkner-chart-styles.js';

// ==========================================================================
// EVENTS CHART FUNCTIONALITY (Refactored and Optimized)
// ==========================================================================
export class EventsChartManager {
    // Data field mappings for processing
    static FIELD_MAPPINGS = {
        'absalom_startdate': (d) => d['absalom_startdate'],
        'absalom_summary': (d) => d['absalom_summary'],
        'absalom_y_narrated': (d) => parseInt(d['absalom_y_narrated']) || null,
        'absalom_y_hypothesized': (d) => parseInt(d['absalom_y_hypothesized']) || null,
        'absalom_y_narratedconsciousness': (d) => parseInt(d['absalom_y_narratedconsciousness']) || null,
        'absalom_y_told': (d) => parseInt(d['absalom_y_told']) || null,
        'absalom_y_remembered': (d) => parseInt(d['absalom_y_remembered']) || null,
        'absalom_y_all': (d) => parseInt(d['absalom_y_all']) || null,
        'absalom_y_other': (d) => parseInt(d['absalom_y_other']) || null,
        'absalom_x_plot': (d) => parseInt(d['absalom_x_plot']) || null,
        'absalom_x_story': (d) => parseInt(d['absalom_x_story']) || null,
        'absalom_textposition_plot': (d) => d['absalom_textposition_plot'],
        'absalom_textposition_story': (d) => d['absalom_textposition_story'],
        'absalom_label': (d) => d['absalom_label'],
        'absalom_major_event': (d) => parseInt(d['absalom_major_event']) || null,
        'x_sutpen_plot': (d) => parseInt(d['x_sutpen_plot']) || null,
        'x_sutpen_story': (d) => parseInt(d['x_sutpen_story']) || null,
        'y_sutpen': (d) => parseInt(d['y_sutpen']) || null,
        'series_sutpen_plot': (d) => d['series_sutpen_plot'],
        'series_sutpen_story': (d) => d['series_sutpen_story'],
        'sutpen_label': (d) => d['sutpen_label'],
        'textposition_sutpen_plot': (d) => d['textposition_sutpen_plot'],
        'textposition_sutpen_story': (d) => d['textposition_sutpen_story'],
        'absalom_pagenumber': (d) => parseInt(d['absalom_pagenumber']) || null,
        'absalom_sentence_words': (d) => d['absalom_sentence_words'],
        'absalom_orderwithinpage': (d) => parseInt(d['absalom_orderwithinpage']) || null,
        'absalom_major_event_date': (d) => d['absalom_major_event_date']
    };

    constructor() {
        this.chartReady = false;
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
        this.hoverstring = [];
       
        this.scatterPlotColors = [
            faulknerChartStyles.colorway[2],
            faulknerChartStyles.colorway[0],
            faulknerChartStyles.colorway[1],
            faulknerChartStyles.colorway[3],
            faulknerChartStyles.colorway[6],
            faulknerChartStyles.colorway[5] // Muted Cyan
        ];
    }

    // ========== VALIDATION & ERROR HANDLING ==========
    validateData(data) {
        const requiredFields = ['x_sutpen_plot', 'y_sutpen', 'sutpen_label'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        return true;
    }

    // ========== ANIMATION HELPERS ==========
    canAnimate(stepIndex) {
        return this.chartReady &&
            this.lastAnimatedStep !== stepIndex &&
            !this.animationInProgress;
    }

    getAnimationConfig(stepIndex) {
        const isSlowStep = (stepIndex > 0 && stepIndex < 3) || stepIndex > 5;
        return {
            duration: isSlowStep ? CONFIG.EVENTS.ANIMATION.FAST_DURATION : 0,
            transition: isSlowStep ?
                [{ duration: CONFIG.EVENTS.ANIMATION.FAST_DURATION, easing: CONFIG.EVENTS.ANIMATION.EASING }] :
                [{ duration: CONFIG.EVENTS.ANIMATION.SLOW_DURATION, easing: CONFIG.EVENTS.ANIMATION.EASING }]
        };
    }

    startAnimation(stepIndex) {
        if (!this.canAnimate(stepIndex)) {
            console.log('Animation skipped:', {
                ready: this.chartReady,
                lastStep: this.lastAnimatedStep,
                currentStep: stepIndex,
                inProgress: this.animationInProgress
            });
            return;
        }

        this.animationInProgress = true;
        this.lastAnimatedStep = stepIndex;

        const currentFrame = 'frame' + stepIndex;
        const { duration, transition } = this.getAnimationConfig(stepIndex);



        Plotly.animate('plotchart', [currentFrame], {
            frame: [{ duration: duration }],
            transition: transition,
            mode: 'afterall',
            ordering: 'traces first',
            redraw: true
        }).then(() => {
            this.animationInProgress = false;
        }).catch(error => {
            console.error('Events chart animation error:', error);
            this.animationInProgress = false;
        });
    }

    // ========== TRACE BUILDER METHODS ==========
    createMarkerTrace(x, y, color, name, options = {}) {
        const defaults = {
            size: CONFIG.EVENTS.MARKER_SIZES.SMALL,
            opacity: CONFIG.EVENTS.OPACITIES.MEDIUM,
            visible: true,
            useGrayBorder: true
        };
        const opts = { ...defaults, ...options };

        return {
            type: "scatter",
            mode: "markers",
            x, y, name,
            visible: opts.visible,
            marker: {
                color,
                opacity: opts.opacity,
                size: opts.size,
                line: {
                    width: 1,
                    color: opts.useGrayBorder ? 'rgba(88, 88, 88, 0.26)' : color
                }
            },
            hovertemplate: this.hoverstring
        };
    }

    createTextTrace(x, y, text, textposition, color, name, options = {}) {
        const defaults = {
            size: CONFIG.EVENTS.MARKER_SIZES.LARGE,
            opacity: CONFIG.EVENTS.OPACITIES.HIGH,
            visible: true,
            hoverTemplate: "<b>Major Event: </b>%{text}<extra></extra>",
            useGrayBorder: false
        };
        const opts = { ...defaults, ...options };

        return {
            type: "scatter",
            mode: "markers+text",
            x, y, text, textposition, name,
            visible: opts.visible,
            marker: {
                size: opts.size,
                color,
                opacity: opts.opacity,
                line: {
                    width: 1,
                    color: opts.useGrayBorder ? 'rgba(88, 88, 88, 0.26)' : color
                }
            },
            hovertemplate: opts.hoverTemplate
        };
    }

    createInvisibleTrace() {
        return { visible: false };
    }

    // ========== DATA PROCESSING ==========
    createHoverStrings(data) {
        const { absalom_sentence_words, absalom_startdate, absalom_pagenumber, absalom_orderwithinpage, absalom_summary } = data;

        this.hoverstring = absalom_sentence_words.map((_, i) => `<b>Date: </b>${absalom_startdate[i]}<br>` +
            `<b>Page: </b>${absalom_pagenumber[i]} <b>Event on page: </b>${absalom_orderwithinpage[i]}<br>` +
            `<b>First Words: </b>${absalom_sentence_words[i]}<br>` +
            `<b>Summary: </b>${absalom_summary[i]}<extra></extra>`
        );
    }

    processData(response) {
        const data = $.csv.toObjects(response, { headers: true });
        const plotData = {};

        // Use field mappings for cleaner processing
        Object.entries(EventsChartManager.FIELD_MAPPINGS).forEach(([key, transformer]) => {
            plotData[key] = data.map(transformer);
        });

        return plotData;
    }

    // ========== FRAME BUILDERS ==========
    createSutpenFrames(data, layouts) {
        const { x_sutpen_plot, x_sutpen_story, y_sutpen, sutpen_label, textposition_sutpen_plot, textposition_sutpen_story } = data;

        return [
            {
                name: 'frame0',
                data: [
                    this.createTextTrace(
                        x_sutpen_plot, y_sutpen, sutpen_label,
                        textposition_sutpen_plot, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.sutpen_plot
            },
            {
                name: 'frame1',
                data: [
                    this.createTextTrace(
                        x_sutpen_story, y_sutpen, sutpen_label,
                        textposition_sutpen_story, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.sutpen_story
            }
        ];
    }

    createAbsalomProgressionFrames(data, layouts) {
        const { absalom_x_plot, absalom_y_all, absalom_major_event, absalom_label, absalom_textposition_plot, absalom_y_narrated, absalom_y_told, absalom_y_other } = data;

        return [
            // Frame 2: All Events + Major Events
            {
                name: 'frame2',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_all, this.scatterPlotColors[1],
                        "All Events", { opacity: 0.3, useGrayBorder: false }
                    ),
                    this.createTextTrace(
                        absalom_x_plot, absalom_major_event, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_plot
            },

            // Frame 3: Narrated Events Only
            {
                name: 'frame3',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated
            },

            // Frame 4: Narrated + Told
            {
                name: 'frame4',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
                        "Told"
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated_told
            },

            // Frame 5: Narrated + Told + Other
            {
                name: 'frame5',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
                        "Told", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_y_other, this.scatterPlotColors[4],
                        "Other"
                    ),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_narrated_told_other
            }
        ];
    }

    createCombinedAndDateFrames(data, layouts) {
        const { absalom_x_story, absalom_x_plot, absalom_y_narrated, absalom_y_told, absalom_y_other, absalom_major_event, absalom_label, absalom_textposition_plot, absalom_startdate, absalom_major_event_date } = data;

        return [
            // Frame 6: Story Order with Major Events
            {
                name: 'frame6',
                data: [
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_narrated, this.scatterPlotColors[2],
                        "Narrated", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_told, this.scatterPlotColors[3],
                        "Told", { opacity: CONFIG.EVENTS.OPACITIES.LOW }
                    ),
                    this.createMarkerTrace(
                        absalom_x_story, absalom_y_other, this.scatterPlotColors[4],
                        "Other"
                    ),
                    this.createTextTrace(
                        absalom_x_story, absalom_major_event, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events", { useGrayBorder: true }
                    )
                ],
                layout: layouts.absalom_story
            },

            // Frame 7: Date Order (Plot)
            {
                name: 'frame7',
                data: [
                    this.createMarkerTrace(
                        absalom_x_plot, absalom_startdate, this.scatterPlotColors[5],
                        "Date Order"
                    ),
                    this.createTextTrace(
                        absalom_x_plot, absalom_major_event_date, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events",
                        { hoverTemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> " }
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_date
            },

            // Frame 8: Date Order (Story)
            {
                name: 'frame8',
                data: [
                    this.createMarkerTrace(
                        absalom_x_story, absalom_startdate, this.scatterPlotColors[5],
                        "Date Order"
                    ),
                    this.createTextTrace(
                        absalom_x_story, absalom_major_event_date, absalom_label,
                        absalom_textposition_plot, this.scatterPlotColors[0],
                        "Major Events",
                        { hoverTemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> " }
                    ),
                    this.createInvisibleTrace(),
                    this.createInvisibleTrace()
                ],
                layout: layouts.absalom_date
            }
        ];
    }

    // ========== MAIN FRAME CREATION ==========
    createFrames(x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
        x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all, absalom_major_event,
        absalom_label, absalom_textposition_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
        absalom_x_story, absalom_startdate, absalom_major_event_date, hoverstring, layouts) {

        // Store hover strings for trace builders
        this.hoverstring = hoverstring;

        // Organize data for frame builders
        const data = {
            x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
            x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all,
            absalom_major_event, absalom_label, absalom_textposition_plot,
            absalom_y_narrated, absalom_y_told, absalom_y_other, absalom_x_story,
            absalom_startdate, absalom_major_event_date
        };

        return [
            ...this.createSutpenFrames(data, layouts),
            ...this.createAbsalomProgressionFrames(data, layouts),
            ...this.createCombinedAndDateFrames(data, layouts)
        ];
    }

    // ========== LAYOUT CREATION ==========
    createAxisConfig(title, tickvals, range, ticktext = null) {
        return {
            showgrid: false,
            title: { text: title },
            autotick: false,
            tickmode: 'array',
            tickvals,
            range,
            zeroline: false,
            ...(ticktext && { ticktext })
        };
    }

    createLayouts(sutpen_x_tickvals, sutpen_y_tickvals, sutpen_x_range, sutpen_y_range,
        absalom_x_tickvals, absalom_x_ticktext, absalom_x_range, absalom_y_tickvals, absalom_y_range) {

        return {
            sutpen_plot: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "Major Events in Sutpen's Life in Plot Order" },
                xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
                yaxis: this.createAxisConfig("Chronology", sutpen_y_tickvals, sutpen_y_range)
            },
            sutpen_story: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "Major Events in Sutpen's Life in Story Order" },
                xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
                yaxis: this.createAxisConfig("Chronology", sutpen_y_tickvals, sutpen_y_range)
            },
            absalom_plot: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> in Plot Order" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range)
            },
            absalom_narrated: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> Narrated Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), autotick: true }
            },
            absalom_narrated_told: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> Narrated and Told Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range)
            },
            absalom_narrated_told_other: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> Narrated, Told, and Other Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), autotick: true }
            },
            absalom_story: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> in Story Order with Major Events" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: { ...this.createAxisConfig("Chronology", absalom_y_tickvals, absalom_y_range), type: 'linear', autotick: true }
            },
            absalom_date: {
                ...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
                title: { text: "<i>Absalom, Absalom!</i> in Date Order" },
                showlegend: true,
                legend: { title: { text: "Legend" } },
                xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext),
                yaxis: {
                    title: { text: "Date" },
                    type: 'date',
                    showgrid: false,
                    tickmode: 'auto',
                    autosize: true,
                    rangemode: 'normal',
                    range: [new Date(1800, 0, 1), new Date(1920, 0, 1)],
                    zeroline: false
                }
            }
        };
    }

    // ========== MAIN PLOTLY CREATION ==========
    async makePlotly(data) {
        try {
            // Validate data first
            this.validateData(data);

            // Use CONFIG constants instead of hardcoded values
            const sutpen_x_tickvals = CONFIG.EVENTS.TICK_VALUES.SUTPEN_X;
            const sutpen_y_tickvals = CONFIG.EVENTS.TICK_VALUES.SUTPEN_Y;
            const sutpen_x_range = CONFIG.EVENTS.CHART_RANGES.SUTPEN_X;
            const sutpen_y_range = CONFIG.EVENTS.CHART_RANGES.SUTPEN_Y;

            const absalom_x_range = CONFIG.EVENTS.CHART_RANGES.ABSALOM_X;
            const absalom_y_range = CONFIG.EVENTS.CHART_RANGES.ABSALOM_Y;
            const absalom_x_tickvals = CONFIG.EVENTS.TICK_VALUES.ABSALOM_X;
            const absalom_x_ticktext = CONFIG.EVENTS.TICK_VALUES.ABSALOM_X_TEXT;
            const absalom_y_tickvals = CONFIG.EVENTS.TICK_VALUES.ABSALOM_Y;

            // Data extraction
            const x_sutpen_plot = data['x_sutpen_plot'];
            const y_sutpen = data['y_sutpen'];
            const x_sutpen_story = data['x_sutpen_story'];
            const textposition_sutpen_plot = data['textposition_sutpen_plot'];
            const sutpen_label = data['sutpen_label'];
            const textposition_sutpen_story = data['textposition_sutpen_story'];
            const absalom_y_all = data['absalom_y_all'];
            const absalom_x_plot = data['absalom_x_plot'];
            const absalom_x_story = data['absalom_x_story'];
            const absalom_label = data['absalom_label'];
            const absalom_textposition_plot = data['absalom_textposition_plot'];
            const absalom_y_narrated = data['absalom_y_narrated'];
            const absalom_y_told = data['absalom_y_told'];
            const absalom_y_other = data['absalom_y_other'];
            const absalom_major_event = data['absalom_major_event'];
            const absalom_summary = data['absalom_summary'];
            const absalom_startdate = data['absalom_startdate'];
            const absalom_sentence_words = data['absalom_sentence_words'];
            const absalom_pagenumber = data['absalom_pagenumber'];
            const absalom_orderwithinpage = data['absalom_orderwithinpage'];
            const absalom_major_event_date = data['absalom_major_event_date'];

            // Create hover strings using new method
            this.createHoverStrings(data);

            // Initial plot data
            const plotData = [{
                type: "scatter",
                mode: "markers+text",
                x: x_sutpen_plot,
                y: y_sutpen,
                marker: {
                    color: this.scatterPlotColors[0],
                    opacity: CONFIG.EVENTS.OPACITIES.HIGH,
                    size: CONFIG.EVENTS.MARKER_SIZES.LARGE,
                    line: {
                        width: 1,
                        color: this.scatterPlotColors[0]
                    }
                },
                text: sutpen_label,
                textposition: textposition_sutpen_plot
            }];

            // Create layouts using Faulkner styles
            const layouts = this.createLayouts(sutpen_x_tickvals, sutpen_y_tickvals, sutpen_x_range, sutpen_y_range,
                absalom_x_tickvals, absalom_x_ticktext, absalom_x_range, absalom_y_tickvals, absalom_y_range);

            // Use Faulkner config
            const config = {
                ...CHART_CONFIGS.PLOTLY,
                responsive: true,
                displayModeBar: false
            };

            // Create the plot
            await Plotly.newPlot('plotchart', {
                data: plotData,
                layout: layouts.sutpen_plot,
                config: config
            });

            // Add empty traces for frame consistency
            await Plotly.addTraces('plotchart', [
                { x: [0, 0], y: [0, 0], visible: false },
                { x: [0, 0], y: [0, 0], visible: false },
                { x: [0, 0], y: [0, 0], visible: false }
            ]);

            // Add all frames using refactored method
            const frames = this.createFrames(x_sutpen_plot, y_sutpen, sutpen_label, textposition_sutpen_plot,
                x_sutpen_story, textposition_sutpen_story, absalom_x_plot, absalom_y_all, absalom_major_event,
                absalom_label, absalom_textposition_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
                absalom_x_story, absalom_startdate, absalom_major_event_date, this.hoverstring, layouts);

            await Plotly.addFrames('plotchart', frames);

            this.chartReady = true;


        } catch (error) {
            console.error('Error setting up events chart:', error);
            this.chartReady = false;
            throw error; // Re-throw for upstream handling
        }
    }

    // ========== PUBLIC API ==========
    makePlot() {
        $.ajax({
            type: "GET",
            url: "data/sutpen_absalom_plot_major_events.csv",
            dataType: "text",
            success: (response) => {
                const allData = this.processData(response);
                this.makePlotly(allData);
            }
        }).done(() => {
            console.log("Events data loaded successfully");
        }).fail(() => {
            console.warn("Events data could not be loaded");
            this.chartReady = false;
        });
    }

    // ========== CLEANUP METHODS ==========
    destroy() {
        if (this.chartReady) {
            Plotly.purge('plotchart');
        }
        this.chartReady = false;
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
        this.hoverstring = null;
    }

    reset() {
        this.lastAnimatedStep = -1;
        this.animationInProgress = false;
    }
}
