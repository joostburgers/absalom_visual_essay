//Functions for loading charts. 
//Some of these could be refactored, but that would make them less readable. There was a deliberate choice to be as verbose as possible.


function wordFrequencyChart() {
    const data = {
        nonrace_x: ["Woman", "Grandfather", "Tell", "Judith", "House", "Bon", "Father", "Sutpen", "Time", "Henry"],
        nonrace_y: [217, 227, 258, 272, 282, 300, 303, 353, 384, 424],
        race_x: ["Heritage", "Breed", "Octoroon", "Race", "Slave", "Black", "Blood", "White", "Negro", "N-word"],
        race_y: [12, 16, 22, 25, 26, 62, 90, 96, 106, 152]
    };

    const nonraceTrace = {
        x: data.nonrace_x,
        y: data.nonrace_y,
        name: "Non-Racial",
        type: "bar",
        marker: { color: faulknerChartStyles.colorway[0] },
        opacity: 0.9,
        hovertemplate: 'Word: %{x}<br>Count: %{y}<extra></extra>'
    };

    const raceTrace = {
        x: data.race_x,
        y: data.race_y,
        name: "Racial",
        type: "bar",
        marker: { color: faulknerChartStyles.colorway[8] },
        opacity: 0.9,
        hovertemplate: 'Word: %{x}<br>Count: %{y}<extra></extra>'
    };

    const layoutFrequencyChart = {
        template: faulknerLayoutTemplate,
        title: {
            text:"Ten Most Frequent Non-Racial and Racial Words"},
        
        xaxis: { title: "Word Stem" },
        yaxis: { title: "Number of Words" },
        margin: { l: 75, r: 50, b: 125, t: 50, pad: 4 }
    };

    const configFrequencyChart = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutFrequencyChart.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }
   
    Plotly.newPlot("wordFrequencyChart", [nonraceTrace, raceTrace], layoutFrequencyChart, configFrequencyChart)
}

function bigramChart() {

    const bigramCounts = {
        bigram: [
            "wild negro", "wild n-word", "white woman", "black stallion", "half breed", "monkey n-word",
            "white girl", "black blood", "negro boy", "slave quarter", "black dress", "octoroon mistress",
            "Pettibone n-word", "puritan heritage", "Sutpen blood", "white people"],
        n: [12, 11, 8, 6, 6, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3]
    };

    const bigramTrace = {
        x: bigramCounts.n,
        y: bigramCounts.bigram,
        type: "bar",
        orientation: "h",
        marker: { color: faulknerChartStyles.colorway[0] },
        opacity: 0.9,
        hovertemplate: 'Count: %{x}<extra></extra>'
    };

    const layoutBigram = {
        template: faulknerLayoutTemplate,
        title: {
            text: "Fifteen Most Frequent Race Bigrams"
        },
        showlegend:false,
        xaxis: { title: "Number of Bigrams" },
        yaxis: { title: "Bigrams", autorange: "reversed" },
        margin: { l: 150, r: 50, b: 100, t: 50, pad: 4 }
    };

    const configBigram = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutBigram.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }

    Plotly.newPlot("bigramChart", [bigramTrace], layoutBigram, configBigram);
}


function speakerChart() {
    const speakerData = {
        speaker: ["Rosa Coldfield", "Mr. Compson", "Quentin"],
        wild_n_word: [1, 3, 7],
        wild_negro: [7, 4, 1]
    };

    const wild_n_wordTrace = {
        x: speakerData.speaker,
        y: speakerData.wild_n_word,
        type: "bar",
        name: "Wild N-word",
        opacity: 0.9,
        marker: { color: faulknerChartStyles.colorway[0] },
        hovertemplate: 'Speaker: %{x}<br>Count: %{y}<extra></extra>'
    };

    const wildNegroTrace = {
        x: speakerData.speaker,
        y: speakerData.wild_negro,
        type: "bar",
        name: "Wild Negro",
        opacity: 0.9,
        marker: { color: faulknerChartStyles.colorway[1] },
        hovertemplate: 'Speaker: %{x}<br>Count: %{y}<extra></extra>'
    };

    const layoutSpeaker = {
        template: faulknerLayoutTemplate,
        title: {
            text: "Use of 'Wild N-word' and 'Wild Negro' by Speaker"
        },
        xaxis: { title: "Speaker" },
        yaxis: { title: "Count" },
        barmode: "group",
       
    };


    const configSpeaker = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutSpeaker.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }


    Plotly.newPlot("speakerChart", [wild_n_wordTrace, wildNegroTrace], layoutSpeaker, configSpeaker);
}

