<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST['comment_parent_id']))
{
    $parent_id = htmlentities($_POST['comment_parent_id'], ENT_QUOTES, "UTF-8");
    $comment = htmlentities($_POST['comment_content'], ENT_QUOTES, "UTF-8");
    $comment = str_replace("&oacute;", "ó", $comment);
    $comment = str_replace("&Oacute;", "Ó", $comment);
    $name = htmlentities($_POST['comment_user_name'], ENT_QUOTES, "UTF-8");
    $check_name = htmlentities($_POST['check_name'], ENT_QUOTES, "UTF-8");
    //$email = htmlentities($_POST['email'], ENT_QUOTES, "UTF-8");można dorobić nieobowiązkowe pole e-mail z komentarzem
    //'podaj e-mail jeśli chcesz dostawać informacje o aktualizacjach - tylko trzeba też zrobić potem opcję wypisania się z neewslettera

    //$regulamin = filter_var($_POST['regulamin'], FILTER_VALIDATE_BOOLEAN);
    //$emailB = filter_var($email, FILTER_SANITIZE_EMAIL);//zwraca string usuwając (np) polskie znaki
    
    $errorEmpty = false;
    $errorParent_id = false;
    $errorComment = false;
    $errorName = false;
    $errorEmail = false; //dalsze możliwość zmiany wartości zakomentowana, ale pozostaje jako rezerwa
    $errorTelefon = false; //dalsze możliwość zmiany wartości zakomentowana, ale pozostaje jako rezerwa
    $errorRegulamin = false;//dalsze możliwość zmiany wartości zakomentowana, ale pozostaje jako rezerwa
    $errorBot = false;
   
    
    if(empty($comment) || empty($name))//czy jest jakieś puste pole
    {
        $errorEmpty = true;
        echo '<span class="form-error-comment">Pola "Komentarz" i "Imię" nie mogą być puste.</span>';
    }
    elseif((strlen($comment) < 3) || (strlen($comment) > 2000))
    {
        $errorComment = true;
        echo '<span class="form-error-comment">Komentarz ma nieprawidłową ilość znaków (min. 3, maks. 2000)</span>';
    }
    elseif(preg_match('/[^?!@%.,;-/ĄąĆćĘęŁłŃńÓóŚśŻżŹźa-zA-Z\s\d]/', $comment))//sprawdź odpowiednie znaki surname
    {
        $errorComment = true;
        echo '<span class="form-error-comment">Treść komentarza może składać się tylko z liter(w tym polskich) oraz spacji i znaków ,.;?!%@-/</span>';            
    }
    elseif(!preg_match("#^[ĄąĆćĘęŁłŃńÓóŚśŻżŹźa-zA-Z]+#", $name)) //zaczynać się od litery i musi być cojamniej 1 litera
    {
        $errorName = true;
        echo '<span class="form-error-comment">Pola "imię" musi zaczynać się od litery.<span><br>';              
    }
    elseif(strlen($name) < 3 || strlen($name) > 20)//sprawdz długość login
    {
        $errorName = true;
        echo '<span class="form-error-comment">Pole "Imię" powinno mieć długość od 3 do 20 znaków.</span>';
    }
    elseif(!preg_match("/^(ą|ę| |ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]|[0-9]){0,20}$/", $name))//sprawdź odpowiednie znaki surname
    {
        $errorName = true;
        echo '<span class="form-error-comment">Pole "Imię" może składać się z liter(w tym polskich), cyfr oraz spacji.</span>';            
    }
    /*elseif ((!filter_var($emailB, FILTER_VALIDATE_EMAIL)) || $email != $emailB) //sprawdz poprawnosc email
    {
        $errorEmail = true;
        echo '<span class="form-error-contact">Wprowadź poprawny e-mail.</span>';   
    }
    elseif(!preg_match("/^(\-|\+|\)|\(|\ |[0-9]){0,20}$/", $telefon))//sprawdź odpowiednie znaki surname
    {
        $errorTelefon = true;
        echo '<span class="form-error-contact">Pole "Telefon" może składać się tylko z cyfr i znaków +-() 0-20 znaków.</span>';            
    }
    elseif($regulamin != 1)//czy zaakceptowano regulamin
    {
        $errorRegulamin = true;
        echo '<span class="form-error-contact">Potwierdź akceptację regulaminu.</span>';
    }*/
    elseif(empty($_POST['g-recaptcha-response']))
    {
        //reCapcha
        $errorBot = true;
        echo '<span class="form-error-comment">Potwierdź, że nie jesteś robotem.</span>';
    }
    else
    {
        require_once 'config_reCaptcha.php';
        $check = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret_key.'&response='.$_POST['g-recaptcha-response']);
        $response = json_decode($check);
        //printf($response->success);
        if(!($response->success))
        {
            $errorBot = true;
            echo '<span class="form-error-comment">Błąd weryfikacji reCaptcha!</span>';
        }
    }
