// JavaScript source code
//Configuration for charts

var DefaultbackgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]

var DefaultborderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]
var DefaultborderWidth = 1

//generate scrollychart1 through AJAX call. All variables are passed through by function after completed request

$(function () {
    $.ajaxSetup({
        async: false
    });
    var contextScrollychart1 = document.getElementById('scrollychart1').getContext("2d");
    var contextScrollychart2 = document.getElementById('scrollychart2').getContext("2d");
    // examine example_data.json for expected response data
    var demography_chart_url = "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/character_demography_chart.json";
    var weighted_demography_chart_url = "https://raw.githubusercontent.com/arundhatibala/absalom/main/data/character_demography_present.json";
    // draw empty chart
    var scrollychart1 = new Chart(contextScrollychart1, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: DefaultbackgroundColor,
                borderColor: DefaultborderColor,
                borderWidth: DefaultborderWidth
            }]

        },
        options: {
            legend: {
                display: false
            }
        }
    });

    var scrollychart2 = new Chart(contextScrollychart2, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: DefaultbackgroundColor,
                borderColor: DefaultborderColor,
                borderWidth: DefaultborderWidth
            }]

        },
        options: {
            legend: {
                display: false
            }
        }

    });

    ajax_chart(scrollychart1, demography_chart_url);
    ajax_chart(scrollychart2, weighted_demography_chart_url);
    console.log(scrollychart1)



    // function to update our chart
    function ajax_chart(chart, url, data) {
        var data = data || {};

        $.getJSON(url, data).done(function (response) {
            response = JSON.parse(response)

            chart.data.labels = response.map(function (e) {
                return e.Race;
            })

            chart.data.datasets[0].data = response.map(function (e) {
                return e.total;
            });; // or you can iterate for multiple datasets
            chart.update(); // finally update our chart

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

		// // update chart based on step
		// figure.select("p").text(response.index + 1);
		//Probably not the best place to store these steps. Might want to tuck them into a file with chart definitions later.

		//TODO Make this into a function that coordinates with the presentation. 
		reversecount = scrollychart1.data.datasets[0].backgroundColor.length - response.index -1

		scrollychart1.data.datasets[0].backgroundColor.forEach(function (item, index) {
			 
			console.log(reversecount)

			if (index == response.index) {
				
				scrollychart1.data.datasets[0].backgroundColor[index]= scrollychart1.data.datasets[0].backgroundColor[index].replace("0.2", "0.6")
				
			}
			else {
				scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
            }
			scrollychart1.update()

        })	
		
		scrollychart2.data.datasets[0].backgroundColor.forEach(function (item, index) {

			if (index == response.index) {
				scrollychart2.data.datasets[0].backgroundColor[index] = scrollychart2.data.datasets[0].backgroundColor[index].replace("0.2", "0.6")
				
			}
			else {
				scrollychart2.data.datasets[0].backgroundColor[index] = scrollychart2.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
			}
			scrollychart2.update()

		})


		//if (response.index == 1) {
		//	scrollychart1.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.6)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart2.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.6)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		
		//	scrollychart2.update()

		//}
		//else if (response.index == 2) {
		//	scrollychart1.config.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.6)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart2.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.6)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart1.update()
		//	scrollychart2.update()

		//}
		//else if (response.index == 3) {
		//	scrollychart1.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.6)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart2.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.6)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart1.update()
		//	scrollychart2.update()

		//}
		//else {
		//	scrollychart1.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart2.data.datasets[0].backgroundColor = [
		//		'rgba(255, 99, 132, 0.2)',
		//		'rgba(54, 162, 235, 0.2)',
		//		'rgba(255, 206, 86, 0.2)',
		//		'rgba(75, 192, 192, 0.2)',
		//		'rgba(153, 102, 255, 0.2)',
		//		'rgba(255, 159, 64, 0.2)'
		//	]
		//	scrollychart1.update()
		//	scrollychart2.update()
		//}


	}

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
	init();


});