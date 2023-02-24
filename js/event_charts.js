// JavaScript source code
$.ajaxSetup({
    async: true
});


function makeplot() {
    var data;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/major_events_sutpen.csv",
        dataType: "text",
        success: function (response) {
            data = $.csv.toObjects(response, { headers: true });
            processData(data);
        }
    });
};

function processData(allRows) {

    console.log(allRows);
    console.log(allRows.length)
    var chrono = []
    var value = []
    var series = []
    var text = [];
    var xoffset = [];
    var yoffset = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        chrono.push(parseInt(row['Chrono']));
        value.push(parseInt(row['value']));
        series.push(row['series']);
        text.push(row['name']);
        xoffset.push(row['xoffset']);
        yoffset.push(row['yoffset']);

    }
    console.log("chrono =", chrono, "value = ", value, "series = ", series, "xoffset = ", xoffset, "yoffset = ", yoffset);
    makePlotly(chrono, value, series, text, xoffset, yoffset);
}

function makePlotly(chrono, value, series, text, xoffset, yoffset) {

    //Create two different data sets for the frames
    y = chrono.filter((v, i) => i % 2) //This is the default y variable

    //x values switch
    plot_value = value.filter((v, i) => !(i % 2))
    story_value = value.filter((v, i) => i % 2)

    //text values switch
    plot_text = text.filter((v, i) => i % 2)
    story_text = text.filter((v, i) => !(i % 2))


    console.log(y, plot_value, story_value)

    //make helper functions to simplify this

    var data = [{
        type: "scatter",
        mode: "markers+text",
        x: plot_value,
        y: y,
        name: series[0],
        text: plot_text,
        textposition: ['top right',
             'bottom left',
              'top left'
              ]

    }];

    var frames = [
        {
            name: series[0],
            data: [{
                x: plot_value,
                textposition: ['top right',
                    'bottom left',
                    'top left'
                ]
            }]
        },
        {
            name: series[1],
            data: [{
                x: story_value,
                textposition: ['top right',
                    'bottom left',
                    'top right'
                ]
            }]
        }
    ]


    var layout = {
        title: { text: "<b>Plot Structure Chart</b> <br>Major Events in Sutpen's Life" },
        showlegend: false,
        xaxis: {
            showgrid: false,
            title: { text: "Chapter" },
            autotick: false,
            tickmode: 'array',
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            range: [0.5, 9]
        },
        yaxis: {
            title: { text: "Chronology" },
            showgrid: false,
            tickmode: 'array',
            tickvals: [1, 2, 3],
            zeroline: false
        },

        sliders: [{
            pad: { t: 0 },
            x: 0.05,
            len: 1,
            currentvalue: {
                xanchor: 'right',
                prefix: ' ',
                font: {
                    color: '#FFF',
                    size: 40
                }
            },
            transition: { duration: 500 },
            // By default, animate commands are bound to the most recently animated frame:
            steps: [{
                label: 'Plot',
                method: 'animate',
                args: [['Plot'], {
                    mode: 'immediate',
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500 }
                }]
            }, {
                label: 'Story',
                method: 'animate',
                args: [['Story'], {
                    mode: 'immediate',
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500 }
                }]
            }]
        }],

        annotations: [
            {
                x: .5,
                y: -.52,
                xref: 'paper',
                yref: 'paper',
                text: 'Move the slider between Plot and Story<br>to see the different event orders',
                showarrow: false
            }

        ]
    };


    var config = {
        responsive: true,
        displayModeBar: false    }


    Plotly.newPlot('plotchart', {
        data: data,
        layout: layout,
        frames: frames,
        config: config
    });


};

