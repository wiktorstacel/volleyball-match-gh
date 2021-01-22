var przejscie = 1;
var atak = 0;
var pkt_par = 0;	//tylko atak
var flag_dosw1 = 0;
var flag_dosw2 = 0;
var flag_tir1 = 0;
var flag_tir2 = 0;
var flag_host=0;
var flag_wyr1=0;
var flag_wyr2=0;
var flag_star=0;
var flag_zm_zag1=0;
var flag_zm_zag2=0;
var flag_golden1 = 0;
var flag_golden2 = 0;
var changes = [];//array do zmiany, w którą wpisywane są wpisy array [druzyna, nr zaw out, nr zaw in]
var inceremtor = 0;
var suma1 = 0;
var suma2 = 0;

function wyrownacz_give(par)
{
	if(par==1)
	{
		var tear=team1;
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(parseFloat(tear[i][j])+8);
		}
		}
		team1=tear;
//scrff = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML = scrff +"wyrownywacz_give: "+par+" "+tear[1][5]+" || ";
	}
	else if(par==2)
	{
		var tear=team2;
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(parseFloat(tear[i][j])+8);
		}
		}
		team2=tear;
//scrff = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML = scrff +"wyrownywacz_give: "+par+" "+tear[1][5]+" || ";
	}
}

function wyrownacz_take(par)
{
	if(par==1)
	{
		var tear=team1;
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(parseFloat(tear[i][j])-8);
		}
		}
		team1=tear;
//scrff = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML = scrff +"wyrownywacz_take: "+par+" "+tear[1][5]+" || ";
	}
	else if(par==2)
	{
		var tear=team2;
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(parseFloat(tear[i][j])-8);
		}
		}
		team2=tear;
//scrff = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML = scrff +"wyrownywacz_take: "+par+" "+tear[1][5]+" || ";
	}
}

function tir_zm_gen(d1,d2,k,pl,para,liga)
{
	var tear=team1;
	for(i=1;i<=12;i++)
	{
		var forma = tear[i][13];
		var zm = tear[i][14];
		var for1= 1 - (100-forma)*0.001;
	    var zm1 = 1 -  zm*0.001;
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(tear[i][j]*for1*zm1);
		}
		//team1[j][50]=zaokr(100*((tear[i][28]*for1*zm1)/tear[i][28]));
		tear[i][28] = zaokr(tear[i][28]*for1*zm1);
	}
	team1=tear;
	
	tear=team2;
	for(i=1;i<=12;i++)
	{
		var forma = tear[i][13];
		var zm = tear[i][14];
		var for1= 1 - (100-forma)*0.001;
	    var zm1 = 1 -  zm*0.001;
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(tear[i][j]*for1*zm1);
		}
		//team1[j][50]=zaokr(100*((tear[i][28]*for1*zm1)/tear[i][28]));
		tear[i][28] = zaokr(tear[i][28]*for1*zm1);
		
	}
	team2=tear;
	optimal_composition_tlo(d1,d2,k,pl,para,liga);
}

function tired1()
{
	//scrff = document.getElementById("screen6").innerHTML;
	//document.getElementById("screen6").innerHTML = scrff +"tired1: "+" || ";
	var tear=team1;
	for(var i=1;i<=7;i++)
	{
		var forma = tear[i][13];
		var zm = tear[i][14];
		var for1= 1 - (100-forma)*0.0001;
	    var zm1 = 1 -  zm*0.0001;
		var li=1-(parseInt(tear[i][18])+parseInt(tear[i][20])+0.7*parseInt(tear[i][26]))*0.0001;
		for(j=6;j<=11;j++)
		{	
			tear[i][j] = zaokr(tear[i][j]*for1*zm1*li);
		}
		//for1*=0.99;zm1*=0.99;
		tear[i][28] = zaokr(tear[i][28]*for1*zm1*li);
	}
	team1=tear;
}
function tired2()
{
	//scrff = document.getElementById("screen6").innerHTML;
	//document.getElementById("screen6").innerHTML = scrff +"tired2: "+" || ";
	var tear=team2;
	for(var i=1;i<=7;i++)
	{
		var forma = tear[i][13];
		var zm = tear[i][14];
		var for1= 1 - (100-forma)*0.0001;
	    var zm1 = 1 -  zm*0.0001;
		var li=1-(parseInt(tear[i][18])+parseInt(tear[i][20])+0.7*parseInt(tear[i][26]))*0.0001;
		for(j=6;j<=11;j++)
		{
			tear[i][j] = zaokr(tear[i][j]*for1*zm1*li);
		}
		//for1*=0.99;zm1*=0.99;
		tear[i][28] = zaokr(tear[i][28]*for1*zm1*li);
	}
	team2=tear;
}

function punktuj1(pkt_par)//par - numer li w przegladarce//pomimo zmian pozostaje staly
{
	 if(pkt_par != 0)
	 {
		team1[pkt_par][25]++;
		team1[pkt_par][17]++;
	 }
}

function punktuj2(pkt_par)//par - numer absolutny rce//pomimo zmian pozostaje staly
{
	 if(pkt_par != 0)
	 {
	 	team2[pkt_par][25]++;
		team2[pkt_par][17]++;
	 }
}
//dla uniknięcia sytuacji, gdy robi zmiany przy wyniku seta np 25:19
function wyniki_czy_set_skonczony(wyn)
{
    if(wyn==3)//tie-break
    {
        if(pkt1 < 15 && pkt2 < 15)
        {
            return 0;
        }
        else
        {
            if(pkt1 >= pkt2)
            {
                if((pkt1 - pkt2) > 1){return 1;}else{return 0;}
            }
            else
            {
                if((pkt2 - pkt1) > 1){return 1;}else{return 0;}
            }
        }
    }
    else
    {
        if(pkt1 < 25 && pkt2 < 25)
        {
            return 0;
        }
        else //pkt1 lub pkt2 co najmiej równe 25
        {
            if(pkt1 >= pkt2)
            {
                if((pkt1 - pkt2) > 1){return 1;}else{return 0;}
            }
            else
            {
                if((pkt2 - pkt1) > 1){return 1;}else{return 0;}
            }
        }
    }
}

function wyniki(wyn)
{			
        /*if(inceremtor == 0)inceremtor++;
        else if(inceremtor == 1)inceremtor=0;*/
        inceremtor++;
        var indicator_zm1 = 0;var indicator_zm2 = 0;
        var res1, res2;
	if(wyn==1)
  	{
	
     res1 = document.getElementById("show1").innerHTML;
     res1++;
	 pkt1++;
	 punktuj1(pkt_par);
        //2021-01-12 omijanie dla funkcji 1mecz
        if(!play_1mecz)
        {
            document.getElementById("screen3").innerHTML = pkt_par+" team1";
        }
	 pkt_par = 0;
     document.getElementById("show1").innerHTML = res1;
	 
	 document.getElementById("pun1").innerHTML = "<<";
	 document.getElementById("pun2").innerHTML = "";
	 //aktualizuj wyswietlacz statystyk ind - działa tylko w wyswietlanym meczu
	 if(flag_star==1)
	 {
	 //console.time("stat") ;
	 act_stat();			
	 //console.timeEnd("stat") ;
	 transpa();
	 }
	 
	
  	}
  	else if(wyn==2)
  	{
     res2 = document.getElementById("show2").innerHTML;
     res2++;
	 pkt2++;
	 punktuj2(pkt_par);
        //2021-01-12 omijanie dla funkcji 1mecz
        if(!play_1mecz)
        {
            document.getElementById("screen3").innerHTML = pkt_par+" team2";
        }
	 pkt_par = 0;
     document.getElementById("show2").innerHTML = res2;
	 
	 document.getElementById("pun1").innerHTML = "";
	 document.getElementById("pun2").innerHTML = ">>";
	 //aktualizuj wyswietlacz statystyk ind - działa tylko w wyswietlanym meczu
	 if(flag_star==1)
	 {
	 //console.time("stat") ;
	 act_stat();
	 //console.timeEnd("stat") ;
	 transpa();
         }	
  	}
        var suma = pkt1+pkt2;
        if(mm1+mm2 >= 4){wyn = 3;}else{wyn = 9;}
        var set_ended = wyniki_czy_set_skonczony(wyn);//1 to skończony set
        document.getElementById("set_ended").innerHTML = "set_ended: "+set_ended;
        //if(set_ended == 1)alert("skonczony set set_ended:"+set_ended+"pkt 1 i 2: "+pkt1+", "+pkt2);
        
        //poza IF
	if(pkt1==20 && flag_dosw1==0)
	{
		//console.time("minusdosw1");
		minus_dosw1(1);
		//console.timeEnd("minusdosw1");
	}
	if(pkt2==20 && flag_dosw2==0)
	{
		//console.time("minusdosw2");
		minus_dosw2(1);
		//console.timeEnd("minusdosw2");
	}
	
	
	if(pkt1>0 && pkt1%4==0 && flag_tir1==0)
	{
		//console.time("tired1");
                tired1();
                //console.timeEnd("tired1");
		flag_tir1=1;
		if(flag_star==1)
		{
//			act_wykr_new_point2();
//			act_wykr_add_point2();
			
			act_wykr_new_point1();
			act_wykr_add_point1();
		}
	}
	if(pkt1%4==1)
	{
		flag_tir1 = 0;
	}
	
	if(pkt2>0 && pkt2%4==0 && flag_tir2==0)
	{
		tired2();
		flag_tir2=1;
		if(flag_star==1)
		{
			act_wykr_new_point2();
			act_wykr_add_point2();
			
//			act_wykr_new_point1();
//			act_wykr_add_point1();
		}
	}
	if(pkt2%4==1)
	{
		flag_tir2 = 0;
	}
	//zrocenie par gosciom
	if((pkt1==5 || pkt2==5)&& flag_host==0&&((mm1+mm2)<=2))
	{
		host_give(2);
		flag_host=1;
		//scrff = document.getElementById("screen5").innerHTML;
		//document.getElementById("screen5").innerHTML = scrff +"host_giv22: mm1,mm2:"+mm1+","+mm2+" || ";
	}
	
	var r1=pkt1-pkt2;
	var r2=pkt2-pkt1;
	if((r1)>7&&flag_wyr1==0&&set_ended==0)
	{
		wyrownacz_take(1);
		//if(mm1==1&&mm1==2)optim_zm_set_pod(2);
		flag_wyr1=1;
	}
	if((r2)>7&&flag_wyr2==0&&set_ended==0)
	{
		wyrownacz_take(2);
		//if(mm1==2&&mm2==1)optim_zm_set_pod(1);
		flag_wyr2=1;
	}
	if((r1)<4&&flag_wyr1==1)
	{
		wyrownacz_give(1);
		flag_wyr1=0;
	}
	if((r2)<4&&flag_wyr2==1)
	{
		wyrownacz_give(2);
		flag_wyr2=0;
	}
        //GOLDEN
        if((r1)>2&&flag_golden2==0&&(mm1+mm2)>2&&pkt2>12&&set_ended==0)//!!! przy jakiej różnicy robi duże zmiany
	{
		if(flag_star==0)optimal_compos_golden(2);
		else if(flag_star==1&&document.getElementById("tres2").checked){optimal_compos_golden(2);}
	}
	if((r2)>2&&flag_golden1==0&&(mm1+mm2)>2&&pkt1>12&&set_ended==0)//!!! przy jakiej różnicy robi duże zmiany
	{
		if(flag_star==0){optimal_compos_golden(1);}
		else if(flag_star==1&&document.getElementById("tres1").checked){optimal_compos_golden(1);}
	}
	//R > 5
	if((r1)>5&&flag_wyr1==0&&set_ended==0)//!!! przy jakiej różnicy robi duże zmiany
	{
		if(flag_star==0)optimal_compos_zm(2);
		else if(flag_star==1&&document.getElementById("tres2").checked){optimal_compos_zm(2);}
	}
	if((r2)>5&&flag_wyr2==0&&set_ended==0)//!!! przy jakiej różnicy robi duże zmiany
	{
		if(flag_star==0){optimal_compos_zm(1);}
		else if(flag_star==1&&document.getElementById("tres1").checked){optimal_compos_zm(1);}
	}
        
	//ZMIANA NA ZAGRYKE TEAM1


	
	/*if(pkt1>=19&&przejscie==2&&flag_zm_zag1<0)
	{
		var zawi=flag_zm_zag1*(-1);		
		if(team1[zawi][0]==1)
		{
			optimal_zm_zagr1();alert("podejrzana zm_zagr1, linia362 p3s");
		}
	}*/
	
	//ZMIANA NA ZAGRYKE TEAM2




//KONIEC poza IFami    
        //2021-01-20: po tym jak wyniki(wyn) przechodzą tylko raz przy jednym rezultacie, przerobiono:
	if((mm1+mm2) >= 4)//tie-break
	{
            if(pkt1 < 15 && pkt2 < 15)
            {
                return 1;
            }
            else
            {
                if(pkt1 >= pkt2)
                {
                    if((pkt1 - pkt2) > 1){minus_dosw1(0);minus_dosw2(0);return 0;}else{return 1;}
                }
                else
                {
                    if((pkt2 - pkt1) > 1){minus_dosw1(0);minus_dosw2(0);return 0;}else{return 1;}
                }
            }
	}
        else
        {
            if(pkt1 < 25 && pkt2 < 25)
            {
                return 1;
            }
            else //pkt1 lub pkt2 co najmiej równe 25
            {
                if(pkt1 >= pkt2)
                {
                    if((pkt1 - pkt2) > 1){minus_dosw1(0);minus_dosw2(0);return 0;}else{return 1;}
                }
                else
                {
                    if((pkt2 - pkt1) > 1){minus_dosw1(0);minus_dosw2(0);return 0;}else{return 1;}
                }
            }
        }
}

