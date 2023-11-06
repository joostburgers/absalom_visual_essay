// JavaScript source code
$.ajaxSetup({
    async: true
});




var temp_data = [];
var allRows = null


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

    /* console.log(allRows);
     console.log(allRows.length)*/
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
    /* console.log("chrono =", chrono, "value = ", value, "series = ", series, "xoffset = ", xoffset, "yoffset = ", yoffset);*/
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


    /*    console.log(y, plot_value, story_value)*/

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

//function makeplotAA() {
//    var data;
//    $.ajax({
//        type: "GET",
//        url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/absalom_plot_chart.csv",
//        dataType: "text",
//        success: function (response) {
//            data = $.csv.toObjects(response, { headers: true });
//            processDataAA(data);
//        }
//    });
//};


//function processDataAA(allRows) {

//    console.log(allRows);
//    console.log(allRows.length)

//    //plot variables y-variables
//    var hypothesized = []
//    var narrated = []
//    var narratedconscious = []
//    var remembered = []
//    var told = []

//    //x-variable
//    var xvalue = []

//    //frame
//    var series = []

//    //hover values
//    var text = [];
//    var position = [];
//    var summary = [];
//    var startdate = [];

//    for (var i = 0; i < allRows.length; i++) {
//        row = allRows[i];
//        //plot variables
//        hypothesized.push(parseInt(row['Hypothesized']));
//        narrated.push(parseInt(row['Narrated']));
//        narratedconscious.push(parseInt(row['NarratedConsciousness']));
//        remembered.push(parseInt(row['Remembered']));
//        told.push(parseInt(row['Told']));

//        //x and frame values
//        xvalue.push(parseInt(row['values']));
//        series.push(row['Order']);

//        // hover values
//        text.push(row['event']);
//        position.push(row['position'])
//        startdate.push(row['StartDate'])
//        summary.push(row['Summary'])
//    }
//    console.log("narrated =", narrated, "xvalue = ", xvalue, "series = ", series, "text = ", text, "position = ", position);
//    makePlotlyAA(hypothesized, narrated, narratedconscious, remembered, told, xvalue, series,
//        text, position, summary);
//}

//function makePlotlyAA(hypothesized, narrated, narratedconscious, remembered, told, xvalue, series,
//    text, position, summary) {

//    //Create two different data sets for the frames
//    y_narrated = narrated.filter((v, i) => i % 2) //This is the default y variable
//    y_hypothesized = hypothesized.filter((v, i) => i % 2)
//    y_narratedconscious = narratedconscious.filter((v, i) => i % 2)
//    y_remembered = remembered.filter((v, i) => i % 2)
//    y_told = told.filter((v, i) => i % 2)

//    //x values switch


//    plot_order = xvalue.filter((v, i) => !(i % 2))
//    story_order = xvalue.filter((v, i) => i % 2)

//    console.log("y = ", y_narrated, "story_narrated = ", story_order, "plot_narrated = ", plot_order)

//    //text values switch
//    plot_text = text.filter((v, i) => !(i % 2))
//    story_text = text.filter((v, i) => i % 2)

//    told_plot_text = text.filter((v, i) => !(i % 2))
//    told_story_text = text.filter((v, i) => i % 2)


//    //position values switch
//    plot_position = position.filter((v, i) => !(i % 2))
//    story_position = position.filter((v, i) => i % 2)
    

//    //make helper functions to simplify this

//    var hypothesized_trace = {
//        type: "scatter",
//        mode: "markers+text",
//        marker: { opacity: .5 },
//        x: plot_order,
//        y: y_hypothesized,
//        name: "Hypothesized",
//        text: plot_text,
//        textposition: plot_position
//    }

//    var narrated_trace = {
//        type: "scatter",
//        mode: "markers+text",
//        marker: {opacity:.5},
//        x: plot_order,
//        y: y_narrated,
//        name: "Narrated",
//        text: plot_text,
//        textposition: plot_position
//    }


