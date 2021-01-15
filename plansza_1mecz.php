<?php
//Copy of plansza.php - this allow to play one match only after loading id of two teams
//Should not actual any table - after game result and stat should not be written in Mysql
session_start();
require ('strona_man.inc');
require 'config_db.php';

class strona_plansza_1mecz extends Strona1
{
    public $t1 = 0;
    public $t2 = 0;
    public function WyswietlStyle()
    {
        //UWAGA: nie pomylić plansz, ta strona ma tylko 1 css a stara plansza ma swój 1
        echo "<link rel=\"Stylesheet\" type=\"text/css\" href=\"css\plansza_css_1m.css\" />\n";
        echo "<link rel=\"Stylesheet\" type=\"text/css\" href=\"css\play_css_1m.css\" />\n";
    }
	
    public function WyswietlSkrypty()
    {
        echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';
        echo '<script language="JavaScript" type="text/javascript" src="play\play3_skrypty.js"></script>';
	echo '<script language="JavaScript" type="text/javascript" src="play\play3_sk_action.js"></script>';
        echo '<script language="JavaScript" type="text/javascript" src="skrypty_ksm.js"></script>';
	echo '<script language="JavaScript" type="text/javascript" src="skrypty_manager.js"></script>';
	echo '<script language="JavaScript" type="text/javascript" src="js\tlo_action.js"></script>';
        echo '<script language="JavaScript" type="text/javascript" src="js\_1m.js"></script>';
    }
    
