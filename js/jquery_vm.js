/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//wstawienie team_edit.php do div na stronie index z parametrem GET
$(document).ready(function(){

    $(document).on("click", ".screen_loader_button", function(){
        var id_druzyna = $(this).val();  
        $("#screen_loader").load("team_edit.php?" + $.param( { //? oraz $.param - zamiana na metodę GET przy load
            id_druzyna: id_druzyna
        } ));
    });
    
});

//przysłanie parametrów zawodników na podst id_druzyna (LOAD) i wstanie do inputów
$(document).ready(function(){
    
    $(document).on("change", "#team_to_edit", function(){
        var id_druzyna = $(this).val();
        if(id_druzyna > 0)
        {
            $.ajax({
                url: "team_editLoadAction.php",
                method: "POST",
                data: {id_druzyna:id_druzyna},
                dataType: "JSON",
                success: function(data){                                  
                    console.log(data);
                    var j = 0;
                    //var i = 0;
                    //var arr_letters = ["aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "as", "at", "au", "aw", "ax", "ay", "az", "ba", "bb", "bc", "bd", "be", "bf", "bg", "ah", "ai"];
                    data.forEach(function(dt){
                        //pole = "#a"+j;
                        //dt jest moim poziomym row z JSON
                        jQuery.each(dt, function(col, val_1) {  
                            pole = "#"+col+"_"+j;
                            //pole = "#"+arr_letters[i]+j;
                            $(pole).val(val_1); 
                            ////$(pole).val(this);
                            //i++;
                        });
                        //$(pole).val(dt.nazwisko);
                        //i = 0;
                        j++;
                    });
                }
            })
        }
    });    
});

//PRZYKLADY LOOP W JSON!
/* var arr = [ "one", "two", "three", "four", "five" ];
 var obj = { one:1, two:2, three:3, four:4, five:5 };

 jQuery.each(arr, function() {
   $("#" + this).text("My id is " + this + ".");
   return (this != "four"); // will stop running to skip "five"
 });

 jQuery.each(obj, function(i, val) {
   $("#" + i).append(document.createTextNode(" - " + val));
 });*/

