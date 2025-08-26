
import { CHART_CONFIGS } from '../config/chart-configs.js';
import { faulknerChartStyles } from '../config/faulkner-chart-styles.js';

// ==========================================================================
// EVENTS CHART FUNCTIONALITY
// ==========================================================================

//This extensive class deals with the event charts, which visualize the chronology of events in Absalom, Absalom! and Sutpen's life. It includes data processing, trace creation, frame building, layout configuration, and animation handling. As the unique juxtaposition of charts did not conform to Plotly's native animation capabilities, a custom animation system was developed to handle the transitions between different chart states. This includes fading in traces with staggered delays to create a smooth visual effect. The class also includes robust error handling and validation to ensure data integrity and user feedback in case of issues.

export class EventsChartManager {
	// Data field mappings for processing

	static ANIMATION_CONFIG = {
		STAGGER_DELAY: 80,
		ANIMATION_STEPS: 8,
		STEP_DURATION: 50
	};

	static DATE_AXIS_CONFIG = {
		TICK_VALUES: [1800, 1820, 1840, 1860, 1880, 1900, 1920],
		TICK_TEXT: ['1800', '1820', '1840', '1860', '1880', '1900', '1920'],
		RANGE: [1800, 1920]
	};






	static FIELD_MAPPINGS = {
		'absalom_startdate': (d) => d['absalom_startdate'],
		'absalom_summary': (d) => d['absalom_summary'],
		'absalom_y_narrated': (d) => parseInt(d['absalom_y_narrated']) || null,
		'absalom_y_told': (d) => parseInt(d['absalom_y_told']) || null,
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
		'sutpen_label': (d) => d['sutpen_label'],
		'textposition_sutpen_plot': (d) => d['textposition_sutpen_plot'],
		'textposition_sutpen_story': (d) => d['textposition_sutpen_story'],
		'absalom_pagenumber': (d) => parseInt(d['absalom_pagenumber']) || null,
		'absalom_sentence_words': (d) => d['absalom_sentence_words'],
		'absalom_orderwithinpage': (d) => parseInt(d['absalom_orderwithinpage']) || null,
		'absalom_major_event_date': (d) => d['absalom_major_event_date']
	};

	

	
	createSutpenFrames(data, layouts) {
		const { x_sutpen_plot, x_sutpen_story, y_sutpen, sutpen_label, textposition_sutpen_plot, textposition_sutpen_story } = data;

		const frame0 = {
			name: 'frame0',
			data: [
				this.createTextTrace(
					x_sutpen_plot, y_sutpen, sutpen_label,
					textposition_sutpen_plot, this.scatterPlotColors[0],
					"Major Events"
				)
			],
			layout: layouts.sutpen_plot
		};

		return [
			frame0,
			{
				name: 'frame1',
				data: [
					this.createTextTrace(
						x_sutpen_story, y_sutpen, sutpen_label,
						textposition_sutpen_story, this.scatterPlotColors[0],
						"Major Events"
					)
				],
				layout: layouts.sutpen_story
			}
		];
	}


	createCombinedAndDateFrames(data, layouts) {
		const {
			absalom_x_story, absalom_x_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
			absalom_major_event, absalom_label, absalom_textposition_plot,
			absalom_startdate, absalom_startdate_decimal,
			absalom_major_event_date, absalom_major_event_date_decimal,
			absalom_pagenumber
		} = data;

		return [
			// ... rest unchanged
		];
	}

