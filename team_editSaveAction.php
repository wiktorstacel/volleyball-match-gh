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
        require_once 'config_db.php';
        $query = "UPDATE zawodnik z SET ";
        $query_end = " WHERE z.id_zawodnik = '".$row['id_zawodnik']."'";
        
        //$last_col = end(array_keys($row));  - to powoduje STRICT NOTICE
        //$last_col = array_search(end($row), $row); - nie działa, przecik po ostatniej zostaje
        $keys = array_keys($row); 
        $last_col = end($keys);

        foreach ($row as $col => $val)
        {
            if($col != "id_zawodnik")
            {
                $val = mysqli_real_escape_string($conn, $val);
                $qm = "z.".$col." = '".$val."', ";
                $query = $query.$qm;
            }
            if($col == $last_col)
            {
                $val = mysqli_real_escape_string($conn, $val);
                $qm = "z.".$col." = '".$val."'";
                $query = $query.$qm;                
            }
        }       
        $query = $query.$query_end;
        $result = mysqli_query($conn, $query);
        if($result != TRUE){echo "Bład zapytania MySQL".$row['id_zawodnik'].", odpowiedź serwera: ".mysqli_error($conn);}
        echo '<br>'.$query.'<br>';
    }
    
}    
