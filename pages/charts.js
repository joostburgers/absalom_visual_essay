// TREEMAP CHART (RACE HIERARCHY) BEGINS
// fetch("./data/character_demography_chart.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(jsondata => console.log(jsondata));

function colorFromValue(value, border) {
    var alpha = (1 + Math.log(value)) / 5;
    var color = "#b55400";
    if (border) {
      alpha += 0.01;
    }
    return Chart.helpers.color(color)
      .alpha(alpha)
      .rgbString();
  }
  
  const ctx = document.getElementById('racechart');
  const racechart = new Chart(ctx, {
    type: "treemap",
    data: {
      datasets: [
        {
          label: "Race Hierarchy Treemap",
          data: [5, 10],
          backgroundColor: function(ctx) {
            return colorFromValue(ctx.dataset.data[ctx.dataIndex].v);
          },
          borderColor: function(ctx) {
            return colorFromValue(ctx.dataset.data[ctx.dataIndex].v, true);
          },
          spacing: 0.1,
          borderWidth: 2,
          borderColor: "rgba(180,180,180, 0.15)"
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true
      },
      tooltips: {
        callbacks: {
          title: function(item, data) {
            return '';
          },
          label: function(item, data) {
            var dataset = data.datasets[item.datasetIndex];
            var dataItem = dataset.data[item.index];
            return dataItem.v;
          }
        }  
      }    
    }
  });
  const cty = document.getElementById('racechart2');
  const racechart2 = new Chart(cty, {
    type: "treemap",
    data: {
      datasets: [
        {
          label: "Race Hierarchy Treemap",
          data: [100, 75, 25, 6, 6, 5, 4, 3, 2, 2, 1],
          backgroundColor: function(cty) {
            return colorFromValue(cty.dataset.data[cty.dataIndex].v);
          },
          borderColor: function(cty) {
            return colorFromValue(cty.dataset.data[cty.dataIndex].v, true);
          },
          spacing: 0.1,
          borderWidth: 2,
          borderColor: "rgba(180,180,180, 0.15)"
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true
      },
      tooltips: {
        callbacks: {
          title: function(item, data) {
            return '';
          },
          label: function(item, data) {
            var dataset = data.datasets[item.datasetIndex];
            var dataItem = dataset.data[item.index];
            return dataItem.v;
          }
        }  
      }    
    }
  });

  // TREEMAP CHART (RACE HIERARCHY) BEGINS

  //SCROLLY PIE BEGINS


const ctv = document.getElementById('scrollychart');
const scrollychart = new Chart(ctv, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
});
  //SCROLLY PIE ENDS
  const ctu = document.getElementById('racepie');
const racepie = new Chart(ctu, {
    type: 'doughnut',
    data: {
        labels: ['Black', 'White', 'Mixed', 'Multiracial', 'Indian'],
        datasets: [{
            label: 'Character Demography',
            data: [101, 36, 9, 5, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
});
  //SCROLLY PIE ENDS
