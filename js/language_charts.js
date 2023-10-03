const plotFont = {
	family: "Georgia",
	size: 14,
	color: '#363636'
}



// JavaScript source code
var data = [
    {
        x: ["<i>Moby Dick</i><br>Herman Melville", "<i>Huckleberry Finn</i><br>Mark Twain", "<i>The Great Gatsby</i><br>F. Scott Fitzgerald", "<i>Absalom, Absalom!<i><br>William Faulker", "<i>Beloved</i><br> Toni Morrison"],
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
		url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/parenthetical_nesting.csv",
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

	plotData = {};
	plotData.depth = data.map(function (d) {
		return parseInt(d['depth']) || null;
	});

	plotData.start = data.map(function (d) { return d['start']; });


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

	const depth = data['depth'];
	const start = data['start'];
	const chapter = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const chapter_marker = [1,46000,99402,156765,245268,328114,412488,558423, 686037]

	var data = [{
		x: start,
		y: depth,
		groupby: depth,
		/*color: scatterPlotColors,*/
		type: 'scatter',
		mode: 'lines+markers',
		marker: { size: 4 },
		line: { width: 1, dash: 'dot' }
	}
	]

	var layout_parenthesis = {
		title:{ text: "Parenthesis Nesting Levels in <i>Absalom, Absalom!</i>" },
		xaxis: {
			gridwidth: 1,
			zeroline:false,
			showline:false,
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
		colorway: scatterPlotColors

	}

	Plotly.newPlot('parenthesisChart', {
		data: data,
		layout: layout_parenthesis
		
	})
}