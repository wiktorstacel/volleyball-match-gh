<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require 'config_db.php';

if(isset($_GET['id_druzyna']))
{
    $id_druzyna = htmlentities($_GET['id_druzyna'], ENT_QUOTES, "UTF-8");
}
else
{
    $id_druzyna = 0;
}

//SELECT above to choose the team to edit
echo'<select id="team_to_edit" class="input2" name="team_to_edit">';
$result = mysqli_query($conn, "SELECT id_druzyna, nazwa FROM druzyna ORDER BY id_druzyna ASC");
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
while($row = mysqli_fetch_array($result, MYSQLI_NUM))
{
    if($row[0] != $id_druzyna)
    {	
        echo '<option value='.$row[0].'>'.$row[1].'</option>';
    }
    else
    {
        echo '<option selected="selected" value='.$row[0].'>'.$row[1].'</option>';
    }
}
if($id_druzyna != 0)
{
    echo'<option value="0" >-wybierz-</option></select>';
}
else
{
    echo'<option value="0" selected="selected">-wybierz-</option></select>';
}
echo '<br><br>';
//Loading the team to form inputs//"SELECT * FROM zawodnik z, pozycja p WHERE z.id_pozycja=p.id_pozycja AND z.id_druzyna='%d' ORDER BY nazwisko ASC"
//COLUMN NAMES
$result = mysqli_query($conn, 
    sprintf("SELECT * FROM zawodnik z WHERE z.id_druzyna='%d' ORDER BY nazwisko ASC",
    mysqli_real_escape_string($conn, $id_druzyna)));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
$row = mysqli_fetch_assoc($result);    
echo '<input id="" disabled type="text" style="width: 42px;" name="" value="" />';
foreach ($row as $col => $val) 
{
    echo '<input id="" disabled type="text" style="width: 42px;" name="" value="'.$col.'" />';
}
echo '<br>';
//VALUES
$result = mysqli_query($conn, 
    sprintf("SELECT * FROM zawodnik z WHERE z.id_druzyna='%d' ORDER BY nazwisko ASC",
    mysqli_real_escape_string($conn, $id_druzyna)));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
while($row = mysqli_fetch_array($result, MYSQLI_NUM))
{
    echo '<input id="a'.$row[0].'" disabled type="text" style="width: 42px;" name="" value="" />';
    $length = count($row);
    for ($i = 0; $i < $length; $i++) 
    {
        //print $row[$i];
        echo '<input id="" type="text" style="width: 42px;" name="" value="'.$row[$i].'" />';
    }
    echo'<br>';
}




    
        
    

?>

    <form id="kont_form" method="POST" action="contact_formLoadAction.php">
            <fieldset>
            <img src="css\images\envelop2.png" width="32" height="32" alt="alt"/>
            <input id="kont_user_id" type="hidden" name="kont_user_id" value="<?php echo $row['user_id']?>" />
            <label for="kont_login"><u>Wiadomość do:</u> <b><?php echo $row['surname'].'</b>, '.$row['address']?></label>
                
            <br>
            <br><textarea name="kont_inquiry" cols="56" rows="6" type="text" value="" id="kont_inquiry" placeholder="Treść zapytania... prośby o przedstawienie oferty... wniosku o umówienie spotkania..." class=""></textarea>
            
            <br><br><label for="kont_login">Imię: </label>
            <input id="kont_name" type="text" name="kont_name" value="" />
            <br /><br />
            <label for="rejs_email">E-mail: </label>
            <input id="kont_email" type="text" name="kont_email" value="" />
            <br /><br />
            <label for="rej_haslo">Telefon*: </label>
            <input id="kont_telefon" type="text" name="kont_telefon" value="" />
            <br /><br />

            <label><input id="kont_regulamin" type="checkbox" name="kont_regulamin" />Akceptuję </label>
            <a href="regulamin.php">regulamin</a>
            <br /><br />                        
            <input id="kont_submit" type="submit" value="Wyślij" />
            <br />
            <p id="kont_message"></p>
            </fieldset>
    </form>