    public function WyswietlTresc()
    {
	
	echo '<div id="kolumna_left">';
	
	echo '<div id="taktyki1">
	<div>Taktyka zagrywki</div>
	<div><input type="radio" name="tkt1" id="tktz1.1" onclick="" checked="checked" />brak</div>
	<div><input type="radio" name="tkt1" id="tktz1.2" onclick="" /><span id="tktzz2.2">o</span></div>
	<div><input type="radio" name="tkt1" id="tktz1.3" onclick="" /><span id="tktzz2.3">o</span></div>
	<div><input type="radio" name="tkt1" id="tktz1.4" onclick="" /><span id="tktzz2.4">o</span></div>
        <div id="asy_serw1"></div>
	</div>';
	
	echo'
	<div id="stat_team1"></div><div id="ekranik1"></div>
	<div id="zmeczenie1">
	
<div id="opis_y"><div id="opis_y_top">100</div><div id="opis_y_m">85</div><div id="opis_y_bot"></div></div>
<div id="wykres1" class="wykres">Wydajność&nbsp</div>
<div id="opis_x"><div id="opis_x10">75</div><div id="opis_x20"></div><div id="opis_x30">t</div></div>
	
	</div>
	<div id="stat_atak1"></div>
	<div id="stat_przy1"></div>
	<div id="stat_blok1"></div>
        <div id="stat_obrona1"></div>
	<div id="stat_pkt1"></div>
	<div></div>
	<div></div>';
		
	echo '</div>';//END kolumna leftteam1[i][18]+team1[i][20]+team1[i][23]+team1[i][24]+team1[i][26]
	
	echo '<div id="kolumna_right">';
	
	echo '<div id="taktyki2">
	<div>Taktyka zagrywki</div>
	<div>brak<input type="radio" name="tkt2" id="tktz2.1" onclick="" checked="checked" /></div>
	<div><span id="tktzz1.2">o</span><input type="radio" name="tkt2" id="tktz2.2" onclick="" /></div>
	<div><span id="tktzz1.3">o</span><input type="radio" name="tkt2" id="tktz2.3" onclick="" /></div>
	<div><span id="tktzz1.4">o</span><input type="radio" name="tkt2" id="tktz2.4" onclick="" /></div>
	</div>';
	
	
	
	echo '
	<div id="ekranik2"></div><div id="stat_team2"></div>
	<div id="zmeczenie2">
	
<div id="opis_y"><div id="opis_y_top">100</div><div id="opis_y_m">85</div><div id="opis_y_bot"></div></div>
<div id="wykres2" class="wykres">Wydajność&nbsp</div>
<div id="opis_x"><div id="opis_x10">75</div><div id="opis_x20"></div><div id="opis_x30">t</div></div>
	
	</div>
	<div id="stat_atak2"></div>
	<div id="stat_przy2"></div>
	<div id="stat_blok2"></div>
        <div id="stat_obrona2"></div>
	<div id="stat_pkt2"></div>
	<div></div>
	<div></div>';
	
	
	echo '</div>';//END of kolumna right
	
	echo '<div id="plac_gry">';
	
	echo '<div id="tablica_wyn">';
	echo '<div id=\'set1\'>0</div><div id=\'pun1\'></div><div id=\'show1\'>0</div>';
        echo '<div id=\'set2\'>0</div><div id=\'pun2\'></div><div id=\'show2\'>0</div>';
	echo '</div>';
        
        echo '<div id="tablica_wyn_sety">';
            //echo '0:0';
	echo '</div>';
	
	echo '<div id="boisko_p">';
	
	echo '<div id="half_left_p">';
	echo '<div id="l5" class="pole_p"></div><div class="polesl_p"></div><div id="l4" class="pole_p"></div>
		  <div id="l6" class="pole_p"></div><div class="polesl_p"></div><div id="l3" class="pole_p"></div>
		  <div id="l1" class="pole_p"></div><div class="polesl_p"></div><div id="l2" class="pole_p"></div>';
	echo '</div>';			//end left_site
	
	echo '<div id="half_right_p">';
	echo '<div id="r2" class="pole_p"></div><div class="polesr_p"></div><div id="r1" class="pole_p"></div>
		  <div id="r3" class="pole_p"></div><div class="polesr_p"></div><div id="r6" class="pole_p"></div>
		  <div id="r4" class="pole_p"></div><div class="polesr_p"></div><div id="r5" class="pole_p"></div>';
	echo '</div>';			//end right_site
	
	echo '</div>';			//end boisko
	
	echo '<div id="banch_1">';
            echo '<button style="margin: 0 20px 0 0;" onclick="zmia_1_nex()" id="button_zmiana1">Zmiana</button>';
            //echo '<button style="margin: 0 90px 0 0;" onclick="chan1(1,8)">Chan1</button>';
	echo '</div>';			//end banch1
	echo '<div id="liberofield1">991';
	echo '</div>';			//end liberofield1
        echo '<div id="change_info1">';
            //echo'<br>Zmiany w ustawieniu:';
	echo '</div>';
	echo '<div id="treserfield1">coach1';
	echo '</div>';
	echo '<div id="treserbut1">';
            echo '<input checked="checked" type="checkbox" id="tres1" onclick=""/>';
        echo'</div>';
	
	echo '<div id="banch_2">';
            echo '<button style="margin: 0 0 0 21px;" onclick="zmia_2_nex()" id="button_zmiana2">Zmiana</button>';
            //echo '<button style="margin: 0 0 0 91px;" onclick="chan2()">Chan2</button>';
	echo '</div>';			//end banch2
	echo '<div id="liberofield2">992';
	echo '</div>';			//end liberofield2
        echo '<div id="change_info2">';
	echo '</div>';
	echo '<div id="treserfield2">coach2';
	echo '</div>';
	echo '<div id="treserbut2">';
            echo '<input checked="checked" type="checkbox" id="tres2" onclick=""/>';
        echo '</div>';
	
	print ("<div id=\"kwadrat_1_1\" class=\"kwadrat\">11");
	echo '</div>';			//end kwadrat_1
	echo '<div id="kwadrat_1_2" class="kwadrat">22';
	echo '</div>';
	echo '<div id="kwadrat_1_3" class="kwadrat">33';
	echo '</div>';
	echo '<div id="kwadrat_1_4" class="kwadrat">44';
	echo '</div>';
	echo '<div id="kwadrat_1_5" class="kwadrat">55';
	echo '</div>';
	
	echo '<div id="kwadnazw11"></div><div id="kwadrat11">';
	echo '</div>';
	
	echo '<div id="kwadrat_2_1" class="kwadrat">11';
	echo '</div>';			//end kwadrat_1
	echo '<div id="kwadrat_2_2" class="kwadrat">22';
	echo '</div>';
	echo '<div id="kwadrat_2_3" class="kwadrat">33';
	echo '</div>';
	echo '<div id="kwadrat_2_4" class="kwadrat">44';
	echo '</div>';
	echo '<div id="kwadrat_2_5" class="kwadrat">55';
	echo '</div>';
	
	echo '<div id="kwadnazw22"></div><div id="kwadrat22">';
	echo '</div>';
	
	echo '<div id="buttony">';
	
	echo '<button id="button_start" onclick="init_break(0)">Start</button>';
        echo '<button d="button_time_no" onclick="time_no()">Start</button>';
	echo '<button id="button_time_take" onclick="time_take()">Stop</button>';

        echo '<button id="button_1action_init" onclick="init_break(1)">Jedna Akcja</button>';
        echo '<button id="button_1action" onclick="contin_1()">Jedna Akcja</button>';
	//echo '<button onclick="init()">init</button>';
	//echo '<button onclick="goo()">GO</button>';
        //echo '<button onclick="play_meczyk_tlo('.$this->t1.','.$this->t2.',0,0,0,0)">LOAD</button>';//TEMP: insert teams id as 1st and 2nd parameter of play_meczyk_tlo()
        
	
	echo '</div>';
	
	echo '</div>';			//end plac gry
	
	
	echo '<div id="screen1">';
	echo '</div>';			//end screen_1
	
	echo '<div id="screen2">';
	echo '</div>';			//end screen_2
        
        echo '<div style="clear: both;"></div>';
        
        echo'<div style="float: left;"><form style="border:none; width: 410px;">'
        . '<fieldset style="border:none; width: 410px; font-size: 13px;">';
        print("<input id=\"history1_ch\" type=\"checkbox\" name=\"checktown\" value=\"true\" onclick=\"Set_non_hidden1()\" /><label for=\"history1_ch\">Pokaż historię zmian: </label>");
        echo'<br><input id="changes_history1" type="text" name="history1" hidden="hidden" disabled="disabled" id="wp4" style="width:400px;"/>';
        echo'</fieldset>'
        . '</form></div>';
        
        echo'<div style="float: right;"><form style="border:none; width: 410px;">'
        . '<fieldset style="border:none; width: 410px; text-align:right; font-size: 13px;">';
        print("<input id=\"history2_ch\" type=\"checkbox\" name=\"checktown\" value=\"true\" onclick=\"Set_non_hidden2()\" /><label for=\"history2_ch\">Pokaż historię zmian: </label>");
        echo'<br><input id="changes_history2" type="text" name="history2" hidden="hidden" disabled="disabled" id="wp4" style="width:400px;"/>';
        echo'</fieldset>'
        . '</form></div>';
        
        echo '<div style="clear: both;"></div>';
	
	echo '<div id="screen3" >scr3';//style="visibility: hidden"
	echo '</div>';			//end screen_3
	
	//echo '<div id="screen4">scr4: ';
	//echo '</div><br />';			//end screen_3
	
	//echo '<div id="screen5">scr5: ';
	//echo '</div><br />';			//end screen_3
	
	echo '<div id="screen6">scr6: ';
	echo '</div><br />';			//end screen_6
        
    echo '<div style="clear: both;"></div>'; //CLEAR: BOTH
	
	echo '<div id="screen7">';
	
            echo '<table>';
            echo '
            <tr>
                <td>Poz</td>
                <td>Nr</td>
                <td>Zawodnik</td>
                <td>Wzr</td>
                <td>A</td>
                <td>P</td>
                <td>Z</td>
                <td>B</td>
                <td>O</td>
                <td>R</td>
                <td>FR</td>
                <td>ZM</td>
            </tr>';

            for($licz=1;$licz<=12;$licz++)
            {
                if($licz==8)
                {
                    echo '<tr><td>--</td></tr>';
                }
                echo '<tr>';
                print("<td id=\"poz1.$licz\" class=\"nazwa\">poz1</td>");			//pozycja nazwa!!!
                print("<td id=\"nr1.$licz\" class=\"nazwa\">nr1</td>");	
                //$row[4] //pobranie 1 litery imienia
                print("<td id=\"nazwisko1.$licz\" class=\"nazwa\">nazw1</td>\n");     //nazwisko

                print("<td id=\"wzrost1.$licz\" class=\"nazwa\">||</td>\n");//wzrost

                print("<td id=\"a1.$licz\" class=\"nazwa\">a</td>\n");     //atak
                print("<td id=\"p1.$licz\" class=\"nazwa\">p</td>\n");	//p
                print("<td id=\"z1.$licz\" class=\"nazwa\">z</td>\n");	//z
                print("<td id=\"b1.$licz\" class=\"nazwa\">b</td>\n");	//b
                print("<td id=\"o1.$licz\" class=\"nazwa\">o</td>\n");	//o
                print("<td id=\"r1.$licz\" class=\"nazwa\">r</td>\n");	//r
                        print("<td id=\"for1.$licz\">ror</td>\n");     //forma
                print("<td id=\"zm1.$licz\">zm</td>\n");;  
                echo '</tr>';
            }

            echo '</table>';
	
	echo '</div>';			//end screen_7
	
	echo '<div id="screen8">';
	
            echo '<table>';
            echo '
            <tr>
                <td>Poz</td>
                <td>Nr</td>
                <td>Zawodnik</td>
                <td>Wzr</td>
                <td>A</td>
                <td>P</td>
                <td>Z</td>
                <td>B</td>
                <td>O</td>
                <td>R</td>
                <td>FR</td>
                <td>ZM</td>
            </tr>';

            for($licz=1;$licz<=12;$licz++)
            {
                if($licz==8)
                {
                    echo '<tr><td>--</td></tr>';
                }
                echo '<tr>';
                print("<td id=\"poz2.$licz\" class=\"nazwa\">poz1</td>");			//pozycja nazwa!!!
                print("<td id=\"nr2.$licz\" class=\"nazwa\">nr1</td>");	
                //$row[4] //pobranie 1 litery imienia
                print("<td id=\"nazwisko2.$licz\" class=\"nazwa\">nazw1</td>\n");     //nazwisko

                print("<td id=\"wzrost2.$licz\" class=\"nazwa\">||</td>\n");//wzrost

                print("<td id=\"a2.$licz\" class=\"nazwa\">a</td>\n");     //atak
                print("<td id=\"p2.$licz\" class=\"nazwa\">p</td>\n");	//p
                print("<td id=\"z2.$licz\" class=\"nazwa\">z</td>\n");	//z
                print("<td id=\"b2.$licz\" class=\"nazwa\">b</td>\n");	//b
                print("<td id=\"o2.$licz\" class=\"nazwa\">o</td>\n");	//o
                print("<td id=\"r2.$licz\" class=\"nazwa\">r</td>\n");	//r
                print("<td id=\"for2.$licz\">ror</td>\n");     //forma
                print("<td id=\"zm2.$licz\">zm</td>\n");;  
                echo '</tr>';
            }
            echo '</table>';
	
	echo '</div>';			//end screen_8
	
    echo '<div style="clear: both;"></div>';//CLEAR: BOTH
	
	/*echo'<div id=idteam1 style="float:left;"></div>
	<div id=idteam2 style="float:left;"></div>
	<div id=kolejka style="float:left;"></div>
	<div id=liga style="float:left;"></div>'; //p3s - optimal_composition_tlo, linia 1637 wpisanie wartości
                              //mogą służyć np potem w celu zapisu wyniku
                              //p3a 0 action_break, 1559, 1607 - korzysta z tych danych
        */
        echo '<div style="clear: both;"></div>'; //CLEAR: BOTH
        
        //echo'<input id="input-screen3" type="hidden" value="" />'; //zastąpić screen3 //p3a, przyjecie1,2013
                                                                    //p3a, przyjecie2, 2494

	}
        
    
    //Check if exactly 2 team id come by GET and copy them to public variabl
    public function SprawdzDaneGet() 
    {
        $i = 1;
        $count = 0;
        
        for($i=1; $i<=(int)$_GET["number_of_teams"]; $i++)
        {
            if(isset($_GET["id".$i.""]))
            {         
                if($count == 0)
                {
                    $this->t1 = $_GET["id".$i.""];
                }
                else if($count == 1)
                {
                    $this->t2 = $_GET["id".$i.""];
                }
                $count++;
                if($count>2)
                {
                    echo "Wybrano więcej niż 2 drużyny !";
                    return 0;
                }
            }
        }
        if($count<=1)
        {
            echo "Trzeba wybrać co najmniej 2 drużyny !";
            return 0;
        }
//    echo $this->t1;
//    echo "<br />";
//    echo $this->t2;
//    echo "<br />";
//    echo $count;
    return 1;    
    }
    
