$(document).ready(function(){


  var apiUrl = 'http://157.230.17.132:4013/sales';
  $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(data){

          graficoLine(data);
          graficoPie(data);

      },
      error: function(){
        alert('errore');
      }
    })

    $('#myButton').click(function(){
      var venditoreScelto = $('.venditori').val();
      var meseScelto = $('.mesi').val();
      var importoScelto  = $('#nuovaVendita').val();

      $.ajax({
          url: apiUrl,
          method: 'POST',
          data:{
            salesman: venditoreScelto,
            date: meseScelto,
            amount: importoScelto
          },
          success: function(data){

              graficoLine(data);
              graficoPie(data);

          },
          error: function(){
            alert('errore');
          }
        })
    })



      function totaleVendite(array){
        var totale = 0;

        for (var i = 0; i < array.length; i++) {
          totale += array[i];
        }

        return totale;
      }

      function graficoLine(risultato){

                var oggettoVendite = {
                    January: 0,
                    February: 0,
                    March: 0,
                    April: 0,
                    May: 0,
                    June: 0,
                    July: 0,
                    August: 0,
                    September: 0,
                    October: 0,
                    November: 0,
                    December: 0
                };

                for (var i = 0; i < risultato.length; i++) {
                  var dataApi = risultato[i].date;
                  var importiApi = risultato[i].amount;
                  var prendiMese = moment(dataApi, 'DD/MM/YYYY');
                  var meseVendita = prendiMese.format('MMMM');

                  oggettoVendite[meseVendita] += importiApi

                }

                  var arrayMesi = [];
                  var arrayImporti = [];

                  for (var mese in oggettoVendite) {
                    arrayMesi.push(mese);
                    arrayImporti.push(oggettoVendite[mese])
                  }
                  console.log(arrayImporti)

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
      }

      function graficoPie(risultato){

                  var oggettoProcessato = {}

                  for (var i = 0; i < risultato.length; i++) {
                    var vendorsApi = risultato[i].salesman;
                    var importiApi = risultato[i].amount;


                    if (oggettoProcessato[vendorsApi] == undefined) {

                      oggettoProcessato[vendorsApi] = 0;

                    }

                    oggettoProcessato[vendorsApi] += importiApi;

                  }

                  var arrayVenditori = [];
                  var arrayImporti = [];

                  for (var nomeVenditore in oggettoProcessato) {

                    arrayVenditori.push(nomeVenditore);
                    arrayImporti.push(oggettoProcessato[nomeVenditore]);

                  }

                  for (var i = 0; i < arrayVenditori.length; i++) {
                    $('.venditori').append('<option>' + arrayVenditori[i] + '</option>' )
                    arrayVenditori[i]
                  }

                  var arrayPercentuali = [];
                  var totSales = totaleVendite(arrayImporti)

                  for (var i = 0; i < arrayImporti.length; i++) {
                    var num = (arrayImporti[i] / totSales)*100;
                    var numDueDecimali = num.toFixed(2);
                    arrayPercentuali.push(numDueDecimali);
                  }

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
                              data: arrayPercentuali,
                          }]
                      },

                      // Configuration options go here
                      options: {}
                  });
                }



});
