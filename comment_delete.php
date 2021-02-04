<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Usuniecie komentarza - wstrzymane, bo nie wiadomo jak rozrozniac uzytkownikow - mozna bypassowac
$comment_id = htmlentities($_POST['comment_id'], ENT_QUOTES, "UTF-8");

require_once 'config_db.php';

$result = mysqli_query($conn,
sprintf("SELECT * FROM komentarze WHERE komentarz_id='%d'",
mysqli_real_escape_string($conn, $comment_id)
        ));
if($result != TRUE){echo 'Bład zapytania MySQL, odpowiedź serwera: '.mysqli_error($conn);} 
$row = mysqli_fetch_assoc($result);
$comment = $row['komentarz'];
$name = $row['komentujacy'];
$id = $row['komentarz_id'];
if(mysqli_num_rows($result) > 0)
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
        $mail->Subject = "Wniosek o usuniecie komentarza - mecz-siatkowki.pl";
        $mail->Body = "
            $comment 
            <br><br>$name
            <br><br>id: $id
        ";
        if($mail->send())//jesli wysłano do doradcy, to dopiero wtedy potwierdzenie do klienta
        {
            echo 'Wniosek o usuniecie komentarza zostal wyslany do administratora.';
        }
        else
        {
            echo 'Błąd serwera - spróbuj ponownie.';
        }
}