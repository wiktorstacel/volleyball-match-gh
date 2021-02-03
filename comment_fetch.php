<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'config_db.php';

//sprawdz czy jest w bazie komentarz parent_id
$result = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=0");
//sprintf("SELECT * FROM komentarze",
//mysqli_real_escape_string($conn, $parent_id)// WHERE rodzic_komentarz_id='%d'
       // ));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
while($row = mysqli_fetch_assoc($result)) 
{
    echo '<br><b>'.$row['komentujacy'].'</b> | '.$row['data_godzina'];
    echo '<br>'.$row['komentarz'].'<br>';
    $result_childs = mysqli_query($conn, "SELECT * FROM komentarze WHERE rodzic_komentarz_id=".$row['komentarz_id']." ORDER BY komentarz_id DESC");
    if($result_childs != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
    while($row_childs = mysqli_fetch_assoc($result_childs)) 
    {
        echo '<br><div style="margin-left: 40px;"><b>'.$row_childs['komentujacy'].'</b> | '.$row_childs['data_godzina'];
        echo '<br>'.$row_childs['komentarz'].'</div>';
    }
}