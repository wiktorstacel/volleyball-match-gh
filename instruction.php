<?php

require ('strona_man.inc');

class instruction extends Strona1
{
  public function WyswietlNaglowek()
  {
    echo '<div id="NAGLOWEK"><p>Mecz siatkówki - instruckja gry</p></div>';
  }
  
  public function WyswietlTresc()
  {
    echo '<div id="TRESC">';
        echo '<div id="box">';
            echo '<div id="instruction">';

                echo '<p>1. Aby przejść do planszy rozgrywania meczu należy wybrać 2 drużyny oraz opcję gry.'
            . '<br><br>2. Wybór opcji "obserwator" oznacza, że na planszy można ingerować w skład, ustawienie oraz taktykę obu drużyn po odznaczeniu znaczka znajdującego się obok nazwiska trenera danej drużyny.'
            . '<br><br>3. Wybór opcji "trener" przekierowuje do ustawień, w których nie można ingerować w skład, ustawienie oraz taktykę przeciwnika. Można natomiast włączać i wyłączać funkcję trenera swojej drużyny.'
            . '<br><br>4. W opcji "trener", gdy znaczek przy nazwisku trenera jest odznaczony, automatyczny trener nie wykonuje żadnych działań, wszyskie ruchy wykonuje gracz.'
            . '<br><br>5. Przed rozpoczęciem każdego seta można dokonywać zmian w ustawieniu. Przyciskiem z oznaczeniem strzałki rotacji w prawą stronę można przesuwać startowe ustawienie zespołu. Zmian w składzie dokonuje się poprzez najpierw kliknięcie na nazwisko zawodnika rezerowego, następnie kliknięcie na nazwisko zawodnika zmienianego. Będzie do zasygnalizowane pojawiającymi się numerami zawodników. Zatwierdzenie zmiany następują poprzez naciśniecie przycisku "Zmiana".'
            . '<br><br>6. W trakcie meczu zmian dokonuje się podobnie, z tym, że obowiązują tutaj limity 6 zmian na set. Zawodnik może tylko raz zejść i raz wejść w trakcie seta wymieniając się w parze tylko z jednym konkretnym zawodnikiem rezerwowym.'
            . '<br><br>7. W górnym rogu po stronie swojej drużyny dostępna jest opcja wyboru taktywki zagrywki na danego zawodnika przyjmującego przeciwnej drużyny.'
            . '<br><br>8. Istnieje możliwość rozgrywania kolejnych akcji meczu w 2 trybach: automatycznym i ręcznym. Można ich używać dowolnie, naprzemiennie. Automatyczne wykonywanie akcji następuje poprzez naciśniecie przycisku "Start". Zatrzymanie poprzez naciśnięcie przycisku "Stop". Pojedyńczą akcję lub przejście po akcji wykonuję się przyciskiem "Jedna Akcja".'
            . '<br><br>9. Również po zakończonym secie do trybu "Zmiany w ustawieniu" przechodzi się poprzez kliknięcie przycisku "Start" lub "Jednak Akcja".'
            . '<br><br>10. Istnieje możliwość regulacji tempem rozgrywania akcji poprzez użycie suwaka poniżej tablicy wyników. Przesuwanie w lewą stronę powoduje przyspieszenie tempa, przesuwanie w prawo to zwolnienie tempa - zwiększenie odstępów czasowych pomiedzy kolejnymi zdarzeniami.</p>';
        
            echo '</div>'; // end of instruction
        echo '</div>'; // end of box
       echo '<br><br><a href="index.php">Powrót</a>';
    echo '</div>'; //end of TRESC
  }
}

$instruction = new instruction(); 

$instruction -> title = 'Mecz siatkówki - instrukcja gry';

$instruction -> keywords = 'siatkówka, volleyball, gra, mecz, symulator';

$instruction -> description = 'Gra - symulator meczu siatkówki, instruckja gry';

$instruction -> Wyswietl();
?>
