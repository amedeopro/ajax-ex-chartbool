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




    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data){


          var arrayVenditori = [];
          var arrayImporti = [];


          for (var i = 0; i < data.length; i++) {
            var vendorsApi = data[i].salesman;
            var importiApi = data[i].amount;


            if (!arrayVenditori.includes(vendorsApi) && !arrayImporti.includes(importiApi)) {

              arrayVenditori.push(vendorsApi);
              arrayImporti.push(importiApi);

            }

          }

          console.log(arrayVenditori);
          console.log(arrayImporti);
          console.log(totaleVendite(arrayImporti));

          var ctx = $('#myChart2');
          var chart = new Chart(ctx, {
              // The type of chart we want to create
              type: 'doughnut',

              // The data for our dataset
              data: {
                  labels: arrayVenditori,//["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [{
                      label: arrayVenditori,
                      backgroundColor: ['blue','yellow','red','green'],
                      borderColor: 'rgb(255, 99, 132)',
                      data: arrayImporti,
                  }]
              },

              // Configuration options go here
              options: {
                cutoutPercentage: 20,
              }
          });



        },
        error: function(){
          alert('errore');
        }
      })

      function totaleVendite(array){
        var totale = 0;

        for (var i = 0; i < array.length; i++) {
          totale += array[i];
        }

        return totale;
      }



});
