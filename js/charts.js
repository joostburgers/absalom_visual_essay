
  //BAR CHART
const ctl = document.getElementById('barChart').getContext('2d');
const data_3 = {
  labels: ["Moby Dick (H. Melville)", "Huckleberry Finn (M. Twain)", "The Great Gatsby (F.S. Fitzgerald)", "Absalom, Absalom! (W. Faulkner)", "Beloved (T. Morrison)"],
  datasets: [{
    label: 'Average Sentence Length in American Classics',
    data: [22, 19, 14, 50, 12],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

var contextBar = document.getElementById('barChart').getContext("2d");

var barChart = new Chart(sentence, {
  type: 'bar',
  data: {
      labels: ["Moby Dick (H. Melville)", "Huckleberry Finn (M. Twain)", "The Great Gatsby (F.S. Fitzgerald)", "Absalom, Absalom! (W. Faulkner)", "Beloved (T. Morrison)"],
      datasets: [{
          data: [22, 19, 14, 50, 12],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
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


  