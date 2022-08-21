var contextBar = document.getElementById('barchart').getContext("2d");

	var barchart1 = new Chart(contextBar, {
       type: 'bar',
       data: {
           labels: ["Moby Dick (H. Melville)", "Huckleberry Finn (M. Twain)", "The Great Gatsby (F.S. Fitzgerald)", "Absalom, Absalom! (W. Faulker)", "Beloved (T. Morrison)"],
           datasets: [{
               data: [22, 19, 14, 50, 12],
               backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
               borderColor: DefaultborderColor,
               borderWidth: DefaultborderWidth
           }]

       },
       options: {
		responsive: true,
           legend: {
               display: false
            },
            scales: {
                  xAxes: [
                    {
                      display: false,
                    },
                  ],
                },
              },
	});

