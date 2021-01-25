<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_POST['id_druzyna_not']))
{
    require_once 'config_db.php';
    $id_druzyna_not = htmlentities($_POST["id_druzyna_not"], ENT_QUOTES, "UTF-8");
    $id_druzyna_choose = htmlentities($_POST["id_druzyna_choose"], ENT_QUOTES, "UTF-8");
    
    $result = mysqli_query($conn,
            sprintf("SELECT id_druzyna, nazwa FROM druzyna WHERE id_druzyna != %d ORDER BY nazwa ASC",
            mysqli_real_escape_string($conn, $id_druzyna_not)
            ));
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
    else
    {
        while($row = mysqli_fetch_array($result, MYSQLI_NUM))
        {
            if($id_druzyna_choose != $row[0])
            {
                print("<option value=".$row[0].">".$row[1]."</option>");
            }
            else
            {
                print("<option selected=\"selected\" value=".$row[0].">".$row[1]."</option>");
            }
        }
        if($id_druzyna_choose == 0)
        {
            echo'<option selected="selected">-wybierz-</option>';
        }
        else
        {
            echo'<option>-wybierz-</option>';
        }
        
    }    
}
else
{
    echo 'Błąd przetwarzania danych';
}