    public function Wyswietl()
    {
      echo '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">';
      echo "<html>\n<head>\n";
      $this -> WyswietlTytul();
      $this -> WyswietlSlowaKluczowe();
      $this -> WyswietlOpis();
      $this -> WyswietlMeta();
      $this -> WyswietlStyle();
      $this -> WyswietlSkrypty();
      $a = $this -> SprawdzDaneGet();
      //echo '</head><body onload="make_teams()">';
      echo '</head><body onload="Set_play_1mecz(), play_meczyk_tlo('.$this->t1.','.$this->t2.',0,0,0,0)">';
      
      echo '<div id="mother">';
//      $this -> WyswietlNaglowek();
//      $this -> WyswietlMenuPoziom($this->przyciski_poz);
//      $this -> WyswietlSearch();
//      $this -> WyswietlMenuPion($this->przyciski_pion);
//      $this -> WyswietlInformacje();
      if($a)
      {
          $this -> WyswietlTresc();
      }
      
//      echo $this->tresc;
//      $this -> WyswietlStopke();
      echo '</div>'; //end of mother
      echo "</body>\n</html>\n";

    }
}

$strona_plansza_1mecz = new strona_plansza_1mecz();

$strona_plansza_1mecz -> tresc = '';

$strona_plansza_1mecz -> title = 'Manager - pojedyńczy mecz';

$strona_plansza_1mecz -> Wyswietl();

?>