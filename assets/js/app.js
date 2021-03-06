$(document).ready(function() {
//vars
  var allHolidays = $('.srAllHolidays');
  var srLoading = $('.srLoading');

//get no laborables
  $.ajax({
    url: 'http://nolaborables.com.ar/API/v1/actual',
    dataType: 'json',
    type: 'GET',
    success: function(data){
      srLoading.hide();
      //Datos a mostrar en la columna izquierda
      var srJson ='';
      for( x in data ){

        srJson+='<div id='+'hd-'+x+' class="srHolidaysList srHide"><a class="srCloseDetail">X</a>';
        srJson+='<div class="srHolidayDate">';
        srJson+='<span class="srHolidayDay">'+data[x].dia+'</span>';
        srJson+='<span class="srHolidayMonth"><b>Fecha:</b> '+data[x].dia+'-'+data[x].mes+'</span>';
        srJson+='</div>';
        srJson+='<div class="srHolidayDescription">';
        srJson+='<span class="srHolidayMotivo">'+data[x].motivo+'</span>';
        srJson+='</div>';
        srJson+='<span class="srHolidayAdd"><b>Tipo: </b>'+data[x].tipo+'</span>';
        if(data[x].traslado !=null) {
        srJson+='<span class="srHolidayAdd"><b>Traslado: </b>'+data[x].traslado+'</span>';
        }
        if(data[x].opcional !=null && data[x].religion !=null) {
          srJson+='<span class="srHolidayAdd"><b>Opcional: </b>'+data[x].opcional+'</span>';
          srJson+='<span class="srHolidayAdd"><b>Religión: </b>'+data[x].religion+'</span>';
        }
        
        srJson+='</div>';
      }

      //Armando arreglo
      var ArrayFeriados = data;
      var events = [];

      for (var k = 0; k < ArrayFeriados.length; k++) {
        var mes = "";
        var dia = "";
        if(ArrayFeriados[k]["mes"]<10){
          mes = "0" + ArrayFeriados[k]["mes"];
        }
        else{
          mes = ArrayFeriados[k]["mes"];
        }
        if(ArrayFeriados[k]["dia"]<10){
          dia = "0" + ArrayFeriados[k]["dia"];
        }
        else{
          dia = ArrayFeriados[k]["dia"];
        }
        events.push({
            id: "hd-"+k,
            title: ArrayFeriados[k]["motivo"],
            start: (new Date()).getFullYear()+'-'+mes+'-'+dia,
            color: '#d0ddcc',
            textColor: '#000'
        });
      }
      allHolidays.append(srJson);
      var actualYear = (new Date()).getFullYear();
      var startYear = actualYear+'-'+'01'+'-'+'01';
      var endYear = actualYear+'-'+'12'+'-'+'31';
      //init calendar
      $('#calendar').fullCalendar({
        validRange: {
        start: startYear,
        end: endYear
        },
        eventClick: function(calEvent, jsEvent, view) {
    
        $('#'+calEvent.id+'').removeClass('srHide');
        },
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listMonth'
      },
        events: events
      });
        var srClose = $('.srCloseDetail');
        srClose.click(function() {
          var closeHoliday = $(this).parent().attr('id');
          $('#'+closeHoliday).addClass('srHide');
        });
    },
    error: function(data){
    },
});



});