function wyniki_po_przejsciu()
{
    var r1=pkt1-pkt2;
    var r2=pkt2-pkt1;
    if((mm1+mm2) >= 4) wyn = 3; else wyn = 9;
    var set_ended = wyniki_czy_set_skonczony(wyn);
    
    //ZMIANA NA ZAGRYKE TEAM1
    if(pkt1>=19&&przejscie==2&&flag_zm_zag1==0&&r1<4&&set_ended==0)
    {
            if(flag_star==0){if(optimal_zm_zagr1()){suma1=pkt1+pkt2;}}
            else if(flag_star==1&&document.getElementById("tres1").checked)
            {if(optimal_zm_zagr1()){suma1=pkt1+pkt2;}}
            //indicator_zm1++; console.log("t1zagr: "+indicator_zm1+" przejsc: "+przejscie+" incemetor: "+inceremtor+" pkt_sum: "+suma+" sum1: "+suma1);
    }
    
    //Zmiana POWROTNA1 z zagrywki - flag_zm_zag1 pamięta nr zawodnika
	if(flag_zm_zag1>0&&przejscie==1&&set_ended==0)//&&suma1<suma
	{//console.log("t1zagr-powrot: "+indicator_zm1+" flag_zm_zag1: "+flag_zm_zag1+" przejsc: "+przejscie+" incemetor: "+inceremtor+" pkt_sum: "+suma+" sum1: "+suma1);
	var do_zejscia=0;// z zagrywki; w funckacja opt_comp_zagryw1 odpowienidk g12, który tam wszedł z ławki
	for(var i=1;i<=6;i++)
	{		
if(team1[i][0]==1){do_zejscia=i;}//przy indeksie 0 jesr aktualna pozycja, więc na 0 jest zawsze ostanio serwujący
	}
        if(possible_change(1,team1[do_zejscia][3],team1[flag_zm_zag1][3])<6)
        {        
//2021-01-12 Zmiana na screen3 dla team1
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Zmiana powrotna: "+team1[flag_zm_zag1][5]+" za: "+team1[do_zejscia][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2+" g6-fl: "+flag_zm_zag1+" do_zejscia: "+do_zejscia;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team1[flag_zm_zag1][5]+" za "+team1[do_zejscia][5];
//change1(flag_zm_zag1,do_zejscia);//(out,in)
                change1(do_zejscia, flag_zm_zag1);
        }

//DO USUNIECIA!
flag_zm_zag1*=(-1);//change1(zz1,zz2);//(wchodzi,schodzi)
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Powrotna flag_zm_zag1: "+flag_zm_zag1+"przejście: "+przejscie+" team1[do_zejscia][0]: "+team1[do_zejscia][0]+"<br/>";
	}//end of powrot z zagrywki1
        
        
    //ZMIANA NA ZAGRYKE TEAM2
    if(pkt2>=19&&przejscie==1&&flag_zm_zag2==0&&r2<4&&set_ended==0)//dop r1
    {
            if(flag_star==0){if(optimal_zm_zagr2()){suma2=pkt1+pkt2;}}
            else if(flag_star==1&&document.getElementById("tres2").checked)
            {if(optimal_zm_zagr2()){suma2=pkt1+pkt2;}}
            //indicator_zm2++; console.log("t2zagr: "+indicator_zm2+" przejsc: "+przejscie+" incemetor: "+inceremtor+" pkt_sum: "+suma+" sum2: "+suma2);
    }

    //zmiana POWROTNA2 z zagrywki
	if(flag_zm_zag2>0&&przejscie==2&&set_ended==0)//&&suma2<suma
	{//console.log("t2zagr-powrot: "+indicator_zm2+" flag_zm_zag1: "+flag_zm_zag1+" przejsc: "+przejscie+" incemetor: "+inceremtor+" pkt_sum: "+suma+" sum2: "+suma2);
	var do_zejscia=0;
	for(var i=1;i<=6;i++)
	{		
if(team2[i][0]==1){do_zejscia=i;}
	}
            if(possible_change(2,team2[do_zejscia][3],team2[flag_zm_zag2][3])<6)
            {
//2021-01-12: Zmiana tekstów
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Zmiana powrotna: "+team2[flag_zm_zag2][5]+" za: "+team2[do_zejscia][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2+" g6-fl: "+flag_zm_zag2+" do_zejscia: "+do_zejscia;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team2[flag_zm_zag2][5]+" za "+team2[do_zejscia][5];
//change2(flag_zm_zag2,do_zejscia);
                change2(do_zejscia, flag_zm_zag2);
            }

//DO USUNIECIA!
flag_zm_zag2*=(-1);
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Powrotna flag_zm_zag2: "+flag_zm_zag2+"przejście: "+przejscie+" team2[do_zejscia][0]: "+team2[do_zejscia][0]+"<br/>";
	}
    
}

function find_leaders()
{
	frt = 0; scn = 0;
	frti = 0; scni = 0;
	for(t=2;t<=6;t++)				 //nie rozgrywajacy, wiec 1 odpada //srdokowy w drugiej lini tez odpada,
	{
	team1[t][1] = "null"; //wymazanie liderow
	  if(!((team1[t][0] == 1 || team1[t][0] == 6 ||team1[t][0] == 5) && team1[t][4] == "S"))			//nie srodkowy z 2 linii
		{
			tempp = (parseInt(team1[t][12])+parseInt(team1[t][6]))/2;		//!!  tu wyliczono srendia: (perfo + atak)/2
			
			if(tempp > scn)
			{
				if(tempp > frt)		
				{
					scn = frt;
					scni = frti;
					frt = tempp;
					frti = t;
				}
				else
				{
					scn = tempp;
					scni = t;
				}
			}
		}
	}
	team1[frti][1] = "L"; //lider
	team1[scni][1] = "M"; //minilider
	
	frt = 0; scn = 0;
	frti = 0; scni = 0;
	for(t=2;t<=6;t++)				 //nie rozgrywajacy, wiec 1 odpada //srdokowy w drugiej lini tez odpada,
	{								 //
	team2[t][1] = "null"; //wymazanie liderow
	  if(!((team2[t][0] == 1 || team2[t][0] == 6 || team2[t][0] == 5) && team2[t][4] == "S"))
	  {
	  	tempp = (parseInt(team2[t][12])+parseInt(team2[t][6]))/2;
		
		if(tempp > scn)
		{
			if(tempp > frt)
			{
				scn = frt;
				scni = frti;
				frt = tempp;
				frti = t;
			}
			else
			{
				scn = tempp;
				scni = t;
			}
		}
	  }
	}
	team2[frti][1] = "L"; //lider
	team2[scni][1] = "M"; //minilider
	//		document.write(team1,team2);
}

function change1(zmj,j)//operuje na indeks główny! dalej dopiero wstawia numery
{
	//alert(team1[zmj][3]);alert(team1[j][3]);
        item = [1, parseInt(team1[zmj][3]), parseInt(team1[j][3])];
        changes.push(item);
        //changes[changesind] = new Array(1, team1[zmj][3], team1[j][3]);
        //changes[changesind] = [];
        //changes[changesind][0] = 1; changes[changesind][1] = team1[zmj][3]; changes[changesind][2] = team1[j][3];
        //changes[changesind] = new Array('1', 'team1[zmj][3]', 'team1[j][3])');
        //changes[changesind] = (1, team1[zmj][3], team1[j][3]);
        /*item = {}
        item[0] = 1;
        item[1] = team1[zmj][3]; 
        item[2] = team1[j][3];
	changes.push(item);*/

	out = team1[zmj].shift();//Usuwa pierwszy element z tablicy i zwraca go. Metoda ta zmienia długość tablicy.
	ins = team1[j].shift();	 
	
	team1[j].unshift(out);//Dodaje jeden lub więcej elementów na początek tablicy i zwraca jej nową długość.
	team1[zmj].unshift(ins);
	
	temp = team1[zmj];
	team1[zmj] = team1[j];
	team1[j] = temp;
        
        ustawienie();
        banch_ins();
}

function chan1(zmj,j)//operuje na indeks główny nie numery zaw!
{
	out = team1[zmj].shift(); //Usuwa pierwszy element z tablicy i zwraca go. Metoda ta zmienia długość tablicy.
	ins = team1[j].shift();	  
	
	team1[j].unshift(out);//Dodaje jeden lub więcej elementów na początek tablicy i zwraca jej nową długość.
	team1[zmj].unshift(ins);
	
	temp = team1[zmj];
	team1[zmj] = team1[j];
	team1[j] = temp;
}

function zamamiana_zmiana(id)
{
//sprawdzić ilu zaw jest w druzynie//wtedy zamiast 12 wpisac tę liczbę
	//z_lenght = 12;
	for(i=1;document.getElementById("kto"+i) != null;i++)
	{
		if(!document.getElementById("kto"+i).disabled && document.getElementById("gra"+i).checked && document.getElementById("kto"+i).value != "")
		{
			do_zm = parseInt(document.getElementById("kto"+i).value); //nr zawodnika, ktory ma byc zmieniony
			na_zm = parseInt(document.getElementById("nr"+i).innerHTML);  //nr zwoadnika, ktory wejdzie
			
			document.getElementById("screen6").innerHTML="value: "+do_zm+"inner: "+na_zm;
			
			adres = "operacje/pl_change.php?in="+na_zm+"&out="+do_zm+"&id="+id;
			getData(adres, "monu");	
			//document.getElementById("monu").innerHTML= adres;
			!document.getElementById("kto"+i).readonly;// = "readonly"; //tabliczka tylko do odczytu - nie działa
			document.getElementById("kto"+i).disabled = "disabled";//zaciemnienie 'tabliczki'
			document.getElementById("gra"+i).checked= "";
			
			
		}
	
	}
}

//OPERUJE NA NR ZAWODNIKOW!!!
function possible_change(par,z1,z2)//pomiedzy zaw//jesli sa obok siebie w tabeli i r<6 to ok
{
    //console.log("Prop zmiany: "+par+" out: "+z1+" in: "+z2);
if(par==1)
{
    var r=0; var ile_razy_para = 0;
    for(var u=0;u<changes.length;u++)
    {
        if(changes[u][0]==1)
        {
            r++;
            //sprawdzanie czy w jakiejś parze są już te numery - ale nie razem - zmiana zawsze niedozwolona
            if(changes[u][1]==z1||changes[u][1]==z2||changes[u][2]==z1||changes[u][2]==z2)
            {
                if((changes[u][1]!=z1 && changes[u][2]==z2) || (changes[u][1]==z1 && changes[u][2]!=z2) || (changes[u][1]!=z2 && changes[u][2]==z1) || (changes[u][1]==z2 && changes[u][2]!=z1))
                {
                    //alert("1- jestem-return 6 - już uczesniczył w zmianie.");
                    //alert("changes[u][1]: "+changes[u][1]);alert("changes[u][2]: "+changes[u][2]);
                    //alert("z1: "+z1);alert("z2: "+z2);                       
                    return 7;//zmiana niedozwolona - już uczestniczył w innej parze na wymianę
                }
            }
            //ile razy podane nr są w parze - raz mogą być - trzeba dozolić jak raz są w parze - na zm powr
            if((changes[u][1]==z1&&changes[u][2]==z2)||(changes[u][1]==z2&&changes[u][2]==z1))
            {
                ile_razy_para++;
            }
        }
    }
    //alert("ile razy para1: "+ile_razy_para);
    if(ile_razy_para>1){return 7;}//zmiana niedozwolona - mogą się raz zmnienić i 1 raz powrotnie
    //alert("return ilość change1: "+r);
    return r;//zm dozwolona 0,1,2,3,4,5
}
else if(par==2)
{
    var r=0; var ile_razy_para = 0;
    for(var u=0;u<changes.length;u++)
    {
        if(changes[u][0]==2)
        {
            r++;
            //sprawdzanie czy w jakiejś parze są już te numery - ale nie razem - zmiana zawsze niedozwolona
            if(changes[u][1]==z1||changes[u][1]==z2||changes[u][2]==z1||changes[u][2]==z2)
            {
                if((changes[u][1]!=z1 && changes[u][2]==z2) || (changes[u][1]==z1 && changes[u][2]!=z2) || (changes[u][1]!=z2 && changes[u][2]==z1) || (changes[u][1]==z2 && changes[u][2]!=z1))
                {
                    //alert("2- jestem-return 6 - już uczesniczył w zmianie.");
                    //alert("changes[u][1]: "+changes[u][1]);alert("changes[u][2]: "+changes[u][2]);
                    //alert("z1: "+z1);alert("z2: "+z2);                       
                    return 7;//zmiana niedozwolona - już uczestniczył w innej parze na wymianę
                }
            }
            //ile razy podane nr są w parze - raz mogą być - trzeba dozolić jak raz są w parze - na zm powr
            if((changes[u][1]==z1&&changes[u][2]==z2)||(changes[u][1]==z2&&changes[u][2]==z1))
            {
                ile_razy_para++;
            }
        }
    }
    //alert("ile razy para2: "+ile_razy_para);
    if(ile_razy_para>1){return 7;}//zmiana niedozwolona - mogą się raz zmnienić i 1 raz powrotnie
    //alert("return ilość change2: "+r);
    return r;//zm dozwolona 0,1,2,3,4,5,6
}
}