function bubbleChart() {
    const bubbleData = {
        chapter: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
        word_lemma: [
            "Black", "Blood", "N-Word", "Negro", "White", "Black", "Blood", "N-Word", "Negro", "White",
            "Black", "Blood", "N-Word", "Negro", "White", "Black", "Blood", "N-Word", "Negro", "White",
            "Black", "Blood", "N-Word", "Negro", "White", "Black", "Blood", "N-Word", "Negro", "White",
            "Black", "Blood", "N-Word", "Negro", "White", "Black", "Blood", "N-Word", "Negro", "White",
            "Black", "Blood", "N-Word", "Negro", "White"
        ],
        n: [6, 3, 5, 23, 7, 2, 2, 2, 29, 2, 6, 6, 5, 5, 3, 3, 18, 5, 12, 16, 4, 17, 2, 5, 8, 15, 6, 6, 21, 23, 16, 15, 106, 1, 28, 5, 20, 15, 3, 8, 5, 3, 6, 7, 1],
        y: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1]
    };

    const yLabels = ["White", "Negro", "N-Word", "Blood", "Black"];


    // Map specific colors to word_lemma
    const colorMap = {
        "Black": faulknerChartStyles.colorway[0],
        "Blood": faulknerChartStyles.colorway[1],
        "N-Word": faulknerChartStyles.colorway[2],
        "Negro": faulknerChartStyles.colorway[3],
        "White": faulknerChartStyles.colorway[4]
    };

    // Generate color array based on word_lemma
    const bubbleColors = bubbleData.word_lemma.map(word => colorMap[word]);


    const bubbleTrace = {
        x: bubbleData.chapter,
        y: bubbleData.y,
        text: bubbleData.word_lemma.map((word, i) => `${word} Count: ${bubbleData.n[i]}`),
        name: bubbleData.word_lemma,
        mode: "markers",

        marker: {
            size: bubbleData.n,
            sizemode: "diameter",
            color: bubbleColors,

            line: { color: 'rgba(0,0,0,1)', width: 1 },
            opacity: 0.6
        },
        hoverinfo: "text",
    };

    const layoutBubble = {
        template: faulknerLayoutTemplate,
        title: {
            text: "Use of Top 5 Racial Words by Chapter <i>Absalom, Absalom!</i>"
        },
        xaxis: {
            title: "Chapter",
            showgrid: false,
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        yaxis: {
            title: "",
            showgrid: false,
            tickmode: "array",
            tickvals: [5, 4, 3, 2, 1],
            ticktext: yLabels.reverse()
        },
		showlegend: false
    };

    const configBubble = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutBubble.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }


    Plotly.newPlot("bubbleChart", [bubbleTrace], layoutBubble, configBubble);

}

function raceBarChart() {

    const raceData = {
        character: ["Thomas Sutpen", "Charles Bon", "Judith Sutpen", "Henry Sutpen", "Rosa Coldfield"],
        black: [40, 9, 25, 15, 24],
        n_word: [132, 30, 42, 34, 15],
        negro: [62, 16, 47, 35, 31],
        blood: [49, 48, 40, 48, 27],
        white: [58, 31, 38, 37, 18]
    };

    // Create traces for each word
    const blackTrace = {
        x: raceData.character,
        y: raceData.black,
        type: 'bar',
        marker: { color: faulknerChartStyles.colorway[0] },
        opacity: .9,
        name: 'Black',
        hovertemplate: 'Character: %{x}<br>Word: Black<br>Count: %{y}<extra></extra>'
    };

    const bloodTrace = {
        x: raceData.character,
        y: raceData.blood,
        type: 'bar',
        name: 'Blood',
        marker: { color: faulknerChartStyles.colorway[1] },
        opacity: .9,
        hovertemplate: 'Character: %{x}<br>Word: Blood<br>Count: %{y}<extra></extra>'
    };

    const nWordTrace = {
        x: raceData.character,
        y: raceData.n_word,
        type: 'bar',
        name: 'N-word',
        marker: { color: faulknerChartStyles.colorway[2] },
        opacity: .9,
        hovertemplate: 'Character: %{x}<br>Word: N-word<br>Count: %{y}<extra></extra>'
    };

    const negroTrace = {
        x: raceData.character,
        y: raceData.negro,
        type: 'bar',
        name: 'Negro',
        marker: { color: faulknerChartStyles.colorway[3] },
        opacity: .9,
        hovertemplate: 'Character: %{x}<br>Word: Negro<br>Count: %{y}<extra></extra>'
    };

    const whiteTrace = {
        x: raceData.character,
        y: raceData.white,
        type: 'bar',
        name: 'White',
        marker: { color: faulknerChartStyles.colorway[4] },
        opacity: .9,
        hovertemplate: 'Character: %{x}<br>Word: White<br>Count: %{y}<extra></extra>'
    };

    const layoutRaceBarChart = {
        template: faulknerLayoutTemplate,
        title: {
            text: "Frequency of Racial Words in Events with Specific Characters"
        },
        yaxis: { title: 'Count' },
        xaxis: { title: 'Character' },
        barmode: 'group',
        legend: { title: { text: "<b>Racial Word</b>" }, itemsizing: 'constant' },
        paper_bgcolor: faulknerChartStyles.paperBackground,
        plot_bgcolor: faulknerChartStyles.plotBackground,
        margin: faulknerChartStyles.margin,
        font: faulknerChartStyles.font
    };


    const configRaceBarChart = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutRaceBarChart.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }


    // Plotly chart
    Plotly.newPlot('raceBarChart', [blackTrace, bloodTrace, nWordTrace, negroTrace, whiteTrace], layoutRaceBarChart, configRaceBarChart);

}

