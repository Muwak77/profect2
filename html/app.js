let stopDefault='<h2>Halltestellen</h2>'//unnessecary in current implementation just in case auf expansion;
let lineDefault='<h2>KeineHaltestelle ausgewählt</h2><div class="small">Keine Haltestelle Ausgewählt</div>';
let departureDefault='<h2>Abfahrtzeiten</h2><div class="small">Keine Buslinie ausgewählt</div>';
$(document).ready(function(){

    getStops();

});



function getStops() {

    $.ajax({
        url: "http://localhost:8080/haltestellen",
        dataType: 'json',
        success: function(data) {
            let stoplist="<h2>Haltestellen</h2>";
            
            data.names.sort();
            $(data.names).each(function (){
                
                stoplist+='<a data-stop="'+this+'" class="stop">'+this+'</a><br>';
            });
            
            $("#stops").html(stoplist);
            $("#lines").html(lineDefault);
            $("#departures").html(departureDefault);
            $('.stop').click(function() {
                getLines($(this).attr("data-stop"));
            });
            
        },
        error: function() {
            retval=false;
        }

      

    });
    
}

function getLines(stop)
{
    let lines="";
    $.ajax({
        url: "http://localhost:8080/abfahrten/" + stop,
        dataType: 'json',
        success: function(data) {
                $(data).each(function(){
                    lines+='<a data-line="'+this.name+'" data-stop="'+stop+'" class="line">'+this.name+'</a><br>';
                    
                    $("#lines").html("<h2>Linien an der Haltestelle "+stop+"</h2>"+lines);
                    $("#departures").html(departureDefault);
                });

                $('.line').click(function() {
                    getDepartures($(this).attr("data-stop"),$(this).attr("data-line"));
                });

        },
        error: function() {
            retval=false;
        }

      

    });

}

function getDepartures(stop,line) {
    
    let url="http://localhost:8080/abfahrten/" + stop;
    let departures="";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            
                departures='<h2>Abfahrtzzeiten '+line+ ' ('+stop+')</h2><ul>';
                $(data).each(function(){

                    if(this.name==line) {
                        $(this.zeiten).each(function(){
                            departures+='<li>'+this+"</li>";

                        });
                        
                    }
                    
                });
                departures+='</ul>';
                $("#departures").html(departures);

        },
        error: function() {
            retval=false;
        }

      

    });


} 