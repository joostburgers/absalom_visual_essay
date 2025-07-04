const plotFont = {
	family: "Georgia",
	size: 14,
	color: '#363636'
}



// JavaScript source code
var data = [
    {
        x: ["<i>Moby Dick</i><br> Herman Melville", "<i>Huckleberry Finn</i><br>Mark Twain", "<i>The Great Gatsby</i><br>F. Scott Fitzgerald", "<i>Absalom, Absalom!<i><br>William Faulker", "<i>Beloved</i><br> Toni Morrison"],
        y: [22, 19, 14, 50, 12],
        type: 'bar',
        marker: {
            color: ['rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.5)'],
            line: {
                color: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                width: 1.5
            }
        },
        hovertemplate:"<b>Text:</b> %{x}<br> <b>Average words per sentence: </b> %{y}<extra></extra>"
    }
];



var layout_words_per_sentence = {
	title: {
		text: "Average Words per Sentence Classic American Novels"
	},
	showlegend: false,
	xaxis: {
		showgrid: false,
		title: {
			text: "Novel"
		},
		
	},
	yaxis: {
		title: { text: "Words per Sentence" },
		showgrid: false,
		zeroline: false
	},
	font: plotFont

};



function makeParenthesisPlot() {
	$.ajax({
		type: "GET",
		url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/parenthetical_staggered_wide.csv",
		dataType: "text",
		success: function (response) {
			var allData = {};
			allData = processParenthesisData(response)
			makeParenthesisPlotly(allData);
		}
	}).done(function () {
		console.log("Data loaded successfully");
	}).fail(function () {
		console.warn("Data could not be loaded");
	});;
};

function processParenthesisData(response) {

	data = $.csv.toObjects(response, { headers: true });

	console.log(response)

	plotData = {};
	plotData.depth = data.map(function (d) {
		return parseInt(d['depth']) || null;
	});

	plotData.start = data.map(function (d) { return parseInt(d['start']) || null; });

	plotData.level_1 = data.map(function (d) {
		return parseInt(d['level_1']) || null;
	});
	plotData.level_2 = data.map(function (d) {
		return parseInt(d['level_2']) || null;
	})

	plotData.level_3 = data.map(function (d) {
		return parseInt(d['level_3']) || null;
	})

	plotData.level_4 = data.map(function (d) {
		return parseInt(d['level_4']) || null;
	})

	return plotData
}

function makeParenthesisPlotly(data){

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
	console.log("Date revision: ", data)

	const depth = data['depth'];
	const level_1 = data['level_1'];
	const level_2 = data['level_2'];
	const level_3 = data['level_3'];
	const level_4 = data['level_4'];

	const x_long_break = [334038, 355880, 394110, 394224];
	const y_long_break = [1, 2, 3, 4];
	const break_text = ['(then Shreve again, "Wait. Wait. You mean...")', '("How was it?" Shreve said. "You told...', "(Because there was love Mr Compson said...", "(Quentin)"]
	const chapter = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const chapter_marker = [1, 46000, 99402, 156765, 245268, 328114, 412488, 558423, 686037];


	var data = [{
		x: level_1,
		y: depth,
		name: "Level 1: ()",
		/*color: scatterPlotColors,*/
		type: 'scatter',
		mode: 'lines+markers',
		hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
		marker: { size: 4 },
		line: { width: 1, dash: 'dot' }
	},
		{
			x: level_2,
			y: depth,
			name: "Level 2: (())",
			/*color: scatterPlotColors,*/
			type: 'scatter',
			mode: 'lines+markers',
			hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
			marker: { size: 4 },
			line: { width: 1, dash: 'dot' }
		},
		{
			x: level_3,
			y: depth,
			name: "Level 3: ((()))",
			hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
			type: 'scatter',
			mode: 'lines+markers',
			marker: { size: 4 },
			line: { width: 1, dash: 'dot' }
		},
		{
			x: level_4,
			y: depth,
			name: "Level 4: (((())))",
			hovertemplate: " <b>Depth: </b> %{y}<extra></extra>",
			type: 'scatter',
			mode: 'lines+markers',
			marker: { size: 4 },
			line: { width: 1, dash: 'dot' }
		}
	]

	var layout_parenthesis = {
		title: { text: "Parenthesis Nesting Levels in <i>Absalom, Absalom!</i>" },
		xaxis: {
			showgrid:false,
			zeroline: false,
			showline: false,
			tickmode: 'array',
			tickvals: chapter_marker,
			ticktext: chapter,
		},
		yaxis: {
			text: "Nesting Level",
			showgrid: false,
			zeroline: false,
			showline: false,
			linewidth: 0,
			tickmode: "array",
			tickvals: [0, 1, 2, 3, 4],
			ticktext: ["Main Text", "1: ()", "2: (())", "3: ((()))", "4: (((())))"]
		},
		font: plotFont,
		colorway: scatterPlotColors[1, 2, 3, 4],
		annotations: [
			{ x: x_long_break[0], y: y_long_break[0], text: break_text[0], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor:"left" },
		 {
			 x: x_long_break[1], y: y_long_break[1], text: break_text[1], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left"
			}, {
			 x: x_long_break[2], y: y_long_break[2], text: break_text[2], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left"
			}, {
			 x: x_long_break[3], y: y_long_break[3], text: break_text[3], showarrow: false, xref: "x", yref: "y", yshift: 15, xanchor: "left"

			}],

	}

	Plotly.newPlot('parenthesisChart', {
		data: data,
		layout: layout_parenthesis
		
	})
}