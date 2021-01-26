<?php

require ('strona_man.inc');

class index extends Strona1
{
  public function WyswietlTresc()
  {
    echo '<div id="TRESC">';
        echo '<div id="box">';
    //print_r($_GET);
    //echo '<form method="get" action="play/play3.php" onsubmit="if(check_play()) return true; return false">';

    echo '<form method="get" action="plansza_1mecz.php">';
 
    require 'config_db.php';
    //SELECT 1
    echo '<div id="div_select1">Drużyna 1<br><br>';
        echo'<select id="team_choose1" name="team_choose1">';
        $result = mysqli_query($conn, "SELECT id_druzyna, nazwa FROM druzyna ORDER BY nazwa ASC");
        if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
        while($row = mysqli_fetch_array($result, MYSQLI_NUM))
        {	
            if(this.form.elements['team_choose2'].value != $row[0])
            {
                echo '<option value='.$row[0].'>'.$row[1].'</option>';
            }
        }
        echo '<option value="0" selected="selected">-wybierz-</option></select>';
    echo '</div>';//end of select1
    
    //SELECT 2
    echo '<div id="div_select2">Drużyna 2<br><br>';
        echo'<select id="team_choose2" name="team_choose2">';
        $result = mysqli_query($conn, "SELECT id_druzyna, nazwa FROM druzyna ORDER BY nazwa ASC");
        if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
        while($row = mysqli_fetch_array($result, MYSQLI_NUM))
        {	
            echo '<option value='.$row[0].'>'.$row[1].'</option>';
        }
        echo '<option value="0" selected="selected">-wybierz-</option></select>';
    echo '</div>';//end of select2
    
    echo '<div style="clear: both;"></div>'; //CLEAR: BOTH
    
    echo '<div id="div_checkboxes">';
        //print("<label>Trener1<input type=\"checkbox\" name=\"trener1\" value=\"\" onclick=\"this.form.elements['obserwator'].disabled = this.checked, this.form.elements['trener2'].disabled = this.checked\"/></label>");
        //print("<label>Obserwator<input type=\"checkbox\" name=\"obserwator\" value=\"\" onclick=\"this.form.elements['trener1'].disabled = this.checked, this.form.elements['trener2'].disabled = this.checked\"/></label>");
       // print("<label>Trener2<input type=\"checkbox\" name=\"trener2\" value=\"\" onclick=\"this.form.elements['trener1'].disabled = this.checked, this.form.elements['obserwator'].disabled = this.checked\"/></label>");
            //print("<td class=\"ekran\"><input name=\"ekran\" id=\"ekran\"/></td>");
        echo '<label style="padding: 3px 4px 0 0;"><input id="" type="radio" name="opcja_gry" value="tres1">trener1</label>'; 
        echo '<label style="padding: 3px 4px 0 0;margin: 0 58px 0 58px;"><input id="" type="radio" name="opcja_gry" checked value="neutral">obserwator</label>';
        echo '<label style="padding: 3px 4px 0 0;"><input id="" type="radio" name="opcja_gry" value="tres2">trener2</label>';
        echo '<br><br><br><button id="button_zagraj" type="submit">Zagraj</button>';
    echo '</div>';//end of div_checkboxes
    
	
    echo '</form>';

    /**$result = mysqli_query($conn, "SELECT * FROM druzyna ORDER BY id_druzyna ASC");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedĽ serwera: '.mysql_error($conn);}
    while($row = mysqli_fetch_array($result, MYSQLI_NUM))
    {
        echo '<a href="team_edit.php?id_druzyna='.$row[0].'">'.$row[3].'</a>=> ';
        echo '<button class="screen_loader_button" value='.$row[0].'>LOAD</button> |';
    }*/
    
    //for testing
    //echo '<br><div id="screen_loader">';
    //echo '<button class="screen_loader_button" value=0 >LOAD FILE</button>';
    echo '</div>'; // end of box
    echo '</div>'; //end of TRESC
  }
}

$index = new index(); 

$index -> title = 'Mecz siatkówki - strona główna';

$index -> keywords = 'siatkówka, volleyball, gra, mecz, symulator';

$index -> description = 'Gra - symulator meczu siatkówki';

$index -> Wyswietl();
?>