//    var narratedconscious_trace = {
//        type: "scatter",
//        mode: "markers+text",
//        marker: { opacity: .5 },
//        x: plot_order,
//        y: y_narratedconscious,
//        name: "Narrated+Conscious",
//        text: plot_text,
//        textposition: plot_position
//    }

//    var remembered_trace = {
//        type: "scatter",
//        mode: "markers+text",
//        marker: { opacity: .5 },
//        x: plot_order,
//        y: y_remembered,
//        name: "Remembered",
//        text: plot_text,
//        textposition: plot_position
//    }

//    var told_trace = {
//        type: "scatter",
//        mode: "markers+text",
//        marker: { opacity: .5 },
//        x: plot_order,
//        y: y_told,
//        name: "Told",
//        text: plot_text,
//        textposition: plot_position
//    }

//    var data = [hypothesized_trace, narrated_trace, narratedconscious_trace, remembered_trace, told_trace];

//    //TODO this whole chart is too complex. It should be reduced to only 5 or so major plot points from the chronology



//    var frames = [
//        {
//            name: series[0],
//            data: [
//                {
//                    type: "scatter",
//                    mode: "markers+text",
//                    marker: { opacity: .5 },
//                    x: plot_order,
//                    y: y_hypothesized,
//                    name: "Hypothesized",
//                    text: plot_text,
//                    textposition: plot_position
//                },
//                {
//                    type: "scatter",
//                    mode: "markers+text",
//                    marker: { opacity: .5 },
//                    x: plot_order,
//                    y: y_narrated,
//                    name: "Narrated",
//                    text: plot_text,
//                    textposition: plot_position
//                }
//                , {
//                    type: "scatter",
//                    mode: "markers+text",
//                    marker: { opacity: .5 },
//                    x: plot_order,
//                    y: y_narratedconscious,
//                    name: "Narrated+Conscious",
//                    text: plot_text,
//                    textposition: plot_position
//                }, {
//                    type: "scatter",
//                    mode: "markers+text",
//                    marker: { opacity: .5 },
//                    x: plot_order,
//                    y: y_remembered,
//                    name: "Remembered",
//                    text: plot_text,
//                    textposition: plot_position
//                },
//                /*{
//                    mode: "markers+text",
//                    x: plot_order,
//                    text: told_plot_text,
//                textposition: plot_position
//                },*/
//                {
//                    type: "scatter",
//                    mode: "markers+text",
//                    marker: { opacity: .5 },
//                    x: plot_order,
//                    y: y_told,
//                    name: "Told",
//                    text: plot_text,
//                    textposition: plot_position
//                }            ]
//        },
//        {
//            name: series[1],

//            data: [
//                {
//                    x: story_order,
//                    text: story_text,
//                    textposition: story_position
//                }, {
//                    x: story_order,
//                    text: story_text,
//                    textposition: story_position
//                },
//                {
//                    x: story_order,
//                    text: story_text,
//                    textposition: story_position
//                },
//                {
//                    x: story_order,
//                    text: story_text,
//                    textposition: story_position
//                },
//                {
//                    x: story_order,
//                    text: told_story_text,
//                    textposition: story_position
//                }]
//        }
//    ]


//    var layout = {
//        title: { text: "<b>Plot Structure Chart</b> <br>Major Events in Sutpen's Life" },
//        showlegend: true,
//        xaxis: {
//            showgrid: false,
//            title: { text: "Chapter" },
//            gridwidth: 1.5,
//            tickmode: 'array',
//            tickvals: [1, 40, 93, 150, 236, 287, 375, 496, 621],
//            ticktext: [1, 2, 3, 4, 5, 6, 7, 8, 9]
//            /*range: [0.5, 9]*/
//        },
//        yaxis: {
//            title: { text: "Chronology" },
//            showgrid: false/*,
//            tickmode: 'array',
//            tickvals: [1, 2, 3],
//            zeroline: false*/
//        },

