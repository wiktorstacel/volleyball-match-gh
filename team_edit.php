<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require ('strona_man.inc');

class edit_team extends Strona1
{
  public function WyswietlNaglowek()
  {
    //echo '<div id="NAGLOWEK"><p style="font-size: 36px;">Rozegraj mecz siatkówki - Plusliga</p></div>';
  }  
    
  public function WyswietlTresc()
  {
    echo '<div id="_EDIT_TEAM">';
        echo '<br><div id="screen_loader">';
    require 'config_db.php';

    if(isset($_GET['id_druzyna']))
    {
        $id_druzyna = htmlentities($_GET['id_druzyna'], ENT_QUOTES, "UTF-8");
    }
    else
    {
        $id_druzyna = 0;
    }

    //SELECT above to choose the team to edit
    echo'<select id="team_to_edit" name="team_to_edit">';
    $result = mysqli_query($conn, "SELECT id_druzyna, nazwa FROM druzyna ORDER BY id_druzyna ASC");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
    while($row = mysqli_fetch_array($result, MYSQLI_NUM))
    {
        if($row[0] != $id_druzyna)
        {	
            echo '<option value='.$row[0].'>'.$row[1].'</option>';
        }
        else
        {
            echo '<option selected="selected" value='.$row[0].'>'.$row[1].'</option>';
        }
    }
    if($id_druzyna == 0) exit();
    /*if($id_druzyna != 0)
    {
        echo'<option value="0" >-wybierz-</option></select>';
    }
    else
    {
        echo'<option value="0" selected="selected">-wybierz-</option></select>';
    }*/
    echo '</select><br><br>';
    //Loading the team to form inputs//"SELECT * FROM zawodnik z, pozycja p WHERE z.id_pozycja=p.id_pozycja AND z.id_druzyna='%d' ORDER BY nazwisko ASC"
    //COLUMN NAMES
    $result = mysqli_query($conn, 
        sprintf("SELECT * FROM zawodnik z WHERE z.id_druzyna='%d' ORDER BY nazwisko ASC",
        mysqli_real_escape_string($conn, $id_druzyna)));
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    $row = mysqli_fetch_assoc($result);    

    foreach ($row as $col => $val) 
    {
        echo '<input id="" disabled type="text" class="'.$col.' col_name" name="" value="'.$col.'" />';
    }
    echo '<br>';
    //VALUES
    $result = mysqli_query($conn,
            sprintf("SELECT * FROM (
                        SELECT *, 1 sortby FROM zawodnik z WHERE z.id_druzyna='%d' AND z.7>0 
                        UNION ALL 
                        SELECT *, 2 sortby FROM zawodnik z WHERE z.id_druzyna='%d' AND z.7=0) AS i
                    ORDER BY sortby, i.7 ASC, i.12 DESC",
            mysqli_real_escape_string($conn, $id_druzyna),
            mysqli_real_escape_string($conn, $id_druzyna)
            ));
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    /*$j = 1;
    $arr_letters = array("aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "as", "at", "au", "aw", "ax", "ay", "az", "ba", "bb", "bc", "bd", "be", "bf", "bg", "ah", "ai");
    while($row = mysqli_fetch_array($result, MYSQLI_NUM))
    {
        $length = count($row);
        for ($i = 0; $i < $length; $i++) 
        {
            //print $row[$i];
            echo '<input id="'.$arr_letters[$i].$j.'" type="text" style="width: 40px;" name="" value="'.$row[$i].'" />';
        }
        $j++;
        echo'<br>';
    }*/

    $j = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $val_length = count($row);
        $counter = 0;
        foreach ($row as $col => $val) 
        {
            if($counter < ($val_length-1))
            {
                echo '<input id="'.$col.'_'.$j.'" type="text" class="'.$col.'" name="zaw" value="'.$val.'" />';
            }
            $counter++;
        }
        echo '<br>';
        $j++;
    }


    echo'<br /><button id="team_loader_submit" type="submit" onclick="" value="" />Zapisz</button>';

    echo'<br /><p id="team_loader_message"></p>';


//EXAMPLE:
//https://stackoverflow.com/questions/15470191/how-to-use-order-by-with-union-all-in-sql
/*
SELECT  * 
FROM 
        (
            SELECT * FROM TABLE_A 
            UNION ALL 
            SELECT * FROM TABLE_B
        ) dum
-- ORDER BY dum.nazwisko ASC */
//but if you want to have all records from Table_A on the top of the result list, 
//the you can add user define value which you can use for ordering,
/*
SELECT  * 
FROM 
        (
            SELECT *, 1 sortby FROM TABLE_A 
            UNION ALL 
            SELECT *, 2 sortby FROM TABLE_B //UWAGA: dodanie 1 i 2 robi dodatkową kolumnę w wynikach *
        ) dum
ORDER   BY sortby, dum.nazwisko ASC
*/    
            echo '</div>';//end of screen loaderscreen_loader
        echo '</div>';
  }
}

$edit_team = new edit_team(); 

$edit_team -> title = 'Mecz siatkówki - edycja drużyn';

$edit_team -> keywords = 'siatkówka, volleyball, gra, mecz, symulator';

$edit_team -> description = 'Gra - symulator meczu siatkówki';

$edit_team -> Wyswietl();
?>


