$(document).ready(function(){
  var apiUrl = 'http://157.230.17.132:4013/sales';
  $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(data){


        var arrayMesi = [];
        for (var i = 0; i < data.length; i++) {
          var dataApi = data[i].date;
          var prendiMese = moment(dataApi);
          var meseVendita = prendiMese.format('DD/MMMM/YYYY'); //il problema è nel formato, dovrei riuscire a dire a moment.js che la data che riceve è nel formato DD/MM/YYYY e poi pushare il solo mese MMMM
          arrayMesi.push(meseVendita)
        }

        console.log(arrayMesi);

        var ctx = $('#myChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: arrayMesi,//["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            // Configuration options go here
            options: {}
        });
      },
      error: function(){
        alert('errore');
      }
    })



});