//        autosize: true,
//        width: 1024,
//       height: 400,

//        sliders: [{
//            pad: { t: 0 },
//            x: 0.05,
//            len: 1,
//            currentvalue: {
//                xanchor: 'right',
//                prefix: ' ',
//                font: {
//                    color: '#FFF',
//                    size: 40
//                }
//            },
//            transition: { duration: 500 },
//            // By default, animate commands are bound to the most recently animated frame:
//            steps: [{
//                label: 'Plot',
//                method: 'animate',
//                args: [['Plot'], {
//                    mode: 'immediate',
//                    frame: { redraw: false, duration: 500 },
//                    transition: { duration: 500 }
//                }]
//            }, {
//                label: 'Story',
//                method: 'animate',
//                args: [['Story'], {
//                    mode: 'immediate',
//                    frame: { redraw: false, duration: 500 },
//                    transition: { duration: 500 }
//                }]
//            }]
//        }],

//        annotations: [
//            {
//                x: .5,
//                y: -.52,
//                xref: 'paper',
//                yref: 'paper',
//                text: 'Move the slider between Plot and Story<br>to see the different event orders',
//                showarrow: false
//            }

//        ]
//    };


//    var config = {
//        responsive: true,
//        displayModeBar: true
//    }


//    Plotly.newPlot('plotchartAA2', {
//        data: data,
//        layout: layout,
//        frames: frames,
//        config: config
//    });


//};



function makeplotAAlong() {
    var data;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/absalom_plot_chart.csv",
        dataType: "text",
        success: function (response) {
            data = $.csv.toObjects(response, { headers: true });
            
            processDataAAlong(data);
        }
    });
};

console.log(chart_data)
function processDataAAlong(allRows) {

    console.log(allRows);
    console.log(allRows.length)

    //plot variables y-variables
    var hypothesized = []
    var narrated = []
    var narratedconscious = []
    var remembered = []
    var told = []

    //x-variable
    var xvalue = []

    //frame
    var series = []

    //hover values
    var text = [];
    var position = [];
    var summary = [];
    var startdate = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        //plot variables
        hypothesized.push(parseInt(row['Hypothesized']));
        narrated.push(parseInt(row['Narrated']));
        narratedconscious.push(parseInt(row['NarratedConsciousness']));
        remembered.push(parseInt(row['Remembered']));
        told.push(parseInt(row['Told']));

        //x and frame values
        xvalue.push(parseInt(row['values']));
        series.push(row['Order']);

        // hover values
        text.push(row['event']);
        position.push(row['position'])
        startdate.push(row['StartDate'])
        summary.push(row['Summary'])
    }
    console.log("narrated =", narrated, "xvalue = ", xvalue, "series = ", series, "text = ", text, "position = ", position);
    makePlotlyAA(hypothesized, narrated, narratedconscious, remembered, told, xvalue, series,
        text, position, summary);
}

