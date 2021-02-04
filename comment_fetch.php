<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'config_db.php';

//sprawdz czy jest w bazie komentarz parent_id
$result = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=0 ORDER BY komentarz_id DESC");
//sprintf("SELECT * FROM komentarze",
//mysqli_real_escape_string($conn, $parent_id)// WHERE rodzic_komentarz_id='%d'
       // ));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
while($row = mysqli_fetch_assoc($result)) 
{
    echo '<br><div id="<b>'.$row['komentujacy'].'</b> | '.$row['komentarz'].'" style="margin-left: 0px;padding: 0 0 0 6px;border-radius: 4px;"><b>'.$row['komentujacy'].'</b> | '.$row['data_godzina'];
    echo '<br>'.$row['komentarz'];
    echo '<br><button style="margin-top:4px;" class="button_reply_comment_main" value="'.$row['komentarz_id'].'" id="'.$row['komentujacy'].'" name="<b>'.$row['komentujacy'].'</b> | '.$row['komentarz'].'" type="">ODPOWIEDZ</button></div>';
    $result_childs = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=".$row['komentarz_id']." ORDER BY komentarz_id ASC");
    if($result_childs != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
    while($row_childs = mysqli_fetch_assoc($result_childs)) 
    {
        echo '<div id="<b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['komentarz'].'" style="margin: 2px 0 0 68px;padding: 0 0 0 6px; ;border-radius: 4px;"><b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['data_godzina'];
        echo '<br>'.$row_childs['komentarz'];//background: #fafd1a; echo'<br><button style="margin-top:4px;" class="button_reply_comment" type="submit">Dodaj</button></div>'; echo'<br><button style="margin-top:4px;" class="button_reply_comment" type="submit">Dodaj</button></div>';
        echo '<br><button style="margin-top:4px;" class="button_reply_comment_reply" value="'.$row['komentarz_id'].'" id="'.$row_childs['komentujacy'].'" name="<b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['komentarz'].'" type="">ODPOWIEDZ</button></div>';       
    }
}