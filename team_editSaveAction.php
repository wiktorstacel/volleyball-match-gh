<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();

if(isset($_POST['dataSend']))
{
    //$dataSend = json_encode($_POST['dataSend'], true);
    //$email = htmlentities($dataSend, ENT_QUOTES, "UTF-8");
    print json_encode($_POST['dataSend']);
    
    foreach($_POST['dataSend'] as $row)
    {
        echo'<br>'.$row['nazwisko'];
    }
}   
