// JavaScript source code
//Configuration for charts
$.ajaxSetup({
	async: false
});


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




const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart, args, options) {
		const ul = getOrCreateLegendList(chart, options.containerID);

		// Remove old legend items
		while (ul.firstChild) {
			ul.firstChild.remove();
		}

		// Reuse the built-in legendItems generator
		const items = chart.options.plugins.legend.labels.generateLabels(chart);

		items.forEach(item => {
			const li = document.createElement('li');
			li.style.alignItems = 'center';
			li.style.cursor = 'pointer';
			li.style.display = 'flex';
			li.style.flexDirection = 'row';
			li.style.marginLeft = '10px';

			li.onclick = () => {
				const { type } = chart.config;
				if (type === 'pie' || type === 'doughnut') {
					// Pie and doughnut charts only have a single dataset and visibility is per item
					chart.toggleDataVisibility(item.index);
				} else {
					chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
				}
				chart.update();
			};

			// Color box
			const boxSpan = document.createElement('span');
			boxSpan.style.background = item.fillStyle;
			boxSpan.style.borderColor = item.strokeStyle;
			boxSpan.style.borderWidth = item.lineWidth + 'px';
			boxSpan.style.display = 'inline-block';
			boxSpan.style.height = '20px';
			boxSpan.style.marginRight = '10px';
			boxSpan.style.width = '20px';

			// Text
			const textContainer = document.createElement('p');
			textContainer.style.color = item.fontColor;
			textContainer.style.margin = 0;
			textContainer.style.padding = 0;
			textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

			const text = document.createTextNode(item.text);
			textContainer.appendChild(text);

			li.appendChild(boxSpan);
			li.appendChild(textContainer);
			ul.appendChild(li);
		});
	}
};



$(function () {
   
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
				
			},
			
			tooltips: {
				callbacks: {
					label: function (tooltipItem, data) {
						var dataset = data.datasets[tooltipItem.datasetIndex];
						var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
							return previousValue + currentValue;
						});
						var currentValue = dataset.data[tooltipItem.index];
						var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
						return percentage + "%";
					}
				}
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
			},
			tooltips: {
				callbacks: {
					label: function (tooltipItem, data) {
						var dataset = data.datasets[tooltipItem.datasetIndex];
						var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
							return previousValue + currentValue;
						});
						var currentValue = dataset.data[tooltipItem.index];
						var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
						return percentage + "%";
					}
				}
			}
		}
	

    });


	



    ajax_chart(scrollychart1, demography_chart_url);
	ajax_chart(scrollychart2, weighted_demography_chart_url);
	

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

	function chart_legend(url, data) {
		var data = data || {};

		$.getJSON(url, data).done(function (response) {
			response = JSON.parse(response)

			labels = response.map(function (e) {
				return e.Race;
			})

			const legendContainer = document.getElementById('legend')

			legendContainer.style.position = "absolute";
			legendContainer.style.bottom = "2%";
			legendContainer.style.left = 0;

			let listContainer = legendContainer.querySelector("ul");

			if (!listContainer) {
				listContainer = document.createElement("ul");
				listContainer.style.display = "flex";
				listContainer.style.flexDirection = "row";
				listContainer.style.margin = 0;
				listContainer.style.padding = 0;

				legendContainer.appendChild(listContainer);
			}

			

			
			labels.forEach((item,index)=>{
				const li = document.createElement('li');
				li.style.alignItems = 'center';
				li.style.display = 'flex';
				li.style.flexDirection = 'row';
				li.style.marginLeft = '10px';

				const boxSpan = document.createElement("span");
				boxSpan.style.background = DefaultbackgroundColor[index];
				boxSpan.style.borderColor = DefaultborderColor;
				boxSpan.id = index;
				boxSpan.style.borderWidth = '1px';
				boxSpan.style.display = "flex";
				boxSpan.style.alignItems = "center"
				boxSpan.style.justifyContent = "center"
				boxSpan.style.height = "20px";
				boxSpan.style.marginRight = "10px";
				boxSpan.style.width = "20px";

				// Text
				const textContainer = document.createElement("p");
				textContainer.style.color = '#EEE';
				textContainer.style.margin = 0;
				textContainer.style.padding = 0;
				

				const text = document.createTextNode(item);
				textContainer.appendChild(text);

				
				// boxSpan.appendChild(spantext);

				li.appendChild(boxSpan);
				li.appendChild(textContainer);
			//	ul.appendChild(li);
				listContainer.appendChild(li)
			});
			
			console.log(labels)

			return listContainer;
		})
	}


	chart_legend(demography_chart_url)

	



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

		//TODO Make this into a function that coordinates with the presentation. - DONE (1:28)
		

		scrollychart1.data.datasets[0].backgroundColor.forEach(function (item, index) {
			if (response.index===1) {		
				scrollychart1.data.datasets[0].backgroundColor[index]= scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
				scrollychart1.data.datasets[0].backgroundColor[4]= scrollychart1.data.datasets[0].backgroundColor[4].replace("0.2", "0.6")
			}
			else if (response.index===2) {		
				scrollychart1.data.datasets[0].backgroundColor[index]= scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
				scrollychart1.data.datasets[0].backgroundColor[2]= scrollychart1.data.datasets[0].backgroundColor[2].replace("0.2", "0.6")
			}
			else if (response.index===3) {
				scrollychart1.data.datasets[0].backgroundColor[index]= scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")		
				scrollychart1.data.datasets[0].backgroundColor[0]= scrollychart1.data.datasets[0].backgroundColor[0].replace("0.2", "0.6")
			}
			else {
				scrollychart1.data.datasets[0].backgroundColor[index] = scrollychart1.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
            }
			scrollychart1.update()

        })	
		
		scrollychart2.data.datasets[0].backgroundColor.forEach(function (item, index) {
			if (response.index===1) {		
				scrollychart2.data.datasets[0].backgroundColor[4]= scrollychart2.data.datasets[0].backgroundColor[4].replace("0.2", "0.6")
			}
			else if (response.index===2) {		
				scrollychart2.data.datasets[0].backgroundColor[2]= scrollychart2.data.datasets[0].backgroundColor[2].replace("0.2", "0.6")
			}
			else if (response.index===3) {		
				scrollychart2.data.datasets[0].backgroundColor[0]= scrollychart2.data.datasets[0].backgroundColor[0].replace("0.2", "0.6")
			}
			else {
				scrollychart2.data.datasets[0].backgroundColor[index] = scrollychart2.data.datasets[0].backgroundColor[index].replace("0.6", "0.2")
            }
			scrollychart2.update()

		})	



		//This highlights the legend item in correspondence with the pie piece.
		let legend = document.getElementById('legend')
		let spans = legend.getElementsByTagName('span')
		

		for (let span of spans) {
			id = parseInt(span.id.slice(-1))
			if (id === 4 && response.index === 1 ) {
				span.style.background = span.style.background.replace("0.2", "0.8")
			}
			else if (response.index === 2 && id === 2) {
				span.style.background = span.style.background.replace("0.2", "0.8")
			}
			else if (response.index === 3 && id === 0) {
				span.style.background = span.style.background.replace("0.2", "0.8")
			}
			else {
				span.style.background = span.style.background.replace("0.8", "0.2")
			}
			

		}	

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