var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 1.4;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response.index);
    // response = { element, direction, index }

    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    if (response.index === 1) {
        makeplot()            
        }


    // // update chart based on step
    // figure.select("p").text(response.index + 1);
    //Probably not the best place to store these steps. Might want to tuck them into a file with chart definitions later.

    //TODO Make this into a function that coordinates with the presentation. - DONE (1:28)


    //scrollychart1.data.datasets[0].backgroundColor.forEach(function (item, index) {
    //    if (response.index === 1) {
    //        scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
    //        scrollychart1.data.datasets[0].backgroundColor[4] = scrollychart1.data.datasets[0].backgroundColor[4].replace("0.2", "0.6")
    //    }
    //    else if (response.index === 2) {
    //        scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
    //        scrollychart1.data.datasets[0].backgroundColor[2] = scrollychart1.data.datasets[0].backgroundColor[2].replace("0.2", "0.6")
    //    }
    //    else if (response.index === 3) {
    //        scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
    //        scrollychart1.data.datasets[0].backgroundColor[0] = scrollychart1.data.datasets[0].backgroundColor[0].replace("0.2", "0.6")
    //    }
    //    else {
    //        scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
    //    }
    //    scrollychart1.update()

    //})

    //scrollychart2.data.datasets[0].backgroundColor.forEach(function (item, index) {
    //    if (response.index === 1) {
    //        scrollychart2.data.datasets[0].backgroundColor[4] = scrollychart2.data.datasets[0].backgroundColor[4].replace("0.2", "0.6")
    //    }
    //    else if (response.index === 2) {
    //        scrollychart2.data.datasets[0].backgroundColor[2] = scrollychart2.data.datasets[0].backgroundColor[2].replace("0.2", "0.6")
    //    }
    //    else if (response.index === 3) {
    //        scrollychart2.data.datasets[0].backgroundColor[0] = scrollychart2.data.datasets[0].backgroundColor[0].replace("0.2", "0.6")
    //    }
    //    else {
    //        scrollychart2.data.datasets[0].backgroundColor[index] = scrollychart2.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
    //    }
    //    scrollychart2.update()

    //})

    //This highlights the legend item in correspondence with the pie piece.
    //let legend = document.getElementById('legend')
    //let spans = legend.getElementsByTagName('span')


    //for (let span of spans) {
    //    id = parseInt(span.id.slice(-1))
    //    if (id === 4 && response.index === 1) {
    //        span.style.background = span.style.background.replace("0.2", "0.8")
    //    }
    //    else if (response.index === 2 && id === 2) {
    //        span.style.background = span.style.background.replace("0.2", "0.8")
    //    }
    //    else if (response.index === 3 && id === 0) {
    //        span.style.background = span.style.background.replace("0.2", "0.8")
    //    }
    //    else {
    //        span.style.background = span.style.background.replace("0.8", "0.2")
    //    }
    //}

}

function makeplotAA() {
    var data;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/plot_structure_absalom.csv",
        dataType: "text",
        success: function (response) {
            data = $.csv.toObjects(response, { headers: true });
            processDataAA(data);
        }
    });
};


function processDataAA(allRows) {

    console.log(allRows);
    console.log(allRows.length)
    var chrono = []
    var value = []
    var series = []
    var text = [];
    var xoffset = [];
    var yoffset = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        chrono.push(parseInt(row['Chrono']));
        value.push(parseInt(row['value']));
        series.push(row['series']);
        text.push(row['name']);
        xoffset.push(row['xoffset']);
        yoffset.push(row['yoffset']);

    }
    console.log("chrono =", chrono, "value = ", value, "series = ", series, "xoffset = ", xoffset, "yoffset = ", yoffset);
    makePlotly(chrono, value, series, text, xoffset, yoffset);
}

function makePlotly(chrono, value, series, text, xoffset, yoffset) {

    //Create two different data sets for the frames
    y = chrono.filter((v, i) => i % 2) //This is the default y variable

    //x values switch
    plot_value = value.filter((v, i) => !(i % 2))
    story_value = value.filter((v, i) => i % 2)

    //text values switch
    plot_text = text.filter((v, i) => i % 2)
    story_text = text.filter((v, i) => !(i % 2))


    console.log(y, plot_value, story_value)

    //make helper functions to simplify this

    var data = [{
        type: "scatter",
        mode: "markers+text",
        x: plot_value,
        y: y,
        name: series[0],
        text: plot_text,
        textposition: ['top right',
            'bottom left',
            'top left'
        ]

    }];

    var frames = [
        {
            name: series[0],
            data: [{
                x: plot_value,
                textposition: ['top right',
                    'bottom left',
                    'top left'
                ]
            }]
        },
        {
            name: series[1],
            data: [{
                x: story_value,
                textposition: ['top right',
                    'bottom left',
                    'top right'
                ]
            }]
        }
    ]


    var layout = {
        title: { text: "<b>Plot Structure Chart</b> <br>Major Events in Sutpen's Life" },
        showlegend: false,
        xaxis: {
            showgrid: false,
            title: { text: "Chapter" },
            autotick: false,
            tickmode: 'array',
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            range: [0.5, 9]
        },
        yaxis: {
            title: { text: "Chronology" },
            showgrid: false,
            tickmode: 'array',
            tickvals: [1, 2, 3],
            zeroline: false
        },

        sliders: [{
            pad: { t: 0 },
            x: 0.05,
            len: 1,
            currentvalue: {
                xanchor: 'right',
                prefix: ' ',
                font: {
                    color: '#FFF',
                    size: 40
                }
            },
            transition: { duration: 500 },
            // By default, animate commands are bound to the most recently animated frame:
            steps: [{
                label: 'Plot',
                method: 'animate',
                args: [['Plot'], {
                    mode: 'immediate',
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500 }
                }]
            }, {
                label: 'Story',
                method: 'animate',
                args: [['Story'], {
                    mode: 'immediate',
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500 }
                }]
            }]
        }],

        annotations: [
            {
                x: .5,
                y: -.52,
                xref: 'paper',
                yref: 'paper',
                text: 'Move the slider between Plot and Story<br>to see the different event orders',
                showarrow: false
            }

        ]
    };


    var config = {
        responsive: true,
        displayModeBar: false
    }


    Plotly.newPlot('plotchartAA', {
        data: data,
        layout: layout,
        frames: frames,
        config: config
    });


};



function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}
// kick things off