function nWordCharacterChart() {

    const nWordCharacterData = {
        character: [
            "Thomas Sutpen", "Unnamed Twenty Original Sutpen Slaves", "Thomas Sutpen's Father",
            "Judith Sutpen", "Henry Sutpen", "Charles Bon", "General Compson",
            "Thomas Sutpen's Sister(1)", "Unnamed Poor Whites in Tidewater",
            "Unnamed Men Who Hunt Architect"
        ],
        n_word: [
            0.87, 0.3, 0.29, 0.28, 0.22, 0.2, 0.2, 0.2, 0.19, 0.18
        ]
    };


    const trace = {
        x: nWordCharacterData.n_word,
        y: nWordCharacterData.character,
        type: "bar",
        orientation: "h",
        opacity: 0.9,
        hovertemplate: "Percentage: %{x:.0%}<extra></extra>",
        marker: { color: faulknerChartStyles.colorway[0] }
    };

    const layoutnWordCharacterChart = {
        template:faulknerLayoutTemplate,
        title: {
            text: "Ten Most Frequent Characters in Events when the N-word is Used"

        },
        xaxis: {
            title: "Percentage of N-word Usage",
            tickformat: ",.0%"
        },
        yaxis: {
            title: "",
            automargin: true
        },
		showlegend: false,
    };

    const confignWordCharacterChart = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutnWordCharacterChart.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }

    Plotly.newPlot("nWordCharacterChart", [trace], layoutnWordCharacterChart, confignWordCharacterChart);
}
 


function raceDateChart() {
	const absalomRaceDateData = {
		roundDate: [1815, 1820, 1825, 1830, 1835, 1840, 1845, 1850, 1855, 1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910],
		black: [2, 1, 4, 0, 3, 0, 0, 1, 8, 12, 6, 5, 1, 7, 0, 0, 0, 0, 0, 12],
		negro: [0, 0, 0, 0, 17, 18, 0, 13, 12, 8, 9, 4, 2, 11, 0, 0, 0, 0, 0, 12],
		n_word: [3, 45, 2, 1, 36, 2, 0, 2, 6, 24, 5, 5, 2, 0, 0, 0, 0, 0, 0, 19],
		rangeDate: [
			"", "1815 -", "1820 -", "1825 -", "1830 -", "1835 -", "1840 -", "1845 -",
			"1850 -", "1855 -", "1860 -", "1865 -", "1870 -", "1875 -", "1880 -",
			"1885 -", "1890 -", "1895 -", "1900 -", "1905 -"
		]
	};

	const traces = [
		{
			x: absalomRaceDateData.roundDate,
			y: absalomRaceDateData.black,
			type: "scatter",
			mode: "lines+markers",
			marker: { color: faulknerChartStyles.colorway[0] },
			line: { color: faulknerChartStyles.colorway[0] },
			name: "Black",
			text: absalomRaceDateData.rangeDate,
			opacity: 0.4,
			hovertemplate: "Date Range: %{text} %{x}<br>Word: Black<br>Count: %{y}<extra></extra>"
		},
		{
			x: absalomRaceDateData.roundDate,
			y: absalomRaceDateData.negro,
			type: "scatter",
			mode: "lines+markers",
			marker: { color: faulknerChartStyles.colorway[1] },
			line: { color: faulknerChartStyles.colorway[1] },
			name: "Negro",
			opacity: 0.4,
			hovertemplate: "Date Range: %{text} %{x}<br>Word: Negro<br>Count: %{y}<extra></extra>"
		},
		{
			x: absalomRaceDateData.roundDate,
			y: absalomRaceDateData.n_word,
			type: "scatter",
			mode: "lines+markers",
			name: "N-word",
			marker: { color: faulknerChartStyles.colorway[2] },
			line: { color: faulknerChartStyles.colorway[2] },
			opacity: 0.9,
			hovertemplate: "Date Range: %{text} %{x}<br>Word: N-word<br>Count: %{y}<extra></extra>"
		}
	];

	const layoutRaceDateChart = {
		template: faulknerLayoutTemplate,
		title: {
			text: "Frequency of Race Words over Time"

		},
		xaxis: {
			title: "Year",
			tickmode: "array",
			tickvals: absalomRaceDateData.roundDate,
			ticktext: absalomRaceDateData.roundDate,
			showgrid: false
		},
		yaxis: {
			title: "Count of Word"
		},
		legend: {
			title: { text: "<b>Racial Word</b>" }
		},

    };


    const configRaceDateChart = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutRaceDateChart.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }


    Plotly.newPlot("raceDateChart", traces, layoutRaceDateChart, configRaceDateChart);

}

