var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	var stepH = Math.floor(window.innerHeight * 0.75);
	step.style("height", stepH + "px");

	var figureHeight = window.innerHeight / 2;
	var figureMarginTop = (window.innerHeight - figureHeight) / 2;

	figure
		.style("height", figureHeight + "px")
		.style("top", figureMarginTop + "px");

	// 3. tell scrollama to update new element dimensions
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {


	step.classed("is-active", function (d, i) {
		return i === response.index;
	});

	// update graphic based on step
	startAnimation(response.index);
}

function init() {

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller.setup({
		step: "#scrolly article .step",
		offset: 0.33,
		debug: false
	})
		.onStepEnter(handleStepEnter);
}

// plotly functions

function startAnimation(i) {

	var currentFrame = 'frame' + i;
	var duration = (i > 0 && i < 3) || i > 5 ? 500 : 0;
	var transition = i < 3 || i > 5 ? [{ duration: 500, easing: 'cubic' }] : [{ duration: 200, easing: 'cubic' }];

	Plotly.animate('plotchart', [currentFrame], {
		frame: [{ duration: duration }],
		transition: transition,
		mode: 'afterall',
		ordering: 'traces first',
		redraw: true
	});
}

function makePlotly(data) {

	const scatterPlotColors = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)'
	]

	const plotFont = {
		family: "Georgia",
		size: 14,
		color: '#363636'
	}

	// Chart variables
	const sutpen_x_tickvals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const sutpen_y_tickvals = [1, 2, 3];
	const sutpen_x_range = [0.5, 9];
	const sutpen_y_range = [.5, 3.5];

	const absalom_x_range = [-25, 660];
	const absalom_y_range = [-50, 699];
	const absalom_x_tickvals = [1, 40, 93, 150, 236, 287, 375, 496, 621];
	const absalom_x_ticktext = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const absalom_y_tickvals = [100, 200, 300, 400, 500, 600, 700]
	//Sutpen Variables from frame0 and frame1. These have to be read in as pure arrays rather than arrays in an object. Not sure why, but plotly does not like the object format.
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
	const absalom_eventid = data['absalom_eventid'];
	const absalom_sentence_words = data['absalom_sentence_words'];
	const absalom_pagenumber = data['absalom_pagenumber'];
	const absalom_orderwithinpage = data['absalom_orderwithinpage']
	const absalom_major_event_date = data['absalom_major_event_date'];

	const hoverstring = [];

	for (i = 0; i < absalom_sentence_words.length; i++) {
		hoverstring[i] = "<b>Date: </b> " + absalom_startdate[i] +
			"<br><b>Page: </b> " + absalom_pagenumber[i] + " <b>Event on page: </b>" + absalom_orderwithinpage[i] + "<br><b>First Words: </b>" + absalom_sentence_words[i] +
			"<br><b>Summary: </b>" + absalom_summary[i] + "<extra></extra>"
	}

	var data = [{
		type: "scatter",
		mode: "markers+text",
		x: x_sutpen_plot,
		y: y_sutpen,
		marker:
		{
			color: scatterPlotColors[1],
			opacity: .5,
			size: 20,
			line: {
				width: 1,
				color: 'rgba(88, 88, 88, 0.26)'
			}
		},
		text: sutpen_label,
		textposition: textposition_sutpen_plot
	}];

	//Layouts

	var layout_sutpen_plot = {
		title: {
			text: "<b>Narrative Structure Chart</b> <br>Major Events in Sutpen's Life in Plot Order"
		},
		showlegend: false,
		xaxis: {
			showgrid: false,
			title: {
				text: "Chapter"
			},
			autotick: false,
			tickmode: 'array',
			tickvals: sutpen_x_tickvals,
			range: sutpen_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			tickmode: 'array',
			tickvals: sutpen_y_tickvals,
			range: sutpen_y_range,
			zeroline: false
		},
		font: plotFont

	};

	var layout_sutpen_story = {
		title: { text: "<b>Narrative Structure Chart</b> <br>Major Events in Sutpen's Life in Story Order" },
		showlegend: false,
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			autotick: false,
			tickmode: 'array',
			tickvals: sutpen_x_tickvals,
			range: sutpen_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			tickmode: 'array',
			tickvals: sutpen_y_tickvals,
			range: sutpen_y_range,
			zeroline: false
		}
	};

	var layout_absalom_plot = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Abasalom!</i> in Plot Order" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			autotick: false,
			zeroline: false,
			tickmode: 'array',
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			range: absalom_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			autotick: false,
			tickmode: 'array',
			tickvals: absalom_y_tickvals,
			range: absalom_y_range,
			zeroline: false
		}
	}

	var layout_absalom_narrated = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Abasalom!</i> Narrated Events" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			autotick: false,
			tickmode: 'array',
			zeroline: false,
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			range: absalom_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			autotick: true,
			tickmode: 'array',
			tickvals: absalom_y_tickvals,
			range: absalom_y_range,
			zeroline: false
		},

	}

	var layout_absalom_narrated_told = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Abasalom!</i> Narrated and Told Events" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			autotick: false,
			zeroline: false,
			tickmode: 'array',
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			range: absalom_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			/*	autotick: true,*/
			tickmode: 'array',
			tickvals: absalom_y_tickvals,
			range: absalom_y_range,
			zeroline: false
		}
	}

	var layout_absalom_narrated_told_other = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Abasalom!</i> Narrated, Told, and Other Events" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			autotick: false,
			tickmode: 'array',
			zeroline: false,
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			range: absalom_x_range
		},
		yaxis: {
			title: { text: "Chronology" },
			showgrid: false,
			autotick: true,
			tickmode: 'array',
			tickvals: absalom_y_tickvals,
			range: absalom_y_range,
			zeroline: false
		}
	}

	var layout_absalom_story = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> in Story Order with Major Events" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			zeroline: false,
			tickmode: 'array',

			range: absalom_x_range
		},
		yaxis: {
			type: 'linear',
			title: { text: "Chronology" },
			showgrid: false,
			autotick: true,
			tickmode: 'array',
			tickvals: absalom_y_tickvals,
			range: absalom_y_range,
			zeroline: false
		}
	};

	var layout_absalom_date = {
		title: { text: "<b>Narrative Structure Chart</b> <br><i>Absalom, Absalom!</i> in Date Order" },
		showlegend: true,
		legend: {
			title:
				{ text: "Legend" }
		},
		xaxis: {
			showgrid: false,
			title: { text: "Chapter" },
			tickvals: absalom_x_tickvals,
			ticktext: absalom_x_ticktext,
			zeroline: false,
			tickmode: 'array',
			range: absalom_x_range
		},
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
	};

	var config = {
		responsive: true,
		displayModeBar: false
	}

	Plotly.newPlot('plotchart', {
		data: data,
		layout: layout_sutpen_plot,
		config: config
	})


	Plotly.addTraces('plotchart',
		[{
			x: [0, 0],
			y: [0, 0],
			visible: false
		},
		{
			x: [0, 0],
			y: [0, 0],
			visible: false
		},
		{
			x: [0, 0],
			y: [0, 0],
			visible: false
		}
		]
	);

	Plotly.addFrames('plotchart', [
		{
			name: 'frame0',
			data: [{
				type: "scatter",
				mode: "markers+text",
				x: x_sutpen_plot,
				y: y_sutpen,
				text: sutpen_label,
				textposition: textposition_sutpen_plot,
				marker: {
					color: scatterPlotColors[1],
					opacity: .5,
					size: 20
				}
			},
			{ visible: false },
			{ visible: false }],
			layout: layout_sutpen_plot
		},
		{
			name: 'frame1',
			data: [{
				type: "scatter",
				mode: "markers+text",
				x: x_sutpen_story,
				y: y_sutpen,

				marker:
				{
					color: scatterPlotColors[1],
					opacity: .5,
					size: 20,
				},

				text: sutpen_label,
				textposition: textposition_sutpen_story
			},
			{
				visible: false,
			},
			{ visible: false },
			{ visible: false }
			],
			layout: layout_sutpen_story
		},
		{
			name: 'frame2',
			data: [{
				type: "scatter",
				mode: "markers",
				name: "All Events",
				x: absalom_x_plot,
				y: absalom_y_all,
				hovertemplate: hoverstring, marker:
				{
					color: scatterPlotColors[1],
					opacity: .5,
					size: 5
				}
			},
			{
				visible: true,
				type: "scatter",
				mode: "markers+text",
				name: "Major Events",
				x: absalom_x_plot,
				y: absalom_major_event,
				hovertemplate: "<b>Major Event: </b>%{text}<extra></extra>",
				text: absalom_label,
				textposition: absalom_textposition_plot,
				marker:
				{
					size: 20,
					color: scatterPlotColors[0],
					opacity: .8,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88,0.26)'
					}
				},
			},
			{ visible: false },
			{ visible: false }
			],
			layout: layout_absalom_plot
		},
		{
			name: 'frame3',
			data: [{
				x: absalom_x_plot,
				y: absalom_y_narrated,
				name: "Narrated",
				mode: "markers",
				marker: {
					color: scatterPlotColors[2],
					opacity: .5,
					size: 5,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88, 0.26)'
					}
				},
				hovertemplate: hoverstring,
			},
			{
				visible: false,
			},
			{ visible: false },
			{ visible: false }],
			layout: layout_absalom_narrated
		},
		{
			name: 'frame4',
			data: [

				{
					type: "scatter",
					mode: "markers",
					x: absalom_x_plot,
					y: absalom_y_narrated,
					hovertemplate: hoverstring,
					marker: {
						color: scatterPlotColors[2],
						opacity: .2,
						size: 5,
						line: {
							width: 1,
							color: 'rgba(88, 88, 88,0.26)'
						}
					},
					name: "Narrated",

				},
				{
					type: "scatter",
					mode: "markers",
					x: absalom_x_plot,
					y: absalom_y_told,

					hovertemplate: hoverstring,
					marker: {
						color: scatterPlotColors[3],
						opacity: .5,
						size: 5,
						line: {
							width: 1,
							color: 'rgba(88, 88, 88, 0.26)'
						}
					},
					name: "Told",
					text: null,
					textposition: null,
					visible: true
				},
				{
					visible: false
				},
				{
					visible: false
				}
			],
			layout: layout_absalom_narrated_told
		},
		{
			name: 'frame5',
			data: [{
				type: "scatter",
				mode: "markers",
				x: absalom_x_plot,
				y: absalom_y_narrated,
				marker: {
					color: scatterPlotColors[2],
					opacity: .2,
					size: 5

				},
				name: "Narrated",
				hovertemplate: hoverstring
			},
			{
				type: "scatter",
				mode: "markers",
				x: absalom_x_plot,
				y: absalom_y_told,
				marker: {
					color: scatterPlotColors[3],
					opacity: .2,
					size: 5
				},
				name: "Told",
				visible: true,
				hovertemplate: hoverstring
			},
			{
				type: "scatter",
				mode: "markers+text",
				x: absalom_x_plot,
				y: absalom_y_other,
				marker: {
					color: scatterPlotColors[4],
					opacity: .5,
					size: 5
				},
				hovertemplate: hoverstring,
				name: "Other",
				visible: true
			},
			{
				visible: false
			}

			],
			layout: layout_absalom_narrated_told_other
		},
		{
			name: 'frame6',
			data: [
				{
					mode: "markers",
					x: absalom_x_story,
					y: absalom_y_narrated,
					marker: {
						color: scatterPlotColors[2],
						opacity: .2,
						size: 5
					},
					name: "Narrated",
					hovertemplate: hoverstring,
					visible: true
				},
				{
					x: absalom_x_story,
					y: absalom_y_told,
					marker: {
						color: scatterPlotColors[3],
						opacity: .2,
						size: 5
					},
					name: "Told",
					hovertemplate: hoverstring,
					visible: true
				},
				{
					x: absalom_x_story,
					y: absalom_y_other,
					marker: {
						color: scatterPlotColors[4],
						opacity: .5,
						size: 5
					},
					name: "Other",
					hovertemplate: hoverstring,
					visible: true
				},
				{
					visible: true,
					type: "scatter",
					mode: "markers+text",
					name: "Major Events",
					x: absalom_x_story,
					y: absalom_major_event,
					text: absalom_label,
					textposition: absalom_textposition_plot,
					marker:
					{
						size: 20,
						color: scatterPlotColors[0],
						opacity: .8,
						line: {
							width: 1,
							color: 'rgba(88, 88, 88, 0.26)'
						}
					},
				}],
			layout: layout_absalom_story
		},
		{
			name: 'frame7',
			data: [{
				mode: "markers",
				x: absalom_x_plot,
				y: absalom_startdate,
				marker: {
					color: scatterPlotColors[5],
					opacity: .5,
					size: 5,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88, 0.26)'
					}
				},
				hovertemplate: hoverstring,
				name: "Date Order"
			},
			{
				visible: true,
				mode: "markers+text",
				x: absalom_x_plot,
				y: absalom_major_event_date,
				hovertemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> ",
				text: absalom_label,
				textposition: absalom_textposition_plot,
				marker:
				{
					size: 20,
					color: scatterPlotColors[0],
					opacity: .8,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88, 0.26)'
					}
				},
				name: "Major Events",
			},
			{ visible: false },
			{ visible: false }],
			layout: layout_absalom_date
		},
		{
			name: 'frame8',
			data: [{
				mode: "markers",
				x: absalom_x_story,
				y: absalom_startdate,
				marker: {
					color: scatterPlotColors[5],
					opacity: .5,
					size: 5,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88, 0.26)'
					}
				},
				hovertemplate: hoverstring,
				name: "Date Order"
			},
			{
				visible: true,
				mode: "markers+text",
				x: absalom_x_story,
				y: absalom_major_event_date,
				hovertemplate: "<b>Date: </b> %{y} <br> <b>Major Event: </b> %{text} <extra></extra> ",
				text: absalom_label,
				textposition: absalom_textposition_plot,
				marker:
				{
					size: 20,
					color: scatterPlotColors[0],
					opacity: .8,
					line: {
						width: 1,
						color: 'rgba(88, 88, 88, 0.26)'
					}
				},
				name: "Major Events",
			},
			{ visible: false },
			{ visible: false }],
			layout: layout_absalom_date
		}
	]);
};

