// JavaScript source code

$.ajaxSetup({
    async: false
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
    var name = [];
    var xoffset = [];
    var yoffset = [];

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        chrono.push(parseInt(row['Chrono']));
        value.push(parseInt(row['value']));
        series.push(row['series']);
        name.push(row['name']);
        xoffset.push(row['xoffset']);
        yoffset.push(row['yoffset']);

    }
    console.log("chrono =", chrono, "value = ", value, "series = ", series, "name =", name);
    makePlotly(chrono, value, series, name, xoffset, yoffset);
}

function makePlotly(chrono, value, series, name, xoffset, yoffset) {
    //var hovervariables = [percent, race]

    var data = [{
        type: "scatter",
        mode: "markers+text",
        x: value,
        y: chrono,
        text: name,
        textposition: ['top right',
            'top left',
            'bottom left',
            'bottom left',
            'top left',
            'top right'],
        frame: series
    }];

    var sliderSteps = [];
    for (i = 0; i < series.length; i++) {
        sliderSteps.push({
            method: 'animate',
            label: series[i],
            args: [[series[i]], {
                mode: 'immediate',
                transition: { duration: 300 },
                frame: { duration: 300, redraw: false },
            }]
        });
    }


    var layout = {
        title: { text: "Plot Structure Chart: Major Events Sutpen" },
        showlegend: false,
        xaxis: {
            showgrid: false,
            title: {text: "Chapter"}
    },
        yaxis: {
            title: { text: "Chronology" },
            showgrid: false,
            tickmode: 'array',
            tickvals: [1, 2, 3]
        },
        //colorway = faulkner_colorway,
        //font = plot_font,
        //margin = m,
        //autosize = FALSE,
        width: 640,
        //paper_bgcolor = faulkner_paperbackground,
        //plot_bgcolor = faulkner_plotcolor,
        //modebar = list(bgcolor = faulkner_paperbackground)

         updatemenus: [{
            x: 0,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: { t: 87, r: 10 },
            buttons: [{
                method: 'animate',
                args: [null, {
                    mode: 'immediate',
                    fromcurrent: true,
                    transition: { duration: 300 },
                    frame: { duration: 500, redraw: false }
                }],
                label: 'Play'
            }, {
                method: 'animate',
                args: [[null], {
                    mode: 'immediate',
                    transition: { duration: 0 },
                    frame: { duration: 0, redraw: false }
                }],
                label: 'Pause'
            }]
        }],
        // Finally, add the slider and use `pad` to position it
        // nicely next to the buttons.
        sliders: [{
            pad: { l: 130, t: 55 },
            currentvalue: {
                visible: true,
                prefix: 'Year:',
                xanchor: 'right',
                font: { size: 20, color: '#666' }
            },
            steps: sliderSteps
        }]
    };
    

    var config = { responsive: true }


    Plotly.newPlot('plotchart', data, layout, config);


};
makeplot();