function zmia_1_nex()
{
   //sprawdzenie czy pola wypełnione - !! jeszcze kwadnazw11
    if(typeof window_zm1 != "undefined") 
    {
        if(document.getElementById("window_zm1").value == "")
        {
            document.getElementById("screen1").innerHTML="wybierz zawodników do zmiany";return 0;
        }
    }
    else
    {
            document.getElementById("screen1").innerHTML="wybierz zawodników do zmiany";return 0;
    }
    //zczytanie pól, jeśli wcześniej returny nie wywaliły z błędem pól
    var z1 = parseInt(document.getElementById("window_zm1").value);//zchodzi z boiska
    var z2 = parseInt(document.getElementById("kwadnazw11").innerHTML);//wchodzi - pojawiaj się po kl na ławke rez 
    for(var i=1;i<=12;i++)//przepisanie nr zawodników na index główny
    {
            if(team1[i][3]==z1)
            {
                    var zz1 = i;
            }
            if(team1[i][3]==z2)
            {
                    var zz2 = i;
            }
    }
    if(pkt1 == 0 && pkt2 == 0)//document.getElementById("kwadnazw11").innerText
    {
        if(slepa == 0)//zmiana ustawienia nie moze być możliwa na końcu seta, przed skasowaniem wyniku na nowy
        {
            chan1(zz1,zz2);//(out,in)
            //2021-01-14: dodano div w celu wyśw info o zmianach na gemafield
            var fffv = document.getElementById("change_info1").innerHTML;
            document.getElementById("change_info1").innerHTML=fffv+"<br>"+team1[zz1][5]+" za "+team1[zz2][5]+""; 
            ustawienie();
            banch_ins();
            document.getElementById("kwadrat11").innerHTML="";
            document.getElementById("kwadnazw11").innerHTML="";
        }
        else
        {
            document.getElementById("screen1").innerHTML=" set zakończony";
            document.getElementById("kwadrat11").innerHTML="";
            document.getElementById("kwadnazw11").innerHTML="";
        }
    }
    else
    {
        var pos_cz = possible_change(1,z1,z2);
	if(pos_cz==6)
	{
            document.getElementById("screen1").innerHTML=" wykorzystano limit zmian";
            document.getElementById("kwadrat11").innerHTML="";
            document.getElementById("kwadnazw11").innerHTML="";
            return 0;
	}
        if(pos_cz==7)
	{
            document.getElementById("screen1").innerHTML=" zmiana niedozwolona";
            document.getElementById("kwadrat11").innerHTML="";
            document.getElementById("kwadnazw11").innerHTML="";
            return 0;
	}
        else (pos_cz < 6)
        {
            change1(zz1,zz2);//(out,in) //operuje na indeks glowny ||tylko possible_change operuje na nr
            document.getElementById("screen1").innerHTML="zmiana: "+team1[zz1][5]+" za "+team1[zz2][5];
            //2021-01-13: dodano div w celu wyśw info o zmianach na gemafield
            var fffv = document.getElementById("change_info1").innerHTML;
            document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team1[zz1][5]+" za "+team1[zz2][5]+"";        
            //document.getElementById("l"+zz1).innerHTML = "<div onclick=banch_go1("+team1[zz1][3]+") class='zaw'>"+team1[zz1][5]+"</div>";
            //ustawienie();change1&change2 ma to wbudowane
            //banch_ins();
            document.getElementById("kwadrat11").innerHTML="";
            document.getElementById("kwadnazw11").innerHTML="";
        }
    }
}
function zmia_2_nex()
{
    //sprawdzenie czy pola wypełnione
    if(typeof window_zm2 != "undefined") 
    {
        if(document.getElementById("window_zm2").value == "")
        {
            document.getElementById("screen2").innerHTML="wybierz zawodników do zmiany";return 0;
        }
    }
    else
    {
            document.getElementById("screen2").innerHTML="wybierz zawodników do zmiany";return 0;
    }
    //zczytanie pól, jeśli wcześniej returny nie wywaliły z błędem pól
    var z1 = parseInt(document.getElementById("window_zm2").value);//zchodzi z boiska
    var z2 = parseInt(document.getElementById("kwadnazw22").innerHTML);//wchodzi
    for(var i=1;i<=12;i++)
    {
            if(team2[i][3]==z1)
            {
                    var zz1 = i;
            }
            if(team2[i][3]==z2)
            {
                    var zz2 = i;
            }
    }
    
    if(pkt1 == 0 && pkt2 == 0)
    {
        if(slepa == 0)//zmiana ustawienia nie moze być możliwa na końcu seta, przed skasowaniem wyniku na nowy
        {
        chan2(zz1,zz2);//(wchodzi,schodzi)

        //2021-01-14: dodano div w celu wyśw info o zmianach na gemafield
        var fffv = document.getElementById("change_info2").innerHTML;
        document.getElementById("change_info2").innerHTML=fffv+"<br>"+team2[zz1][5]+" za "+team2[zz2][5]+""; 
        ustawienie();
	banch_ins();
	document.getElementById("kwadrat22").innerHTML="";
	document.getElementById("kwadnazw22").innerHTML="";
        }
        else
        {
            document.getElementById("screen2").innerHTML=" set zakończony";
            document.getElementById("kwadrat22").innerHTML="";
            document.getElementById("kwadnazw22").innerHTML="";
        }
    }
    else
    {
        var pos_cz = possible_change(2,z1,z2);
	if(pos_cz==6)
	{
            document.getElementById("screen2").innerHTML=" wykorzystano limit zmian";
            document.getElementById("kwadrat22").innerHTML="";
            document.getElementById("kwadnazw22").innerHTML="";
            return 0;
	}
        if(pos_cz==7)
	{
            document.getElementById("screen2").innerHTML=" zmiana niedozwolona";
            document.getElementById("kwadrat22").innerHTML="";
            document.getElementById("kwadnazw22").innerHTML="";
            return 0;
	}
        else (pos_cz < 6)
        {
	change2(zz1,zz2);
	document.getElementById("screen2").innerHTML="zmiana: "+team2[zz1][5]+" za "+team2[zz2][5];
        //2021-01-13: dodano div w celu wyśw info o zmianach na gemafield
        var fffv = document.getElementById("change_info2").innerHTML;
        document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team2[zz1][5]+" za "+team2[zz2][5]+"";
	//ustawienie();
	//banch_ins();
	document.getElementById("kwadrat22").innerHTML="";
	document.getElementById("kwadnazw22").innerHTML="";
        }
    }
}

function zmiana1()
{
	for(i=1;i<=12;i++)
	{
		if(!document.getElementById("kto1."+i).disabled && document.getElementById("gra1."+i).checked && document.getElementById("kto1."+i).value != "")
		{
			do_zm = document.getElementById("kto1."+i).value; //nr zawodnika, ktory ma byc zmieniony
			na_zm = document.getElementById("nr1."+i).innerHTML;  //nr zwoadnika, ktory wejdzie
			zmj = 0;zmj2 =0;
			for(j=1;j<=12;j++)
			{
				if(team1[j][3] == do_zm) //szukanie nr zawodnika do zmiany w tablicy
				{
					zmj = j;
				}
				if(team1[j][3] == na_zm) //szukanie nr zawodnika na zmiane (in))
				{
					zmj2 =j;
				}
				
			}
			change1(zmj,zmj2);
			!document.getElementById("kto1."+i).readonly;// = "readonly"; //tabliczka tylko do odczytu - nie działa
			document.getElementById("kto1."+i).disabled = "disabled";//zaciemnienie 'tabliczki'
			document.getElementById("gra1."+i).disabled= "disabled";
			
		
			for(j=1;j<=12;j++)//poszukiwanie zaw, któremu trzeba odzanczyc,włączyć check, wpisać nr do zm powrotnej
			{
				if(document.getElementById("nr1."+j).innerHTML == do_zm)
				{
					document.getElementById("gra1."+j).checked = "";
					document.getElementById("gra1."+j).disabled= "";
					document.getElementById("kto1."+j).value = na_zm;//zmiany powrotne
					document.getElementById("kto1."+j).readonly = "readonly";//nie działa
				}
			}
				
		}
		
	}
	tem = przejscie;
	przejscie = 0;
	ustawienie();
	przejscie = tem;
}

function change2(zmj,j)
{
	//var changesind = changes.length;
        //changes[changesind] = Array(2, team2[zmj][3], team2[j][3]);
        
        item = [2, parseInt(team2[zmj][3]), parseInt(team2[j][3])];
        changes.push(item);
        
	out = team2[zmj].shift(); 
	ins = team2[j].shift();	
	
	team2[j].unshift(out);
	team2[zmj].unshift(ins);
	
	temp = team2[zmj];
	team2[zmj] = team2[j];
	team2[j] = temp;
        
        ustawienie();
        banch_ins();
}

function chan2(zmj,j)
{	
	out = team2[zmj].shift(); //skrócenie o 1 tabeli
	ins = team2[j].shift();	  //skrócenie o 1 tabeli
	
	team2[j].unshift(out);
	team2[zmj].unshift(ins);
	
	temp = team2[zmj];
	team2[zmj] = team2[j];
	team2[j] = temp;
}

function zmiana2()
{
	for(i=1;i<=12;i++)
	{
		if(!document.getElementById("kto2."+i).disabled && document.getElementById("gra2."+i).checked && document.getElementById("kto2."+i).value != "")
		{
			do_zm = document.getElementById("kto2."+i).value; //nr zawodnika, ktory ma byc zmieniony
			na_zm = document.getElementById("nr2."+i).innerHTML;  //nr zwoadnika, ktory wejdzie
			zmj = 0;zmj2 =0;
			for(j=1;j<=12;j++)
			{
				if(team2[j][3] == do_zm) //szukanie nr zawodnika do zmiany w tablicy
				{
					zmj = j;
				}
				if(team2[j][3] == na_zm) //szukanie nr zawodnika na zmiane (in))
				{
					zmj2 =j;
				}
				
			}
			change2(zmj,zmj2);
			!document.getElementById("kto2."+i).readonly;// = "readonly"; //tabliczka tylko do odczytu - nie działa
			document.getElementById("kto2."+i).disabled = "disabled";//zaciemnienie 'tabliczki'
			document.getElementById("gra2."+i).disabled= "disabled";
			
		
			for(j=1;j<=12;j++)//poszukiwanie zaw, któremu trzeba odzanczyc,włączyć check, wpisać nr do zm powrotnej
			{
				if(document.getElementById("nr2."+j).innerHTML == do_zm)
				{
					document.getElementById("gra2."+j).checked = "";
					document.getElementById("gra2."+j).disabled= "";
					document.getElementById("kto2."+j).value = na_zm;//zmiany powrotne
					document.getElementById("kto2."+j).readonly = "readonly";//nie działa
				}
			}
				
		}
		
	}
	tem = przejscie;
	przejscie = 0;
	ustawienie();
	przejscie = tem;
}

function zmia(a,b)
{
	if(!document.getElementById(b).checked){document.getElementById(a).disabled = "disabled";}
	if(document.getElementById(b).checked){document.getElementById(a).disabled = "";}
}

function zapisz_z()
{
adr=1;mis=1;
while(adr<=2)
{
	
	rflag=0; p1flag=0; s1flag=0; aflag=0; p2flag=0; s2flag=0;lflag=0;
	for(i=1;i<=12;i++,mis++)
	{
		
		if(document.getElementById("poz"+adr+"."+i).innerHTML == "R" && document.getElementById("gra"+adr+"."+i).checked && rflag != 1)
		{
			rflag = 1;
			make_tables(1,i,adr);
		}
		if(document.getElementById("poz"+adr+"."+i).innerHTML == "P" && document.getElementById("gra"+adr+"."+i).checked && p1flag < 2)
		{
		    if(p1flag==0){make_tables(2,i,adr);p1flag++;}
			else {make_tables(5,i,adr);p1flag++;}
			
		}
		if(document.getElementById("poz"+adr+"."+i).innerHTML == "S" && document.getElementById("gra"+adr+"."+i).checked && s1flag < 2)
		{
			if(s1flag==0){make_tables(3,i,adr);s1flag++;}
			else{make_tables(6,i,adr);s1flag++;}
		}
		if(document.getElementById("poz"+adr+"."+i).innerHTML == "A" && document.getElementById("gra"+adr+"."+i).checked && aflag != 1)
		{
			aflag = 1;
			make_tables(4,i,adr);
		}
		if(document.getElementById("poz"+adr+"."+i).innerHTML == "L" && document.getElementById("gra"+adr+"."+i).checked && lflag != 1)
		{
			lflag = 1;
			make_tables(7,i,adr);
		}
		
		
/*		if(document.getElementById("poz1."+i).innerHTML == "P" && document.getElementById("gra1."+i).checked && p2flag != 1)
		{
			p2flag = 1;
			make_tables(5,i,adr);
		}
		if(document.getElementById("poz1."+i).innerHTML == "S" && document.getElementById("gra1."+i).checked && s2flag != 1)
		{
			s2flag = 1;
			make_tables(6,i,adr);
		}*/
	}
	for(i=1,j=8;i<=12;i++)
	{
		if(!document.getElementById("gra"+adr+"."+i).checked)
		{
			make_tables(j,i,adr);
			j++;
		}
	}
adr++;
}
//document.write(team1,team2,mis);
ustawienie();
}

function transpa()
{
    //2021-01-17 - omijanie dla funkcji 1 mecz
    //if(!play_1mecz)
    //{
        for(var i=1;i<=12;i++)
		{
			document.getElementById("nr1."+i).innerHTML = team1[i][3];
			document.getElementById("poz1."+i).innerHTML = team1[i][4];
			document.getElementById("nazwisko1."+i).innerHTML = team1[i][5];
			
			document.getElementById("a1."+i).innerHTML = team1[i][6];
			document.getElementById("p1."+i).innerHTML = team1[i][7];
			document.getElementById("z1."+i).innerHTML = team1[i][8];
			document.getElementById("b1."+i).innerHTML = team1[i][9];
			document.getElementById("o1."+i).innerHTML = team1[i][10];
			document.getElementById("r1."+i).innerHTML = team1[i][11];
			
			document.getElementById("for1."+i).innerHTML = team1[i][13];
			document.getElementById("zm1."+i).innerHTML = team1[i][14];
		}
		for(var i=1;i<=12;i++)
		{
			document.getElementById("nr2."+i).innerHTML = team2[i][3];
			document.getElementById("poz2."+i).innerHTML = team2[i][4];
			document.getElementById("nazwisko2."+i).innerHTML = team2[i][5];
		
			document.getElementById("a2."+i).innerHTML = team2[i][6];
			document.getElementById("p2."+i).innerHTML = team2[i][7];
			document.getElementById("z2."+i).innerHTML = team2[i][8];
			document.getElementById("b2."+i).innerHTML = team2[i][9];
			document.getElementById("o2."+i).innerHTML = team2[i][10];
			document.getElementById("r2."+i).innerHTML = team2[i][11];
			
			document.getElementById("for2."+i).innerHTML = team2[i][13];
			document.getElementById("zm2."+i).innerHTML = team2[i][14];
		}
    //}
}

