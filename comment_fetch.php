<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Przyslanie nazwy uzytkownika zapisanej w Local Storage - dodanie przycisku USUN dla jego komentarzy
$user_name_LS = htmlentities($_POST['user_name_LS'], ENT_QUOTES, "UTF-8");

require_once 'config_db.php';

//sprawdz czy jest w bazie komentarz parent_id
$result = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=0 ORDER BY komentarz_id DESC");
//sprintf("SELECT * FROM komentarze",
//mysqli_real_escape_string($conn, $parent_id)// WHERE rodzic_komentarz_id='%d'
       // ));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
while($row = mysqli_fetch_assoc($result)) 
{
    echo '<br><div id="<b>'.$row['komentujacy'].'</b> | '.$row['komentarz'].'" style="margin-left: 0px;padding: 0 0 0 6px;border-radius: 4px;"><b>'.$row['komentujacy'].'</b> | <span style="color:#a2a4a6;">'.$row['data_godzina'].'</span>';
    echo '<br>'.$row['komentarz'];
    echo '<br><button class="button_reply_comment_main" value="'.$row['komentarz_id'].'" id="'.$row['komentujacy'].'" name="<b>'.$row['komentujacy'].'</b> | '.$row['komentarz'].'" type="">ODPOWIEDZ</button>';
    if($user_name_LS == $row['komentujacy'])
    {
        echo '<button class="button_delete_comment" value="'.$row['komentarz_id'].'" name="<b>'.$row['komentujacy'].'</b> | '.$row['komentarz'].'">USUŃ</button>';
    }
    echo '</div>'; //koniec div - parent comment. DALEJ: wyswietlanie childs
    
    $result_childs = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=".$row['komentarz_id']." ORDER BY komentarz_id ASC");
    if($result_childs != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
    while($row_childs = mysqli_fetch_assoc($result_childs)) 
    {
        echo '<div id="<b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['komentarz'].'" style="margin: 2px 0 0 68px;padding: 0 0 0 6px; ;border-radius: 4px;"><b>'.$row_childs['komentujacy'].'</b> | <span style="color:#a2a4a6;">'.$row_childs['data_godzina'].'</span>';
        echo '<br>'.$row_childs['komentarz'];//background: #fafd1a; echo'<br><button style="margin-top:4px;" class="button_reply_comment" type="submit">Dodaj</button></div>'; echo'<br><button style="margin-top:4px;" class="button_reply_comment" type="submit">Dodaj</button></div>';
        echo '<br><button class="button_reply_comment_reply" value="'.$row['komentarz_id'].'" id="'.$row_childs['komentujacy'].'" name="<b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['komentarz'].'" type="">ODPOWIEDZ</button>';    
        if($user_name_LS == $row_childs['komentujacy'])
        {
            echo '<button class="button_delete_comment" value="'.$row_childs['komentarz_id'].'" name="<b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['komentarz'].'">USUŃ</button>';
        }
        echo '</div>'; //koniec div - child comment. DALEJ: kolejne childs jesli sa
    }
}