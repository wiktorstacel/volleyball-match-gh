<?php

require ('strona_man.inc');

class comments extends Strona1
{
    public function WyswietlHeadNiestandardowe()
    {
        echo '<script src="https://www.google.com/recaptcha/api.js" async defer></script>';
       /* echo "<script type='text/javascript'>
                                    var onloadCallback = function() {
                                    grecaptcha.render('comment_captcha', {
                                    'sitekey' : '6LfjUEoaAAAAABm9u1_0GYG21x4dL3fTQSZg3CM9',
                                    'theme' : 'dark'
                                        });
                                    };
            </script>";*/
    }
    
    public function WyswietlNaglowek()
    {
        echo '<div id="NAGLOWEK"><p>Mecz siatkówki - Komentarze</p></div>';
    }

    public function WyswietlTresc()
    {
    echo '<div id="TRESC">';
        echo '<div id="box_comments">';
            
            echo'<div id="comment_to_reply" style="margin-left: 0px;padding: 0 0 0 6px;border-radius: 4px;color: #2f3640;background: #a1ed72;"></div>';
            echo'<form id="comment_form" method="post" action="comment_addAction.php">';
            echo'<br><textarea id="comment_content" style="border-radius: 8px;width: 506px;background: #fafd1a;" rows="6" type="text" value="" name="comment_content" class="" placeholder="Twój komentarz... ocena gry... pomysł na ulepszenie..."></textarea>';  

            echo'<input id="comment_user_name" style="margin:0px 0 4px 0;background: #fafd1a;" type="text" name="comment_user_name" value="" placeholder="Imię..." />';
            
            echo'<input id="comment_parent_id" type="hidden" name="comment_parent_id" value="0" />';//background: #fafd1a;#f8a521
            
            echo'<br><div id="comment_captcha" class="g-recaptcha" data-sitekey="6LfjUEoaAAAAABm9u1_0GYG21x4dL3fTQSZg3CM9" data-theme="dark"></div>';//></div>';//
            
            //echo'<label><input id="comment_regulamin" type="checkbox" name="rej_regulamin" />Akceptuję </label><a href="regulamin.php">regulamin</a>';
            
            echo'<button style="margin-top:4px;" id="button_add_comment" type="submit">Dodaj</button>
                <br><br><span id="comment_message"></span>';//style="font-size: 11px;"
            echo'</form>';
            //echo'<script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>';//onload=onloadCallback&
   
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
<script>
    if(localStorage.getItem("comment_user_name"))
    {
        var user_name_LS = localStorage.getItem("comment_user_name");
        $('#comment_user_name').val(user_name_LS);
    }
</script>