<?php

require ('strona_man.inc');

class index extends Strona1
{
  public function WyswietlTresc()
  {
    echo '<div id="TRESC">';
    //print_r($_GET);
    //echo '<form method="get" action="play/play3.php" onsubmit="if(check_play()) return true; return false">';

    echo '<form method="get" action="plansza_1mecz.php">';
    //echo '<--! Here starts the table with team names and checkboxes !-->';
    echo "<table>";
    require 'config_db.php';
    $result = mysqli_query($conn, "SELECT * FROM druzyna ORDER BY id_druzyna DESC");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedĽ serwera: '.mysql_error($conn);}
    $num_rows = mysqli_num_rows($result);

            while($row = mysqli_fetch_array($result, MYSQLI_NUM))
            {
              $kraj = mysqli_query($conn, "SELECT nazwa FROM kraj WHERE id_kraj='".$row[1]."'");   //'".$row[1]."'
              $kraj1=mysqli_fetch_array($kraj) ;

              $liga = mysqli_query($conn, "SELECT nazwa FROM liga WHERE id_liga='".$row[2]."'");   //'".$row[1]."'
              $liga1=mysqli_fetch_array($liga) ;

              echo "<tr>";
              print("<td class=\"nazwa\">$row[3]</td>");
              print("<td class=\"nazwa\">".$liga1["nazwa"]."</td>");
              print("<td class=\"nazwa\">".$kraj1["nazwa"]."</td>");
              print("<td><input type=\"checkbox\" name=\"id$row[0]\" value=\"$row[0]\" /></td>");
              echo '</tr>';
            }
            
    echo '<tr>';
    echo '<input type="hidden" name="number_of_teams" value="'.$num_rows.'" />';
    echo '</tr>';
    
    echo '</table>';
    //print("<label>Trener1<input type=\"checkbox\" name=\"trener1\" value=\"\" onclick=\"this.form.elements['obserwator'].disabled = this.checked, this.form.elements['trener2'].disabled = this.checked\"/></label>");
    //print("<label>Obserwator<input type=\"checkbox\" name=\"obserwator\" value=\"\" onclick=\"this.form.elements['trener1'].disabled = this.checked, this.form.elements['trener2'].disabled = this.checked\"/></label>");
   // print("<label>Trener2<input type=\"checkbox\" name=\"trener2\" value=\"\" onclick=\"this.form.elements['trener1'].disabled = this.checked, this.form.elements['obserwator'].disabled = this.checked\"/></label>");
	//print("<td class=\"ekran\"><input name=\"ekran\" id=\"ekran\"/></td>");
    echo '<label style="padding: 3px 4px 0 0;"><input id="" type="radio" name="opcja_gry" value="tres1">trener1</label>'; 
    echo '<label style="padding: 3px 4px 0 0;"><input id="" type="radio" name="opcja_gry" value="neutral">obserwator</label>';
    echo '<label style="padding: 3px 4px 0 0;"><input id="" type="radio" name="opcja_gry" value="tres2">trener2</label>';
    echo '<button type="submit">Zagraj 1 mecz</button>';
    
	
    echo '</form>';
        echo '<br />Zagraj 1 sezon<br />';
	echo '<br /><a href="operacje/czysc_sezon.php">Czyść sezon</a>';
	echo '<br /><a href="kalen.php">Rób terminarz</a><br>';
    $result = mysqli_query($conn, "SELECT * FROM druzyna ORDER BY id_druzyna ASC");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedĽ serwera: '.mysql_error($conn);}
    while($row = mysqli_fetch_array($result, MYSQLI_NUM))
    {
        echo '<a href="team_edit.php?id_druzyna='.$row[0].'">'.$row[3].'</a>=> ';
        echo '<button class="screen_loader_button" value='.$row[0].'>LOAD</button> |';
    }
    echo '</div>';
    
    //for testing
    echo '<br><div id="screen_loader">';
    echo '<button class="screen_loader_button" value=0 >LOAD FILE</button>';
    echo '</div>';
  }
}

$index = new index(); 

$index -> title = 'Volleyball match - strona główna';

$index -> keywords = 'siatkówka, volleyball, gra, mecz, symulator';

$index -> description = 'Gra - symulator meczu siatkówki';

$index -> Wyswietl();
?>
