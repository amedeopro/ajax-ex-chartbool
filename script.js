$(document).ready(function(){
  var apiUrl = 'http://157.230.17.132:4013/sales';
  $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(data){


        var arrayMesi = [];
        var arrayImporti = [];

        for (var i = 0; i < data.length; i++) {
          var dataApi = data[i].date;
          var importiApi = data[i].amount;
          var prendiMese = moment(dataApi, 'DD/MM/YYYY');
          var meseVendita = prendiMese.format('MMMM');
          
          if (!arrayMesi.includes(meseVendita) && !arrayImporti.includes(importiApi)) {

            arrayMesi.push(meseVendita);
            arrayImporti.push(importiApi);

          }
        }

        console.log(arrayMesi);
        console.log(arrayImporti);

        var ctx = $('#myChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: arrayMesi,//["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Vendite totali per mese",
                    backgroundColor: '',
                    borderColor: 'rgb(255, 99, 132)',
                    data: arrayImporti,
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