function raceMapChart() {

    const absalomRaceMapData = {
        x: [1887, 153, 153, 153, 653, 1939, 658, 185, 1077, 607, 635, 693, 462, 185, 635, 1695, 152, 1696, 658, 1695, 298, 693, 136, 1696, 658, 1742, 130, 185, 1723, 1867, 1847, 635, 693, 658, 578, 330, 1695, 389, 1723, 1723, 1867, 298, 1847, 653, 136, 688, 688, 1939, 658, 578, 1742, 389, 152, 281, 188, 188, 1887],
        y: [-922, -193, -193, -193, -209, -831, -819, -173, -121, -763, -851, -894, -657, -173, -851, -556, -246, -1348, -819, -556, -345, -894, -117, -1348, -819, -972, -193, -173, -308, -919, -965, -851, -894, -790, -794, -202, -556, -555, -308, -308, -919, -345, -965, -209, -117, -837, -837, -831, -790, -794, -972, -555, -246, -207, -255, -255, -922],
        raceWords: ["N-word", "Negro", "N-word", "Black", "N-word", "N-word", "Negro", "Negro", "N-word", "Negro", "Black", "Negro", "Negro", "N-word", "Negro", "Black", "Negro", "Black", "Black", "N-word", "Negro", "N-word", "N-word", "N-word", "N-word", "Negro", "N-word", "N-word", "N-word", "N-word", "Negro", "Black", "Negro", "Negro", "N-word", "Black", "Black", "Negro", "Black", "Black", "Negro", "Negro", "Black", "Negro", "N-word", "Black", "Black", "Black", "N-word", "Black", "N-word", "Black", "Black", "Negro", "Black"],
        value: [45, 38, 37, 23, 10, 10, 9, 9, 9, 8, 7, 7, 7, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        locationTitles: ["Tidewater Virginia", "Sutpen Plantation", "Sutpen Plantation", "Sutpen Plantation", "Downed Log in Woods", "Harvard University", "Jefferson Courthouse and Square", "Sutpen Plantation Stable", "Tallahatchie River Bottom", "Jefferson Methodist Church", "Coldfield House", "Compson Place", "Episcopal Church in the County", "Sutpen Plantation Stable", "Coldfield House", "New Orleans, Louisiana", "Sutpen Plantation Gate", "Haiti", "Jefferson Courthouse and Square", "New Orleans, Louisiana", "Cabin near Sutpen's Hundred", "Compson Place", "Fishing Camp|Hunting Camp", "Haiti", "Jefferson Courthouse and Square", "Mississippi River", "Sutpen Plantation Gardens", "Sutpen Plantation Stable", "University of Mississippi, Oxford", "Virginia", "Carolina in the Civil War", "Coldfield House", "Compson Place", "Holston House", "Jefferson Negro Store District", "Midwife|Dicey's Cabin", "New Orleans, Louisiana", "Northwest Road|Jefferson to Memphis", "University of Mississippi, Oxford", "University of Mississippi, Oxford", "Virginia", "Cabin near Sutpen's Hundred", "Carolina in the Civil War", "Downed Log in Woods", "Fishing Camp|Hunting Camp", "General Compson's|Mr. Compson's Office", "General Compson's|Mr. Compson's Office", "Harvard University", "Holston House", "Jefferson Negro Store District", "Mississippi River", "Northwest Road|Jefferson to Memphis", "Sutpen Plantation Gate", "Sutpen Plantation Graveyard", "Sutpen's Store", "Sutpen's Store", "Tidewater Virginia"]
    };

    const createTrace = (raceWord, color) => {
        return {
            x: absalomRaceMapData.x.filter((_, i) => absalomRaceMapData.raceWords[i] === raceWord),
            y: absalomRaceMapData.y.filter((_, i) => absalomRaceMapData.raceWords[i] === raceWord),
            text: absalomRaceMapData.locationTitles
                .filter((_, i) => absalomRaceMapData.raceWords[i] === raceWord)
                .map((title, i) => `Racial Word: ${raceWord} <br>Location: ${title}<br>Count: ${absalomRaceMapData.value[i]}`),
            type: "scatter",
            mode: "markers",
            marker: {
                size: absalomRaceMapData.value.filter((_, i) => absalomRaceMapData.raceWords[i] === raceWord).map(v => v * 1.7),
                sizemode: "diameter",
                opacity: 0.5,
                line: { width: 1, color: "white" },
                color: color
            },
            name: raceWord,
            hovertemplate: "%{text}<extra></extra>"
        };
    };


    const traceNWord = createTrace("N-word", faulknerChartStyles.colorway[0]);
    const traceNegro = createTrace("Negro", faulknerChartStyles.colorway[2]);
    const traceBlack = createTrace("Black", faulknerChartStyles.colorway[3]);




    const layoutRaceMap = {
       template: faulknerLayoutTemplate,
        title: {
            text: "Locations of Racial Words in <i>Absalom, Absalom!</i>",
               },
        xaxis: {
            visible: false,
            range: [0, 2008],
            fixedrange: true
        },
        yaxis: {
            visible: false,
            range: [-1660, 0],
            fixedrange: true
        },
        images: [
            {
                source: "https://raw.githubusercontent.com/joostburgers/absalom_sentiment_analysis/master/images/dy_base_layer_4_2.png",
                xref: "x",
                yref: "y",
                x: 25,
                y: -40,
                sizex: 2008,
                sizey: 1660,
                opacity: 0.8,
                layer: "below"
            }
        ],
       
        legend: {
            title: { text: "<b>Racial Word</b>" },
            itemsizing: "constant",

        },
        hoverlabel: {
            font: {
                family: faulknerBaseLayout.font.family,
                size: 12
            }
        },
        autosize: false,
        width: 768,
        height: 605
    };


    const configRaceMap = {
        displayModeBar: true,
        modeBarButtonsToRemove: [],
        modeBarButtonsToAdd: ['zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],

        displaylogo: false,
        responsive: true,
        toImageButtonOptions: {
        
            filename: layoutRaceMap.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }

    Plotly.newPlot("raceMapChart", [traceNWord, traceNegro, traceBlack], layoutRaceMap, configRaceMap);
}




function chapter7nwordChart() {
	const nwordChapter7Data = {
		page: [2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 38, 48, 49, 52, 53],
		event: [
			"1834 MS Hunt", "1834 MS Hunt", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater",
			"1817 - 1820 Tidewater", "1817 - 1820 Tidewater", "1818 Tidewater Door", "1818 Tidewater Door", "1818 Tidewater Door", "1818 Tidewater Door After",
			"1818 Tidewater Door After", "1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt", "1823 - 1831 Haiti", "1823 - 1831 Haiti",
			"1823 - 1831 Haiti", "1834 MS Hunt", "1831 -1832 Sutpen's Hundred", "1910 Harvard - Shreve", "1834 MS Hunt", "1834 MS Hunt", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred",
			"1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred", "1861 Wash on road during war", "1861 Wash on road during war", "1869 Wash's Cabin birth scene",
			"1869 Wash's Cabin birth scene"
		],
		n_word: [13, 13, 26, 26, 26, 26, 26, 12, 12, 12, 8, 8, 3, 3, 9, 9, 9, 9, 1, 1, 1, 1, 2, 1, 7, 7, 3, 3, 2, 2, 2, 9, 9, 4, 4],
		theme: [
			"1834 MS Hunt", "1834 MS Hunt", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater", "1817 - 1820 Tidewater",
			"1818 Tidewater Door", "1818 Tidewater Door", "1818 Tidewater Door", "1818 Tidewater Door After", "1818 Tidewater Door After", "1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt",
			"1834 MS Hunt", "1834 MS Hunt", "1834 MS Hunt", "1823 - 1831 Haiti", "1823 - 1831 Haiti", "1823 - 1831 Haiti", "1834 MS Hunt", "1831 -1832 Sutpen's Hundred", "1910 Harvard - Shreve",
			"1834 MS Hunt", "1834 MS Hunt", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred", "1831 -1832 Sutpen's Hundred",
			"1861 - 1869 Wash", "1861 - 1869 Wash", "1861 - 1869 Wash", "1861 - 1869 Wash"
		],
		label: [
			"1910 Harvard - Quentin", "1834 MS Hunt", "", "1808 - 1817 Mountain", "",
			"1817 - 1820 Tidewater", "", "", "", "", "1818 Tidewater Door", "", "",
			"1818 Tidewater Door After", "", "1834 MS Hunt", "", "1819 Tidewater schoolhouse",
			"1834 MS Hunt", "", "", "", "1823 - 1831 Haiti", "", "", "1834 MS Hunt",
			"1831 -1832 Sutpen's Hundred", "1910 Harvard - Shreve", "1834 MS Hunt", "",
			"1831 -1832 Sutpen's Hundred", "", "1910 Harvard - Quentin",
			"1831 -1832 Sutpen's Hundred", "", "1831 - Haiti (Charles Bon born)", "",
			"1831 -1832 Sutpen's Hundred", "1861 - 1864 Civil War", "", "", "", "", "",
			"1866 Sutpen's Hundred Post-war", "", "", "1861 Wash on road during war", "",
			"1867 Sutpen's General Store", "", "1869 Wash's Cabin birth scene", "",
			"1869 Wash's Cabin death scene", "", "", ""
		],
		label_page: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57
		]
	};



    const themeColors = {
        "1834 MS Hunt": "#64A664",  // Saturated Green
        "1817 - 1820 Tidewater": "#1E3A66",  // Deep Blue
        "1818 Tidewater Door": "#C81B1B",  // Vibrant Deep Red
        "1818 Tidewater Door After": "#E5721A",  // Warm Orange
        "1823 - 1831 Haiti": "#863B69",  // Rich Maroon
        "1831 - 1832 Sutpen's Hundred": "#5DA8C4",  // Muted Cyan
        "1861 - 1869 Wash": "#C4BA0D",  // Softer Gold-Yellow
        "1910 Harvard - Shreve": "#2F635D"  // Dark Teal
    };

	// Get unique themes
	const uniqueThemes = [...new Set(nwordChapter7Data.theme)];

	// Create separate traces for each theme
	const traces_chapter7 = uniqueThemes.map(theme => {
		const indices = nwordChapter7Data.theme
			.map((t, i) => (t === theme ? i : -1))
			.filter(i => i !== -1);

		return {
			y: indices.map(i => nwordChapter7Data.page[i]),
			x: indices.map(i => nwordChapter7Data.n_word[i]),
            orientation:"h",
            type: "bar",
            opacity: 0.9,
			name: theme, // Theme name appears in the legend
			marker: { color: themeColors[theme] || themeColors.default },
			hovertemplate: `<b>Theme:</b> ${theme}<br>` +

				`<b>Count: </b> %{x}<extra></extra>`, // Custom hovertemplate
		};
	});

	const layoutChapter7 = {
		template: faulknerLayoutTemplate,
        title: {
            text: "Use of N-word Across Chapter 7"
        },
		yaxis: {
			tickmode: "array",
			tickvals: nwordChapter7Data.label_page,
			ticktext: nwordChapter7Data.label,
			title: { text: "Event" },
			fixedrange: true,
            range: [55, 0],
			
		},
		xaxis: {
			title: "Count",
		},
		barmode: "group", // Use "stack" or "group" for different bar modes
		bargap: 0,
		autosize: true,
		//width: 1100,
		height: 800,
		
		margin: { l: 300, r: 50, t: 50, b: 100, pad: 10 },
		
    };

    const configChapter7 = {
        ...defaultConfig,
        toImageButtonOptions: {
            ...defaultConfig.toImageButtonOptions,
            filename: layoutChapter7.title.text.replace(/\s+/g, '_').toLowerCase()
        }
    }



    Plotly.newPlot("chapter7NWordChart", traces_chapter7, layoutChapter7, configChapter7);
}