function make_tables(j,i,adr)
{
	if(adr==1)
	{	
		team1[j] = 
		Array(
		j,												//to jest jego ustawienie
		j,
		i,												//pozycja z przegladarki
		document.getElementById("nr1."+i).innerHTML,
		document.getElementById("poz1."+i).innerHTML,
		document.getElementById("nazwisko1."+i).innerHTML,
		document.getElementById("a1."+i).innerHTML,
		document.getElementById("p1."+i).innerHTML,
		document.getElementById("z1."+i).innerHTML,
		document.getElementById("b1."+i).innerHTML,
		document.getElementById("o1."+i).innerHTML,
		document.getElementById("r1."+i).innerHTML,
		document.getElementById("perfo1."+i).innerHTML,
		document.getElementById("for1."+i).innerHTML,
		document.getElementById("zm1."+i).innerHTML,
		document.getElementById("wzrost1."+i).innerHTML,			//15
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,															//25
		0															//26 w składzi lub nie
		)
	}
	else
	{
		team2[j] = 
		Array(
		j,
		j,
		i,
		document.getElementById("nr2."+i).innerHTML,
		document.getElementById("poz2."+i).innerHTML,			//4
		document.getElementById("nazwisko2."+i).innerHTML,
		document.getElementById("a2."+i).innerHTML,				//6
		document.getElementById("p2."+i).innerHTML,				//7
		document.getElementById("z2."+i).innerHTML,				//8
		document.getElementById("b2."+i).innerHTML,
		document.getElementById("o2."+i).innerHTML,				//10
		document.getElementById("r2."+i).innerHTML,
		document.getElementById("perfo2."+i).innerHTML,			//12
		document.getElementById("for2."+i).innerHTML,			//13
		document.getElementById("zm2."+i).innerHTML,				//14
		document.getElementById("wzrost2."+i).innerHTML,			//15
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
		)
	}		//w team[0] zawsze liber ?
		
		//document.write('imie: ' + Tablica[0][0] + ', wzrost: ' + Tablica[0][1]); //wypisze się "imie: Marcin, wzrost: 182"
}

function ustawienie() //blad - ustawienie wsadza libero na poz 1 przy zmianie, kiedy tam powinien byc jeszcze S
{
	for(r=1;r<=6;r++)
	{
	poz = team1[r][0]; //infi o aktualnej pozycji onmouseover=act_wykr_draw("+r+")
	document.getElementById("l"+poz).innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go1("+team1[r][3]+") class='zaw'>"+team1[r][5]+"</div>";
	//wsadzenie libero
		if((r==3 || r ==6) && ((team1[r][0]==1 && przejscie==1) || team1[r][0] == 6 || team1[r][0] == 5))
		{
	document.getElementById("l"+poz).innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go1("+team1[7][3]+") class='zaw'>"+team1[7][5]+"</div>";
	document.getElementById("liberofield1").innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go1("+team1[r][3]+") class='zaw'>"+team1[r][5]+"</div>";
		}
		else if((r==3 || r ==6) && ((team1[r][0]==1 && przejscie==2) || team1[r][0] == 6 || team1[r][0] == 5))
		{
	document.getElementById("l"+poz).innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go1("+team1[r][3]+") class='zaw'>"+team1[r][5]+"</div>";
	document.getElementById("liberofield1").innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go1("+team1[7][3]+") class='zaw'>"+team1[7][5]+"</div>";		
		}
	}
	for(z=1;z<=6;z++)
	{
		poz = team2[z][0]; //infi o aktualnej pozycji
	document.getElementById("r"+poz).innerHTML = "<div onmouseover=ask_zm2("+z+") onclick=banch_go2("+team2[z][3]+") class='zaw'>"+team2[z][5]+"</div>";
		if((z==3 || z ==6) && ((team2[z][0] == 1 && przejscie == 2) || team2[z][0] == 6 || team2[z][0] == 5))
		{
	document.getElementById("r"+poz).innerHTML = "<div onmouseover=ask_zm2("+z+") onclick=banch_go2("+team2[7][3]+") class='zaw'>"+team2[7][5]+"</div>";
	document.getElementById("liberofield2").innerHTML = "<div onclick=banch_go2("+team2[z][3]+") class='zaw'>"+team2[z][5]+"</div>";
		}
		else if((z==3 || z ==6) && ((team2[z][0] == 1 && przejscie == 1) || team2[z][0] == 6 || team2[z][0] == 5))
		{
	document.getElementById("r"+poz).innerHTML = "<div onmouseover=ask_zm2("+z+") onclick=banch_go2("+team2[z][3]+") class='zaw'>"+team2[z][5]+"</div>";
	document.getElementById("liberofield2").innerHTML = "<div onmouseover=ask_zm2("+z+") onclick=banch_go2("+team2[7][3]+") class='zaw'>"+team2[7][5]+"</div>";
		}
	}
	insert_tktz();
}


function insert_tktz()
{
	document.getElementById("tktzz1.2").innerHTML  = team1[7][5];//libero
	document.getElementById("tktzz1.3").innerHTML  = team1[5][5];
	document.getElementById("tktzz1.4").innerHTML  = team1[2][5];
	
	document.getElementById("tktzz2.2").innerHTML  = team2[7][5];//libero
	document.getElementById("tktzz2.3").innerHTML  = team2[5][5];
	document.getElementById("tktzz2.4").innerHTML  = team2[2][5];
}

function przejscie1()
{
	if(przejscie == 1 || przejscie == 0)
	{
		temp = team1[6][0];
		for(i=6;i>=2;i--)
		{
			team1[i][0] = team1[i-1][0];
		}
		team1[1][0] = temp;
		//setTimeout(ustawienie, 2000);
		przejscie = 2;
                document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
		ustawienie();
	}
        //var sumapkt = pkt1+pkt2;
        //console.log("Robie przejsc1 - inceremntor: "+inceremtor+"sumapkt: "+sumapkt)
        var aaa = 2;
        for(var u=0;u<=10000;u++){aaa+=2;}
}

function przejscie2()
{
	if(przejscie == 2 || przejscie == 0)
	{
		temp = team2[6][0];
		for(i=6;i>=2;i--)
		{
			team2[i][0] = team2[i-1][0];
		}
		team2[1][0] = temp;
		//setTimeout(ustawienie, 2000);
		przejscie = 1;
                document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
		ustawienie();
	}
        var aaa = 2;
        for(var u=0;u<=10000;u++){aaa+=2;}
        //var sumapkt = pkt1+pkt2;
        //console.log("Robie przejsc2 - inceremntor: "+inceremtor+"sumapkt: "+sumapkt)
}

function przejscie1_rotuj()
{
		temp = team1[6][0];
		for(i=6;i>=2;i--)
		{
			team1[i][0] = team1[i-1][0];
		}
		team1[1][0] = temp;
		przejscie = 2;
                document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
		ustawienie();
}

function przejscie2_rotuj()
{
		temp = team2[6][0];
		for(i=6;i>=2;i--)
		{
			team2[i][0] = team2[i-1][0];
		}
		team2[1][0] = temp;
		przejscie = 1;
                document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
		ustawienie();
}


function make_teams()
{
  for(i=1;i<=12;i++)  //tworzenie tablicy z id zawodników, którzy bior± udział w meczu
  {
  a="id1."+i;
  team1[i] = document.getElementById(a).value;
  }
  for(i=1;i<=12;i++)  //tworzenie tablicy z id zawodników, którzy bior± udział w meczu
  {
  a="id2."+i;
  team2[i] = document.getElementById(a).value;
  }
}

function zaokr(liczba)
{
liczba=liczba*100;
liczba=Math.round(liczba);
liczba=liczba/100;
return liczba;
}

function zaokr4(liczba)
{
liczba=liczba*10000;
liczba=Math.round(liczba);
liczba=liczba/10000;
return liczba;
}

function zaokr1(liczba)
{
liczba=liczba*10;
liczba=Math.round(liczba);
liczba=liczba/10;
return liczba;
}

function wb($liczba)
{
    return ($liczba > 0) ? $liczba  : $liczba * (-1);
}

function dowynik()
{
  wynikch1=0;
  for(i=1;i<=12;i++)  //pobranie pkt zawodników, którzy bior± udział w meczu
  {
  		  if(document.getElementById("gra1."+i).checked)
          {
	          wynik = document.getElementById("wynik1."+i).value   //pobiera aktualny-chwilowy perfo
	          c="perfo1."+i;
	          perfo = document.getElementById(c).value;
	          if(wynik==0)
	          {
	            wynik=perfo;
	          }
	
	          a="for1."+i;
	          b="zm1."+i;
	          forma = document.getElementById(a).value;      //wstawianie do inputa to value, do diva InnerHTML!!!!!!!!!!!!!
	          zm = document.getElementById(b).value;
	          forma= 1 - (100-forma)*0.001;
	          zm = 1 -  zm*0.001;
	          wynik=wynik*forma*zm;                         //korekcja wyniku dla zawodnika o forme i zmeczenie
	          wynikch1 = wynikch1 + wynik;                  //wylicza wynik chwilowy dla druzyny
	
	          document.getElementById("wynik1."+i).value = zaokr(wynik);
	          zm_ch = ((perfo - wynik)/perfo)*100;
          	  document.getElementById("zm_ch1."+i).innerHTML = Math.round(zm_ch)+"%";  //wyswietla zmieczenie chwilowe w %
		  }
  }
  document.getElementById("wynikch1").value = zaokr(wynikch1/7);
  document.getElementById("team_pkt1").value = zaokr(wynikch1/7);


  wynikch2=0;
  for(i=1;i<=12;i++)  //tworzenie tablicy z id zawodników, którzy bior± udział w meczu
  {
     if(document.getElementById("gra2."+i).checked)
          {
			  wynik = document.getElementById("wynik2."+i).value   //pobiera aktualny-chwilowy perfo
	          c="perfo2."+i;
	          perfo = document.getElementById(c).value;
	          if(wynik==0)
	          {
	            wynik=perfo;
	          }
	
	          a="for2."+i;
	          b="zm2."+i;
	          forma = document.getElementById(a).value;      //wstawianie do inputa to value, do diva InnerHTML!!!!!!!!!!!!!
	          zm = document.getElementById(b).value;
	          forma=1 - (100-forma)*0.001;
	          zm = 1 -  zm*0.001;
	          wynik=wynik*forma*zm;
	          wynikch2 = wynikch2 + wynik;
	
	          document.getElementById("wynik2."+i).value = zaokr(wynik);
	          zm_ch = ((perfo - wynik)/perfo)*100;
	          document.getElementById("zm_ch2."+i).innerHTML = Math.round(zm_ch)+"%";
		  }
  }
  
  
  document.getElementById("wynikch2").value = zaokr(wynikch2/7);
  document.getElementById("team_pkt2").value = zaokr(wynikch2/7);
  tmp = (wb(wynikch1 - wynikch2))/7;
  document.getElementById("team_rozn").value = tmp;
  wyn = playset(tmp, wynikch1, wynikch2);
  if(wyn==1)
  {
     res1 = document.getElementById("show1").innerHTML;
     res1++;
     document.getElementById("show1").innerHTML = res1;
  }
  else
  {
     res2 = document.getElementById("show2").innerHTML;
     res2++;
     document.getElementById("show2").innerHTML = res2;
  }
}

function playset(par, w1, w2)
{
  if(w1>w2)
  {
    if(par<30)
    {
    var a = Math.floor(Math.random() * 100 + 1);
    if(a>40){win=1;}else{win=2;}
    }
  }
  else
  {
    if(par<30)
    {
    var a = Math.floor(Math.random() * 100 + 1);
    if(a<40){win=1;}else{win=2;}
    }
  }
  return win;  //zwraca 1,2 i to oznacza która druzyna wygrała
}

function reset()
{
     document.getElementById("show1").innerHTML = 0;
     document.getElementById("show2").innerHTML = 0;
}

function optimal_composition() //zaznacza optymalny skład kontrolkami
{
  for(adr=1;adr<=2;adr++)
  {
  var R=0, A=0, P1=0, P2=0, S1=0, S2=0, L=0, poz, id;// temp_r=0;
  for(i=1;i<=12;i++)  //pobranie pkt zawodników, którzy bior± udział w meczu
  {
          wynik = document.getElementById("wynik"+adr+"."+i).innerHTML   //pobiera aktualny-chwilowy perfo
          c="perfo"+adr+"."+i;
          perfo = document.getElementById(c).innerHTML;
          if(wynik==0)
          {
            wynik=perfo;
          }
		  poz = document.getElementById("poz"+adr+"."+i).innerHTML //pobranie pozycji zawodnika
		  id = document.getElementById("id"+adr+"."+i).innerHTML //pobranie id zawodnika
		  if(poz == "R")
		  {
		  	if(wynik > R) //normalnie lepiej bedzie operować na id pozycji
			{
			    if(R>0)
				{
				  document.getElementById(temp_r).checked = "";//odznaczenie dotychczasowego
				  document.getElementById(temp_r).disabled= "";
				  
				}
				R = wynik;
				temp_r = "gra"+adr+"."+i;
				document.getElementById("gra"+adr+"."+i).checked = "checked";
				document.getElementById("gra"+adr+"."+i).disabled="disabled";	
			}
			else //jest R, ale ma gorszy perfo
			{
				document.getElementById("gra"+adr+"."+i).checked = "";//odznaczenie
				document.getElementById("gra"+adr+"."+i).disabled= "";
			}
			
		  }
		  
		  if(poz == "A") //atakujący
		  {
		  	if(wynik > A) //normalnie lepiej bedzie operować na id pozycji
			{
			    if(A>0)
				{
				  document.getElementById(temp_a).checked = "";//odznaczenie
				  document.getElementById(temp_a).disabled= "";	
				}
				A = wynik;
				temp_a = "gra"+adr+"."+i;
				document.getElementById("gra"+adr+"."+i).checked = "checked";
				document.getElementById("gra"+adr+"."+i).disabled="disabled";
			}
			else //jest R, ale ma gorszy perfo
			{
				document.getElementById("gra"+adr+"."+i).checked = "";//odznaczenie
				document.getElementById("gra"+adr+"."+i).disabled= "";
			}
			
		  }
		  
		  if(poz == "L") //libero
		  {
		  	if(wynik > L) //normalnie lepiej bedzie operować na id pozycji
			{
			    if(L>0)
				{
				  document.getElementById(temp_l).checked = "";//odznaczenie
				  document.getElementById(temp_l).disabled= "";	
				}
				L = wynik;
				temp_l = "gra"+adr+"."+i;
				document.getElementById("gra"+adr+"."+i).checked = "checked";
				document.getElementById("gra"+adr+"."+i).disabled="disabled";
			}
			else //jest L, ale ma gorszy perfo
			{
				document.getElementById("gra"+adr+"."+i).checked = "";//odznaczenie
				document.getElementById("gra"+adr+"."+i).disabled= "";
			}
			
		  }
		  
		  if(poz == "P") //przyjmujacy
		  {
		  	if(wynik > P1 || wynik >P2) //normalnie lepiej bedzie operować na id pozycji
			{
				if(P1 <= P2)
				{
					if(P1>0)
					{
				      document.getElementById(temp_p1).checked = "";//odznaczenie
					  document.getElementById(temp_p1).disabled= "";	
					}
					P1 = wynik;
					temp_p1 = "gra"+adr+"."+i;
					document.getElementById("gra"+adr+"."+i).checked = "checked";
					document.getElementById("gra"+adr+"."+i).disabled="disabled";
				}
			    else
				{
					if(P2>0)
					{
				      document.getElementById(temp_p2).checked = "";//odznaczenie
					  document.getElementById(temp_p2).disabled= "";	
					}
					P2 = wynik;
					temp_p2 = "gra"+adr+"."+i;
					document.getElementById("gra"+adr+"."+i).checked = "checked";
					document.getElementById("gra"+adr+"."+i).disabled="disabled";
				}
			}
			else //jest P, ale ma gorszy perfo
			{
				document.getElementById("gra"+adr+"."+i).checked = "";//odznaczenie
				document.getElementById("gra"+adr+"."+i).disabled= "";
			}
			
		  }
		  
		  if(poz == "S") //przyjmujacy
		  {
		  	if(wynik > S1 || wynik >S2) //normalnie lepiej bedzie operować na id pozycji
			{
				if(S1 < S2)
				{
					if(S1>0)
					{
				      document.getElementById(temp_s1).checked = "";//odznaczenie
					  document.getElementById(temp_s1).disabled= "";	
					}
					S1 = wynik;
					temp_s1 = "gra"+adr+"."+i;
					document.getElementById("gra"+adr+"."+i).checked = "checked";
					document.getElementById("gra"+adr+"."+i).disabled="disabled";
				}
			    else
				{
					if(S2>0)
					{
				      document.getElementById(temp_s2).checked = "";//odznaczenie
					  document.getElementById(temp_s2).disabled= "";	
					}
					S2 = wynik;
					temp_s2 = "gra"+adr+"."+i;
					document.getElementById("gra"+adr+"."+i).checked = "checked";
					document.getElementById("gra"+adr+"."+i).disabled="disabled";
				}
			}
			else //jest P, ale ma gorszy perfo
			{
				document.getElementById("gra"+adr+"."+i).checked = "";//odznaczenie
				document.getElementById("gra"+adr+"."+i).disabled= "";
			}
			
		  }
		  
   }
   }
}


