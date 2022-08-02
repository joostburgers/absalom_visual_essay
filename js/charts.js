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
  
  // TREEMAP CHART (RACE HIERARCHY) BEGINS

  //SCROLLY PIE BEGINS


const ctv = document.getElementById('scrollychart1');
const scrollychart1 = new Chart(ctv, {
    type: 'doughnut',
    data: {
        labels: ['White', 'Black', 'Mixed Ancestry', 'Multiracial', 'Indian'],
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
    options: {
      legend: {
        display: false
      }
    }
});

const cty = document.getElementById('scrollychart2');
const scrollychart2 = new Chart(cty, {
    type: 'doughnut',
    data: {
      labels: ['White', 'Black', 'Mixed Ancestry', 'Multiracial', 'Indian'],
        datasets: [{
            label: 'Percentage Presence',
            data: [77, 7, 16, 0, 0],
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
    options: {
      legend: {
        display: false
      },
      },
  });
  //SCROLLY PIE ENDS


//SUNBURST


var sunburstdata = [
  {
    "type": "sunburst",
    "labels": ["Characters", "Black", "White", "Indian", "Mixed", "Multiracial",
     "Unnamed Twenty Original Sutpen Slaves", "Luster", "Unnamed Slaves of Sutpen", "Unnamed Enslaved Field Hands", "", 
    "Thomas Sutpen", "Rosa Coldfield", "Henry Sutpen", "Judith Sutpen", "",
    "Doom", "Unnamed Indians in Western Virginia", "",
  "Charles Bon", "Clytemnestra", "Mrs. Thomas Sutpen(1)", "Charles Etienne Saint-Valery Bon", "",
"Unnamed Passersby", "Unnamed Customers at Sutpen's Store", "Unnamed Four or Five Boys", "Unnamed People in the Reconstruction South", ""],

    "parents": ["", "Characters", "Characters", "Characters", "Characters", "Characters", 
    "Black", "Black", "Black", "Black", "Black", 
    "White", "White", "White", "White", "White",
    "Indian", "Indian", "Indian",
    "Mixed", "Mixed", "Mixed", "Mixed", "Mixed",
    "Multiracial", "Multiracial", "Multiracial", "Multiracial", "Multiracial",],
    "values":  [9, 8, 7, 6, 5, 4, 3, 2, 1],
        "leaf": {"opacity": 0.4},
    "marker": {"line": {"width": 2}},
    "branchvalues": 'total'
  }];

  
  var layout = {
    "paper_bgcolor":'rgba(0,0,0,0)',
    "plot_bgcolor":'rgba(0,0,0,0)',
    "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
  };
  
  
  Plotly.newPlot('sunburst', sunburstdata, layout, {showSendToCloud: true})
  
  myPlot = document.getElementById("sunburst");
  