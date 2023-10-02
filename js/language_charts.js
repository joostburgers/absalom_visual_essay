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