function zapisz_z_tlo()
{
adr=1;
while(adr<=2)
{
	for(i=1;i<=12;i++)//zrobić pobieranie całej kadry 14, 15 lenght(tab lenght)
	{		
	make_tables(i,i,adr);	
	}
adr++;
}
//document.write(team1,team2,mis);
optimal_composition_tlo(0,0,0);
}

function optimal_composition_tlo(d1,d2,k,pl,para,liga)
{
//document.write(pl);
//scfd = document.getElementById("screen5").innerHTML;
		//document.getElementById("screen5").innerHTML = scfg+"<br/>"+team1;
	
	var adr = 1;
	var dwa = 2;
	if(d1 == pl)
	{
		adr = 2;
	}
	if(d2 == pl)
	{
		dwa = 1;
	}
	for(;adr<=dwa;adr++)
	{
  var R=0, A=0, P1=0, P2=0, S1=0, S2=0, L=0, poz, id;
  if(adr==1)
  {
  	teamtempo = team1;//z tempo odczyt, a do tempz zapisuje;
	var coach=team1[13];
  }
  else 
  {
  	teamtempo = team2;//z tempo odczyt, a do tempz zapisuje;
	var coach=team2[13];
  }
  var teamtempz = new Array(8);
  //document.write(teamtempo[0]);
  var teamrezer = new Array();
    var roz = new Array();
	  var ata = new Array();
	    var lib = new Array();
		  var rec = new Array();
		    var sro = new Array();
  
  for(i=1;i<=12;i++)
  {	
          wynik = teamtempo[i][12];
          poz = teamtempo[i][4];  
		  switch(poz)
		  {
		  case "R":	roz.push(teamtempo[i]);break;		  
		  case "A":	ata.push(teamtempo[i]);break;
		  case "L":	lib.push(teamtempo[i]);break;
		  case "P":	rec.push(teamtempo[i]);break;
		  case "S":	sro.push(teamtempo[i]);break;
		  }	  
   }
      
   //sortowanie rec
   for(j=0;j<rec.length;j++)
   {
   	  for(i=0;i<(rec.length-1);i++)
	   {
	   	 if(rec[i+1][12] > rec[i][12])
		 {
		 	temp = rec[i+1];
			rec[i+1] = rec[i];
			rec[i] = temp;
		 }
	   }
   }
   //sortowanie sro
   for(j=0;j<sro.length;j++)
   {
   	  for(i=0;i<(sro.length-1);i++)
	   {
	   	 if(sro[i+1][12] > sro[i][12])
		 {
		 	temp = sro[i+1];
			sro[i+1] = sro[i];
			sro[i] = temp;
		 }
	   }
   }
   //sortowanie ata
   for(j=0;j<ata.length;j++)
   {
   	  for(i=0;i<(ata.length-1);i++)
	   {
	   	 if(ata[i+1][12] > sro[i][12])
		 {
		 	temp = ata[i+1];
			ata[i+1] = ata[i];
			ata[i] = temp;
		 }
	   }
   }
   //sortowanie roz
   for(j=0;j<roz.length;j++)
   {
   	  for(i=0;i<(roz.length-1);i++)
	   {
	   	 if(roz[i+1][12] > roz[i][12])
		 {
		 	temp = roz[i+1];
			roz[i+1] = roz[i];
			roz[i] = temp;
		 }
	   }
   }
   //sortowanie lib
   for(j=0;j<lib.length;j++)
   {
   	  for(i=0;i<(lib.length-1);i++)
	   {
	   	 if(lib[i+1][12] > lib[i][12])
		 {
		 	temp = lib[i+1];
			lib[i+1] = lib[i];
			lib[i] = temp;
		 }
	   }
   }
   //document.write(rec);
   //wstawianie do składu rec
   for(i=0;i<rec.length;i++)
   {
   		if(i==0){teamtempz[2] = rec[i];teamtempz[2][0] = 2;}
		if(i==1){teamtempz[5] = rec[i];teamtempz[5][0] = 5;}
		if(i>1){teamrezer.push(rec[i]);}
   }
   //wstawianie do składu sro
   for(i=0;i<sro.length;i++)
   {
   		if(i==0){teamtempz[3] = sro[i];teamtempz[3][0] = 3;}
		if(i==1){teamtempz[6] = sro[i];teamtempz[6][0] = 6;}
		if(i>1){teamrezer.push(sro[i]);}
   }
   //wstawianie do składu ata
   for(i=0;i<ata.length;i++)
   {
   		if(i==0){teamtempz[4] = ata[i];teamtempz[4][0] = 4;}
		if(i>0){teamrezer.push(ata[i]);}
   }
   //wstawianie do składu roz
   for(i=0;i<roz.length;i++)
   {
   		if(i==0){teamtempz[1] = roz[i];teamtempz[1][0] = 1;}
		if(i>0){teamrezer.push(roz[i]);}
   }
   //wstawianie do składu lib
   for(i=0;i<lib.length;i++)
   {
   		if(i==0){teamtempz[7] = lib[i];teamtempz[7][0] = 7;}
		if(i>0){teamrezer.push(lib[i]);}
   }
   
   for(i=1;i<=7;i++)//obstawienie pozycji, jeśli nie ma w 12 graczy przeznaczonych na te pozycje
   {
   	    if(!teamtempz[i])//pusta pozycja
		{
			if(i==1)
			{
				for(j=0;j<teamrezer.length;j++)//poszukiwanie najlepiej rozgrywanjącego na ławce
   				{
   	 				 for(i=0;i<(teamrezer.length-1);i++)
	  				 {
	  				 	 if(teamrezer[i+1][11] > teamrezer[i][11])
					 	 {
						 	temp = teamrezer[i+1];
							teamtrezer[i+1] = teamrezer[i];
							teamrezer[i] = temp;
		 				 }
	   				 }
   				 }
			teamtempz[i] = teamrezer[0];teamtempz[i][0] = i;
			teamrezer.shift;  //usuwanie z rezerwy tego, kto poszedł na brakującą poz - skrócenie tablicy
			}
			if(i==4)
			{
				for(j=0;j<teamrezer.length;j++)//poszukiwanie najlepiej rozgrywanjącego na ławce
   				{
   	 				 for(i=0;i<(teamrezer.length-1);i++)
	  				 {
	  				 	 if(teamrezer[i+1][6] > teamrezer[i][6])
					 	 {
						 	temp = teamrezer[i+1];
							teamtrezer[i+1] = teamrezer[i];
							teamrezer[i] = temp;
		 				 }
	   				 }
   				 }
			teamtempz[i] = teamrezer[0];teamtempz[i][0] = i;
			teamrezer.shift;  //usuwanie z rezerwy tego, kto poszedł na brakującą poz - skrócenie tablicy
			}
			if(i==7)
			{
				for(j=0;j<teamrezer.length;j++)//poszukiwanie najlepiej rozgrywanjącego na ławce
   				{
   	 				 for(i=0;i<(teamrezer.length-1);i++)
	  				 {
	  				 	 if(teamrezer[i+1][7] > teamrezer[i][7])
					 	 {
						 	temp = teamrezer[i+1];
							teamtrezer[i+1] = teamrezer[i];
							teamrezer[i] = temp;
		 				 }
	   				 }
   				 }
			teamtempz[i] = teamrezer[0];teamtempz[i][0] = i;
			teamrezer.shift;  //usuwanie z rezerwy tego, kto poszedł na brakującą poz - skrócenie tablicy
			}
			if(i==2 || i==5)
			{
				for(j=0;j<teamrezer.length;j++)//poszukiwanie najlepiej rozgrywanjącego na ławce
   				{
   	 				 for(i=0;i<(teamrezer.length-1);i++)
	  				 {
	  				 	 if(((teamrezer[i+1][7]+teamrezer[i+1][6])/2) > ((teamrezer[i][7]+teamrezer[i+1][6])/2))
					 	 {
						 	temp = teamrezer[i+1];
							teamtrezer[i+1] = teamrezer[i];
							teamrezer[i] = temp;
		 				 }
	   				 }
   				 }
			teamtempz[i] = teamrezer[0];teamtempz[i][0] = i;
			teamrezer.shift;  //usuwanie z rezerwy tego, kto poszedł na brakującą poz - skrócenie tablicy
			}
			if(i==3 || i==6)
			{
				for(j=0;j<teamrezer.length;j++)//poszukiwanie najlepiej rozgrywanjącego na ławce
   				{
   	 				 for(i=0;i<(teamrezer.length-1);i++)
	  				 {
	  				 	 if(((teamrezer[i+1][6]+teamrezer[i+1][9])/2) > ((teamrezer[i][6]+teamrezer[i+1][9])/2))
					 	 {
						 	temp = teamrezer[i+1];
							teamtrezer[i+1] = teamrezer[i];
							teamrezer[i] = temp;
		 				 }
	   				 }
   				 }
			teamtempz[i] = teamrezer[0];teamtempz[i][0] = i;
			teamrezer.shift;  //usuwanie z rezerwy tego, kto poszedł na brakującą poz - skrócenie tablicy
			}
			
		}
   }
   
   for(i=0;i<teamrezer.length;i++)
   {
   	a=i+8;
	teamtempz[a] = teamrezer[i];
	teamtempz[a][0] = a;
   }
   
   for(var i=1;i<=12;i++)
   {
   if(i<=7)
   {
   teamtempz[i][29]=1;
   teamtempz[i][30]=i;
   }
   else
   {
   teamtempz[i][29]=2;
   teamtempz[i][30]=0;
   }
   }
   
   	  if(adr==1)
	  {
	  	team1 = teamtempz;
		team1[13]=coach;
	  }
	  else 
	  {
	  	team2 = teamtempz;
		team2[13]=coach;
	  }
   
   
   //ustawienie();
   }
   //document.write(team1);
   if(para>0)
   {
   	meczyk1(d1, d2, k, para, pl,liga);
	// tu zaczątek następnego meczu. 	
	//var wudu = document.getElementById("screen5").innerHTML
	//document.getElementById("screen5").innerHTML = wudu + "<br />" + team1 + "<br/>"+team2 + "<br/><br/>";
   }
   else
   {
   	banch_ins();
	transpa();
        //2021-01-15 omijanie dla _1mecz, bo usunięto te divy
        if(!play_1mecz)
        {
	document.getElementById("idteam1").innerHTML=d1;
	document.getElementById("idteam2").innerHTML=d2;
	document.getElementById("kolejka").innerHTML=k;
	document.getElementById("liga").innerHTML=liga;
        }
   }
   
   ustawienie();//czy to potrzebne
   return 1;
}

