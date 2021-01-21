<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_POST['id_druzyna']))
{
    require_once 'config_db.php';
    $id_druzyna = htmlentities($_POST["id_druzyna"], ENT_QUOTES, "UTF-8");
    
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
    else
    {
        /*while($row = mysqli_fetch_array($result, MYSQLI_NUM))
        {
            $data['imie'] = $row[4];
            $data['nazwisko'] = $row[5];
            /*$data['wojewodztwo_id'] = $row[2];
            $data['miejscowosc_id'] = $row[3];
            $data['ulica'] = $row[4];//uwaga przesunięcie indexu bo pominięte pole wpisania miejscowosci
            $data['powierzchnia'] = $row[5];
            $data['cena'] = $row[6];
            $data['opis'] = $row[7];
            $data['oferta_id'] = $row[8];
            
            echo json_encode($data);
        }*/ //ten sposób z DBPROJECT robił tylko jeden obiekt na podst jednego row z MySQL
        //$result = mysqli_query($conn, "SELECT ...");
        $table = array();
        while($row = mysqli_fetch_assoc($result)) 
        {
            $table[] = $row;//UWAGA: zapytanie SQL z UNION ALL i sortowaniem wymagało wprowadzenia dod kolumny sortby, w edit_team.php nie wstawiam tego ostatniego elementu. Tutaj jest wypluwany, przekazywany z JSON - nie sprawdzone jakie to ma konsekwencje dalej.
        }
        print json_encode($table);
    }    
}
else
{
    echo 'Błąd przetwarzania danych';
}