const updateAngleGraph = function () {
  data.datasets[0].data.push(getReference());
  data.datasets[1].data.push(getAngle())
  inputdata.datasets[0].data.push(input)
  inputdata.labels.push("");
  data.labels.push("");

  myChart.update();
  myChart2.update()
  data.datasets[0].data.shift();
  data.datasets[1].data.shift()
  data.labels.shift();

  inputdata.datasets[0].data.shift()
  inputdata.labels.shift();
  // console.log(data.datasets[0].data)
};

const data = {
  labels: Array(200).fill(""),
  datasets: [
    {
      label: "Reference",
      backgroundColor: "rgb(255, 0, 0)",
      borderColor: "rgb(255, 0, 0)",
      data: Array(200).fill(0),
    },
    {
        label: "Angle",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
        data: Array(200).fill(0),
    }
  ],
};

//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 're',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   };
const config = {
  type: "line",
  data: data,
  options: {
    scales: {
    y:{
        suggestedMin: -3.1416,
        suggestedMax: 3.1416,
    }
    },
    animation: false,
    elements: {
        point:{
            radius: 0
        }
    },
  },
};

const inputdata = {
  labels: Array(200).fill(""),
  datasets: [
    {
        label: "Input (Torque)",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
        data: Array(200).fill(0),
    }
  ],
};
const config2 = {
    type: "line",
    data: inputdata,
    options: {
      scales: {
      y:{
          min: -30,
          max: 30,
      }
      },
      animation: false,
      elements: {
          point:{
              radius: 0
          }
      },
    },
  };
const myChart = new Chart(document.getElementById("myChart1"), config);
const myChart2 = new Chart(document.getElementById("myChart2"), config2);
setInterval(updateAngleGraph, 50);