function banch_go1(nr)
{
    if(typeof window_zm1 != "undefined")
    {
	if(document.getElementById("window_zm1").className!="noch")
	{
		for(var u=0;u<changes.length;u++)
		{
                        if(changes[u][0]==1)
                        {
                                if(changes[u][1]==nr||changes[u][2]==nr)
                                {
                                        document.getElementById("screen1").innerHTML = " zmiana niedozwolona";
                                        return 0;
                                }
                        }
		}
		document.getElementById("window_zm1").value = nr;
		document.getElementById("screen1").innerHTML = "";
	}
    }
}
function banch_go2(nr)
{
    if(typeof window_zm2 != "undefined")
    {
        if(document.getElementById("window_zm2").className!="noch")
	{
		for(var u=0;u<changes.length;u++)
		{
                        if(changes[u][0]==2)
                        {
                                if(changes[u][1]==nr||changes[u][2]==nr)
                                {
                                        document.getElementById("screen2").innerHTML = " zmiana niedozwolona";
                                        return 0;
                                }
                        }
		}
		document.getElementById("window_zm2").value = nr;
		document.getElementById("screen2").innerHTML = "";
	}
    }
}
function banch_go_in1(nr)
{
	document.getElementById("kwadnazw11").innerHTML = nr;
	//poszukać czy ten zawodnik brał udział w jakijs zmianier 
	var zmy=0;
	for(var u=0;u<changes.length;u++)
	{
		if(changes[u][0]==1)
		{
                        if(changes[u][1]==nr)
			{
				zmy=changes[u][2];
			}
			else if(changes[u][2]==nr)
			{
				zmy=changes[u][1];
			}
		}
	}
        
        if(zmy==0)
	{
document.getElementById("kwadrat11").innerHTML = "<input class=\"noch11\" type=\"text\" id=\"window_zm1\" maxlength=\"2\"/>";
	}
	else
	{
document.getElementById("kwadrat11").innerHTML = "<input class=\"noch\" type=\"text\" readonly=\"readonly\" id=\"window_zm1\" value=\""+zmy+"\" maxlength=\"2\"/>";
	}
}
function banch_go_in2(nr)
{
	document.getElementById("kwadnazw22").innerHTML = nr;
	var zmy=0;
	for(var u=0;u<changes.length;u++)
	{
		if(changes[u][0]==2)
		{
			if(changes[u][1]==nr)
			{
				zmy=changes[u][2];
			}
			else if(changes[u][2]==nr)
			{
				zmy=changes[u][1];
			}
		}
	}
        
        if(zmy==0)
	{
document.getElementById("kwadrat22").innerHTML = "<input class=\"noch11\" type=\"text\" id=\"window_zm2\" maxlength=\"2\"/>";
	}
	else
	{
document.getElementById("kwadrat22").innerHTML = "<input class=\"noch\" type=\"text\" readonly=\"readonly\" id=\"window_zm2\" value=\""+zmy+"\" maxlength=\"2\"/>"
	}
}
function banch_ins()
{
	for(r=8,miu=1;r<=12;r++,miu++)
	{
	document.getElementById("kwadrat_1_"+miu).innerHTML = "<div onmouseover=ask_zm1("+r+") onclick=banch_go_in1("+team1[r][3]+")>"+team1[r][5]+"</div>";
	}
	document.getElementById("treserfield1").innerHTML="<div>"+team1[13][6][0]+". "+team1[13][7]+"</div>";
	
	for(r=8,miu=1;r<=12;r++,miu++)
	{
	document.getElementById("kwadrat_2_"+miu).innerHTML = "<div onmouseover=ask_zm2("+r+") onclick=banch_go_in2("+team2[r][3]+")>"+team2[r][5]+"</div>";
	}
	document.getElementById("treserfield2").innerHTML="<div>"+team2[13][6][0]+". "+team2[13][7]+"</div>";
}
function zeruj_changes()
{
	/*for(var u=0;u<changes.length;u++)
		{
			for(var y=0;y<=2;y++)
			{
				changes[u][y]=0;
			}
		}*/
    changes = [];
}

function interw(sel)
{
	var pac=parseInt(sel.options[sel.selectedIndex].value);
	var wklad="";
	var statat="";
	var s = new Array(0,0,0,0,0,0,0,0,0,0,0);
	for(j=1;j<stat.length;j++)
	{
		if(stat[j][4]==pac)
		{
			if(stat[j][12]>0)
			{
				s[4]+=parseInt(stat[j][12]);
			}
			wklad+="<option value=\""+stat[j][6]+"\">"+stat[j][7]+" "+stat[j][8]+"</option>";
		}	
	}
	wklad+="<option selected=\"selected\">wybierz</option><option class=\"all\" value=\""+pac+"\">wszyscy</option>";
	document.getElementById("zawo").innerHTML=wklad;
	
	for(j=1;j<stat.length;j++)
	{
		if(stat[j][4]==pac)
		{
			if(stat[j][10]>0)
			{
				s[1]+=parseInt(stat[j][9]);
				s[2]+=parseInt(stat[j][10]);
			}
			if(stat[j][12]>0&&s[4]>0)
			{
				s[3]+=stat[j][11]*(stat[j][12]/s[4]);
			}
			s[5]+=parseInt(stat[j][13]);
			s[6]+=parseInt(stat[j][14]);
			s[7]+=parseInt(stat[j][15]);
			s[8]+=parseInt(stat[j][16]);
			s[9]+=parseInt(stat[j][17]);
			s[10]+=parseInt(stat[j][18]);
		}
	}
	
	
	statat="<table><tr><td>Atak: </td><td>"+s[1]+"/"+s[2]+"</td><td>"+zaokr(100*(s[1]/s[2]))+"%</td></tr><tr><td>Przyjęcie: </td><td>"+s[4]+"</td><td>"+zaokr(s[3])+"%</td></tr><tr><td>Asy serwisowe: </td><td>"+s[5]+"</td><td></td></tr><tr><td>Zepsute zagrywki: </td><td>"+s[6]+"</td><td></td></tr><tr><td>Obrony: </td><td>"+s[7]+"</td><td></td></tr><tr><td>Bloki: </td><td>"+s[8]+"</td><td></td></tr><tr><td>Punkty: </td><td>"+s[9]+"</td><td></td></tr></table>";
	
	document.getElementById("stat_screen").innerHTML=statat;
}
function interwz(sel)
{
	var zaw=parseInt(sel.options[sel.selectedIndex].value);//tez jako id druzynay dla wszystkch
	var cl=sel.options[sel.selectedIndex].className;
	var st="";
	if(cl=="all")
	{
		st+="<table><tr><td>Poz</td><td>Zawodnik</td><td>Atak</td><td>%</td><td>Przyjęcie</td><td>%</td><td>Asy</td><td>Zeps</td><td>Obrony</td><td>Bloki</td><td>Punkty</td><td>Mecze</td></tr>";
		for(j=1;j<stat.length;j++)
		{
		if(stat[j][4]==zaw)
		{
			st+="<tr><td>"+stat[j][19]+"</td><td>"+stat[j][7]+" "+stat[j][8]+"</td>";
			if(stat[j][10]>0)
			{
			st+="<td>"+stat[j][9]+"/"+stat[j][10]+"</td><td>"+Math.round(100*(stat[j][9]/stat[j][10]))+"% </td>";
			}
			else
			{
			st+="<td></td><td></td>";	
			}
			if(stat[j][12]>0)
			{
				st+="<td>"+stat[j][12]+"</td><td>"+Math.round(stat[j][11])+"% </td>";
			}
			else
			{
			st+="<td></td><td></td>";	
			}
			st+="<td>"+stat[j][13]+"</td>";
			st+="<td>"+stat[j][14]+"</td>";
			st+="<td>"+stat[j][15]+"</td>";
			st+="<td>"+stat[j][16]+"</td>";
			st+="<td>"+stat[j][17]+"</td>";
			st+="<td>"+stat[j][18]+"</td></tr>";
		}	
	}
	document.getElementById("stat_screen").innerHTML=st+"</table>";	
	}
	else
	{
	for(j=1;j<stat.length;j++)
	{
		if(stat[j][6]==zaw)
		{
			st+=stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+"<br/><br/><table>";
			if(stat[j][10]>0)
			{
				st+="<tr><td>Atak: </td><td>"+stat[j][9]+"/"+stat[j][10]+"</td><td>"+Math.round(100*(stat[j][9]/stat[j][10]))+"% </td></tr>";
			}
			if(stat[j][12]>0)
			{
				st+="<tr><td>Przyjęcie: </td><td>"+stat[j][12]+"</td><td>"+Math.round(stat[j][11])+"% </td></tr>";
			}
			st+="<tr><td>Asy serwisowe: </td><td>"+stat[j][13]+"</td><td></td></tr>";
			st+="<tr><td>Zepsute zagrywki: </td><td>"+stat[j][14]+"</td><td></td></tr>";
			st+="<tr><td>Obrony: </td><td>"+stat[j][15]+"</td><td></td></tr>";
			st+="<tr><td>Bloki: </td><td>"+stat[j][16]+"</td><td></td></tr>";
			st+="<tr><td>Punkty: </td><td>"+stat[j][17]+"</td><td></td></tr>";
			st+="<tr><td>Mecze: </td><td>"+stat[j][18]+"</td><td></td></tr>";
		}
	}
	document.getElementById("stat_screen").innerHTML=st;
	}
}

function interw_rank(sel)
{
	//document.getElementById("monu").innerHTML=sel;
	if(sel==0)
	{
var ran=document.getElementById("rank");
    sel=document.getElementById("druz");
var id=parseInt(sel.options[sel.selectedIndex].value);
	op=parseInt(ran.options[ran.selectedIndex].value);
//document.getElementById("monu").innerHTML=op;		
	}
	else
	{
sii=document.getElementById("druz");
var op=parseInt(sel.options[sel.selectedIndex].value);
var id=parseInt(sii.options[sii.selectedIndex].value);
	}
	//document.getElementById("monu").innerHTML=id;
	var st="";
	var ch1=0,ch2=0,ch3=0,ch4=0,ch5=0;
	if(document.getElementById("ch1").checked)ch1=1;
	if(document.getElementById("ch2").checked)ch2=2;
	if(document.getElementById("ch3").checked)ch3=3;
	if(document.getElementById("ch4").checked)ch4=4;
	if(document.getElementById("ch5").checked)ch5=5;
switch(op)
{
case 1:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][17]) > parseInt(stat[i][17]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Punkty </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
			if(ch1==0)
			{
				if(stat[j][19]=="A")continue;
			}
			if(ch2==0)
			{
				if(stat[j][19]=="P")continue;
			}
			if(ch3==0)
			{
				if(stat[j][19]=="S")continue;
			}
			if(ch4==0)
			{
				if(stat[j][19]=="R")continue;
			}
			if(ch5==0)
			{
				if(stat[j][19]=="L")continue;
			}
			if(stat[j][17]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+") </td><td></td><td>"+stat[j][17]+"</td></tr>";m++;	
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+") </td><td></td><td>"+stat[j][17]+"</td></tr>";m++;
}
			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
case 2:
{
for(var z=1;z<stat.length;z++)
{
	   	for(i=1;i<(stat.length-1);i++)
		{
//		var sd=document.getElementById("monu").innerHTML;
if(parseInt(stat[i+1][10])==0)stat[i+1][10]=0.001;
if(parseInt(stat[i][10])==0)stat[i][10]=0.001;
//document.getElementById("monu").innerHTML=sd+stat[i+1][9]+"/"+stat[i+1][10]+" > "+stat[i][9]+"/"+stat[i][10];

if(parseFloat(stat[i+1][9]/stat[i+1][10]) > parseFloat(stat[i][9]/stat[i][10]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
//			sd=document.getElementById("monu").innerHTML;
//			document.getElementById("monu").innerHTML=sd+"zamiana";
		 	}
//			sd=document.getElementById("monu").innerHTML;
//			document.getElementById("monu").innerHTML=sd+"<br />";
		}
}
		st+="<table><tr><td>Ranking - Atak </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
			if(ch1==0)
			{
				if(stat[j][19]=="A")continue;
			}
			if(ch2==0)
			{
				if(stat[j][19]=="P")continue;
			}
			if(ch3==0)
			{
				if(stat[j][19]=="S")continue;
			}
			if(ch4==0)
			{
				if(stat[j][19]=="R")continue;
			}
			if(ch5==0)
			{
				if(stat[j][19]=="L")continue;
			}
			if(stat[j][10]>0.5)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td>"+stat[j][9]+"/"+Math.round(stat[j][10])+"</td><td>"+Math.round(100*(stat[j][9]/stat[j][10]))+"% </td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td>"+stat[j][9]+"/"+Math.round(stat[j][10])+"</td><td>"+Math.round(100*(stat[j][9]/stat[j][10]))+"% </td></tr>";m++;	
}
			}
		}
	st+="</table>";
	document.getElementById("stat_screen").innerHTML=st;
break;
}
case 3:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][11]) > parseInt(stat[i][11]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Przyjęcie </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
if(ch1==0){if(stat[j][19]=="A")continue;}if(ch2==0){if(stat[j][19]=="P")continue;}if(ch3==0){if(stat[j][19]=="S")continue;}if(ch4==0){if(stat[j][19]=="R")continue;}if(ch5==0){if(stat[j][19]=="L")continue;}
		if(stat[j][11]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td>"+stat[j][12]+"</td><td>"+Math.round(stat[j][11])+"%</td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td>"+stat[j][12]+"</td><td>"+Math.round(stat[j][11])+"%</td></tr>";m++;
}
			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
case 4:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][16]) > parseInt(stat[i][16]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Blok </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
if(ch1==0){if(stat[j][19]=="A")continue;}if(ch2==0){if(stat[j][19]=="P")continue;}if(ch3==0){if(stat[j][19]=="S")continue;}if(ch4==0){if(stat[j][19]=="R")continue;}if(ch5==0){if(stat[j][19]=="L")continue;}
		if(stat[j][16]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][16]+"</td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][16]+"</td></tr>";m++;
}

			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
case 5:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][15]) > parseInt(stat[i][15]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Obrona </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
if(ch1==0){if(stat[j][19]=="A")continue;}if(ch2==0){if(stat[j][19]=="P")continue;}if(ch3==0){if(stat[j][19]=="S")continue;}if(ch4==0){if(stat[j][19]=="R")continue;}if(ch5==0){if(stat[j][19]=="L")continue;}
		if(stat[j][15]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][15]+"</td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][15]+"</td></tr>";m++;
}
			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
case 6:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][13]) > parseInt(stat[i][13]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Asy serwisowe </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
if(ch1==0){if(stat[j][19]=="A")continue;}if(ch2==0){if(stat[j][19]=="P")continue;}if(ch3==0){if(stat[j][19]=="S")continue;}if(ch4==0){if(stat[j][19]=="R")continue;}if(ch5==0){if(stat[j][19]=="L")continue;}
		if(stat[j][13]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][13]+"</td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][13]+"</td></tr>";m++;
}
			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