//TEMP!!!
//$errorBot = false;
    //dane wejsciowe zwalidowane
    if($errorEmpty == false && $errorComment == false && $errorName == false && $errorEmail == false && $errorTelefon == false &&  $errorRegulamin == false && $errorBot == false)
    {       
        mysqli_report(MYSQLI_REPORT_STRICT);        
        try
        {
            require_once 'config_db.php';
            if(mysqli_connect_errno($conn) != 0) throw new Exception(mysqli_connect_errno());
            //sprawdzenie czy istnieje już taka nazwa komentującego wg polecenia 'name_check', gdzie jquery sprawdziło, że wprowadzone imię nie jest takie jak zapisane w LS
            if($check_name == 1)
            {
                $result = mysqli_query($conn, 
                sprintf("SELECT * FROM komentarze WHERE komentujacy='%s'",
                mysqli_real_escape_string($conn, $name)
                        ));
                if(!$result) throw new Exception(mysqli_error($conn));
                $user_number = mysqli_num_rows($result);
                if($user_number > 0)
                {
                    $errorName = true;
                    echo '<span class="form-error-comment">Istnieje już użytkownik w dyskusji o takim imieniu. Jeśli to Ty, Twoje imię nie jest zapamiętane z powodu braku zgody na cookie lub użycia innego imienia później.<span><br>';
                }
            }
            
            //sprawdz czy jest w bazie komentarz parent_id
            $result = mysqli_query($conn, 
            sprintf("SELECT * FROM komentarze WHERE komentarz_id='%d'",
            mysqli_real_escape_string($conn, $parent_id)
                    ));
            if(!$result) throw new Exception(mysqli_error($conn));
            $parent_number = mysqli_num_rows($result);
            if($parent_number < 1 && $parent_id > 0)// 
            {
                $errorParent_id = true;
                echo '<span class="form-error-comment">Błąd przypisania komentarza. Spróbuj ponownie lub skontaktuj się z administratorem.</span>';
            }
            $row = mysqli_fetch_assoc($result);
            //$user_email = $row['email'];
            //$user_surname = $row['surname'];
            
            //Zapis komentarza do bazy
            $result = mysqli_query($conn, 
            sprintf("INSERT INTO komentarze (`komentarz_id`, `rodzic_komentarz_id`, `komentarz`, `komentujacy`, `data_godzina`) "
                    . "VALUES (DEFAULT, '%d', '%s', '%s', DEFAULT)",
            mysqli_real_escape_string($conn, $parent_id),
            mysqli_real_escape_string($conn, $comment),
            //mysqli_real_escape_string($conn, $email),
            //mysqli_real_escape_string($conn, $telefon),
            mysqli_real_escape_string($conn, $name)
                    ));

            if(!$result)throw new Exception(mysqli_error($conn));

            if($errorParent_id == false && $errorEmail == false && $errorName==false)
            {
                    //Wysłanie email do klienta i doradcy
                    include_once "PHPMailer/PHPMailer.php";
                    include_once "PHPMailer/SMTP.php";
                    include_once "PHPMailer/Exception.php";

                    require_once 'config_smtp.php';
                    $mail->isHTML(true);
                    $mail->CharSet = "UTF-8";
                    $mail->setFrom('info@mecz-siatkowki.pl');
                    $mail->FromName="mecz-siatkowki";
                    $mail->addAddress('w-e@wp.pl');
                    $mail->Subject = "Nowy komentarz - mecz-siatkowki.pl";
                    $mail->Body = "
                        $comment 
                        <br><br>$name
                    ";
                    if($mail->send())//jesli wysłano do doradcy, to dopiero wtedy potwierdzenie do klienta
                    {
                        if($result){echo '<span class="form-success">Komentarz dodany.</span>';}
                        else {throw new Exception(mysqli_error($conn));}
                    }
                    else
                    {
                        $errorEmail = true;
                        echo '<span class="form-error-comment">Błąd serwera - jeśli nie dodano komentarza spróbuj ponownie.</span>';
                        throw new Exception($mail->ErrorInfo);
                    }
            }


            mysqli_close($conn);
            
        } 
        catch (Exception $ex) 
        {
            echo '<span class="form-error-comment">Błąd serwera - prosimy o próbę w innym terminie.</span>';
            echo '<br><span class="form-error-comment">Informacja deweloperska: '.$ex.'</span>';
        }
    }

    
}
else
{
    echo 'Błąd przetwarzania danych!';
}
?>

<script>
    $("#comment_content, #comment_user_name").removeClass("input-error");//rezerwa: , #comment_email, #comment_telefon, #comment_regulamin
    
    var errorEmpty = "<?php echo $errorEmpty; ?>";
    var errorParent_id = "<?php echo $errorParent_id; ?>";
    var errorComment = "<?php echo $errorComment; ?>";
    var errorName = "<?php echo $errorName; ?>";      
    var errorEmail = "<?php echo $errorEmail; ?>";
    var errorTelefon = "<?php echo $errorTelefon; ?>";
    var errorRegulamin = "<?php echo $errorRegulamin; ?>";
    var errorBot = "<?php echo $errorBot; ?>";
    
    if(errorEmpty == true){
        $("#comment_content, #comment_user_name").addClass("input-error");
    }
    if(errorComment == true){
        $("#comment_content").addClass("input-error");
    }
    if(errorName == true){
        $("#comment_user_name").addClass("input-error");
    }
    /*if(errorEmail == true){
        $("#kont_email").addClass("input-error");
    }
    if(errorTelefon == true){
        $("#kont_telefon").addClass("input-error");
    }
    if(errorRegulamin == true){
        $("#kont_regulamin").addClass("input-error");
    }*/
    if(errorEmpty == false && errorComment == false && errorName == false && errorEmail == false && errorTelefon == false && errorRegulamin == false && errorBot == false)
    {
        //$("#comment_content, #comment_user_name").val("");
        //$("#kont_regulamin").prop('checked', false);
        $("#comment_content, #comment_user_name, #button_add_comment").prop( "disabled", true );
    }
    else
    {
        grecaptcha.reset(); //kasowanie reCapcha
        var onloadCallback = function() {
        grecaptcha.render('comment_captcha', {
        'sitekey' : '6LfjUEoaAAAAABm9u1_0GYG21x4dL3fTQSZg3CM9',
        'theme' : 'dark'
            });
        };       
    }
    
</script>