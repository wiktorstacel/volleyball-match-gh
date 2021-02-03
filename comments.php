<?php

require ('strona_man.inc');

class comments extends Strona1
{
    public function WyswietlHeadNiestandardowe()
    {
        echo '<script src="https://www.google.com/recaptcha/api.js" async defer></script>';
        echo "<script type='text/javascript'>
                                    var onloadCallback = function() {
                                    grecaptcha.render('comment_captcha', {
                                    'sitekey' : '6LfV2UUaKkcskYoAimOqSAJMW0XLM78uu9d',
                                    'theme' : 'dark'
                                        });
                                    };
            </script>";
    }
    
    public function WyswietlNaglowek()
    {
        echo '<div id="NAGLOWEK"><p>Mecz siatkówki - Komentarze</p></div>';
    }

    public function WyswietlTresc()
    {
    echo '<div id="TRESC">';
        echo '<div id="box_comments">';
        
            echo'<form id="comment_form" method="post" action="comment_addAction.php">';
            echo'<br><textarea id="comment_content" style="border-radius: 8px;background: #fafd1a;width: 506px;" rows="6" type="text" value="" name="comment_content" class="" placeholder="Twój komentarz... ocena gry... pomysł na ulepszenie..."></textarea>';  

            echo'<input id="comment_user_name" style="margin:0px 0 4px 0;background: #fafd1a;" type="text" name="comment_user_name" value="" placeholder="Imię..." />';
            
            echo'<input id="comment_parent_id" type="hidden" name="comment_parent_id" value="0" />';
            
            echo'<br><div id="comment_captcha"></div>';// class="g-recaptcha" data-sitekey="6LfV2UUaKkcskYoAimOqSAJMW0XLM78uu9d"></div>';
            
            //echo'<label><input id="comment_regulamin" type="checkbox" name="rej_regulamin" />Akceptuję </label><a href="regulamin.php">regulamin</a>';
            
            echo'<button style="margin-top:4px;" id="button_add_comment" type="submit">Dodaj</button>
                <br><br><span id="comment_message"></span>';//style="font-size: 11px;"
            echo'</form>';
            echo'<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>';
   
            echo'<br><div id="comments_container"></div>';
    echo '</div>'; // end of box
    echo '<br><br><a href="index.php">Powrót</a>';
    echo '</div>'; //end of TRESC
    }
}

$comments = new comments(); 

$comments -> title = 'Mecz siatkówki - komentarze';

$comments -> keywords = 'siatkówka, volleyball, gra, mecz, symulator';

$comments -> description = 'Gra - symulator meczu siatkówki';

$comments -> Wyswietl();
?>