function makePlot() {
	$.ajax({
		type: "GET",
		url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/sutpen_absalom_plot_major_events.csv",
		dataType: "text",
		success: function (response) {
			var allData = {};
			allData = processData(response)
			makePlotly(allData);
		}
	}).done(function () {
		console.log("Data loaded successfully");
	}).fail(function () {
		console.warn("Data could not be loaded");
	});;
};

function processData(response) {

	data = $.csv.toObjects(response, { headers: true });

	plotData = {};
	plotData.absalom_eventid = data.map(function (d) {
		return parseInt(d['absalom_eventid']) || null;
	});

	plotData.absalom_startdate = data.map(function (d) { return d['absalom_startdate']; });

	plotData.absalom_summary = data.map(function (d) { return d['absalom_summary']; });
	plotData.absalom_chapter = data.map(function (d) {
		return parseInt(d['absalom_chapter']) || null;
	});
	plotData.absalom_y_narrated = data.map(function (d) {
		return parseInt(d['absalom_y_narrated']) || null;
	});
	plotData.absalom_y_hypothesized = data.map(function (d) { return parseInt(d['absalom_y_hypothesized']) || null; });
	plotData.absalom_y_narratedconsciousness = data.map(function (d) { return parseInt(d['absalom_y_narratedconsciousness']) || null; });
	plotData.absalom_y_told = data.map(function (d) { return parseInt(d['absalom_y_told']) || null; });
	plotData.absalom_y_remembered = data.map(function (d) { return parseInt(d['absalom_y_remembered']) || null; });
	plotData.absalom_y_all = data.map(function (d) { return parseInt(d['absalom_y_all']) || null; });
	plotData.absalom_y_other = data.map(function (d) { return parseInt(d['absalom_y_other']) || null; });
	plotData.absalom_x_plot = data.map(function (d) { return parseInt(d['absalom_x_plot']) || null; });
	plotData.absalom_x_story = data.map(function (d) { return parseInt(d['absalom_x_story']) || null; });
	plotData.absalom_textposition_plot = data.map(function (d) { return d['absalom_textposition_plot']; });
	plotData.absalom_textposition_story = data.map(function (d) { return d['absalom_textposition_story']; });
	plotData.absalom_label = data.map(function (d) { return d['absalom_label']; });
	plotData.absalom_major_event = data.map(function (d) { return parseInt(d['absalom_major_event']) || null });
	plotData.x_sutpen_plot = data.map(function (d) { return parseInt(d['x_sutpen_plot']) || null; });
	plotData.x_sutpen_story = data.map(function (d) { return parseInt(d['x_sutpen_story']) || null; });
	plotData.y_sutpen = data.map(function (d) { return parseInt(d['y_sutpen']) || null; });
	plotData.series_sutpen_plot = data.map(function (d) { return d['series_sutpen_plot']; });
	plotData.series_sutpen_story = data.map(function (d) { return d['series_sutpen_story']; });
	plotData.sutpen_label = data.map(function (d) { return d['sutpen_label']; });
	plotData.textposition_sutpen_plot = data.map(function (d) { return d['textposition_sutpen_plot']; });
	plotData.textposition_sutpen_story = data.map(function (d) { return d['textposition_sutpen_story']; });
	plotData.absalom_pagenumber = data.map(function (d) { return parseInt(d['absalom_pagenumber']) || null; });
	plotData.absalom_sentence_words = data.map(function (d) { return d['absalom_sentence_words']; });
	plotData.absalom_orderwithinpage = data.map(function (d) { return parseInt(d['absalom_orderwithinpage']) || null; });
	plotData.absalom_major_event_date = data.map(function (d) { return d['absalom_major_event_date']; });

	return plotData
}

