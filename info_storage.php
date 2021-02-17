<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'config_db.php';
if(isset($_POST['ask']))
{
    $result = mysqli_query($conn, "INSERT INTO `licznik_meczy`(`user_id`, `licznik`) VALUES (DEFAULT, 1)");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    //$asked = htmlentities($_POST['asked'], ENT_QUOTES, "UTF-8");
    $result = mysqli_query($conn, "SELECT user_id FROM `licznik_meczy` ORDER BY user_id DESC");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    $row = mysqli_fetch_assoc($result);
    $id = $row['user_id'];
    $info_subject = "Nowy gracz - id: ".$id." - pierwszy mecz";
    echo $row['user_id'];
    //exit();
}

if(isset($_POST['played']))
{
    $played = htmlentities($_POST['played'], ENT_QUOTES, "UTF-8");
    $result = mysqli_query($conn,
                    sprintf("UPDATE `licznik_meczy` SET licznik = licznik + 1 WHERE user_id = '%d'",
                mysqli_real_escape_string($conn, $played)
                        ));
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}

    $result = mysqli_query($conn,
                    sprintf("SELECT licznik FROM `licznik_meczy` WHERE user_id = '%d'",
                mysqli_real_escape_string($conn, $played)
                        ));
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    $row = mysqli_fetch_assoc($result);
    $licznik = $row['licznik'];
    $id = $played;
    $info_subject = "Kolejny ".$licznik." mecz gracza id: ".$id;
    //exit();
}

if(isset($_POST['anonim']))
{
    $result = mysqli_query($conn, "UPDATE `licznik_meczy` SET licznik = licznik + 1 WHERE user_id = 1");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    //$asked = htmlentities($_POST['asked'], ENT_QUOTES, "UTF-8");
    $result = mysqli_query($conn, "SELECT licznik FROM `licznik_meczy` WHERE user_id = 1");
    if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);}
    $row = mysqli_fetch_assoc($result);
    $id = 1;
    $licznik = $row['licznik'];
    $info_subject = "Mecz anonim coockie - nr: ".$licznik;
    //exit();
}
//UWAGA: id 2(opera) i 3(chrome) są dla moich przeglądarek - nie wysyła maila
$i = 1;
if((isset($_POST['ask']) || isset($_POST['played']) || isset($_POST['anonim'])) && $i==1 & $id != 2 && $id != 3)
{
        //Wysłanie email do klienta i doradcy
        include_once "PHPMailer/PHPMailer.php";
        include_once "PHPMailer/SMTP.php";
        include_once "PHPMailer/Exception.php";

        require_once 'config_smtp.php';
        //Email Settings =>to advisor
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $mail->setFrom('info@mecz-siatkowki.pl');
        $mail->FromName="mecz-siatkowki";
        $mail->addAddress('w-e@wp.pl');
        $mail->Subject = $info_subject;
        $mail->Body = "
            
            <br><br> Sukces!
            <br><br>
        ";
        if($mail->send())//jesli wysłano do doradcy, to dopiero wtedy potwierdzenie do klienta
        {
            //echo 'Wniosek o usunięcie komentarza został wysłany do administratora.';
        }
        else
        {
            //echo 'Błąd serwera - spróbuj ponownie.';
        }
}