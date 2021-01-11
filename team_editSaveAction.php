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
    $error_texts = array(0,0,0,0,0,0); //6 rożnych tekstów, jak jakiś wystąpił to wpisujemy 1 i więcej nie wyświetlamy
    foreach($_POST['dataSend'] as $row)
    {

        foreach ($row as $col => $val)
        {
            if($col == "imie" || $col == "nazwisko")
            {
                if(!preg_match("#^[ĄąĆćĘęŁłŃńÓóŚśŻżŹźa-zA-Z]+#", $val)) //zaczynać się od litery i musi być cojamniej 1 litera
                {
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[0] == 0)
                    {
                        echo '<span>Pola "imię" i "nazwisko" muszą zaczynać się od litery. <span><br>';
                        //echo '<span>Pole "'.$col.'" musi zaczynać się od litery. <span><br>';
                        $error_texts[0]=1;
                    }                 
                }
                if(preg_match('/[^éýĄąĆćĘęŁłŃńÓóŚśŻżŹźa-zA-Z\d]/', $val))//jak zawiera coś z poza zakresu to zwraca 1
                {
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[1] == 0)
                    {
                        echo '<span>Pola "imię" i "nazwisko" nie mogą zawierać znaków specjalnych. <span><br>';
                        //echo '<span>Pole "'.$col.'" nie może zawierać znaków specjalnych. <span><br>';
                        $error_texts[1]=1;
                    }
                }
                if(strlen($val) > 20)
                {
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[2] == 0)
                    {
                        echo '<span>Pola "imię" i "nazwisko" mogą mieć maksymalnie 20 znaków. <span><br>';
                        //echo '<span>Pole "'.$col.'" może mieć maksymalnie 20 znaków. <span><br>';
                        $error_texts[2]=1;
                    }
                }
            }
            else //czy pozostałe kolumny są numeric
            {
                if(ctype_digit($val) == false && strlen($val) > 0)//błąd - pole nie jest liczbą
                {                  
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[3] == 0)
                    {
                        echo '<span>Pola liczbowe nie mogą zawierać liter i znaków specjalnych. <span><br>';
                        //echo '<span>Pole "'.$col.'" nie może zawierać liter i znaków specjalnych. <span><br>';
                        $error_texts[3]=1;
                    }
                }
                if(strlen($val) > 4)
                {
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[4] == 0)
                    {
                        echo '<span>Pola liczbowe mogą mieć maksymalnie 4 cyfry. <span><br>';
                        //echo '<span>Pole "'.$col.'" że mieć maksymalnie 4 cyfry. <span><br>';
                        $error_texts[4]=1;                   
                    }
                }
                if(strlen($val) == 0)
                {
                    $errors[] =  $col."_".$row_index;
                    if($error_texts[5] == 0)
                    {
                        echo '<span>Pola liczbowe nie mogą być puste. <span><br>';
                        //echo '<span>Pole "'.$col.'" nie może być puste. <span><br>';
                        $error_texts[5]=1;                   
                    }
                }
            }
        } 
        $row_index++;

    }
    $errors_string = implode("|",$errors);
    //print $errors_string;
    
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
    //alert(errors_arr[0]);
    if(errors_arr[0] != "")
    {
        for(i = 0; i < errors_arr.length; i++)
        {
            pole = "#"+errors_arr[i];
            $(pole).css("background-color", "#ff0000");
        }
    }
    //INFO:
    //$("p").css("background-color", "yellow");
    //$("p").css({"background-color": "yellow", "font-size": "200%"});
    
    
</script>