case 7:
{
	for(var z=1;z<stat.length;z++)
    {
	   	for(i=1;i<(stat.length-1);i++)
		{
			if(parseInt(stat[i+1][14]) > parseInt(stat[i][14]))
		 	{
		 	temp = stat[i+1];
			stat[i+1] = stat[i];
			stat[i] = temp;
		 	}
		}
	}
st+="<table><tr><td>Ranking - Zepsute zagrywki </td><td></td><td></td>";
		for(j=1,m=1;j<stat.length;j++)
		{
if(ch1==0){if(stat[j][19]=="A")continue;}if(ch2==0){if(stat[j][19]=="P")continue;}if(ch3==0){if(stat[j][19]=="S")continue;}if(ch4==0){if(stat[j][19]=="R")continue;}if(ch5==0){if(stat[j][19]=="L")continue;}
		if(stat[j][14]>0)
			{
if(parseInt(stat[j][4])==id)
{
st+="<tr class='myteam'><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][14]+"</td></tr>";m++;
}
else
{
st+="<tr><td>"+m+". "+stat[j][19]+" "+stat[j][7]+" "+stat[j][8]+" ("+stat[j][5]+")</td><td></td><td>"+stat[j][14]+"</td></tr>";m++;
}
			}
		}
st+="</table>";
document.getElementById("stat_screen").innerHTML=st;
break;
}
}
}

//2021-01-17 - można by to przerobić jak optimal_compos_zm - ale tu nie występuje problem zmian powrtotych
function optimal_compos_zm_begin(adr)//mam sklad 7, szukam czy ktos na lawce sie nadaje//szukanie lepszego perfo-nie roz problem
{
  if(adr==1)
  {
  	tea = team1;//z tempo odczyt, a do tempz zapisuje;
  }
  else 
  {
  	tea = team2;//z tempo odczyt, a do tempz zapisuje;
  }

  for(var i=1;i<=6;i++)
  {	
          tea[0]=Array(0,0,0,0,0,0,0,0,0,0,0,0);
		  if(i==1)
		  {
		  	var maxj=0;
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
			{
			  if(tea[j][4]=="R")	
			  {
			  	if(tea[j][11]>tea[maxj][11])maxj=j;
			  }
			}
			if(tea[maxj][11]>(tea[1][11]+1))
			{
if(adr==1)chan1(maxj,1);else chan2(maxj,1);//alert(tea[1][5]+" za "+tea[maxj][5]);
                            //2021-01-14: sygnalizacja zmian przed nowym setem
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Nowy set: "+tea[1][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>"+tea[1][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Nowy set:: "+tea[1][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>"+tea[1][5]+" za "+tea[maxj][5];
                            }
			}
		  }	
		  if(i==4)
		  {
		  	var maxj=0;
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="A")	
			  {
			  	if(tea[j][6]>tea[maxj][6])maxj=j;
			  }
			}
			if(tea[maxj][6]>(tea[4][6]+1))
			{
if(adr==1)chan1(maxj,4);else chan2(maxj,4);//alert(tea[4][5]+" za "+tea[maxj][5]);
                            //2021-01-14: sygnalizacja zmian przed nowym setem
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Nowy set: "+tea[4][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>"+tea[4][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Nowy set:: "+tea[4][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>"+tea[4][5]+" za "+tea[maxj][5];
                            }
			}
		  }	
		  if(i==2||i==5)
		  {
		  	var maxj=0;
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="P")	
			  {
			  	if((tea[j][6]+tea[j][7])/2>(tea[maxj][6]+tea[maxj][7])/2)maxj=j;
			  }
			}
			var a=0;
			if(((tea[2][6]+tea[2][7])/2)<((tea[5][6]+tea[5][7])/2))a=2;else a=5;
			if((tea[maxj][6]+tea[maxj][7])/2>((tea[a][6]+tea[a][7])/2+1))
			{
if(adr==1)chan1(maxj,a);else chan2(maxj,a);//alert(tea[a][5]+" za "+tea[maxj][5]);
                            //2021-01-14: sygnalizacja zmian przed nowym setem
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Nowy set: "+tea[a][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>"+tea[a][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Nowy set:: "+tea[a][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>"+tea[a][5]+" za "+tea[maxj][5];
                            }
			}
		  } 
		  if(i==3||i==6)
		  {
		  	var maxj=0;
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="S")	
			  {
if(((parseInt(tea[j][6])+parseInt(tea[j][9]))/2)>((parseInt(tea[maxj][6])+parseInt(tea[maxj][9]))/2))
{
maxj=j;
//nr = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML=nr+" maxj:"+j+" TEA"+tea[maxj][5];
}
			  }
			}
			if(maxj>0)
			{
var a=0;
var s1=(parseInt(tea[3][6])+parseInt(tea[3][9]))/2;
var s2=(parseInt(tea[6][6])+parseInt(tea[6][9]))/2;
if(tea[3][4]!="S")s1*=0.5;
if(tea[6][4]!="S")s2*=0.5;
if(s1<s2)a=3;else a=6;
			
if((tea[maxj][6]+tea[maxj][9])/2>((tea[a][6]+tea[a][9])/2+1))
{
//nr = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML=nr+" TEA1: "+tea[maxj][5]+" TEA2: "+tea[a][5]+"|";
if(adr==1)chan1(maxj,a);else{chan2(maxj,a);}//alert(tea[a][5]+" za "+tea[maxj][5]);
                            //2021-01-14: sygnalizacja zmian przed nowym setem
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>Nowy set: "+tea[a][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>"+tea[a][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>Nowy set:: "+tea[a][5]+" za: "+tea[maxj][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>"+tea[a][5]+" za "+tea[maxj][5];
                            }
}
			}
			
		  }  
  }
   
  	  if(adr==1)
	  {
	  	team1 = tea;
	  }
	  else 
	  {
	  	team2 = tea;
	  }   
banch_ins();
ustawienie();
return 1;
}

