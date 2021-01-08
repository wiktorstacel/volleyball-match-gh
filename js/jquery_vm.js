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

//wstawienie team_edit.php do div na stronie index z parametrem GET
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
                    
                    data.forEach(function(dt){
                        pole = "#a"+dt.id_zawodnik;
                        $(pole).val(dt.nazwisko);
                    });
                    /*$("#wp0").val(data.nazwa);
                    $("#wp1").val(data.rodzaj_id);
                    $("#wp2").val(data.wojewodztwo_id);
                    //$('#wp3').val(data.miejscowosc_id); //wstawiane poniżej w insert_miasto
                    //$('#wp4').text(data.nazwa);//nowa miejscowość - nigdy nie będzie używane
                    $("#wp5").val(data.ulica);
                    $("#wp6").val(data.powierzchnia);
                    $("#wp7").val(data.cena);
                    $("#wp8").val(data.opis);
                    insert_miasto(2, data.wojewodztwo_id, data.miejscowosc_id);*/
                }
            })
        }
    });
    
});