	constructor() {
		this.chartReady = false;
		this.lastAnimatedStep = -1;
		this.animationInProgress = false;
		this.hoverstring = [];

		this.currentAnimationId = null;
		this.pendingAnimations = new Set();

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

	// ========== TRACE BUILDER METHODS ==========
	createTrace(type, x, y, color, name, options = {}) {
		const isTextTrace = type === 'text';
		const defaults = {
			size: isTextTrace ? CHART_CONFIGS.EVENTS.MARKER_SIZES.LARGE : CHART_CONFIGS.EVENTS.MARKER_SIZES.SMALL,
			opacity: isTextTrace ? CHART_CONFIGS.EVENTS.OPACITIES.HIGH : CHART_CONFIGS.EVENTS.OPACITIES.MEDIUM,
			visible: true,
			useGrayBorder: !isTextTrace,
			hoverTemplate: isTextTrace ? "<b>Major Event: </b>%{text}<extra></extra>" : this.hoverstring,
			...options
		};

		const trace = {
			type: "scatter",
			mode: isTextTrace ? "markers+text" : "markers",
			x, y, name,
			visible: defaults.visible,
			marker: {
				color,
				opacity: defaults.opacity,
				size: defaults.size,
				line: {
					width: 1,
					color: defaults.useGrayBorder ? 'rgba(88, 88, 88, 0.26)' : color
				}
			},
			hovertemplate: defaults.hoverTemplate
		};

		if (isTextTrace) {
			trace.text = options.text;
			trace.textposition = options.textposition;
		}

		if (defaults.customdata) {
			trace.customdata = defaults.customdata;
			trace.meta = defaults.meta || [];
		}

		return trace;
	}

	// Then simplify the existing methods:
	createMarkerTrace(x, y, color, name, options = {}) {
		return this.createTrace('marker', x, y, color, name, options);
	}

	createTextTrace(x, y, text, textposition, color, name, options = {}) {
		return this.createTrace('text', x, y, color, name, {
			...options,
			text,
			textposition
		});
	}

	// ========== DATA PROCESSING ==========
	createHoverStrings(data) {
		const { absalom_sentence_words, absalom_startdate, absalom_pagenumber, absalom_orderwithinpage, absalom_summary } = data;

		this.hoverstring = absalom_sentence_words.map((_, i) =>
			`<b>Page: </b>${absalom_pagenumber[i]} <b>Event on page: </b>${absalom_orderwithinpage[i]}<br>` +
			`<b>First Words: </b>${absalom_sentence_words[i]}<br>` +
			`<b>Summary: </b>${absalom_summary[i]}<extra></extra>`
		);
	}

	processData(response) {
		const data = $.csv.toObjects(response, { headers: true });
		const plotData = {};


		Object.entries(EventsChartManager.FIELD_MAPPINGS).forEach(([key, transformer]) => {
			plotData[key] = data.map(transformer);
		});

		plotData['absalom_startdate_decimal'] = data.map(d => this.convertDateToDecimalYear(d['absalom_startdate']));
		plotData['absalom_major_event_date_decimal'] = data.map(d => this.convertDateToDecimalYear(d['absalom_major_event_date']));

		return plotData;
	}

	//========== DATE CONVERSION ==========
	//This function was created to handle a glitch in how Plotly evaluates values on the y-axis. Essentially, in skipping between date values and integer values, plotly forces date values on integer values causing strange output. This converts all date values to decimal years, which Plotly can handle more gracefully.

	convertDateToDecimalYear(dateString) {
		if (!dateString) return null;

		const date = new Date(dateString);
		if (isNaN(date)) return null;

		const year = date.getFullYear();
		const startOfYear = new Date(year, 0, 1);
		const endOfYear = new Date(year + 1, 0, 1);
		const yearDuration = endOfYear - startOfYear;
		const daysSinceStartOfYear = date - startOfYear;

		return year + (daysSinceStartOfYear / yearDuration);
	}

	// ========== FRAME BUILDERS ==========
	createSutpenFrames(data, layouts) {
		const { x_sutpen_plot, x_sutpen_story, y_sutpen, sutpen_label, textposition_sutpen_plot, textposition_sutpen_story } = data;

		const frame0 = {
			name: 'frame0',
			data: [
				this.createTextTrace(
					x_sutpen_plot, y_sutpen, sutpen_label,
					textposition_sutpen_plot, this.scatterPlotColors[0],
					"Major Events"
				),
			
			],
			layout: layouts.sutpen_plot
		};


		return [
			frame0,
			{
				name: 'frame1',
				data: [
					this.createTextTrace(
						x_sutpen_story, y_sutpen, sutpen_label,
						textposition_sutpen_story, this.scatterPlotColors[0],
						"Major Events"
					),
					
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
					
				],
				layout: layouts.absalom_narrated
			},

			// Frame 4: Narrated + Told
			{
				name: 'frame4',
				data: [
					this.createMarkerTrace(
						absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
						"Narrated", { opacity: CHART_CONFIGS.EVENTS.OPACITIES.LOW }
					),
					this.createMarkerTrace(
						absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
						"Told"
					),
					
				],
				layout: layouts.absalom_narrated_told
			},

			// Frame 5: Narrated + Told + Other
			{
				name: 'frame5',
				data: [
					this.createMarkerTrace(
						absalom_x_plot, absalom_y_narrated, this.scatterPlotColors[2],
						"Narrated", { opacity: CHART_CONFIGS.EVENTS.OPACITIES.LOW }
					),
					this.createMarkerTrace(
						absalom_x_plot, absalom_y_told, this.scatterPlotColors[3],
						"Told", { opacity: CHART_CONFIGS.EVENTS.OPACITIES.LOW }
					),
					this.createMarkerTrace(
						absalom_x_plot, absalom_y_other, this.scatterPlotColors[4],
						"Other"
					),
				
				],
				layout: layouts.absalom_narrated_told_other
			}
		];
	}

	createCombinedAndDateFrames(data, layouts) {
		const {
			absalom_x_story, absalom_x_plot, absalom_y_narrated, absalom_y_told, absalom_y_other,
			absalom_major_event, absalom_label, absalom_textposition_plot,
			absalom_startdate, absalom_startdate_decimal,
			absalom_major_event_date, absalom_major_event_date_decimal,
			absalom_pagenumber
		} = data;



		return [
			// Frame 6: Story Order with Major Events
			{
				name: 'frame6',
				data: [
					this.createMarkerTrace(
						absalom_x_story, absalom_y_narrated, this.scatterPlotColors[2],
						"Narrated", { opacity: CHART_CONFIGS.EVENTS.OPACITIES.LOW }
					),
					this.createMarkerTrace(
						absalom_x_story, absalom_y_told, this.scatterPlotColors[3],
						"Told", { opacity: CHART_CONFIGS.EVENTS.OPACITIES.LOW }
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
						absalom_x_plot, absalom_startdate_decimal, this.scatterPlotColors[5],
						"Date Order",
						{
							customdata: absalom_startdate, // Pass original dates
							meta: absalom_pagenumber       // Pass page numbers
						}
					),
					this.createTextTrace(
						absalom_x_plot, absalom_major_event_date_decimal, absalom_label,
						absalom_textposition_plot, this.scatterPlotColors[0],
						"Major Events",
						{
							customdata: absalom_major_event_date,
							hoverTemplate: "<b>Date: </b>%{customdata}<br><b>Major Event: </b>%{text}<extra></extra>"
						}
					),
				
				],
				layout: layouts.absalom_date
			},

			// Frame 8: Date Order (Story)
			{
				name: 'frame8',
				data: [
					this.createMarkerTrace(
						absalom_x_story, absalom_startdate_decimal, this.scatterPlotColors[5],
						"Date Order"
					),
					this.createTextTrace(
						absalom_x_story, absalom_major_event_date_decimal, absalom_label,
						absalom_textposition_plot, this.scatterPlotColors[0],
						"Major Events",
						{
							customdata: absalom_major_event_date,
							hoverTemplate: "<b>Date: </b>%{customdata}<br><b>Major Event: </b>%{text}<extra></extra>"
						}
					),
					//this.createInvisibleTrace(),
					//this.createInvisibleTrace()
				],
				layout: layouts.absalom_date
			}
		];
	}

	// ========== MAIN FRAME CREATION ==========
	createFrames(data, layouts) {
		// Store hover strings for trace builders
		this.hoverstring = data.hoverstring || this.hoverstring;

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

		// Helper to create standard Absalom layout base
		const createAbsalomBase = (title) => ({
			...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
			title: { text: title },
			showlegend: true,
			legend: { title: { text: "Legend" } },
			xaxis: this.createAxisConfig("Chapter", absalom_x_tickvals, absalom_x_range, absalom_x_ticktext)
		});

		// Helper for standard chronology yaxis
		const createChronologyYAxis = (tickvals, range) => ({
			...this.createAxisConfig("Chronology", tickvals, range),
			type: 'linear'
		});

		// Helper for flexible chronology yaxis (used in multiple Absalom charts)
		const createFlexibleYAxis = (tickvals, range) => ({
			...this.createAxisConfig("Chronology", tickvals, range),
			type: 'linear',
			autotick: true,
			tickformat: '',
			tickmode: 'array',
			dtick: null
		});

		return {
			// Sutpen layouts (simpler, keep as-is)
			sutpen_plot: {
				...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
				title: { text: "Major Events in Sutpen's Life in Plot Order" },
				xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
				yaxis: createChronologyYAxis(sutpen_y_tickvals, sutpen_y_range)
			},
			sutpen_story: {
				...CHART_CONFIGS.EVENTS_LAYOUT_BASE,
				title: { text: "Major Events in Sutpen's Life in Story Order" },
				xaxis: this.createAxisConfig("Chapter", sutpen_x_tickvals, sutpen_x_range),
				yaxis: createChronologyYAxis(sutpen_y_tickvals, sutpen_y_range)
			},

			// Absalom layouts with explicit configurations
			absalom_plot: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> in Plot Order"),
				yaxis: createChronologyYAxis(absalom_y_tickvals, absalom_y_range)
			},
			absalom_narrated: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> Narrated Events"),
				yaxis: createFlexibleYAxis(absalom_y_tickvals, absalom_y_range)
			},
			absalom_narrated_told: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> Narrated and Told Events"),
				yaxis: createFlexibleYAxis(absalom_y_tickvals, absalom_y_range)
			},
			absalom_narrated_told_other: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> Narrated, Told, and Other Events"),
				yaxis: createFlexibleYAxis(absalom_y_tickvals, absalom_y_range)
			},
			absalom_story: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> in Story Order with Major Events"),
				yaxis: createFlexibleYAxis(absalom_y_tickvals, absalom_y_range)
			},

			// Date layout is unique, keep explicit
			absalom_date: {
				...createAbsalomBase("<i>Absalom, Absalom!</i> in Date Order"),
				yaxis: {
					title: { text: "Date" },
					type: 'linear',
					showgrid: false,
					tickmode: 'array',
					tickvals: EventsChartManager.DATE_AXIS_CONFIG.TICK_VALUES,
					ticktext: EventsChartManager.DATE_AXIS_CONFIG.TICK_TEXT,
					range: EventsChartManager.DATE_AXIS_CONFIG.RANGE,
					zeroline: false
				}
			}
		};
	}
	// 
	createChart(stepIndex) {
		console.log(`🔄 Chart creation requested for step ${stepIndex}`);

		// CANCEL any in-progress animations
		this.cancelCurrentAnimations();

		if (!this.chartReady) {
			console.log('Chart creation skipped - chart not ready');
			return;
		}

		
		this.animationInProgress = true;
		this.currentAnimationId = Date.now(); //  Store the ID once
		const animationId = this.currentAnimationId; //  Use this stored value for comparisons

		// Get the frame data
		const frameData = this.frames?.find(frame => frame.name === `frame${stepIndex}`);

		if (!frameData) {
			console.error(`Frame data for step ${stepIndex} not found`);
			this.animationInProgress = false;
			return;
		}

		

		// Create chart with invisible traces
		const invisibleData = frameData.data.map(trace => {
			if (trace.visible === false) return trace;

			const invisibleTrace = {
				...trace,
				opacity: 0
			};

			if (trace.marker) {
				invisibleTrace.marker = {
					...trace.marker,
					opacity: 0
				};
			}

			return invisibleTrace;
		});

		// Create the chart with invisible traces
		Plotly.react('plotchart', invisibleData, frameData.layout, {
			responsive: true,
			displayModeBar: false
		}).then(() => {
			// Use stored animationId for comparison
			if (this.currentAnimationId !== animationId) {
				console.log('🚫 Animation cancelled before fade-in started');
				return Promise.reject('Animation cancelled');
			}

			// STEP 2: Animate traces to visible (fade-in effect)
			return this.animateTracesFadeIn(frameData.data, animationId); //  Pass the stored ID
		}).then(() => {
			//  FIXED: Use stored animationId for comparison
			if (this.currentAnimationId === animationId) {
				this.lastAnimatedStep = stepIndex;
				this.animationInProgress = false;
				console.log(` Chart recreated with fade-in for step ${stepIndex}`);
			}
		}).catch(error => {
			if (error !== 'Animation cancelled') {
				console.error('Chart creation error:', error);
			}
			this.animationInProgress = false;
		});
	}

	// Less aggressive cancellation - only cancel if really needed
	cancelCurrentAnimations() {
		if (this.pendingAnimations.size > 0) {
			console.log(`🚫 Cancelling ${this.pendingAnimations.size} pending animation(s)`);

			// Cancel all pending setTimeout calls
			this.pendingAnimations.forEach(timeoutId => {
				clearTimeout(timeoutId);
			});
			this.pendingAnimations.clear();
		}

		// Only reset if there was actually something to cancel
		if (this.currentAnimationId) {
			this.currentAnimationId = null;
		}

		this.animationInProgress = false;
	}

	// FIXED: Use the passed animationId consistently
	async animateTracesFadeIn(originalData, animationId) {
		const { STAGGER_DELAY, ANIMATION_STEPS, STEP_DURATION } = EventsChartManager.ANIMATION_CONFIG;

		for (let i = 0; i < originalData.length; i++) {
			const trace = originalData[i];
			if (trace.visible === false) continue;

			// Use passed animationId
			if (this.currentAnimationId !== animationId) {
				console.log('🚫 Trace animation cancelled during loop');
				return Promise.reject('Animation cancelled');
			}

			// Start each trace animation with stagger delay
			const timeoutId = setTimeout(() => {
				// Use passed animationId
				if (this.currentAnimationId !== animationId) {
					console.log('🚫 Trace animation timeout cancelled');
					return;
				}

				
				this.smoothFadeTrace(i, trace, ANIMATION_STEPS, STEP_DURATION, animationId);

				// Remove from pending set
				this.pendingAnimations.delete(timeoutId);
			}, i * STAGGER_DELAY);

			// Track this timeout so we can cancel it if needed
			this.pendingAnimations.add(timeoutId);
		}

		// Wait for all animations to complete
		const totalTime = (originalData.length - 1) * STAGGER_DELAY + (ANIMATION_STEPS * STEP_DURATION);
		return new Promise(resolve => {
			const finalTimeoutId = setTimeout(() => {
				this.pendingAnimations.delete(finalTimeoutId);
				resolve();
			}, totalTime);
			this.pendingAnimations.add(finalTimeoutId);
		});
	}

	// Use passed animationId consistently
	smoothFadeTrace(traceIndex, trace, steps, stepDuration, animationId) {
		const targetOpacity = 1;
		const targetMarkerOpacity = trace.marker?.opacity || 1;

		for (let step = 1; step <= steps; step++) {
			const timeoutId = setTimeout(() => {
				// Use passed animationId
				if (this.currentAnimationId !== animationId) {
					console.log('🚫 Smooth fade step cancelled');
					return;
				}

				// Calculate smooth progress (ease-out)
				const progress = step / steps;
				const smoothProgress = 1 - Math.pow(1 - progress, 2);

				const currentOpacity = smoothProgress * targetOpacity;
				const currentMarkerOpacity = smoothProgress * targetMarkerOpacity;

				const updates = {
					'opacity': currentOpacity
				};

				if (trace.marker) {
					updates['marker.opacity'] = currentMarkerOpacity;
				}

				Plotly.restyle('plotchart', updates, [traceIndex]);

				// Remove from pending set
				this.pendingAnimations.delete(timeoutId);
			}, step * stepDuration);

			// Track this timeout
			this.pendingAnimations.add(timeoutId);
		}
	}

	// Cleanup method
	destroy() {
		this.cancelCurrentAnimations(); // Cancel animations before destroying

		if (this.chartReady) {
			Plotly.purge('plotchart');
		}
		this.chartReady = false;
		this.lastAnimatedStep = -1;
		this.animationInProgress = false;
		this.hoverstring = null;
	}

	reset() {
		this.cancelCurrentAnimations(); //  Cancel animations on reset
		this.lastAnimatedStep = -1;
		this.animationInProgress = false;
	}

	// ========== MAIN PLOTLY CREATION ==========
	async makePlotly(data) {
		try {
			this.validateData(data);

			// Data extraction
			const {
				x_sutpen_plot, y_sutpen, x_sutpen_story, textposition_sutpen_plot,
				sutpen_label, textposition_sutpen_story, absalom_y_all, absalom_x_plot,
				absalom_x_story, absalom_label, absalom_textposition_plot,
				absalom_y_narrated, absalom_y_told, absalom_y_other, absalom_major_event,
				absalom_summary, absalom_startdate, absalom_sentence_words,
				absalom_pagenumber, absalom_orderwithinpage, absalom_major_event_date,
				absalom_startdate_decimal, absalom_major_event_date_decimal
			} = data;


			const { TICK_VALUES, CHART_RANGES, OPACITIES, MARKER_SIZES } = CHART_CONFIGS.EVENTS;

			// Create hover strings
			this.createHoverStrings(data);




			const plotData = [{
				type: "scatter",
				mode: "markers+text",
				x: x_sutpen_plot,
				y: y_sutpen,
				marker: {
					color: this.scatterPlotColors[0],
					opacity: OPACITIES.HIGH,
					size: MARKER_SIZES.LARGE,
					line: {
						width: 1,
						color: this.scatterPlotColors[0]
					}
				},
				text: sutpen_label,
				textposition: textposition_sutpen_plot
			}];
			const layouts = this.createLayouts(
				TICK_VALUES.SUTPEN_X, TICK_VALUES.SUTPEN_Y, CHART_RANGES.SUTPEN_X, CHART_RANGES.SUTPEN_Y,
				TICK_VALUES.ABSALOM_X, TICK_VALUES.ABSALOM_X_TEXT, CHART_RANGES.ABSALOM_X,
				TICK_VALUES.ABSALOM_Y, CHART_RANGES.ABSALOM_Y
			);

			await Plotly.newPlot('plotchart', {
				data: plotData,
				layout: layouts.sutpen_plot,
				config: {
					responsive: true,
					displayModeBar: false
				}
			});

			this.frames = this.createFrames(data, layouts);

			this.chartReady = true;

		} catch (error) {
			console.error('Error setting up events chart:', error);
			this.chartReady = false;
			throw error;
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


}