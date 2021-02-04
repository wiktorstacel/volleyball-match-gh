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
        $("#screen_loader input").removeAttr('style');
        $("#team_loader_message").html("");       
        var id_druzyna = $(this).val();
        if(id_druzyna > 0){       
            $.ajax({
                url: "team_editLoadAction.php",
                method: "POST",
                data: {id_druzyna:id_druzyna},
                dataType: "JSON",
                success: function(data){                                  
                    //console.log(data);
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

//SENDING JSON TO PHP. Walidacja i zapis paramentrów zawodników edytowanej drużyny (nie ładowanie danych)
$(document).ready(function(){
    
    $(document).on("click", "#team_loader_submit",function(){
        var dataSend = createJSON();
        console.log(dataSend);
        $.post("team_editSaveAction.php", {
            dataSend: dataSend
        }, function(data, status){
            $("#team_loader_message").html(data);
        });
    });
    
});

//CREATE JSON FILE for >>25<< parameters of each playaer
function createJSON() {//jak wykorzystać indeksy?
    jsonObj = [];
    pole = "input[name=zaw]";
    //var count = $("input[name=zaw]");alert(count.length);
    var i = 0;
    item = {}
    $(pole).each(function() { //przyklad z inserance-agent $('input[name="language"]:checked').each(function()
        i++;
        var id = $(this).attr("class"); //var id = this.getAttribute('title');
        var value = $(this).val();
       
        item [id] = value; 
        if(i == 25){  //UWAGA: gdyby zmieniła się liczba parametrów zawodnika zmienić TUTAJ >>25<< !
            jsonObj.push(item);
            i = 0;
            item = {} //RESETOWANIE Item() - bez resetowania i tak się zakończy, bo potem powtarzają się indeksy
        }       
    });
    //jsonObj.push(item);
    //console.log(jsonObj);
    return jsonObj;
}

//PRZYKLAD1 tworzenia JSON
/*var obj = [];
var elems = $("input[class=email]");

for (i = 0; i < elems.length; i += 1) {
    var id = this.getAttribute('title');
    var email = this.value;
    tmp = {
        'title': id,
        'email': email
    };

    obj.push(tmp);
}*/

//PRZYKLAD2 tworzenia JSON
/*function createJSON() {
    jsonObj = [];
    $("input[class=email]").each(function() { //przyklad z inserance-agent $('input[name="language"]:checked').each(function()

        var id = $(this).attr("title"); //var id = this.getAttribute('title');
        var email = $(this).val();

        item = {}
        item ["title"] = id;
        item ["email"] = email;

        jsonObj.push(item);
    });

    console.log(jsonObj);
}*/

//przyładowanie selectów na stronie wypo tym jak w drugim wybraną drużynę
$(document).ready(function(){
    
    $(document).on("change", "#team_choose1", function(){       
        var id_druzyna_not = $(this).val();
        var id_druzyna_choose = $("#team_choose2").val();
            $("#team_choose2").load("insert_teamsNot1.php", {
            id_druzyna_not: id_druzyna_not,
            id_druzyna_choose: id_druzyna_choose
        });
    }); 
    
    $(document).on("change", "#team_choose2", function(){       
        var id_druzyna_not = $(this).val();
        var id_druzyna_choose = $("#team_choose1").val();
            $("#team_choose1").load("insert_teamsNot1.php", {
            id_druzyna_not: id_druzyna_not,
            id_druzyna_choose: id_druzyna_choose
        });
    });
    
});

//przysłanie danych z komentarza
$(document).ready(function(){
    
    $('#comment_form').on('submit', function(event){
        event.preventDefault();                                     //wyłącza domyślne action i method 
        var form_data = $(this).serialize(); //convert to string      
            $.ajax({
                url: "comment_addAction.php",
                method: "POST",
                data: form_data,
                //dataType: "JSON",
                beforeSend:function(){
                    $('#button_add_comment').attr('disabled','disabled');
                },
                success: function(data){
                    $('#button_add_comment').attr('disabled', false);
                    $('#comment_message').html(data);
                    var n_data = data.search("Komentarz dodany.");//szuka ciagu znakow w odpowiedzi z php
                    if(n_data != -1)
                    {
                        load_comment();
                        var parent_id = $('#comment_parent_id').val();
                        if(parent_id > 0)
                        {
                        var comment_to_reply_id = $('#comment_to_reply').html();//odczyt diva nad texarea jesli to odpowiedz na komentarz
                        var element = document.getElementById(comment_to_reply_id);
                        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        }
                    }
                }
            });
    });
    
    load_comment();
    
    function load_comment(){
        $.ajax({
            url: "comment_fetch.php",
            method: "POST",
            success: function(data){
                $('#comments_container').html(data);
            }
        });
    }
    
});

//załadowanie danych do formularza komentarzy po naciśnięciu 'odpowiedz'
$(document).ready(function(){
    
    $(document).on('click', '.button_reply_comment_main', function(){                                   //wyłącza domyślne action i method  
        var comment_id = $(this).val();
        var comment_text = $(this).attr("name");
        //alert(comment_text);
        $("#button_add_comment").prop( "disabled", false );
        $('#comment_parent_id').val(comment_id);
        $('#comment_to_reply').html(comment_text);
        $('#comment_content').attr("placeholder", "Tutaj wpisz odpowiedź...").val("").prop( "disabled", false ).focus();//EXAMPLE: $("#serMemtb").attr("placeholder", "Type a Location").val("").focus().blur();
        $('#comment_user_name').val("").prop( "disabled", false );
        grecaptcha.reset();
        $('#comment_message').html("");
        window.scrollBy(0, 0);
    });
    
        $(document).on('click', '.button_reply_comment_reply', function(){                                   //wyłącza domyślne action i method  
        var comment_id = $(this).val();
        var comment_text = $(this).attr("name");
        var comment_user = $(this).attr("id");
        //alert(comment_text);
        $("#button_add_comment").prop( "disabled", false );
        $('#comment_parent_id').val(comment_id);
        $('#comment_to_reply').html(comment_text);
        $('#comment_content').attr("placeholder", "Tutaj wpisz odpowiedź...").val("@"+comment_user+". ").prop( "disabled", false ).focus();//EXAMPLE: $("#serMemtb").attr("placeholder", "Type a Location").val("").focus().blur();
        $('#comment_user_name').val("").prop( "disabled", false );
        grecaptcha.reset();
        $('#comment_message').html("");
        window.scrollBy(0, 0);
    });
    
});