function makePlotlyAA(hypothesized, narrated, narratedconscious, remembered, told, xvalue, series,
    text, position, summary) {

    //Create two different data sets for the frames
    y_narrated = narrated.filter((v, i) => i % 2) //This is the default y variable
    y_hypothesized = hypothesized.filter((v, i) => i % 2)
    y_narratedconscious = narratedconscious.filter((v, i) => i % 2)
    y_remembered = remembered.filter((v, i) => i % 2)
    y_told = told.filter((v, i) => i % 2)

    //x values switch


    plot_order = xvalue.filter((v, i) => !(i % 2))
    story_order = xvalue.filter((v, i) => i % 2)

    console.log("y = ", y_narrated, "story_narrated = ", story_order, "plot_narrated = ", plot_order)

    //text values switch
    plot_text = text.filter((v, i) => !(i % 2))
    story_text = text.filter((v, i) => i % 2)

    told_plot_text = text.filter((v, i) => !(i % 2))
    told_story_text = text.filter((v, i) => i % 2)


    //position values switch
    plot_position = position.filter((v, i) => !(i % 2))
    story_position = position.filter((v, i) => i % 2)


    //make helper functions to simplify this

    var hypothesized_trace = {
        type: "scatter",
        mode: "markers+text",
        marker: { opacity: .5 },
        x: plot_order,
        y: y_hypothesized,
        name: "Hypothesized",
        text: plot_text,
        textposition: plot_position
    }

    var narrated_trace = {
        type: "scatter",
        mode: "markers+text",
        marker: { opacity: .5 },
        x: plot_order,
        y: y_narrated,
        name: "Narrated",
        text: plot_text,
        textposition: plot_position
    }


    var narratedconscious_trace = {
        type: "scatter",
        mode: "markers+text",
        marker: { opacity: .5 },
        x: plot_order,
        y: y_narratedconscious,
        name: "Narrated+Conscious",
        text: plot_text,
        textposition: plot_position
    }

    var remembered_trace = {
        type: "scatter",
        mode: "markers+text",
        marker: { opacity: .5 },
        x: plot_order,
        y: y_remembered,
        name: "Remembered",
        text: plot_text,
        textposition: plot_position
    }

    var told_trace = {
        type: "scatter",
        mode: "markers+text",
        marker: { opacity: .5 },
        x: plot_order,
        y: y_told,
        name: "Told",
        text: plot_text,
        textposition: plot_position
    }

    var data = [hypothesized_trace, narrated_trace, narratedconscious_trace, remembered_trace, told_trace];

    //TODO this whole chart is too complex. It should be reduced to only 5 or so major plot points from the chronology



    var frames = [
        {
            name: series[0],
            data: [
                {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    x: plot_order,
                    y: y_hypothesized,
                    name: "Hypothesized",
                    text: plot_text,
                    textposition: plot_position
                },
                {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    x: plot_order,
                    y: y_narrated,
                    name: "Narrated",
                    text: plot_text,
                    textposition: plot_position
                }
                , {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    x: plot_order,
                    y: y_narratedconscious,
                    name: "Narrated+Conscious",
                    text: plot_text,
                    textposition: plot_position
                }, {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    x: plot_order,
                    y: y_remembered,
                    name: "Remembered",
                    text: plot_text,
                    textposition: plot_position
                },
                /*{
                    mode: "markers+text",
                    x: plot_order,
                    text: told_plot_text,
                textposition: plot_position
                },*/
                {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    x: plot_order,
                    y: y_told,
                    name: "Told",
                    text: plot_text,
                    textposition: plot_position
                }]
        },
        {
            name: series[1],

            data: [
                {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                    y: y_hypothesized,
                    name: "Hypothesized",
                    x: story_order,
                    text: story_text,
                    textposition: story_position
                }, {
                    type: "scatter",
                    mode: "markers+text",
                    marker: { opacity: .5 },
                
                    y: y_narrated,
                    name: "Narrated",
                    x: story_order,
                    text: story_text,
                    textposition: story_position
                },
                {
                    x: story_order,
                    text: story_text,
                    textposition: story_position
                },
                {
                    x: story_order,
                    text: story_text,
                    textposition: story_position
                },
                {
                    x: story_order,
                    text: story_text,
                    textposition: story_position
                }]
        }
    ]


    var layout = {
        title: { text: "<b>Plot Structure Chart 2</b> <br>Major Events in Sutpen's Life" },
        showlegend: true,
        xaxis: {
            showgrid: false,
            title: { text: "Chapter" },
            gridwidth: 1.5,
            tickmode: 'array',
            tickvals: [1, 40, 93, 150, 236, 287, 375, 496, 621],
            ticktext: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            /*range: [0.5, 9]*/
        },
        yaxis: {
            title: { text: "Chronology" },
            showgrid: false/*,
            tickmode: 'array',
            tickvals: [1, 2, 3],
            zeroline: false*/
        },

        autosize: false,
        width: 1024,
        height: 400,

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
        displayModeBar: true
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


