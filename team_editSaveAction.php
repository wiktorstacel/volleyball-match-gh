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
    //print json_encode($_POST['dataSend']);

    //WALIDACJA danych wejściowych z inputów
    $row_index = 0;
    $errors = array();
    foreach($_POST['dataSend'] as $row)
    {

        foreach ($row as $col => $val)
        {
            if($col == "imie" || $col == "nazwisko")
            {
               if(!preg_match("#^[a-zA-Z]+#", $val)) //zaczynać się od litery i musi być cojamniej 1 litera
               {
                   $errors[] =  $col."_".$row_index;
                   echo '<span>Pola "imię" i "nazwisko" muszą zaczynać się od litery. <span><br>';
               }
               if(preg_match('/[^ĄąĆćĘęŁłŃńÓóŚśŻżŹźa-zA-Z\d]/', $val))//jak zawiera coś z poza zakresu to zwraca 1
               {
                   $errors[] =  $col."_".$row_index;
                   echo '<span>Pola "imię" i "nazwisko" nie mogą zawierać znaków specjalnych. <span><br>';
               }
               if(strlen($val) > 20)
               {
                   $errors[] =  $col."_".$row_index;
                   echo '<span>Pola "imię" i "nazwisko" mogą mieć maksymalnie 20 znaków. <span><br>';
               }
            }
            else //czy pozostałe kolumny są numeric
            {
               if(ctype_digit($val) == false)//błąd - pole nie jest liczbą
               {                  
                   $errors[] =  $col."_".$row_index;
                   echo '<span>Pola liczbowe nie mogą zawierać liter i znaków specjalnych. <span><br>';
               }
               if(strlen($val) > 4)
               {
                   $errors[] =  $col."_".$row_index; 
                   echo '<span>Pola liczbowe mogą mieć maksymalnie 4 cyfry. <span><br>';
               }
            }
        } 
        $row_index++;

    }
    $errors_string = implode("|",$errors);
    print $errors_string;
    //$error1 = errors[0];
//PRZYKLADY
//$containsLetter  = preg_match('/[a-zA-Z]/',    $string);
//$containsDigit   = preg_match('/\d/',          $string);
//$containsSpecial = preg_match('/[^a-zA-Z\d]/', $string);
    

    //dane wejsciowe zwalidowane, sprawdzamy dalsze warunki wykorzystując MySQL
    if(empty($errors))
    {       
        //ZAPIS DANYCH
        $correct_sql = 0;
        $count_dataSend = count($_POST['dataSend']);
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
            else{$correct_sql++;}
            //echo '<br>'.$query.'<br>';
        }
        if($correct_sql == $count_dataSend)
        {
            echo '<span>Zapisano poprawnie dane wszyskich zawodników. <span><br>';
        }
    }
    
    
}
else
{
    echo 'Błąd przetwarzania danych!';
}
?>

<script>
    $("#screen_loader input").removeAttr('style');
    
    var errors_string = "<?php echo $errors_string; ?>";
    errors_arr = errors_string.split('|');
    //alert(errors_arr);
    for(i = 0; i <= errors_arr.length; i++)
    {
        pole = "#"+errors_arr[i];
        $(pole).css("background-color", "#ff0000");
    }
    //INFO:
    //$("p").css("background-color", "yellow");
    //$("p").css({"background-color": "yellow", "font-size": "200%"});
    
    
</script>