function optimal_compos_zm(adr)//mam sklad 7, szukam czy ktos na lawce sie nadaje//szukanie lepszego perfo-nie roz problem
{	
  if(adr==1)
  {
  	tea = team1;//z tempo odczyt, a do tempz zapisuje;
  }
  else 
  {
  	tea = team2;//z tempo odczyt, a do tempz zapisuje;
  }
//obliczyć perfo jeszcze raz
//console.log(changes);
  for(var i=1;i<=12;i++)//mam gwaracje, że przejdzie przez każdego R na ławce, ale dalej zawsze wybierze najlepszego
  {	
          tea[0]=Array(0,0,0,0,0,0,0,0,0,0,0,0);
		  //var tak[0]=Array(0,0,0,0,0,0);
		  //sprawdzenie czy jest zawodnik - lepiej rozgryw//
		  if(i==1)//algorytm wykona się 1 raz
		  {
		  	var maxj=0;
                        var rozgryw_lawka = [];
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce - sprawdza każdego
			{
			  if(tea[j][4]=="R")//Jak 2óch R na ławce, to jest info, że 2 razy próbuje - OK; ale tylko jednego	
			  {
			  	if(tea[j][11] > tea[maxj][11]){maxj=j;rozgryw_lawka.unshift(j);}//na początek array
                                else {rozgryw_lawka.push(j);}//na koniec array
			  }
			}//console.log(rozgryw_lawka);
                        //array z zawodnikami R i tutaj probuje po kolei forem ich wpuszczać
                        for(p=0; p<rozgryw_lawka.length; p++)
                        {
                          maxj = rozgryw_lawka[p];
			  if(tea[maxj][11] > (tea[1][11]+1))
			  {console.log("Prop zmiany: "+par+" in: "+tea[maxj][5]+" za: "+tea[1][5]);
//R i A: potrzeba ponowić próbę wpuszcz kolejnych gorszych, bo poprz próby mogły być blokowane zm powrotnymi
//Jak 2óch R na ławce, to jest info, że 2 razy próbuje - OK; ale tylko jednego
//jakby było 5 R na ławce to ma spróbować każdego wpóścić, jak jednego wpósci, np3 może iść dalej. Zm powr nie powinny
//ani zrobić, ani pokazać tych zmian.//                    change1(zz1,zz2);//(out,in) //indeksy
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)//wyświetlam zmiany, które zaproponowała funckja ale nie doszły do skutku
                            {
                                if(possible_change(1,tea[1][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[1][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[1][5];
                                    change1(1,maxj);
                                }
                            }
                            else
                            {
                                if(possible_change(2,tea[1][3],tea[maxj][3])<6)
                                {
 var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[1][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[1][5];
                                    change2(1,maxj);
                                }
                            }
			  }
                        }//end of for with p paramentr
		  }	
		  if(i==4)
		  {
		  	var maxj=0;
                        var atakujacy_lawka = [];
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="A")	
			  {                              
                                if(tea[j][6] > tea[maxj][6]){maxj=j;atakujacy_lawka.unshift(j);}//na początek array
                                else {atakujacy_lawka.push(j);}//na koniec array
			  }
			}
                        //array z zawodnikami A i tutaj probuje po kolei forem ich wpuszczać
                        for(p=0; p<atakujacy_lawka.length; p++)
                        {
                          maxj = atakujacy_lawka[p];
			  if(tea[maxj][6]>(tea[4][6]+1))//Dochodzi do zmiany
			  {console.log("Prop zmiany: "+par+" in: "+tea[maxj][5]+" za: "+tea[4][5]);
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
                                if(possible_change(1,tea[4][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[4][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[4][5];
                                    change1(4,maxj);
                                }
                            }
                            else
                            {
                                if(possible_change(2,tea[4][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[4][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[4][5];
                                    change2(4,maxj);
                                }
                            }
			}
                    }//end of for with p parameter
		  }	
		  if(i==2||i==5)
		  {
		  	var maxj=0;
                        var przyjmuj_lawka = [];
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="P")	
			  {
			  	//if((tea[j][6]+tea[j][7])/2>(tea[maxj][6]+tea[maxj][7])/2)maxj=j;
                                
                                if((tea[j][6]+tea[j][7])/2>(tea[maxj][6]+tea[maxj][7])/2){maxj=j;przyjmuj_lawka.unshift(j);}//na początek array
                                else {przyjmuj_lawka.push(j);}//na koniec array
			  }
			}
                        //array z zawodnikami P i tutaj probuje po kolei forem ich wpuszczać
                        for(p=0; p<przyjmuj_lawka.length; p++)
                        {
                          maxj = przyjmuj_lawka[p];
			  var a=0;
			  if(((tea[2][6]+tea[2][7])/2)<((tea[5][6]+tea[5][7])/2))a=2;else a=5;//ktory P słabszy na boisku
			  if((tea[maxj][6]+tea[maxj][7])/2>((tea[a][6]+tea[a][7])/2+1))
			{console.log("Prop zmiany: "+par+" in: "+tea[maxj][5]+" za: "+tea[a][5]);
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
                                if(possible_change(1,tea[a][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[a][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                                    change1(a,maxj);
                                }
                            }
                            else
                            {
                                if(possible_change(2,tea[a][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[a][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                                    change2(a,maxj);
                                }
                            }
			}
                    }//end for with p parameter
		  } 
		  if(i==3||i==6)
		  {
		  	var maxj=0;
                        var srodkowi_lawka = [];
			for(var j=8;j<=12;j++)//szuka max//moze jest 2 lub wiecej na lawce
			{
			  if(tea[j][4]=="S")	
			  {
			  	//if((tea[j][6]+tea[j][9])/2>(tea[maxj][6]+tea[maxj][9])/2)maxj=j;
                                
                                if((tea[j][6]+tea[j][9])/2>(tea[maxj][6]+tea[maxj][9])/2){maxj=j;srodkowi_lawka.unshift(j);}//na początek array
                                else {srodkowi_lawka.push(j);}//na koniec array
			  }
			}
                                                //array z zawodnikami P i tutaj probuje po kolei forem ich wpuszczać
                        for(p=0; p<srodkowi_lawka.length; p++)
                        {
                          maxj = srodkowi_lawka[p];
			  var a=0;
			  if((tea[3][6]+tea[3][9])/2<(tea[6][6]+tea[6][9])/2)a=3;else a=6;//który S słabysz na boisku
			  if((tea[maxj][6]+tea[maxj][9])/2>((tea[a][6]+tea[a][9])/2+1))//czy na lawce jest lepszy
			  {	console.log("Prop zmiany: "+par+" in: "+tea[maxj][5]+" za: "+tea[a][5]);
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
                                if(possible_change(1,tea[a][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[a][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                                    change1(a,maxj);
                                }
                            }
                            else
                            {
                                if(possible_change(2,tea[a][3],tea[maxj][3])<6)
                                {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>p3s[optimal_compos_zm]Zmiana: "+tea[maxj][5]+" za: "+tea[a][5]+" (stan: "+mm1+" : "+mm2+") "; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                                    change2(a,maxj);
                                }
                            }
			}
		  }  //end of for with p parameter
              }
  }
   
  	  if(adr==1)
	  {
	  	team1 = tea;
	  }
	  else 
	  {
	  	team2 = tea;
	  }
   
banch_ins();
   return 1;
}
//prawo do 1 zmiany w 3 i 4 secie
function optimal_compos_golden(adr)//mam sklad 7, szukam czy ktos na lawce sie nadaje//szukanie lepszego perfo-nie roz problem
{
  if(adr==1)
  {
  	tea = team1;//z tempo odczyt, a do tempz zapisuje;
  }
  else 
  {
  	tea = team2;//z tempo odczyt, a do tempz zapisuje;
  }
//console.log(changes);
  var all_lawka = [];
  var item1 = [];
  var item2 = [];
  var item3 = [];
  var item4 = [];
  for(var i=1;i<=6;i++)//mam gwaracje, że przejdzie przez każdego R na ławce, ale dalej zawsze wybierze najlepszego
  {	
          tea[0]=Array(0,0,0,0,0,0,0,0,0,0,0,0);
          item1 = [];item2 = [];item3 = [];item4 = [];
			for(var j=8;j<=12;j++)
			{
			  //item = [];
                          if(tea[j][4]=="R" && i == 1)// i = 1 - sprawdzam każdego z ławki konkretnie za R
			  {
			  	if(tea[j][11] > (tea[i][11]+1))
                                {
                                    nadwyzka = tea[j][11] - tea[i][11];nadwyzka = zaokr(nadwyzka);                                   
                                    item1 = [j, i, nadwyzka];
                                    all_lawka.unshift(item1);//                                    
                                }
			  }
                          if(tea[j][4]=="A" && i == 4)// i = 4	
			  {
			  	if(tea[j][6] > (tea[i][6]+1))
                                {
                                    nadwyzka = tea[j][6] - tea[i][6];nadwyzka = zaokr(nadwyzka);
                                    item2 = [j, i, nadwyzka];
                                    all_lawka.unshift(item2);//                                   
                                }
			  }
                          item3 =[];
                          if(tea[j][4]=="P" && (i == 2 || i == 5))// i = 2; i =5;
			  {
			  	if( (tea[j][6]+tea[j][7])/2 > ((tea[i][6]+tea[i][7])/2)+1)
                                {
                                    nadwyzka = (tea[j][6]+tea[j][7])/2 - ((tea[i][6]+tea[i][7])/2);nadwyzka = zaokr(nadwyzka);
                                    item3=[];
                                    item3 = [j, i, nadwyzka];
                                    test = all_lawka.unshift(item3);//
                                    //alert("test-length: "+test+" item: "+item3);
                                }
			  }
                          if(tea[j][4]=="S" && (i == 3 || i == 6))// i = 3; i =6;
			  {
			  	if( (tea[j][6]+tea[j][9])/2 > ((tea[i][6]+tea[i][9])/2)+1)
                                {
                                    nadwyzka = (tea[j][6]+tea[j][9])/2 - ((tea[i][6]+tea[i][9])/2);nadwyzka = zaokr(nadwyzka);
                                    item4 = [j, i, nadwyzka];
                                    all_lawka.unshift(item4);//                                    
                                }
			  }
                      } //end of for j=8..12
                      console.log(all_lawka);
    }//end of for i=1..6
    //sortowanie
    for(u=0; u<all_lawka.length; u++)
    {
        for(w=1; w<all_lawka.length; w++)
        {
            if(all_lawka[w][2] > all_lawka[w-1][2])
            {
                temp = all_lawka[w-1];
                all_lawka[w-1] = all_lawka[w];
                all_lawka[w] = temp;
            }
        }
    }
    //próba wykoanania zmiany
    for(u=0; u<all_lawka.length; u++)
    {
            out_id = all_lawka[u][1];
            in_id = all_lawka[u][0];
            out_nr = tea[out_id][3]; //na indeksie 1 mam wyznaczonego do zejścia - nr dla funkcji possible_change
            in_nr = tea[in_id][3]; //
            if(adr == 1)
            {
                if(possible_change(adr, out_nr, in_nr) < 6)
                {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>[golden]Zmiana: "+tea[in_id][5]+" za: "+tea[out_id][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[in_id][5]+" za "+tea[out_id][5];
                    change1(out_id,in_id); flag_golden1 = 1; return 0;
                }
            }
            else
            {
                if(possible_change(adr, out_nr, in_nr) < 6)
                {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>[golden]Zmiana: "+tea[in_id][5]+" za: "+tea[out_id][5]+" (stan: "+mm1+" : "+mm2+") ";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[in_id][5]+" za "+tea[out_id][5];
                    change2(out_id,in_id); flag_golden2 = 1; return 0;
                }
            }
    }


    if(adr==1)
    {
          team1 = tea;
    }
    else 
    {
          team2 = tea;
    }

    banch_ins();
    return 1;
}

function optimal_zm_zagr1()
{
    var g12=0,tem6=100,g6=0,temp=0,par=0;g1=0;
    for(var i=1;i<=12;i++)
    {
            if(i<=6)//min z z 6
            {
                    if(team1[i][8]<tem6){tem6=team1[i][8];g6=i;}//min
                    if(team1[i][0]==1){g1=i;}
            }
            if(i>7)//max z z lawki
            {
                    if(team1[i][8]>temp){temp=team1[i][8];g12=i;}//max
            }
    }
    //if(team1[i][0]==1)team1[g6][0]==1
    if(g1==g6 && temp>tem6)//najslabszy zagrywający jest na pozycji 1
    {
        if(possible_change(1,team1[g6][3],team1[g12][3])<=4)
        {
            //2021-01-12: zmiana z screen6 na screen3
            var fffv = document.getElementById("screen3").innerHTML;
            document.getElementById("screen3").innerHTML=fffv+"<br>Zmiana na zagrywkę: "+team1[g12][5]+" za: "+team1[g6][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2+" g6: "+g6+" g12-fl: "+g12;
            //2021-01-13: nowy screen do zapisu zmian na czas seta
            var fffv = document.getElementById("change_info1").innerHTML;
            document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team1[g12][5]+" za "+team1[g6][5];
            flag_zm_zag1=g12;//to jest tylko nr pozycji a nie nr zaw
            change1(g6,g12);
            return 1;
        }
    }//console.log(changes);
    return 0;
}

function optimal_zm_zagr2()
{
    var g12=0,tem6=100,g6=0,temp=0,par=0;g1=0;
    for(var i=1;i<=12;i++)
    {
            if(i<=6)//min z z 6
            {
                    if(team2[i][8]<tem6){tem6=team2[i][8];g6=i;}//min
                    if(team2[i][0]==1){g1=i;}
            }
            if(i>7)//max z z lawki
            {
                    if(team2[i][8]>temp){temp=team2[i][8];g12=i;}//max
            }
    }
    if(g1==g6&&temp>tem6)//najslabszy zagr to ten na zagr
    {
        if(possible_change(2,team2[g6][3],team2[g12][3])<=4)
        {
            //2021-01-12 - rozdzielanie na 2 ekrany
            var fffv = document.getElementById("screen6").innerHTML;
            document.getElementById("screen6").innerHTML=fffv+"<br>Zmiana na zagrywkę: "+team2[g12][5]+" za: "+team2[g6][5]+" (stan: "+mm1+" : "+mm2+") wynik: "+pkt1+" : "+pkt2+" g6: "+g6+" g12-fl: "+g12;
            //2021-01-13: nowy screen do zapisu zmian na czas seta
            var fffv = document.getElementById("change_info2").innerHTML;
            document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+team2[g12][5]+" za "+team2[g6][5];
            flag_zm_zag2=g12;//to jest tylko nr pozycji kurwa a nie nr zaw
            change2(g6,g12); return 1;
        }
    }//console.log(changes);
    return 0;
}

function optim_zm_ogr_young(adr)
{
//var fffv = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML=fffv+" Youngs- jestem!!! sety:"+mm1+mm2+"<<";

var maxj=0;
if(adr==1)
  {
  	tea = team1;
  }
  else 
  {
  	tea = team2;
  }
  tea[0][31]=10000;
  for(var i=1;i<=4;i++)
  {
  	if(i==1)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="R")	
			  {
			  	if(parseInt(tea[j][31])<parseInt(tea[maxj][31]))maxj=j;
			  }
		}
		if(maxj>0)
		{
			if(parseInt(tea[maxj][31])<parseInt(tea[i][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2517[p3s]YoungZamiana:"+tea[i][5]+" <>"+tea[maxj][5]+" |";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[i][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2517[p3s]YoungZamiana:"+tea[i][5]+" <>"+tea[maxj][5]+" |"; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[i][5]+" za "+tea[maxj][5];
                            }
if(adr==1)chan1(maxj,i);else chan2(maxj,i);
			}
		}
	}
	else if(i==4)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="A")	
			  {
			  	if(parseInt(tea[j][31])<parseInt(tea[maxj][31]))maxj=j;
			  }
		}
		if(maxj>0)
		{
			if(parseInt(tea[maxj][31])<parseInt(tea[i][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2546[p3s]YoungZamiana:"+tea[i][5]+" <>"+tea[maxj][5]+" |";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[i][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2546[p3s]YoungZamiana:"+tea[i][5]+" <>"+tea[maxj][5]+" |"; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[i][5]+" za "+tea[maxj][5];
                            }
if(adr==1)chan1(maxj,i);else chan2(maxj,i);
			}
		}
	}
	else if(i==2)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="P")	
			  {
			  	if(parseInt(tea[j][31])<parseInt(tea[maxj][31])){maxj=j;}
			  }
		}
		if(maxj>0)
		{
if(parseInt(tea[2][31])>parseInt(tea[5][31]))a=2;else a=5;//a - wieksze dosw z tych na boisku
			if(parseInt(tea[maxj][31])<parseInt(tea[a][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2576[p3s]YoungZamiana:"+tea[a][5]+" <>"+tea[maxj][5]+" |";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[a][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2576[p3s]YoungZamiana:"+tea[a][5]+" <>"+tea[maxj][5]+" |"; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[a][5]+" za "+tea[maxj][5];
                            }
if(adr==1)chan1(maxj,a);else chan2(maxj,a);
			}
		}
	}
	else if(i==3)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="S")	
			  {
			  	if(parseInt(tea[j][31])<parseInt(tea[maxj][31]))maxj=j;
			  }
		}
		if(maxj>0)
		{
if(parseInt(tea[3][31])>parseInt(tea[6][31]))a=3;else a=6;//a - mniejsze dosw z tych na boisku
			if(parseInt(tea[maxj][31])<parseInt(tea[a][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2606[p3s]YoungZamiana:"+tea[a][5]+" na<>"+tea[maxj][5]+" |";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[a][5]+" za "+tea[maxj][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2606[p3s]YoungZamiana:"+tea[a][5]+" na<>"+tea[maxj][5]+" |";
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[a][5]+" za "+tea[maxj][5];
                            }
if(adr==1)chan1(maxj,a);else chan2(maxj,a);
			}
		}
	}
  }
  
  if(adr==1)
	  {
	  	team1 = tea;
	  }
	  else 
	  {
	  	team2 = tea;
	  }   
banch_ins();
ustawienie();
}

//Poddany set - wchodzą z rezerwy, żeby dać odpocząć pierwszemu składowi
//2021-01-17 funkcja nie została zaktualizowana tak jak optimal_compo_zm i została wyłączona, bo np przekracza
//liczbę zmian np zrobi 7. Działanie: przy wygrywaniu 2:1 daj odpocząć na 4 i 5 set...Przypdake: przy 13:19
//weszło 5 zaw; a przy stanie 15:23 już 2 z nich zeszło odpowczywać. W rzeczywistości ci, którzy weszli  dogrzewają
//się na dalsze sety... Jakby to zrobic to może wygenerować jakąś ciekawą zmianę... albo niezrozumiałą.
function optim_zm_set_pod(adr)
{
//var fffv = document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML=fffv+" PODDAJ- jestem!!! sety:"+mm1+mm2+"pkt "+pkt1+" : "+pkt2+"<br/>";

var maxj=0;
if(adr==1)
  {
  	tea = team1;
  }
  else 
  {
  	tea = team2;
  }
tea[0][31]=0;
  for(var i=1;i<=4;i++)
  {
  	if(i==1)
	{
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="R")	
			  {
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2659[p3s]PoddajZamiana:"+tea[j][5]+" <>"+tea[i][5]+" |i:"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[j][5]+" za "+tea[i][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2659[p3s]PoddajZamiana:"+tea[j][5]+" <>"+tea[i][5]+" |i:"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[j][5]+" za "+tea[i][5];
                            }
if(adr==1)change1(j,i);else change2(j,i);break;
			  }
		}
	}
	else if(i==4)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="A")	
			  {
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2681[p3s]PoddajZamiana:"+tea[j][5]+" <>"+tea[i][5]+" |i:"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[j][5]+" za "+tea[i][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2681[p3s]PoddajZamiana:"+tea[j][5]+" <>"+tea[i][5]+" |i:"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[j][5]+" za "+tea[i][5];
                            }
if(adr==1)change1(j,i);else change2(j,i);break;
			  }
		}
	}
	else if(i==2)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="P")	
			  {
			  	if(parseInt(tea[j][31])>parseInt(tea[maxj][31])){maxj=j;}
			  }
		}
		if(maxj>0)
		{
if(parseInt(tea[2][31])>parseInt(tea[5][31]))a=2;else a=5;//a - wieksze dosw z tych na boisku
			if(parseInt(tea[maxj][31])<parseInt(tea[a][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2711[p3s]PoddajZamiana:"+tea[maxj][5]+" <>"+tea[a][5]+" |i+"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2711[p3s]PoddajZamiana:"+tea[maxj][5]+" <>"+tea[a][5]+" |i+"+i;  
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                            }
if(adr==1)change1(maxj,a);else change2(maxj,a);break;
			}
		}
	}
	else if(i==3)
	{
		maxj=0;
		for(var j=8;j<=12;j++)//szuka max//moze jest 2 rozgr na lawce
		{
			  if(tea[j][4]=="S")	
			  {
			  	if(parseInt(tea[j][31])>parseInt(tea[maxj][31]))maxj=j;
			  }
		}
		if(maxj>0)
		{
if(parseInt(tea[3][31])>parseInt(tea[6][31]))a=3;else a=6;//a - mniejsze dosw z tych na boisku
			if(parseInt(tea[maxj][31])<parseInt(tea[a][31]))
			{
                            //2021-01-12: rozdzielono na 2 screeny
                            if(adr == 1)
                            {
var fffv = document.getElementById("screen3").innerHTML;
document.getElementById("screen3").innerHTML=fffv+"<br>2741[p3s]PoddajZamiana:"+tea[maxj][5]+" na<>"+tea[a][5]+" |i:"+i;
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info1").innerHTML;
document.getElementById("change_info1").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                            }
                            else
                            {
var fffv = document.getElementById("screen6").innerHTML;
document.getElementById("screen6").innerHTML=fffv+"<br>2741[p3s]PoddajZamiana:"+tea[maxj][5]+" na<>"+tea[a][5]+" |i:"+i; 
//2021-01-13: nowy screen do zapisu zmian na czas seta
var fffv = document.getElementById("change_info2").innerHTML;
document.getElementById("change_info2").innerHTML=fffv+"<br>("+pkt1+":"+pkt2+") "+tea[maxj][5]+" za "+tea[a][5];
                            }
if(adr==1)change1(maxj,a);else change2(maxj,a);break;
			}
		}
	}
  }
  
  if(adr==1)
	  {
	  	team1 = tea;
	  }
	  else 
	  {
	  	team2 = tea;
	  }   
banch_ins();
ustawienie();
}