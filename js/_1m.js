/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var play_1mecz = 0;//alert(play_1mecz);

//ustaw flagę na potrzeby rozegrania 1 meczu aby omijać wypisywanie danych na ekran i zapis do MySQL
function Set_play_1mecz(){
    play_1mecz = 1;
}

//uzależnienie disable zmiana od checkboxa trener_on
$(document).ready(function(){
    
    $(document).on("change", "#tres1", function(){
        var value_1 = $(this).prop('checked');
        $("#button_zmiana1").prop( "disabled", value_1);
        if(value_1 == true)
        {
            document.getElementById("tktz1.1").disabled = "disabled";
            document.getElementById("tktz1.2").disabled = "disabled";
            document.getElementById("tktz1.3").disabled = "disabled";
            document.getElementById("tktz1.4").disabled = "disabled";
        }
        else
        {
            document.getElementById("tktz1.1").disabled = "";
            document.getElementById("tktz1.2").disabled = "";
            document.getElementById("tktz1.3").disabled = "";
            document.getElementById("tktz1.4").disabled = "";           
        }
    });
    
});


