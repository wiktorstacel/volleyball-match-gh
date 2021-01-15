/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var play_1mecz = 0;//alert(play_1mecz);

//ustaw flagę na potrzeby rozegrania 1 meczu aby omijać wypisywanie danych na ekran i zapis do MySQL
function Set_play_1mecz(){
    play_1mecz = 1;
    document.getElementById('screen3').style.visibility = "hidden";
    document.getElementById('screen6').style.visibility = "hidden";
}

function Set_non_hidden1(){
    if(document.getElementById('history1_ch').checked)
    {
        document.getElementById('screen3').style.visibility = "";
    }
    else
    {
        document.getElementById('screen3').style.visibility = "hidden";
    }  
}
function Set_non_hidden2(){
    if(document.getElementById('history2_ch').checked)
    {
        document.getElementById('screen6').style.visibility = "";
    }
    else
    {
        document.getElementById('screen6').style.visibility = "hidden";
    }  
}

//uzależnienie disable zmiana od checkboxa trener_on
$(document).ready(function(){
    
    $(document).on("change", "#tres1", function(){
        var value_1 = $(this).prop('checked');
        $("#button_zmiana1").prop( "disabled", value_1);
        //$("#button_zmiana1").hide();
        //$("#button_zmiana1").css("display", "none");
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


