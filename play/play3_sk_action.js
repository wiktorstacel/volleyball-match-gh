var push = 0;
var time = 0;
var _1akcja = 0;
var pkt1 = 0, pkt2 = 0;
var pkt1s = 0, pkt2s = 0;
var mm1 = 0, mm2 = 0;
var mm_prev = 0; //info, kto wygrał poprzedni set
var serv_first = 0; //info o tym, kto wylosował serwowanie w 1 secie(i w tie-break);
var serv = 0; //info o tym kto ostatnio serwował
var a =0;
var middle = 0; //1 jesli atak byl ze srodka
var m_res = "";
var flag_lib=0;
var wyk1 = 50;
var wyk2 = 50;
var slepa = 0;
var init_ustawienie1 = new Array(0);
var init_ustawienie2 = new Array(0);
var po_akcji = 0;


function minus_dosw_licz(d)
{
		var x1=100;var x2=1000;
		var y1=10;var y2=1;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		a = Math.round(a*d + b);
		if(a<0){a=0;}
		return a;
}
function minus_dosw1(tryb)
{

	//document.write(team1);
	//console.time("minus--");
	
	if(tryb==1 && flag_dosw1==0)
	{
	var temm1 = team1;
	for(var i=1;i<=12;i++)
	{
		var min = parseInt(minus_dosw_licz(temm1[i][31]));
		if(min>=1)
		{
			for(var x=6;x<=11;x++)
			{
				temm1[i][x]=parseFloat(temm1[i][x])-min;
				flag_dosw1=1;
			}
		}	
	}
        //2021-01-12: imijanie dla funckji 1mecz
        if(!play_1mecz)
        {
            scrff = document.getElementById("screen4").innerHTML;
            document.getElementById("screen4").innerHTML = scrff +"min_dos1: odjeto || ";
        }

	team1 = temm1;
	}
	else if(tryb==0 && flag_dosw1==1)
	{
		var temm1 = team1;
		for(var i=1;i<=12;i++)
		{
		var min = parseInt(minus_dosw_licz(temm1[i][31]));
		if(min>=1)
		{
			for(var x=6;x<=11;x++)
			{
				temm1[i][x]=parseFloat(temm1[i][x])+min;
				flag_dosw1=0;
			}
		}	
		}
                //2021-01-12: imijanie dla funckji 1mecz
                if(!play_1mecz)
                {
                    scrff = document.getElementById("screen4").innerHTML;
                    document.getElementById("screen4").innerHTML = scrff +"min_dos1: dodano || ";
                }
		team1 = temm1;
	}
	else{
		return 0;
	}
}

function minus_dosw2(tryb)
{
//scrff = document.getElementById("screen4").innerHTML;
//document.getElementById("screen4").innerHTML = scrff +"min_dos2: "+tryb+" fl:"+flag_dosw2+" || ";
	//document.write(team1);
	//console.time("minus--");
	
	if(tryb==1 && flag_dosw2==0)
	{
	var temm2 = team2;
	for(var i=1;i<=12;i++)
	{
		var min = parseInt(minus_dosw_licz(temm2[i][31]));
		if(min>=1)
		{
			for(var x=6;x<=11;x++)
			{
				temm2[i][x]=parseInt(temm2[i][x])-min;
				flag_dosw2=1;
				
			}
		}	
	}
        //2021-01-12: imijanie dla funckji 1mecz
        if(!play_1mecz)
        {
            scrff = document.getElementById("screen4").innerHTML;
            document.getElementById("screen4").innerHTML = scrff +"min_dos2: odjeto || ";
        }
	team2 = temm2;
	}
	else if(tryb==0 && flag_dosw2==1)
	{
		var temm2 = team2;
		for(var i=1;i<=12;i++)
		{
		var min = parseInt(minus_dosw_licz(temm2[i][31]));
		if(min>=1)
		{
			for(var x=6;x<=11;x++)
			{
				temm2[i][x]=parseInt(temm2[i][x])+min;
				flag_dosw2=0;
			}
		}	
		}
                        //2021-01-12: imijanie dla funckji 1mecz
                if(!play_1mecz)
                {
                    scrff = document.getElementById("screen4").innerHTML;
                    document.getElementById("screen4").innerHTML = scrff +"min_dos2: dodano || ";
                }
		team2 = temm2;
	}
	else{
		return 0;
	}
}

function host_give(par)
{
	//scrff = document.getElementById("screen4").innerHTML;
	//document.getElementById("screen4").innerHTML = scrff +"host_giv:"+par+" "+pkt1+":"+pkt2+" || ";
	var tem=team2;
	if(par == 1)
	{
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tem[i][j] = parseFloat(tem[i][j])-2;
		}
		}
	}
	else if(par == 2)
	{
		for(i=1;i<=12;i++)
		{
		for(j=6;j<=11;j++)
		{
			tem[i][j] = parseFloat(tem[i][j])+2;
		}
		}
	}
	team2=tem;
}

function act_wykr_team1()
{
	document.getElementById("wykres").innerHTML="";
	for(var t=0;t<=120;t++)
	{
wykres1[t]=y;
scr=document.getElementById("wykres").innerHTML;
document.getElementById("wykres").innerHTML =scr + "<div class='punkt' style='width:1px; height:1px; background-color:black; position: absolute; left:"+t+"px; bottom:"+y+"px;'></div>";
	}
}

function act_wykr_draw(j)//rysowanie tylko za wezwaniem i zalezne od j;
{
	
	var przed=Math.round(120/(wyk1-50));//np 4//przed=30
	var start_kreska=0;
	document.getElementById("wykres").innerHTML="";
	for(var i=50;i<wyk1;i++)
	{
		stop_kreska=start_kreska+przed;
//		scr=document.getElementById("screen6").innerHTML;
//		document.getElementById("screen6").innerHTML =scr+" wyk: "+wyk1+" przed:"+przed+" strat_kreska: "+start_kreska+" stop_kreska: "+stop_kreska;
		y1=team1[j][i];x1=start_kreska;
		y2=team1[j][i+1];x2=stop_kreska;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;//mam wykres odcinka
		for(var t=start_kreska;t<=stop_kreska;t++)
		{
y = Math.round(a*t + b);
scr=document.getElementById("wykres").innerHTML;
document.getElementById("wykres").innerHTML =scr + "<div class='punkt' style='width:1px; height:1px; background-color:black; position: absolute; left:"+t+"px; bottom:"+y+"px;'></div>";
//scr=document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML =scr+" x: "+t+",y: "+y;
		}
	start_kreska+=przed;
	}
				

}

function act_wykr_draw_team1()//rysowanie tylko za wezwaniem i zalezne od j;
{
	j=1;
	
	var przed=Math.round(120/(wyk1-50));//np 4//przed=30
	var start_kreska=0;
	document.getElementById("wykres").innerHTML="";
	for(var i=50;i<wyk1;i++)
	{
		stop_kreska=start_kreska+przed;
//		scr=document.getElementById("screen6").innerHTML;
//		document.getElementById("screen6").innerHTML =scr+" wyk: "+wyk1+" przed:"+przed+" strat_kreska: "+start_kreska+" stop_kreska: "+stop_kreska;
var sr1=0,sr2=0;
		for(j=1;j<=7;j++)
		{
			sr1+=team1[j][i]
			sr2+=team1[j][i+1]
		}
sr1=sr1/7;sr2=sr2/7;
		y1=sr1;x1=start_kreska;
		y2=sr2;x2=stop_kreska;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;//mam wykres odcinka
		for(var t=start_kreska;t<=stop_kreska;t++)
		{
y = Math.round(a*t + b);
scr=document.getElementById("wykres").innerHTML;
document.getElementById("wykres").innerHTML =scr + "<div class='punkt' style='width:1px; height:1px; background-color:black; position: absolute; left:"+t+"px; bottom:"+y+"px;'></div>";
//scr=document.getElementById("screen6").innerHTML;
//document.getElementById("screen6").innerHTML =scr+" x: "+t+",y: "+y;
		}
	start_kreska+=przed;
	}
}
var wykres1 = new Array();
function act_wykr_fast_team1()//rysowanie tylko za wezwaniem i zalezne od j;
{
	var licprzed=(wyk1-1)-50;
	var przed=Math.round(120/licprzed);
	
	var licprzedn=(wyk1)-50;
	var przedn=Math.round(120/licprzedn);
	
	var start_kreska=0;
	document.getElementById("wykres").innerHTML="";
	if(licprzed>0)
	{
		//pobrac punkty przegiecia wykresu
		for(var a=0,b=0;a<licprzed;a++)
		{
			xx1=a*przed;//stare x
			xx2=(a+1)*przed;//stare x
			y1=wykres1[xx1];
			y2=wykres1[xx2];
			x1=a*przedn;//nowe x
			x2=(a+1)*przedn;//nowe x	
			a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;	
			for(var t=x1;t<=x2;t++)
			{
y = Math.round(a*t + b);
wykres1[t]=y;
			}	
		}
	}
	//wstawienie nowego przedzialu dł:przedn
	for(var i=wyk1-1;i<wyk1;i++)
	{
		start_kreska=przedn*(licprzedn-1);//!! nie wiadomo czy tu rzejdzie x2
		stop_kreska=start_kreska+przedn;
//		scr=document.getElementById("screen6").innerHTML;
//		document.getElementById("screen6").innerHTML =scr+" wyk: "+wyk1+" przed:"+przed+" strat_kreska: "+start_kreska+" stop_kreska: "+stop_kreska;
var sr1=0,sr2=0;
		for(j=1;j<=7;j++)
		{
			sr1+=team1[j][i]
			sr2+=team1[j][i+1]
		}
sr1=sr1/7;sr2=sr2/7;
		y1=sr1;x1=start_kreska;
		y2=sr2;x2=stop_kreska;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;//mam wykres odcinka
		for(var t=start_kreska;t<=stop_kreska;t++)
		{
y = Math.round(a*t + b);
wykres1[t]=y;
		}
	}
act_wykr_team1();
}

function act_wykr_new_point1()
{
	wyk1++;
	for(var i=1;i<=12;i++)
	{
		var y=zaokr((100*team1[i][28])/team1[i][27]);//nowy pkt wykresu//dla całej 12 liczyc
		team1[i][wyk1]=y;
	}
}
function act_wykr_new_point2()
{
	wyk2++;
	for(var i=1;i<=12;i++)
	{
		var y=zaokr((100*team2[i][28])/team2[i][27]);//nowy pkt wykresu//dla całej 12 liczyc
		team2[i][wyk2]=y;
	}
}

function act_wykr_add_point1()
{	
		var i=(wyk1-50)*5;
		var sr1=0,sr2=0;
		for(j=1;j<=7;j++)
		{
			sr1+=team1[j][wyk1-1];//poprz punkt
			sr2+=team1[j][wyk1];
		}
		sr1=sr1/7;sr2=sr2/7;
		y1=sr1;x1=i-5;
		y2=sr2;x2=i;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		for(t=x1;t<=x2;t++)
		{
y = a*t + b;
y=Math.round(100-((100-y)*4));
scr=document.getElementById("wykres1").innerHTML;
document.getElementById("wykres1").innerHTML =scr + "<div class='punkt' style='width:1px; height:1px; background-color:black; position: absolute; left:"+t+"px; bottom:"+y+"px;'></div>";
		}
}

function act_wykr_add_point2()
{	
		var i=(wyk2-50)*5;
		var sr1=0,sr2=0;
		for(j=1;j<=7;j++)
		{
			sr1+=team2[j][wyk2-1];//poprz punkt
			sr2+=team2[j][wyk2];
		}
		sr1=sr1/7;sr2=sr2/7;
		y1=sr1;x1=i-5;
		y2=sr2;x2=i;
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		for(t=x1;t<=x2;t++)
		{
y = a*t + b;
y=Math.round(100-((100-y)*4));
scr=document.getElementById("wykres2").innerHTML;
document.getElementById("wykres2").innerHTML =scr + "<div class='punkt' style='width:1px; height:1px; background-color:black; position: absolute; left:"+t+"px; bottom:"+y+"px;'></div>";
		}

}

function ask_zm1(i)
{
	document.getElementById("ekranik1").innerHTML="Perfo:<br/>"+Math.round((team1[i][28]/team1[i][27])*100)+"%";
}
function ask_zm2(i)
{
	document.getElementById("ekranik2").innerHTML="Perfo:<br/>"+Math.round((team2[i][28]/team2[i][27])*100)+"%";
}

function act_stat()
{
	//var teamo1 = team1;
	//var team2 = team2;
	
/*	for(var t=1;t<=12;t++)
	{
	if(t==1)
	{
		tct="<table>";
	}
	else
	{
		tct=document.getElementById("screen5").innerHTML;
	}	
	document.getElementById("screen5").innerHTML = tct+"<tr><td>"+team1[t][5]+"</td><td>_A: "+team1[t][6]+"</td><td>_P:"+team1[t][7]+"</td><td>_Z:"+team1[t][8]+"</td><td>_B:"+team1[t][9]+"</td><td>_O:"+team1[t][10]+"</td><td>_R: "+team1[t][11]+"</td><td>_FOR: "+team1[t][13]+"</td><td>_TIR: "+team1[t][14]+"</td></tr>";
	}
	
	tct=document.getElementById("screen5").innerHTML;
	document.getElementById("screen5").innerHTML = tct+"</table>";*/
	
        //TEAM1
        document.getElementById("stat_team1").innerHTML = "";
	scr_add = "Atak:<br/>";
	var ata_17=0;var ata_18=0;var atako=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][18] > 0)
		{
		atako = Math.round(100*team1[i][17]/team1[i][18]);
		ata_17=ata_17+parseInt(team1[i][17]);
		ata_18=ata_18+parseInt(team1[i][18]);
		scr_add = scr_add +" "+ team1[i][5] +" "+team1[i][17]+"/"+team1[i][18]+" "+atako+"%<br/>";
		}
	}
	document.getElementById("stat_atak1").innerHTML = scr_add;
	atako = Math.round(100*ata_17/ata_18);
	if(atako>=0)
	{
		document.getElementById("stat_team1").innerHTML = "Atak: "+ata_17+"/"+ata_18+" "+atako+"%<br/>";
	}
	
	
	scr_przyj = "Przyjęcie:<br/>";
	var prz_19=0;var prz_20=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][20]>0)
		{
		prz_20+=team1[i][20];
		}
	}
	for(i=1;i<=12;i++)
	{
		if(team1[i][20] > 0 /*&& (team1[i][4] == "L" || team1[i][4] == "P")*/)
		{
		scr_przyj = scr_przyj +" "+ team1[i][5] +" "+team1[i][19]+"% | "+team1[i][20]+"<br/>";
		prz_19+=team1[i][19]*(team1[i][20]/prz_20);
		}
	}
	if(prz_20>0)
	{
		pcb=document.getElementById("stat_team1").innerHTML;
		document.getElementById("stat_team1").innerHTML =pcb+"Przyjęcie: "+Math.round(prz_19)+"% | "+prz_20+"<br/>";
	}
	
	scr_as = "<br/>Asy serwisowe:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team1[i][21] > 0)
		{
		scr_as = scr_as +" "+ team1[i][5] +" "+team1[i][21]+", ";
		}
	}
	document.getElementById("stat_przy1").innerHTML = scr_przyj + scr_as;
        //document.getElementById("asy_serw1").innerHTML = scr_as;//test
	
	scr_obro = "Obrony:<br/>";
	var bl_23=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][23] > 0)
		{
		scr_obro = scr_obro +" "+team1[i][5] + " " + team1[i][23]+"<br/>";
		bl_23=bl_23+parseInt(team1[i][23]);
		}
	}
	if(bl_23>0)
	{
		pcb=document.getElementById("stat_team1").innerHTML;
		document.getElementById("stat_team1").innerHTML =pcb+"Obrony: "+bl_23+"<br/>";
	}
	document.getElementById("stat_obrona1").innerHTML = scr_obro;
	
	scr_blok = "Bloki:<br/>";
	var bl_24=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][24] > 0)
		{
		scr_blok = scr_blok +" "+team1[i][5] + " " + team1[i][24]+"<br/>";
		bl_24=bl_24+parseInt(team1[i][24]);
		}
	}
	document.getElementById("stat_blok1").innerHTML = scr_blok;
	if(bl_24>0)
	{
		pcb=document.getElementById("stat_team1").innerHTML;
		document.getElementById("stat_team1").innerHTML =pcb+"Bloki: "+bl_24+"<br/>";
	}
	
	scr_pkt = "Punkty:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team1[i][25] > 0)
		{
		scr_pkt = scr_pkt +" "+ team1[i][5] +" "+team1[i][25]+"<br/>";
		}
	}
	document.getElementById("stat_pkt1").innerHTML = scr_pkt;
	
	
	//TEAM2	
        document.getElementById("stat_team2").innerHTML = "";
	scr_add = "Atak:<br/>";
	ata_17=0;ata_18=0;atako=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][18] > 0)
		{
		atako = Math.round(100*team2[i][17]/team2[i][18]);
		ata_17=ata_17+parseInt(team2[i][17]);
		ata_18=ata_18+parseInt(team2[i][18]);
		scr_add = scr_add +" "+ team2[i][5] +" "+team2[i][17]+"/"+team2[i][18]+" "+atako+"%<br/>";
		}
	}
	document.getElementById("stat_atak2").innerHTML = scr_add;
	atako = Math.round(100*ata_17/ata_18);//alert(atako);
	if(atako>=0)
	{
		document.getElementById("stat_team2").innerHTML = "Atak: "+ata_17+"/"+ata_18+" "+atako+"%<br/>";
	}
	
	scr_przyj = "Przyjęcie:<br/>";
	prz_19=0;prz_20=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][20]>0)
		{
		prz_20+=team2[i][20];
		}
	}
	for(i=1;i<=12;i++)
	{
		if(team2[i][20] > 0 /*&& (team2[i][4] == "L" || team2[i][4] == "P")*/)
		{
		scr_przyj = scr_przyj +" "+ team2[i][5] +" "+team2[i][19]+"% | "+team2[i][20]+"<br/>";
		prz_19+=team2[i][19]*(team2[i][20]/prz_20);
		}
	}
	if(prz_20>0)
	{
		pcb=document.getElementById("stat_team2").innerHTML;
		document.getElementById("stat_team2").innerHTML =pcb+"Przyjęcie: "+Math.round(prz_19)+"% | "+prz_20+"<br/>";
	}
	
	scr_as = "<br/>Asy serwisowe:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team2[i][21] > 0)
		{
		scr_as = scr_as +" "+ team2[i][5] +" "+team2[i][21]+", ";
		}
	}
	document.getElementById("stat_przy2").innerHTML = scr_przyj + scr_as;
	
	scr_obro = "Obrony:<br/>";
	bl_23=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][23] > 0)
		{
		scr_obro = scr_obro +" "+team2[i][5] + " " + team2[i][23]+"<br/>";
		bl_23=bl_23+parseInt(team2[i][23]);
		}
	}
	if(bl_23>0)
	{
		pcb=document.getElementById("stat_team2").innerHTML;
		document.getElementById("stat_team2").innerHTML =pcb+"Obrony: "+bl_23+"<br/>";
	}
        document.getElementById("stat_obrona2").innerHTML = scr_obro;
	
	scr_blok = "Bloki:<br/>";
	bl_24=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][24] > 0)
		{
		scr_blok = scr_blok +" "+team2[i][5] + " " + team2[i][24]+"<br/>";
		bl_24=bl_24+parseInt(team2[i][24]);
		}
	}
	document.getElementById("stat_blok2").innerHTML = scr_blok;
	if(bl_24>0)
	{
		pcb=document.getElementById("stat_team2").innerHTML;
		document.getElementById("stat_team2").innerHTML =pcb+"Bloki: "+bl_24+"<br/>";
	}
	
	scr_pkt = "Punkty:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team2[i][25] > 0)
		{
		scr_pkt = scr_pkt +" "+ team2[i][5] +" "+team2[i][25]+"<br/>";
		}
	}
	document.getElementById("stat_pkt2").innerHTML = scr_pkt;
	
	//team1 = team1;
	//team2 = team2;
}

function act_stat_view1()
{	
	var dosw_sum="";
	for(var i=1;i<=12;i++)
	{
		if(team1[i][4]=="S")
		{
var sum=2*parseInt(team1[i][18])+parseInt(team1[i][20])+parseInt(team1[i][23])+3*parseInt(team1[i][24])+parseInt(team1[i][26])/(3);
		}
		else
		{
var sum=parseInt(team1[i][18])+parseInt(team1[i][20])+2*parseInt(team1[i][23])+2*parseInt(team1[i][24])+parseInt(team1[i][26])/(3);
		}
		dosw_sum+=team1[i][4]+" | "+team1[i][5]+" suma: "+sum+" | "+parseInt(team1[i][18])+"/"+parseInt(team1[i][20])+"/"+parseInt(team1[i][23])+"/"+parseInt(team1[i][24])+"/"+parseInt(team1[i][26])+"<br/>";
	}
	var scr_team1="";
	scr_add1 = "Atak:<br/>";
	var ata_17=0;var ata_18=0;var atako=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][18] > 0)
		{
		atako = Math.round(100*team1[i][17]/team1[i][18]);
		ata_17=ata_17+parseInt(team1[i][17]);
		ata_18=ata_18+parseInt(team1[i][18]);
		scr_add1 = scr_add1 +" "+ team1[i][5] +" "+team1[i][17]+"/"+team1[i][18]+" "+atako+"%<br/>";
		}
	}
	atako = Math.round(100*ata_17/ata_18);
	if(atako>=0)
	{
		scr_team1=scr_team1+ "Atak: "+ata_17+"/"+ata_18+" "+atako+"%<br/>";
	}
	scr_add1 = scr_add1+"<br/>Przyjęcie:<br/>";
	var prz_19=0;var prz_20=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][20]>0)
		{
		prz_20+=team1[i][20];
		}
	}
	for(i=1;i<=12;i++)
	{
		if(team1[i][20] > 0 /*&& (team1[i][4] == "L" || team1[i][4] == "P")*/)
		{
		scr_add1 = scr_add1+" "+ team1[i][5] +" "+team1[i][19]+"% | "+team1[i][20]+"<br/>";
		prz_19+=team1[i][19]*(team1[i][20]/prz_20);
		}
	}
	if(prz_20>=0)
	{
		scr_team1=scr_team1+"Przyjęcie: "+Math.round(prz_19)+"% | "+prz_20+"<br/>";
	}
	
	scr_add1 = scr_add1+"<br/>Asy serwisowe:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team1[i][21] > 0)
		{
		scr_add1 = scr_add1+" "+ team1[i][5] +" "+team1[i][21]+"<br/>";
		}
	}
	
	scr_add1 = scr_add1+"<br/>Obrona:<br/>";
	var bl_23=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][23] > 0)
		{
		scr_add1 = scr_add1+" "+team1[i][5] + " " + team1[i][23]+"<br/>";
		bl_23=bl_23+parseInt(team1[i][23]);
		}
	}
	if(bl_23>0)
	{
		scr_team1=scr_team1+"Obrony: "+bl_23+"<br/>";
	}
	
	scr_add1 = scr_add1+ "<br/>Blok:<br/>";
	var bl_24=0;
	for(i=1;i<=12;i++)
	{
		if(team1[i][24] > 0)
		{
		scr_add1 = scr_add1+" "+team1[i][5] + " " + team1[i][24]+"<br/>";
		bl_24=bl_24+parseInt(team1[i][24]);
		}
	}
	if(bl_24>0)
	{
		scr_team1=scr_team1+"Bloki: "+bl_24+"<br/><br/>";
	}
	
	scr_add1 = scr_add1+"<br/>Punkty:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team1[i][25] > 0)
		{
		scr_add1 = scr_add1+" "+ team1[i][5] +" "+team1[i][25]+"<br/>";
		}
	}
	return dosw_sum+scr_team1+scr_add1;
}
function act_stat_view2()
{
	//team2
	var scr_team1="";
	var scr_add1 = "Atak:<br/>";
	ata_17=0;ata_18=0;atako=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][18] > 0)
		{
		atako = Math.round(100*team2[i][17]/team2[i][18]);
		ata_17=ata_17+parseInt(team2[i][17]);
		ata_18=ata_18+parseInt(team2[i][18]);
		scr_add1 = scr_add1+" "+ team2[i][5] +" "+team2[i][17]+"/"+team2[i][18]+" "+atako+"%<br/>";
		}
	}
	atako = Math.round(100*ata_17/ata_18);
	if(atako>=0)
	{
		scr_team1=scr_team1+"Atak: "+ata_17+"/"+ata_18+" "+atako+"%<br/>";
	}
	
	scr_add1 = scr_add1+"<br/>Przyjęcie:<br/>";
	prz_19=0;prz_20=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][20]>0)
		{
		prz_20+=team2[i][20];
		}
	}
	for(i=1;i<=12;i++)
	{
		if(team2[i][20] > 0 /*&& (team2[i][4] == "L" || team2[i][4] == "P")*/)
		{
		scr_add1 = scr_add1 +" "+ team2[i][5] +" "+team2[i][19]+"% | "+team2[i][20]+"<br/>";
		prz_19+=team2[i][19]*(team2[i][20]/prz_20);
		}
	}
	if(prz_20>=0)
	{
		scr_team1=scr_team1+"Przyjęcie: "+Math.round(prz_19)+"% | "+prz_20+"<br/>";
	}
	
	scr_add1 = scr_add1+"<br/>Asy serwisowe:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team2[i][21] > 0)
		{
		scr_add1 = scr_add1 +" "+ team2[i][5] +" "+team2[i][21]+"<br/>";
		}
	}
	scr_add1 = scr_add1+"<br/>Obrona:<br/>";
	bl_23=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][23] > 0)
		{
		scr_add1 = scr_add1+" "+team2[i][5] + " " + team2[i][23]+"<br/>";
		bl_23=bl_23+parseInt(team2[i][23]);
		}
	}
	if(bl_23>0)
	{
		scr_team1=scr_team1+"Obrony: "+bl_23+"<br/>";
	}
	
	scr_add1 = scr_add1+ "<br/>Blok:<br/>";
	bl_24=0;
	for(i=1;i<=12;i++)
	{
		if(team2[i][24] > 0)
		{
		scr_add1=scr_add1+" "+team2[i][5] + " " + team2[i][24]+"<br/>";
		bl_24=bl_24+parseInt(team2[i][24]);
		}
	}
	if(bl_24>0)
	{
		scr_team1=scr_team1+"Bloki: "+bl_24+"<br/><br/>";
	}
	
	scr_add1 = scr_add1+"<br/>Punkty:<br/>";
	for(i=1;i<=12;i++)
	{
		if(team2[i][25] > 0)
		{
		scr_add1=scr_add1+" "+ team2[i][5] +" "+team2[i][25]+"<br/>";
		}
	}
	return scr_team1+scr_add1;
}

function act_table(m1,m2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s)//mam tu wynik w setach
{
	//zaincjowanie następnego meczu.
	actual_stat(m1+m2,liga);
	if(para>0)
	{
		para++;
		getGuest(kol,pl,para,liga);
	}	
	if(m1 > m2)//wygrywa team1
	{
		if(m2==2)//po tiebreaku
		{
			//nalicz team1:2; team2:1
			adres = "act_table.php?tum1="+tum1+"&tum2="+tum2+"&p1="+2+"&p2="+1+"&s1="+m1+"&s2="+m2+"&kol="+kol+"&mm="+mm+"&scr1="+act_stat_view1()+"&scr2="+act_stat_view2()+"&liga="+liga+"&pkt1s="+pkt1s+"&pkt2s="+pkt2s;
			getData(adres, "monu");
			
			return 0;
		}
		else
		{
			//nalicz team1:3; team2:0
			adres = "act_table.php?tum1="+tum1+"&tum2="+tum2+"&p1="+3+"&p2="+0+"&s1="+m1+"&s2="+m2+"&kol="+kol+"&mm="+mm+"&scr1="+act_stat_view1()+"&scr2="+act_stat_view2()+"&liga="+liga+"&pkt1s="+pkt1s+"&pkt2s="+pkt2s;
			getData(adres, "monu");
			
			return 0;
		}
	}	
	else//wygrywa team2
	{
		if(m1==2)//po tiebreaku
		{
			//nalicz team1:1; team2:2
			adres = "act_table.php?tum1="+tum1+"&tum2="+tum2+"&p1="+1+"&p2="+2+"&s1="+m1+"&s2="+m2+"&kol="+kol+"&mm="+mm+"&scr1="+act_stat_view1()+"&scr2="+act_stat_view2()+"&liga="+liga+"&pkt1s="+pkt1s+"&pkt2s="+pkt2s;
			getData(adres, "monu");
			
			return 0;
		}
		else
		{
			//nalicz team1:0; team2:3
			adres = "act_table.php?tum1="+tum1+"&tum2="+tum2+"&p1="+0+"&p2="+3+"&s1="+m1+"&s2="+m2+"&kol="+kol+"&mm="+mm+"&scr1="+act_stat_view1()+"&scr2="+act_stat_view2()+"&liga="+liga+"&pkt1s="+pkt1s+"&pkt2s="+pkt2s;
			getData(adres, "monu");
			
			return 0;
		}
	}
}

function meczyk()
{
		var mm1 = 0, mm2 = 0;
		var los = Math.floor(Math.random() * 100 + 1);//losowanie kto pierwszy serwuje
		if(los<50)
		{
			host_give(1);
			s1 = init_flow1(0);
			if(s1 == 1){mm1++;}else{mm2++;}
			m = "("+pkt1+":"+pkt2+",";
			//alert(m);
			s2 = init_flow2(0);
			if(s2 == 1){mm1++;}else{mm2++;}
			m = m+" "+pkt1+":"+pkt2+",";
			//alert(m);
			host_give(2);
			s3 = init_flow1(0);
			if(s3 == 1){mm1++;}else{mm2++;}
				if(mm1 == 3 || mm2 ==3)
				{
					m = m+" "+pkt1+":"+pkt2+")";
					m = mm1+":"+mm2+" "+m
					alert(m);
					return 0;
				}
				else//4 set
				{
					m = m+" "+pkt1+":"+pkt2+",";
					s4 = init_flow2(0);
					if(s4 == 1){mm1++;}else{mm2++;}
						if(mm1 == 3 || mm2 ==3)
						{
						m = m+" "+pkt1+":"+pkt2+")";
						m = mm1+":"+mm2+" "+m
						alert(m);
						return 0;
						}
						else//5 set
						{
						m = m+" "+pkt1+":"+pkt2+",";
						host_give(1);
						s5 = init_flow1(1);
						if(s5 == 1){mm1++;}else{mm2++;}
						m = m+" "+pkt1+":"+pkt2+")";
						m = mm1+":"+mm2+" "+m
						alert(m);
						return 0;
						}
				}

		}
		else
		{
			host_give(1);
			s1 = init_flow2(0);
			if(s1 == 1){mm1++;}else{mm2++;}
			m = "("+pkt1+":"+pkt2+",";
			//alert(m);
			s2 = init_flow1(0);
			if(s2 == 1){mm1++;}else{mm2++;}
			m = m+" "+pkt1+":"+pkt2+",";
			//alert(m);
			host_give(2);
			s3 = init_flow2(0);
			if(s3 == 1){mm1++;}else{mm2++;}
				if(mm1 == 3 || mm2 ==3)
				{
					m = m+" "+pkt1+":"+pkt2+")";
					m = mm1+":"+mm2+" "+m
					alert(m);
					return 0;
				}
				else//4 set
				{
					m = m+" "+pkt1+":"+pkt2+",";
					s4 = init_flow1(0);
					if(s4 == 1){mm1++;}else{mm2++;}
						if(mm1 == 3 || mm2 ==3)
						{
						m = m+" "+pkt1+":"+pkt2+")";
						m = mm1+":"+mm2+" "+m
						alert(m);
						return 0;
						}
						else//5 set
						{
						m = m+" "+pkt1+":"+pkt2+",";
						host_give(1);
						s5 = init_flow2(1);
						if(s5 == 1){mm1++;}else{mm2++;}
						m = m+" "+pkt1+":"+pkt2+")";
						m = mm1+":"+mm2+" "+m
						alert(m);
						return 0;
						}
				}
		}
		
		
}

function meczyk1(tum1, tum2, kol, para, pl, liga) //mecz dla gracza na ekran
{
	
	
		mm1 = 0, mm2 = 0;
		pkt1s = 0; pkt2s = 0;
		var los = Math.floor(Math.random() * 100 + 1);//losowanie kto pierwszy serwuje
		if(los<50)
		{
			//host_give(1);
			s1 = init_flow1(0);
			if(s1 == 1){mm1++;}else{mm2++;}
			m = "("+pkt1+":"+pkt2+",";pkt1s+=pkt1;pkt2s+=pkt2;
			//alert(m);
			s2 = init_flow2(0);
			if(s2 == 1){mm1++;}else{mm2++;}
			m = m+" "+pkt1+":"+pkt2+",";pkt1s+=pkt1;pkt2s+=pkt2;
			//alert(m);
			//host_give(2);
			s3 = init_flow1(0);
			if(s3 == 1){mm1++;}else{mm2++;}
				if(mm1 == 3 || mm2 ==3)
				{
					m = m+" "+pkt1+":"+pkt2+")";
					pkt1s+=pkt1;pkt2s+=pkt2;
					mm = mm1+":"+mm2+" "+m
					//alert(m);
					document.getElementById("team"+tum1).innerHTML = mm1+" : ";
					document.getElementById("team"+tum2).innerHTML = mm2;
					document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
					act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
					return 0;
				}
				else//4 set
				{
					m = m+" "+pkt1+":"+pkt2+",";
					s4 = init_flow2(0);
					if(s4 == 1){mm1++;}else{mm2++;}
						if(mm1 == 3 || mm2 ==3)
						{
						m = m+" "+pkt1+":"+pkt2+")";
						pkt1s+=pkt1;pkt2s+=pkt2;
						mm = mm1+":"+mm2+" "+m
						//alert(m);
						document.getElementById("team"+tum1).innerHTML = mm1+" : ";
						document.getElementById("team"+tum2).innerHTML = mm2;
						document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
						act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
						return 0;
						}
						else//5 set
						{
						m = m+" "+pkt1+":"+pkt2+",";
						pkt1s+=pkt1;pkt2s+=pkt2;
						//host_give(1);
						s5 = init_flow1(1);
						if(s5 == 1){mm1++;}else{mm2++;}
						m = m+" "+pkt1+":"+pkt2+")";
						mm = mm1+":"+mm2+" "+m
						//alert(m);
						document.getElementById("team"+tum1).innerHTML = mm1+" : ";
						document.getElementById("team"+tum2).innerHTML = mm2;
						document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
						act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
						return 0;
						}
				}

		}
		else
		{
			//host_give(1);
			s1 = init_flow2(0);
			if(s1 == 1){mm1++;}else{mm2++;}
			m = "("+pkt1+":"+pkt2+",";
			pkt1s+=pkt1;pkt2s+=pkt2;
			//alert(m);
			s2 = init_flow1(0);
			if(s2 == 1){mm1++;}else{mm2++;}
			m = m+" "+pkt1+":"+pkt2+",";
			pkt1s+=pkt1;pkt2s+=pkt2;
			//alert(m);
			//host_give(2);
			s3 = init_flow2(0);
			if(s3 == 1){mm1++;}else{mm2++;}
				if(mm1 == 3 || mm2 ==3)
				{
					m = m+" "+pkt1+":"+pkt2+")";
					pkt1s+=pkt1;pkt2s+=pkt2;
					mm = mm1+":"+mm2+" "+m
					//alert(m);
					document.getElementById("team"+tum1).innerHTML = mm1+" : ";
					document.getElementById("team"+tum2).innerHTML = mm2;
					document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
					act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
					return 0;
				}
				else//4 set
				{
					m = m+" "+pkt1+":"+pkt2+",";
					pkt1s+=pkt1;pkt2s+=pkt2;
					s4 = init_flow1(0);
					if(s4 == 1){mm1++;}else{mm2++;}
						if(mm1 == 3 || mm2 ==3)
						{
						m = m+" "+pkt1+":"+pkt2+")";
						mm = mm1+":"+mm2+" "+m
						//alert(m);
						document.getElementById("team"+tum1).innerHTML = mm1+" : ";
						document.getElementById("team"+tum2).innerHTML = mm2;
						document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
						act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
						return 0;
						}
						else//5 set
						{
						m = m+" "+pkt1+":"+pkt2+",";
						pkt1s+=pkt1;pkt2s+=pkt2;
						//host_give(1);
						s5 = init_flow2(1);
						if(s5 == 1){mm1++;}else{mm2++;}
						m = m+" "+pkt1+":"+pkt2+")";
						mm = mm1+":"+mm2+" "+m
						//alert(m);
						document.getElementById("team"+tum1).innerHTML = mm1+" : ";
						document.getElementById("team"+tum2).innerHTML = mm2;
						document.getElementById("team"+tum1+tum2).innerHTML = m;
if(flag_wyr1==1){wyrownacz_give(1);flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);flag_wyr2=0;}
						act_table(mm1,mm2,tum1,tum2,kol,mm,para,pl,liga,pkt1s,pkt2s);
						return 0;
						}
				}
		}	
}

function init_flow1(t)
{
	//document.getElementById("show1").innerHTML = 0;
	//document.getElementById("show2").innerHTML = 0;
	pkt1 = 0, pkt2 = 0;zeruj_changes();
	host_give(1);flag_host=0;flag_zm_zag1=0;flag_zm_zag2=0;

		if((mm1+mm2)==2&&(pkt2s/pkt1s)<=0.8)
		{
			optim_zm_ogr_young(1)
		}
		else
		{
			optimal_compos_zm_begin(1);
		}
	
		if((mm1+mm2)==2&&(pkt1s/pkt2s)<=0.8)
		{
			optim_zm_ogr_young(2)
		}
		else
		{
			optimal_compos_zm_begin(2);
		}
	
	if(flag_wyr1==1)
	{
		wyrownacz_give(1);
		flag_wyr1=0;
	}
	if(flag_wyr2==1)
	{
		wyrownacz_give(2);
		flag_wyr2=0;
	}
    a = akcja1_tlo(); //zainicjowanie
	return action_flow(t);
}

function init_flow2(t)
{
	//document.getElementById("show1").innerHTML = 0;
	//document.getElementById("show2").innerHTML = 0;
	pkt1 = 0, pkt2 = 0;zeruj_changes();
	host_give(1);flag_host=0;flag_zm_zag1=0;flag_zm_zag2=0;
	
		if((mm1+mm2)==2&&(pkt2s/pkt1s)<=0.8)
		{
			optim_zm_ogr_young(1)
		}
		else
		{
			optimal_compos_zm_begin(1);
		}
	
		if((mm1+mm2)==2&&(pkt1s/pkt2s)<=0.8)
		{
			optim_zm_ogr_young(2)
		}
		else
		{
			optimal_compos_zm_begin(2);
		}
	
	if(flag_wyr1==1)
	{
		wyrownacz_give(1);
		flag_wyr1=0;
	}
	if(flag_wyr2==1)
	{
		wyrownacz_give(2);
		flag_wyr2=0;
	}
    a = akcja2_tlo(); //zainicjowanie
	return action_flow(t);
}

function action_flow(t)
{			
	if(t==0)
	{
		while(wyniki(9) == 1)	
	{
		if(a == 1)
		{
			a = akcja1_tlo();//przejscie1();
			if(a == 2)
			{
				przejscie2();
			}
		}
		else if(a == 2)
		{
			a = akcja2_tlo();
			if(a == 1)
			{
				przejscie1();
			}
		}
	}
	}
	else
	{
		while(wyniki(3) == 1)	
		{
		if(a == 1)
		{
			a = akcja1_tlo();//przejscie1();
			if(a == 2)
			{
				przejscie2();
			}
		}
		else if(a == 2)
		{
			a = akcja2_tlo();
			if(a == 1)
			{
				przejscie1();
			}
		}
		}
	}
	
	//document.getElementById("screen1").innerHTML = "KONIEC SETA";
	if(pkt1 > pkt2)
	{
		return 1;
	}
	else
	{
		return 2;	
	}
}

function StrzalCpu()
{
    if(push == 1){return 1;}else {return 0;}
}


function cpuLoop()
{
    if (StrzalCpu() == 0)
    {
        // Trafienie, "pętla"
        setTimeout(cpuLoop, 500);
    }
    else
    {
        // Pudło, wyjście z "pętli"
        action();
    }
}
function time_take()
{
    time = 1;
}
function time_no()
{
    time = 0;
}
function contin_1()
{
    time = 0;
    _1akcja = 1;
}

function time_flow()
{
    if(time == 1){return 1;}else {return 0;}
}
var atime;
function cpuflow()
{
    if (time == 1)//czas - petla oczekuje na nacisniecie start
    {
        setTimeout(cpuflow, 1);
    }
    else//
    {
		 //oczekiwanie na nacisniecie
//		if(loophelp()==1)
//		{
                        if(action_break()==0){return 0;}
			var atime = setTimeout(help_cpuflow, 20); //ważne: funkcja bez nawiasów !!!
                        if(_1akcja)
                        {
                            time = 1;
                            _1akcja = 0;
                        }
//		}  
    }
}
//timer = setTimeout('ferrari()', 1000); clearTimeout(timer);
function help_cpuflow()
{
	cpuflow();
        return 0; //bez tego returna po pierwszym secie kolejne z automatu
}
function cpuhelp()
{
	return 0;
}
function loophelp()
{
	timer = setTimeout('cpuhelp', 20); 
	clearTimeout(timer);
	if(time_flow()==1)
	{
		cpuflow();
		return 0;
	}
	else
	{
		return 1;
	}
}

function goo()
{
	push = 1;
}

function init()
{
	//document.write(team1, team2);
	document.getElementById("show1").innerHTML = 0;
	document.getElementById("show2").innerHTML = 0;
	pkt1 = 0, pkt2 = 0;
	mm1 = 0; mm2 = 0;
	var los = Math.floor(Math.random() * 100 + 1);//losowanie kto pierwszy serwuje
	if(los<50)
	{
		init1();   //zainicjowanie//seruje dr po lewej
	}
	else
	{
		init2();   //zainicjowanie//seruje dr po prawej
	}
    
}

function init1()
{
	document.getElementById("show1").innerHTML = 0;
	document.getElementById("show2").innerHTML = 0;
        document.getElementById("change_info1").innerHTML = "";
        document.getElementById("change_info2").innerHTML = "";
	pkt1 = 0, pkt2 = 0;
    a = akcja1();   //zainicjowanie//seruje dr po lewej
	push = 0;
	cpuLoop();
}
function init2()
{
	document.getElementById("show1").innerHTML = 0;
	document.getElementById("show2").innerHTML = 0;
        document.getElementById("change_info1").innerHTML = "";
        document.getElementById("change_info2").innerHTML = "";
	pkt1 = 0, pkt2 = 0;
    a = akcja2();   //zainicjowanie//seruje dr po lewej
	push = 0;
	cpuLoop();
}

function init_save_ustawienie(adr)
{
    if(adr == 1)
    {
        for(i = 1; i <=12; i++)
        {
            init_ustawienie1[i] = team1[i][2];           
        }
        //alert("Zapis:"+init_ustawienie1);
    }
    else
    {
        for(i = 1; i <=12; i++)
        {
            init_ustawienie2[i] = team2[i][2];           
        }
        //alert("Zapis:"+init_ustawienie2);
    }
}

function init_load_ustawienie(adr)
{
    if(adr == 1)
    {
        for(i = 1; i <=12; i++)
        {
            if(team1[i][2] != init_ustawienie1[i])//trzeba znaleźć gracza o potrzebnym indeksie i wstawić go
            {
                for(j = 1; j <=12; j++)
                {
                    if(team1[j][2] == init_ustawienie1[i])
                    {
                        chan1(j,i);//alert("chan1-in:"+team1[j][5]);
                    }
                }
            }
        }
        var scr = "LOAD: ";
        for(i = 1; i <=12; i++)
        {
            scr = scr + team1[i][5]+",";
        }
        //alert(scr);
        if(document.getElementById("tres1").checked)przejscie1_rotuj();
        ustawienie();
	banch_ins();
    }
    else if(adr == 2)
    {
        for(i = 1; i <=12; i++)
        {
            if(team2[i][2] != init_ustawienie2[i])//trzeba znaleźć gracza o potrzebnym indeksie i wstawić go
            {
                for(j = 1; j <=12; j++)
                {
                    if(team2[j][2] == init_ustawienie2[i])
                    {
                        chan2(j,i);//alert("chan1-in:"+team2[j][5]);
                    }
                }
            }
        }
        var scr = "LOAD: ";
        for(i = 1; i <=12; i++)
        {
            scr = scr + team2[i][5]+",";
        }
        //alert(scr);
        if(document.getElementById("tres2").checked)przejscie2_rotuj();
        ustawienie();
	banch_ins();
    }
    
}

//Activated by 'Start' button on 'plansza.php'
//Init the first action of the match
function init_break(par)
{
	//document.write(team1, team2);
	document.getElementById("show1").innerHTML = 0;
	document.getElementById("show2").innerHTML = 0;
        //document.getElementById("button_start").innerHTML = 0;
        document.getElementById("button_start").style.visibility = "hidden";
        document.getElementById("button_1action_init").style.visibility = "hidden";
	pkt1 = 0, pkt2 = 0;
	pkt1s = 0; pkt2s = 0;
	mm1 = 0; mm2 = 0;
	flag_star=1;
	wyk1 = 50;
	wyk2 = 50;
	//host_give(1);
	var los = Math.floor(Math.random() * 100 + 1);//losowanie kto pierwszy serwuje
	if(los<50)
	{

                init1_break();   //zainicjowanie//seruje dr po lewej
                serv_first = 1;
                var element = document.getElementById("l1"); element.classList.add("serve_squere");
	}
	else
	{

                init2_break();   //zainicjowanie//seruje dr po prawej
                serv_first = 2;
                var element = document.getElementById("r1"); element.classList.add("serve_squere");
	}
        
        if(par == 1)
        {
            time=1;
        }
}

function init1_break()
{
//	document.getElementById("show1").innerHTML = 0;
//	document.getElementById("show2").innerHTML = 0;
//        document.getElementById("change_info1").innerHTML = "";
//        document.getElementById("change_info2").innerHTML = "";
        pkt1 = 0, pkt2 = 0; 
	host_give(1); flag_host=0; flag_zm_zag1=0; flag_zm_zag2=0;
        //2021-01-14 zakomentowano i funkcjonalość przeniesiono do action_break do 'slepej' akcji
	/*if(document.getElementById("tres1").checked)//czy zaznaczony trener - przechodzi tu na pocz każdego seta
	{
		if((mm1+mm2)==2&&(pkt2s/pkt1s)<=0.8)
		{
			optim_zm_ogr_young(1)
		}
		else
		{
			optimal_compos_zm_begin(1);
		}
	}
	if(document.getElementById("tres2").checked)//czy zaznaczony trener przechodzi tu na pocz każdego seta
	{
		if((mm1+mm2)==2&&(pkt1s/pkt2s)<=0.8)
		{
			optim_zm_ogr_young(2)
		}
		else
		{
			optimal_compos_zm_begin(2);
		}
	}*/
	if(flag_wyr1==1)
	{
		wyrownacz_give(1);
		flag_wyr1=0;
	}
	if(flag_wyr2==1)
	{
		wyrownacz_give(2);
		flag_wyr2=0;
	}
    a = 1;przejscie = 2;ustawienie();
	cpuflow();
}
function init2_break()
{
//	document.getElementById("show1").innerHTML = 0;
//	document.getElementById("show2").innerHTML = 0;
//        document.getElementById("change_info1").innerHTML = "";
//        document.getElementById("change_info2").innerHTML = "";
        pkt1 = 0, pkt2 = 0; 
	host_give(1);flag_host=0;flag_zm_zag1=0;flag_zm_zag2=0;
        //2021-01-14 zakomentowano i funkcjonalość przeniesiono do action_break do 'slepej' akcji
	/*if(document.getElementById("tres1").checked)
	{
		if((mm1+mm2)==2&&(pkt2s/pkt1s)<=0.85)
		{
			optim_zm_ogr_young(1)
		}
		else
		{
			optimal_compos_zm_begin(1);
		}
	}
	if(document.getElementById("tres2").checked)
	{
		if((mm1+mm2)==2&&(pkt1s/pkt2s)<=0.85)
		{
			optim_zm_ogr_young(2)
		}
		else
		{
			optimal_compos_zm_begin(2);
		}
	}*/
	if(flag_wyr1==1)
	{
		wyrownacz_give(1);
		flag_wyr1=0;
	}
	if(flag_wyr2==1)
	{
		wyrownacz_give(2);
		flag_wyr2=0;
	}
    a = 2;przejscie = 1;ustawienie();
	cpuflow();
}


function action()
{		
		if(a == 1) //punkt po lewej
		{
			a = akcja1();		//wynik akcji zaczetej po lewej - jesli kolejny punkt - a=1 to nie ma przejscia
			if(a == 2)
			{                       //jesli druzyna po prawej zdobyla punkt to robi przejscie
				przejscie2();
			}
		}
		else if(a == 2)
		{
			a = akcja2();		//wynik akcji zaczetej po prawej - jesli kolejny punkt - a=1 to nie ma przejscia
			if(a == 1)
			{
				przejscie1();
			}
		}
		
		if(mm1 == 2 && mm2 == 2)//tie-break
		{
                    if(wyniki(3) == 0)//koniec seta
                    {
			if(pkt1 > pkt2)
			{
				mm1++;
			}
			else
			{
				mm2++;	
			}
			document.getElementById("set1").innerHTML = mm1;
			document.getElementById("set2").innerHTML = mm2;
                        m_res = m_res+", "+pkt1+":"+pkt2;
			m_res = mm1+":"+mm2+" "+m_res+")";
			alert("Tie-break:"+pkt1+":"+pkt2+" KONIEC MECZU: "+mm1+" : "+mm2);
                        document.getElementById("tablica_wyn_sety").innerHTML = m_res;
			m_res="";
			//koniec meczu - zapis do tabeli
			tum1 = document.getElementById("idteam1").innerHTML;
			tum2 = document.getElementById("idteam2").innerHTML;
                        //2021-01-13 - omijamy dla 1 mecz
                        if(!play_1mecz)
                        {
                            act_table(mm1,mm2,tum1,tum2,0,0,0);
                        }
			pkt1=0;pkt2=0;push = 0;
			return 0;
                    }
		}
		else
		{
			if(wyniki(9) == 0)//koniec seta
			{
				if(pkt1 > pkt2)
				{
					mm1++;
				}
				else
				{
					mm2++;	
				}
                        if((mm1+mm2)==1)
			{
				m_res = "("+pkt1+":"+pkt2;
			}
			else
			{
				m_res = m_res+", "+pkt1+":"+pkt2;
			}
			document.getElementById("set1").innerHTML = mm1;
			document.getElementById("set2").innerHTML = mm2;
                        alert(" KONIEC SETA: "+m_res);
                        document.getElementById("tablica_wyn_sety").innerHTML = m_res;
			//alert(pkt1+":"+pkt2);//KONIEC SETA
			
					if(mm1 == 3 || mm2 == 3)//koniec meczu
					{
						tum1 = document.getElementById("idteam1").innerHTML;
						tum2 = document.getElementById("idteam2").innerHTML;
                                                //2021-01-13 - omijamy dla 1 mecz
                                                if(!play_1mecz)
                                                {
                                                    act_table(mm1,mm2,tum1,tum2,0,0,0);
                                                }
                                                m_res = mm1+":"+mm2+" "+m_res+")";
						alert(" KONIEC MECZU: "+m_res);
                                                document.getElementById("tablica_wyn_sety").innerHTML = m_res;
						//alert(" KONIEC MECZU: "+mm1+" : "+mm2);
						pkt1=0;pkt2=0;push = 0;
						return 0;
					}
			
			init2();
			}
		}
		push = 0;
		cpuLoop();
	
}

function action_break()
{		
        //hidden dla okienek do zmian zawodników
        document.getElementById("kwadrat11").innerHTML="";
	document.getElementById("kwadnazw11").innerHTML="";
        document.getElementById("kwadrat22").innerHTML="";
	document.getElementById("kwadnazw22").innerHTML="";
        //disable dla przycisków zmiana
        /*if(time == 1)
        {
            document.getElementById("button_zmiana1").disabled = "";
            document.getElementById("button_zmiana2").disabled = "";
        }
        else
        {
            document.getElementById("button_zmiana1").disabled = "disabled";
            document.getElementById("button_zmiana2").disabled = "disabled";
        }*/
        if((pkt1+pkt2)==0 && slepa == 1)//wejdzie najwczejścniej na początku 2 seta
        {
            document.getElementById("show1").innerHTML = 0;
            document.getElementById("show2").innerHTML = 0;
            document.getElementById("screen1").innerHTML = "";
            document.getElementById("screen2").innerHTML = "";
            element1 = document.getElementById("l1"); element1.classList.remove("serve_squere");
            element2 = document.getElementById("r1"); element2.classList.remove("serve_squere");
            //oznaczenie zagrywającego podkreśleniem nazwiska przy stanie "Zmiany w ustawieniu"
            /*if(serv_first == 1)
            {
                if((mm1+mm2)%2 == 0){element1.classList.add("serve_squere");}else{element2.classList.add("serve_squere");}
            }
            else if(serv_first == 2)
            {
                if((mm1+mm2)%2 == 0){element2.classList.add("serve_squere");}else{element1.classList.add("serve_squere");}
            }*/
            init_load_ustawienie(1);
            init_load_ustawienie(2);
            if(serv_first == 1)
            {
                if((mm1+mm2)%2 == 0)
                {
                    przejscie = 2;
                    document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                    ustawienie();
                    element1.classList.add("serve_squere");element2.classList.remove("serve_squere");                  
                    //init1_break();
                    //return 0;
                }
                else
                {
                    przejscie = 1;
                    document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                    ustawienie();
                    element2.classList.add("serve_squere");element1.classList.remove("serve_squere");
                    //init2_break();
                    //return 0;
                }
            }
            else if(serv_first == 2)
            {
                if((mm1+mm2)%2 == 0)
                {
                    przejscie = 1;
                    document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                    ustawienie();
                    element2.classList.add("serve_squere");element1.classList.remove("serve_squere");
                    //init2_break();
                    //return 0;
                }
                else
                {
                    przejscie = 2;
                    document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                    ustawienie();
                    element1.classList.add("serve_squere");element2.classList.remove("serve_squere");
                    //init1_break();
                    //return 0;
                }
            }
            document.getElementById("change_info1").innerHTML = "<br>Zmiany w ustawieniu:";
            document.getElementById("change_info2").innerHTML = "<br>Zmiany w ustawieniu:";
            zeruj_changes();
            suma1 = 0;suma2 = 0;
            flag_golden1 = 0; flag_golden2 = 0;
            //dodać omijanie funkcji dla drużyny, która wygrała ostatniego seta
            if(document.getElementById("tres1").checked && mm_prev == 2)// //czy zaznaczony trener - przechodzi tu na pocz każdego seta
            {
                optimal_compos_zm_begin(1);//alert("robie op_begin_1");
            }
            if(document.getElementById("tres2").checked && mm_prev == 1)// //czy zaznaczony trener przechodzi tu na pocz każdego seta
            {
                optimal_compos_zm_begin(2);//alert("robie op_begin_2");
            }
            slepa=0;
            time=1;
        }
        else if(po_akcji == 0)
        {
		if(a == 1) //punkt po lewej
		{
			a = akcja1();		//wynik akcji zaczetej po lewej - jesli kolejny punkt - a=1 to nie ma przejscia
			if(a == 2)
			{					//jesli druzyna po prawej zdobyla punkt to robi przejscie
				po_akcji = 1; //przejs2_mem = 1;//przejscie2();
			}
		}
		else if(a == 2)
		{
			a = akcja2();		//wynik akcji zaczetej po prawej - jesli kolejny punkt - a=1 to nie ma przejscia
			if(a == 1)
			{
				po_akcji = 1; //przejs1_mem = 1;//przejscie1();
			}
		}
		if(mm1 == 2 && mm2 == 2)//tie-break
		{
			if(wyniki_czy_set_skonczony(3) == 1)//koniec seta
			{
			if(pkt1 > pkt2)
			{
				mm1++;
			}
			else
			{
				mm2++;	
			}
			document.getElementById("set1").innerHTML = mm1;
			document.getElementById("set2").innerHTML = mm2;
			//koniec meczu - zapis do tabeli
                        //2021-01-15 omijanie dla _1mecz, bo usunięto te divy
                        if(!play_1mecz)
                        {
			tum1 = document.getElementById("idteam1").innerHTML;
			tum2 = document.getElementById("idteam2").innerHTML;
			var kkk = document.getElementById("kolejka").innerHTML;
			var liga = document.getElementById("liga").innerHTML;
                        }
			m_res = m_res+", "+pkt1+":"+pkt2;
			pkt1s+=pkt1;pkt2s+=pkt2;
			m_res = mm1+":"+mm2+" "+m_res+")";
			
			flag_star=0;
if(flag_wyr1==1){wyrownacz_give(1);transpa();flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);transpa();flag_wyr2=0;}
                        //2021-01-13 - omijamy dla 1 mecz
                        if(!play_1mecz)
                        {
                            act_table(mm1,mm2,tum1,tum2,kkk,m_res,0,0,liga,pkt1s,pkt2s);
                        }
                        //alert("Tie-break:"+pkt1+":"+pkt2+" KONIEC MECZU: "+mm1+" : "+mm2);
                        time=1;
                        document.getElementById("tablica_wyn_sety").innerHTML = m_res;
			m_res="";
			pkt1=0;pkt2=0;time=1;push=0;
			//clearTimeout(atime);
			return 0;
			}//koniec IF - koniec seta po tie-break
		}
		else //wynik liczony do 25 - NIE tie-break
		{
                    if(wyniki_czy_set_skonczony(9) == 1)//koniec seta
                    {
                        if(pkt1 > pkt2)
                        {
                                mm1++;
                        }
                        else
                        {
                                mm2++;	
                        }
								
			document.getElementById("set1").innerHTML = mm1;
			document.getElementById("set2").innerHTML = mm2;
			if((mm1+mm2)==1)
			{
				m_res = "("+pkt1+":"+pkt2;
			}
			else
			{
				m_res = m_res+", "+pkt1+":"+pkt2;
			}
			pkt1s+=pkt1; pkt2s+=pkt2;
			if(mm1 < 3 & mm2 < 3)
                        {
                            //alert(" KONIEC SETA: "+m_res);
                            //przejście na koniec seta, po ostatniej akcji
                            //if(przejs2_mem == 1){przejscie2();po_akcji = 0;/*var element = document.getElementById("r1"); element.classList.remove("serve_squere");*/}
                            //if(przejs1_mem == 1){przejscie1();po_akcji = 0;/*var element = document.getElementById("l1"); element.classList.remove("serve_squere");*/}
                            po_akcji = 0;
                            if(pkt1>pkt2)mm_prev = 1;else mm_prev = 2;//alert("mm_prev:"+mm_prev);//do użycia z optimal_compos_zm_begin
                            time=1;
                            slepa=1;
                            document.getElementById("tablica_wyn_sety").innerHTML = m_res;
                        }
			//clearTimeout(atime);
					if(mm1 > 2 || mm2 > 2)//koniec meczu
					{
					//document.write("jestem");
                                                //2021-01-15 omijanie dla _1mecz, bo usunięto te divy
                                                if(!play_1mecz)
                                                {
						tum1 = document.getElementById("idteam1").innerHTML;
						tum2 = document.getElementById("idteam2").innerHTML;
						var kkk = document.getElementById("kolejka").innerHTML;
						var liga = document.getElementById("liga").innerHTML;
                                                }
						m_res = mm1+":"+mm2+" "+m_res+")";
if(flag_wyr1==1){wyrownacz_give(1);transpa();flag_wyr1=0;}if(flag_wyr2==1){wyrownacz_give(2);transpa();flag_wyr2=0;}
						//alert(" KONIEC MECZU: "+m_res);
                                                time=1;
                                                document.getElementById("tablica_wyn_sety").innerHTML = m_res;
						flag_star=0;
                                                //2021-01-13 - omijamy dla 1 mecz
                                                if(!play_1mecz)
                                                {
                                                    act_table(mm1,mm2,tum1,tum2,kkk,m_res,0,0,liga,pkt1s,pkt2s);
                                                }
						m_res="";
						//document.getElementById("screen5").innerHTML = "jestem2";
						
						//pkt1=0;pkt2=0;time=1;push=0;
						//clearTimeout(atime);
                                                return 0;
					}
                                //Przerobić na bieżącą wersje a potem dostosować do '1mecz'
				/*var los = Math.floor(Math.random() * 100 + 1);
				if(los<50)
				{
					init1_break();   //zainicjowanie//seruje dr po lewej
					return 0;
				}
				else
				{
					init2_break();   //zainicjowanie//seruje dr po prawej
					return 0;
				}*/
                                if(serv_first == 1)
                                {
                                    if((mm1+mm2)%2 == 0)
                                    {
                                        //przejscie = 2;
                                        //document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                                        //ustawienie();
                                        init1_break();
                                        return 0;
                                    }
                                    else
                                    {
                                        //przejscie = 1;
                                        //document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                                        //ustawienie();
                                        init2_break();
                                        return 0;
                                    }
                                }
                                else if(serv_first == 2)
                                {
                                    if((mm1+mm2)%2 == 0)
                                    {
                                        //przejscie = 1;
                                        //document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                                        //ustawienie();
                                        init2_break();
                                        return 0;
                                    }
                                    else
                                    {
                                        //przejscie = 2;
                                        //document.getElementById("asy_serw1").innerHTML = "Przejście: "+przejscie+" ,a: "+a;
                                        //ustawienie();
                                        init1_break();
                                        return 0;
                                    }
                                }
				//pkt1 = 0, pkt2 = 0;
    			//a = akcja1();
                    }//koniec IF koniec seta
		} //koniec ELSE nie tie-break
		//cpuflow();
        }   //koniec slepa 
        else if(po_akcji == 1)
        {
            if(a == 2)
            {					
                    przejscie2();
                    var element = document.getElementById("r1"); element.classList.add("serve_squere");
                    var element = document.getElementById("l1"); element.classList.remove("serve_squere");
            }
            if(a == 1)
            {
                    przejscie1();
                    var element = document.getElementById("l1"); element.classList.add("serve_squere");
                    var element = document.getElementById("r1"); element.classList.remove("serve_squere");
            }
            document.getElementById("screen1").innerHTML = "";
            document.getElementById("screen2").innerHTML = "";
            po_akcji = 0;
            wyniki_po_przejsciu();
        }
        if((pkt1+pkt2)==1)
        {
            document.getElementById("change_info1").innerHTML = "";
            document.getElementById("change_info2").innerHTML = "";
            init_save_ustawienie(1);
            init_save_ustawienie(2);
        }

}

//TUTAJ PODZIELIĆ NA 2 PLIKI

function akcja2()
{
	po = spr_przyjecie1();
	z = zagrywka2(po);
	if(z == "as")
	{ 
		przyjecie1(0, 1)
		wyniki(2);
		return 2;
	}
	if(z == "zeps")
	{ 
		pkt_par = 0;
		wyniki(1);
		return 1;
	} 
	
	scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
	
	//console.time("przyjecie1") ;
	prz = przyjecie1(z, 0);
	//console.timeEnd("przyjecie1") ;	
	find_leaders();
	
	while(1)
	{
		
		//console.time("rozegranie_atak1") ;
		pra = rozegranie_atak_1(prz);
		//console.timeEnd("rozegranie_atak1") ;
		blok = blok2(pra)
		scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		if(parseInt(blok) < 1)
		{
									//PONOWIENIE !!! (obrona + rozegranie + atak<kontra>blok) - zalezne od pra nabitego na blok
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					obr = obrona1(blok, pra);
					scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br /><br />";
					if(obr == "niema")
					{	
						pkt_par = 0;
						wyniki(2);
						return 2;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
						scr = document.getElementById("screen1").innerHTML;
						document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
					}
					else//obrona skuteczna
					{
						//document.getElementById("screen2").innerHTML = "ponawia druzyna po lewej ";
									 //blad potrzebny blok wart!!!// np 0.25 <0-100>//blok przeciwników - lepszy - gorsze przyk=>obr
									//obrona nasza - lepsza, to lepsze przyjecie np 62 verbov
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
						scr = document.getElementById("screen1").innerHTML;
						document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
					}
					
					pra = rozegranie_atak_1(prz);
					blok = blok2(pra);
					scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					
				}
		  }
		if(blok == "jest")	//blok skuteczny punkt (lewa-1)
		{ 
			wyniki(2);
			return 2;
		}
		else if(blok == "aut")	//blok skuteczny punkt (lewa-1)
		{ 
			pkt_par = 0;
			wyniki(2);
			return 2;
		}
		else			//blok nieskuteczny
		{
			//console.time("obrona2") ;
			obr = obrona2(blok, pra);
			//console.timeEnd("obrona2") ;
			scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br /><br />";
			if(obr == "niema")
			{	
				wyniki(1);
				return 1;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
				scr = document.getElementById("screen2").innerHTML;
				document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
				scr = document.getElementById("screen2").innerHTML;
				document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
			}
		} 
		pra = rozegranie_atak_2(prz);
		blok = blok1(pra)
		scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
		
		if(parseInt(blok) <  1)
		{							//!!! Ponowienie
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					//pra skombinować
					obr = obrona2(blok, pra);
					scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br /><br />";
					if(obr == "niema")
					{	
						pkt_par = 0;
						wyniki(1);
						return 1;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
						scr = document.getElementById("screen2").innerHTML;
						document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
					}
					else//obrona skuteczna
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
				
						scr = document.getElementById("screen2").innerHTML;
						document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
					}
					
					pra = rozegranie_atak_2(prz);
					blok = blok1(pra);
					scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
					
				}
		  }
		if(blok == "jest")	//blok skuteczny punkt (lewa-1)
		{ 
			wyniki(1);
			return 1;
		}
		else if(blok == "aut")	//blok skuteczny punkt (lewa-1)
		{ 
			pkt_par = 0;
			wyniki(1);
			return 1;
		}
		else			//blok nieskuteczny
		{
			obr = obrona1(blok, pra);
			scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br /><br />";
			if(obr == "niema")
			{	
				wyniki(2);
				return 2;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
				scr = document.getElementById("screen1").innerHTML;
				document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
				scr = document.getElementById("screen1").innerHTML;
				document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
			}
		}
	}	
}

function akcja1()
{
	po = spr_przyjecie2();
	z = zagrywka1(po);
	if(z == "as")
	{ 
		przyjecie2(0, 1);
		wyniki(1);
		return 1;
	}
	if(z == "zeps")
	{ 
		pkt_par = 0;
		wyniki(2);
		return 2;
	}
	
	scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
	
	//console.time("przyjecie2");
	prz = przyjecie2(z, 0);
	//console.timeEnd("przyjecie2");
	
	//console.time("find lider");	
	find_leaders();
	//console.timeEnd("find lider");
	
	while(1)
	{
		//console.time("rozegranie_atak2");
		pra = rozegranie_atak_2(prz);
		//console.timeEnd("rozegranie_atak2") ;
		//console.time("blok1") ;
		blok = blok1(pra);
		//console.timeEnd("blok1") ;
		scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
		if(parseInt(blok) < 1)
		{		
							//!!! Ponowienie
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					//pra skombinować
					obr = obrona2(blok, pra);
					scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br/><br />";
					if(obr == "niema")
					{
						pkt_par = 0;	
						wyniki(1);
						return 1;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
						scr = document.getElementById("screen2").innerHTML;
						document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
					}
					else//obrona skuteczna
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
						
						scr = document.getElementById("screen2").innerHTML;
						document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
					}
					
					pra = rozegranie_atak_2(prz);
					blok = blok1(pra);			//blad!!!
					scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
					
				}
		  }
		if(blok == "jest")	//blok skuteczny punkt (lewa-1)
		{ 
			pkt_par = 0; //nie ma punktu z ataku
			wyniki(1);
			return 1;
		}
		else if(blok == "aut")	//blok skuteczny punkt (lewa-1)
		{ 
			pkt_par = 0;
			wyniki(1);
			return 1;
		}
		else			//blok nieskuteczny
		{
			//console.time("obrona1") ;
			obr = obrona1(blok, pra);
			//console.timeEnd("obrona1") ;
			scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br /><br />";
			if(obr == "niema")
			{	
				wyniki(2);
				return 2;
			}
			else if(parseFloat(obr) < 1)//broni rozgrywajacy
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
				scr = document.getElementById("screen1").innerHTML;
				document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
				scr = document.getElementById("screen1").innerHTML;
				document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
			}
		} 
		pra = rozegranie_atak_1(prz);
		blok = blok2(pra);
		scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		
		if(parseInt(blok) < 1)
		{							//PONOWIENIE !!!
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					//pra skombinować
					obr = obrona1(blok, pra);
					scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br /><br />";
					if(obr == "niema")
					{	
						pkt_par = 0;
						wyniki(2);
						return 2;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
						scr = document.getElementById("screen1").innerHTML;
						document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
					}
					else//obrona skuteczna
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
						
						scr = document.getElementById("screen1").innerHTML;
						document.getElementById("screen1").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
					}
					
					pra = rozegranie_atak_1(prz);
					blok = blok2(pra);
					scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					
				}
		  }
		if(blok == "jest")	//blok skuteczny punkt (lewa-1)
		{ 
			wyniki(2);
			return 2;
		}
		else if(blok == "aut")	//blok skuteczny punkt (lewa-1)
		{ 
			pkt_par = 0;
			wyniki(2);
			return 2;
		}		
		else			//blok nieskuteczny
		{
			obr = obrona2(blok, pra);
			scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br /><br />";
			if(obr == "niema")
			{	
				wyniki(1);
				return 1;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69; //jakosc przyjecia po obronie
				scr = document.getElementById("screen2").innerHTML;
				document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
				scr = document.getElementById("screen2").innerHTML;
				document.getElementById("screen2").innerHTML =scr+ " - jakość: "+Math.round(prz * 80)/1+"%<br/>";	
			}
		}
	}
}

function przyjecie1(z, as)
{	
	happy = 0;	
	var los = Math.floor(Math.random() * 100 + 1); //losowanie
	//document.getElementById("screen3").innerHTML = los;
        //document.getElementById("input_screen3").value = los;
	
	if(document.getElementById("tktz2.1").checked) //brak taktyki
	{
		if(los<=2) {happy = "S";}				//2 	srodkowy ale na razie nie wiadomo ktory(1 linia)
		if(2<los && los<=26) {happy = "PA";} 	//24
		if(26<los && los<=60) happy = "PP";		//34
		if(60<los) happy = 7;					//40 ten index ma zawsze libero
	}
	else if(document.getElementById("tktz2.2").checked)//taktyka na libero
	{
		if(los<=2) {happy = "S";}				//2
		if(2<los && los<=18) {happy = "PA";}	//14
		if(18<los && los<=40) happy = "PP";		//24
		if(40<los) happy = 7;					//60		ten index ma zawsze libero
	}
	else if(document.getElementById("tktz2.3").checked)//5 - zaznaczony//
	{
		if(team1[2][7] <= team1[5][7])//5 ma lepsz przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=19) {happy = 2;}	//17
			if(19<los && los<=70) happy = 5;	//51
			if(70<los) happy = 7;				//30
		}
		else							//5 ma gorsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=48) {happy = 5;}	//46
			if(48<los && los<=69) happy = 2;	//21
			if(69<los) happy = 7;				//31
		}
					//ten index ma zawsze libero
	}
	else if(document.getElementById("tktz2.4").checked)//2//zaznaczony
	{
		if(team1[2][7] >= team1[5][7])//2 ma lepsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=19) {happy = 5;}	//17
			if(19<los && los<=70) happy = 2;	//51
			if(70<los) happy = 7;				//30
		}
		else							//2 ma gorsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=48) {happy = 2;}	//46
			if(48<los && los<=69) happy = 5;	//21
			if(69<los) happy = 7;				//31
		}			//ten index ma zawsze libero
	}
	
	
	
	if(happy == "S")//ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
		for(i=1;i<=6;i++)
		{
			if((team1[i][0] == 2 || team1[i][0] == 3 ||team1[i][0] == 4) && team1[i][4] == "S")
			{
				par = team1[i][7];
				nazw = team1[i][5];
				iss = i;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}	
		}
	}
	else if(happy == "PA")//przyjmuje przyjmujacy z gorszym przyjeciem
	{	
			if(team1[2][7] <= team1[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][7];
				nazw = team1[2][5];
				iss = 2;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
				
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][7];
				nazw = team1[5][5];
				iss = 5;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
				document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}	
	}
	else if(happy == "PP")//przyjmuje przyjmujacy z lepszym przyjeciem
	{	
			if(team1[2][7] > team1[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][7];
				nazw = team1[2][5];
				iss = 2;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
				
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][7];
				nazw = team1[5][5];
				iss = 5;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
				document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}	
	}
	else
	{
		par = team1[happy][7];
		nazw = team1[happy][5];
		iss = happy;
		flag_lib=1;
		scr = document.getElementById("screen1").innerHTML;
		//document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                document.getElementById("screen1").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			
	}
		if(as == 1)
		{
			team1[iss][20]++;
			wagaa = (team1[iss][20]-1)/team1[iss][20];
			wagab = 1 - wagaa;
			team1[iss][19] = Math.round(team1[iss][19]*wagaa + 0*wagab);
			document.getElementById("screen1").innerHTML = "";
			return 0;
		}
		
		/*var los = Math.floor(Math.random() * 100 + 1);//losowanie 0..100
		
		if(as == 1)
		{
			team1[iss][20]++;
			wagaa = (team1[iss][20]-1)/team1[iss][20];
			wagab = 1 - wagaa;
			team1[iss][19] = Math.round(team1[iss][19]*wagaa + 0*wagab);
			document.getElementById("screen1").innerHTML = "";
			return 0;
		}*/
		
		prz = par/z; if(prz>1.2)prz=1.2; //jakosc przyjecia
		prz_st = 100*zaokr(prz*0.66);
		team1[iss][20]++;
		wagaa = (team1[iss][20]-1)/team1[iss][20];
		wagab = 1 - wagaa;
		team1[iss][19] = Math.round(team1[iss][19]*wagaa + prz_st*wagab);
		scr = document.getElementById("screen1").innerHTML;
		document.getElementById("screen1").innerHTML =scr+ "- jakość: "+Math.round(prz_st * 100)/100+"%<br />";//+" wa:"+wagaa+" wb:"+wagab
		scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
		return prz;
}

function przyjecie2(z, as)
{	
	var happy = 0;	
	var los = Math.floor(Math.random() * 100 + 1); //losowanie
	
	if(document.getElementById("tktz1.1").checked) //brak taktyki
	{
		if(los<=2) {happy = "S";}				//2 	srodkowy ale na razie nie wiadomo ktory(1 linia)
		if(2<los && los<=26) {happy = "PA";} 	//24
		if(26<los && los<=60) happy = "PP";		//34
		if(60<los) happy = 7;					//40 ten index ma zawsze libero
	}
	else if(document.getElementById("tktz1.2").checked)//taktyka na libero
	{
		if(los<=2) {happy = "S";}				//2
		if(2<los && los<=18) {happy = "PA";}	//14
		if(18<los && los<=40) happy = "PP";		//24
		if(40<los) happy = 7;					//60		ten index ma zawsze libero
	}
	else if(document.getElementById("tktz1.3").checked)//5 - zaznaczony//
	{
		if(team2[2][7] <= team2[5][7])//5 ma lepsz przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=19) {happy = 2;}	//17
			if(19<los && los<=70) happy = 5;	//51
			if(70<los) happy = 7;				//30
		}
		else							//5 ma gorsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=48) {happy = 5;}	//46
			if(48<los && los<=69) happy = 2;	//21
			if(69<los) happy = 7;				//31
		}
					//ten index ma zawsze libero
	}
	else if(document.getElementById("tktz1.4").checked)//2//zaznaczony
	{
		if(team2[2][7] >= team2[5][7])//2 ma lepsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=19) {happy = 5;}	//17
			if(19<los && los<=70) happy = 2;	//51
			if(70<los) happy = 7;				//30
		}
		else							//2 ma gorsze przyjecie
		{
			if(los<=2) {happy = "S";}			//2
			if(2<los && los<=48) {happy = 2;}	//46
			if(48<los && los<=69) happy = 5;	//21
			if(69<los) happy = 7;				//31
		}			//ten index ma zawsze libero
	}
	
	switch(happy)
	{
	case "S":
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if((team2[i][0] == 2 || team2[i][0] == 3 ||team2[i][0] == 4) && team2[i][4] == "S")
			{
				par = team2[i][7];
				nazw = team2[i][5];
				iss = i;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}	
		}
	break;
	}
	case "PA":
	{	
			if(team2[2][7] <= team2[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[2][7];
				nazw = team2[2][5];
				iss = 2;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[5][7];
				nazw = team2[5][5];
				iss = 5;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}
	break;	
	}
	case "PP":
	{	
			if(team2[2][7] > team2[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[2][7];
				nazw = team2[2][5];
				iss = 2;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[5][7];
				nazw = team2[5][5];
				iss = 5;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
			}	
	break;
	}
	default:
	{
		par = team2[happy][7];
		nazw = team2[happy][5];
		iss = happy;
		flag_lib=1;
		scr = document.getElementById("screen2").innerHTML;
		//document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+"("+par+") ";
                document.getElementById("screen2").innerHTML = scr + "Przyjmuje: "+nazw+" ";
	}
	}
		if(as == 1)
		{
			team2[iss][20]++;
			wagaa = (team2[iss][20]-1)/team2[iss][20];
			wagab = 1 - wagaa;
			team2[iss][19] = Math.round(team2[iss][19]*wagaa + 0*wagab);
			document.getElementById("screen2").innerHTML = "";
			//document.getElementById("screen2").innerHTML =scr+" Nie przyjął"+"<br/>";
			//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
			return 0;
		}
		prz = zaokr(par/z); if(prz>1.2)prz=1.2; //jakosc przyjecia
		prz_st = 100*zaokr(prz*0.66);
		team2[iss][20]++;
		wagaa = (team2[iss][20]-1)/team2[iss][20];
		wagab = 1 - wagaa;
		team2[iss][19] = Math.round(team2[iss][19]*wagaa + prz_st*wagab);
		scr = document.getElementById("screen2").innerHTML;
		document.getElementById("screen2").innerHTML =scr+"- jakość: "+Math.round(prz_st * 100)/100+"%<br/>";
		scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		return prz;
}


function zagrywka2(po)
{
	document.getElementById("screen1").innerHTML = "";
	document.getElementById("screen2").innerHTML = "";
	for(i=1;i<=6;i++) //poszukiwanie zaw który znajduje sie na pozycji nr 1
	{
		if(team2[i][0] == 1)
		{
			zawodnik = team2[i][5];
			par = team2[i][8];
			pkt_zag = i;
		}
	}
	shot = zaokr(par/po);
	if(shot>2.11) shot = 2.11;
	unshot = zaokr(1/shot);
	
	var y = (-9)*parseInt(shot) + 19;
	var los_a = Math.floor(Math.random() * 100 * y + 1); //losowanie pr asa
	
	var y = (-9)*parseInt(unshot) + 19;
	var los_z = Math.floor(Math.random() * 100 * y + 1);//losowanie pr zeps
	
		if(los_a < par)
		{
			//scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" ("+par+")Skut:" + shot+"%, As serwisowy!<br/>";
                        //document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +". As serwisowy!<br/>";
                        document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+". As serwisowy!<br/>";
			team2[pkt_zag][25]++;
			team2[pkt_zag][21]++;
			return "as";
		}
		else if(los_z < (200 - par))
		{
			//scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" ("+par+")Skut:" + shot+"%, Zepsuta zagr.<br/>"; 
                        //document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +". Zepsuta zagrywka.<br/>";
                        document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+". Zepsuta zagrywka.<br/>";
			team2[pkt_zag][22]++;
			return "zeps";
		}
		else
		{
			//scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" ("+par+")Skut:" + shot+"%<br/>";
                        //document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +"<br/>";
                        document.getElementById("screen2").innerHTML ="Zagrywa: "+zawodnik+"<br/>";
		}
	
	
	return par; //parametr zagrywka aktualnie zagrywajacego
}

function spr_przyjecie1()//do oceny możliwości asa
{
	 //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
	sr = (parseInt(team1[2][7])+parseInt(team1[5][7])+parseInt(team1[7][7]))/3;
	sr = zaokr(sr);
	//document.getElementById("screen1").innerHTML = "Jakość prz:("+sr+"),";
	return sr;	
}

function zagrywka1(po)
{
	document.getElementById("screen1").innerHTML = "";
	document.getElementById("screen2").innerHTML = "";
	for(i=1;i<=6;i++) //poszukiwanie zaw który znajduje sie na pozycji nr 1
	{
		if(team1[i][0] == 1)
		{
			zawodnik = team1[i][5];
			par = team1[i][8];
			pkt_zag = i;//
		}							
	}
	shot = zaokr(par/po);
	if(shot>2.11) shot = 2.11;
	unshot = zaokr(1/shot);
	
	var y = (-9)*parseInt(shot) + 19;
	var los_a = Math.floor(Math.random() * 100 * y + 1); //losowanie pr asa
	
	var y = (-9)*parseInt(unshot) + 19;
	var los_z = Math.floor(Math.random() * 100 * y + 1);//losowanie pr zeps
		if(los_a < par)
		{
			//scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" ("+par+") Skut:" + shot+"%, As serwisowy!<br />";
                        //document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +". As serwisowy!<br />";
                        document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+". As serwisowy!<br />";
			team1[pkt_zag][25]++;
			team1[pkt_zag][21]++;
			//punktuj1(pkt_par);
			return "as";
		}
		else if(los_z < (200 - par))
		{
			//scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" ("+par+") Skut:" + shot+"%, Zepsuta zagr.<br />";
                        //document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +". Zepsuta zagrywka<br />";
                        document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+". Zepsuta zagrywka<br />";
			team1[pkt_zag][22]++;	
			return "zeps";
		}
		else
		{
			//scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" ("+par+") Skut:" + shot+"%<br/>";
                        //document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+" - wartość: " + Math.round(shot * 10000) / 100 +"<br/>";
                        document.getElementById("screen1").innerHTML ="Zagrywa: "+zawodnik+"<br/>";
		}
	
	
	return par; //parametr zagrywka aktualnie zagrywajacego
}

function spr_przyjecie2()//do oceny możliwości asa
{
	 //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
	sr = (parseInt(team2[2][7])+parseInt(team2[5][7])+parseInt(team2[7][7]))/3;
	sr = zaokr(sr);
	//document.getElementById("screen2").innerHTML = "Jakość prz:("+sr+"),";
	return sr;	
}

function obrona2(blok, pra)
{
	//pobranie zawodników aktualnie w 2 linii ? + nieblokujacego z 1
	var o1=0,o2=0,o3=0;
	var liberoflag = 0;
	for(i=1;i<=6;i++)
		{
			if(team2[i][0] == 1)
			{
				if(team2[i][4] != "S")
				{
					o1 = team2[i][10];
					o1i = i;
				}
				else if(przejscie == 1) //tzn ze na pozycji nr 1 stoi jeszcze srodkowy
				{
					o1 = team2[i][10];	//libero zawsze na miejscu 7, ale raz go nie ma
					o1i = i;	
				}
				else				//tzn po zagrywce srodkowego, nastapilo przejscie druzyny przeciwnej - ustawienie 
				{					//przejscie na 2 - wchodzi libero
					o1 = team2[7][10];	//libero zawsze na miejscu 7, ale raz go nie ma	
					liberoflag = 1;
					o1i = 7;
				}
			}
			if(team2[i][0] == 5)//srodkowi tez tu są, libero tylko na planszy
			{
				if(team2[i][4] != "S")
				{
					o2 = team2[i][10];
					o2i = i;
				}
				else
				{
					o2 = team2[7][10];
					o2i = 7;
					liberoflag = 2;
				}	
			}
			if(team2[i][0] == 6)
			{
				if(team2[i][4] != "S")
				{
					o3 = team2[i][10];
					o3i = i;
				}
				else
				{
					o3 = team2[7][10];
					o3i = 7;
					liberoflag = 3;
				}		
			}	
		}
		

		//losowanie zawodnka do obrony
			var los = Math.floor(Math.random() * 100 + 1);//losowanie zawodnika do ataku
			//scr = document.getElementById("screen3").innerHTML;
			//document.getElementById("screen3").innerHTML = scr +","+ los;
			if(liberoflag == 1)	//jest libero na '1'
			{
				if(los<=50) {happy = o1i;} //broni libero
				if(50<los && los<=75) {happy = o2i;} //
				if(75<los) {happy = o3i;}						//
			}
			else if(liberoflag == 2)	//jest libero 5
			{
				if(los<=25) {happy = o1i;} // broni '1'
				if(25<los && los<=75) {happy = o2i;} //
				if(75<los) {happy = o3i;}	//broni '6'					//
			}
			else if(liberoflag == 3)	//jest libero 6 
			{
				if(los<=25) {happy = o1i;} //broni libero
				if(25<los && los<=50) {happy = o2i;} //
				if(50<los) {happy = o3i;}						//
			}
			else //nie ma libero
			{
				if(los<=33) {happy = o1i;} //broni libero
				if(33<los && los<=66) {happy = o2i;} //
				if(66<los) {happy = o3i;}						//
			}
			//tutaj w happy mam numer zaw ktory ew. obroni //!!! musze miec atak pomniejszony o blok przez obrone
		
		sumo = parseInt(o1)+parseInt(o2)+parseInt(o3);
		sro = zaokr(sumo/3);
		sro = sro*2.5; //spłaszczenie krzywej bloku
		
		x1 = 500; x2 = 4500;
		y1 = sumo; y2= sro;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_o = zaokr(a*pra + b);
		var reg=1;
		if(team2[13][11])reg=team2[13][11]/100;
		obrona = zaokr(krzyw_o/pra*1000*reg);	//parametr do regulacji wartosci,skutecznosci obrony !!!
		if(obrona<1)obrona=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
		//scr = document.getElementById("screen3").innerHTML;
		//document.getElementById("screen3").innerHTML = scr +","+ los;
		if(los < obrona)
		{
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + "Obrona"+Math.round(sro)+"/"+sumo+": "+" "+Math.round(obrona)+"%";
                        document.getElementById("screen2").innerHTML = scr + "Obrona - szanse: "+Math.round(obrona)+"%";
			
			par = team2[happy][10];
			nazw = team2[happy][5]; //nazwisko
			team2[happy][23]++;
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + ": "+nazw+"("+par+")<br/>";
                        document.getElementById("screen2").innerHTML = scr + " - broni: "+nazw;
			if(happy == 1) //jesli obronil rozgrywajacy to nie moze potem rozgrywac
			{
				return 0+"."+par; //zakodowanie parametru obrony Rozgr
			}
			else
			{
				return par;
			}
		}
		else
		{
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + "Obrona"+Math.round(sro)+"/"+sumo+": "+" "+Math.round(obrona)+"% nieskt<br/>";
                        document.getElementById("screen2").innerHTML = scr + "Obrona - szanse: "+Math.round(obrona)+"% - niesktuteczna<br/>";
			return "niema";
		}
}


function obrona1(blok, pra)
{
	//pobranie zawodników aktualnie w 2 linii ? + nieblokujacego z 1
	var o1=0,o2=0,o3=0;
	var liberoflag = 0;
	for(i=1;i<=6;i++)
		{
			if(team1[i][0] == 1)
			{
				if(team1[i][4] != "S")
				{
					o1 = team1[i][10];
					o1i = i;
				}
				else if(przejscie == 1) //tzn ze na pozycji nr 1 stoi jeszcze srodkowy
				{
					o1 = team1[i][10];	//
					o1i = i;	
				}
				else				//tzn po zagrywce srodkowego, nastapilo przejscie druzyny przeciwnej - ustawienie 
				{					//przejscie na 2 - wchodzi libero
					o1 = team1[7][10];	//libero zawsze na miejscu 7, ale raz go nie ma	
					liberoflag = 1;
					o1i = 7;
				}
			}
			if(team1[i][0] == 5)//srodkowi tez tu są, libero tylko na planszy
			{
				if(team1[i][4] != "S")
				{
					o2 = team1[i][10];
					o2i = i;
				}
				else
				{
					o2 = team1[7][10];
					o2i = 7;
					liberoflag = 2;
				}	
			}
			if(team1[i][0] == 6)
			{
				if(team1[i][4] != "S")
				{
					o3 = team1[i][10];
					o3i = i;
				}
				else
				{
					o3 = team1[7][10];
					o3i = 7;
					liberoflag = 3;
				}		
			}	
		}
		

		//losowanie zawodnka do obrony
			var los = Math.floor(Math.random() * 100 + 1);//losowanie zawodnika do ataku
			//scr = document.getElementById("screen3").innerHTML;
			//document.getElementById("screen3").innerHTML = scr +","+ los;
			if(liberoflag == 1)	//jest libero na '1'
			{
				if(los<=50) {happy = o1i;} //broni libero
				if(50<los && los<=75) {happy = o2i;} //
				if(75<los) {happy = o3i;}						//
			}
			else if(liberoflag == 2)	//jest libero 5
			{
				if(los<=25) {happy = o1i;} // broni '1'
				if(25<los && los<=75) {happy = o2i;} //
				if(75<los) {happy = o3i;}	//broni '6'					//
			}
			else if(liberoflag == 3)	//jest libero 6 
			{
				if(los<=25) {happy = o1i;} //broni libero
				if(25<los && los<=50) {happy = o2i;} //
				if(50<los) {happy = o3i;}						//
			}
			else //nie ma libero
			{
				if(los<=33) {happy = o1i;} //broni libero
				if(33<los && los<=66) {happy = o2i;} //
				if(66<los) {happy = o3i;}						//
			}
			//tutaj w happy mam numer zaw ktory ew. obroni //!!! musze miec atak pomniejszony o blok przez obrone
		
		sumo = parseInt(o1)+parseInt(o2)+parseInt(o3);
		sro = zaokr(sumo/3);
		sro = sro*2.5; //spłaszczenie krzywej obrony
		
		x1 = 500; x2 = 4500;
		y1 = sumo; y2= sro;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_o = zaokr(a*pra + b);
		var reg=1;
		if(team1[13][11])reg=team1[13][11]/100;
		obrona = zaokr(krzyw_o/pra*1000*reg);	//parametr do regulacji wartosci,skutecznosci obrony !!!
		if(obrona<1)obrona=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
		//scr = document.getElementById("screen3").innerHTML;
		//document.getElementById("screen3").innerHTML = scr +","+ los;
		if(los < obrona)
		{
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + "Obrona"+Math.round(sro)+"/"+sumo+": "+" "+Math.round(obrona)+"%";
                        document.getElementById("screen1").innerHTML = scr + "Obrona - szanse: "+Math.round(obrona)+"%";
			
			par = team1[happy][10];
			nazw = team1[happy][5]; //nazwisko
			team1[happy][23]++;
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + ": "+nazw+"("+par+")<br/>";//1 10 11
                        document.getElementById("screen1").innerHTML = scr + " - broni: "+nazw;
			//jesli kulikowski bronil to happy = 1;//wylosowalo ze poz '1' jest w 2 lini
			if(happy == 1) //jesli obronil rozgrywajacy to nie moze potem rozgrywac
			{							//team1[1][4] - happy to indez teraz//wiec na ind 1 jest zawsze R
										//if(happy == 1) ok bo happy moze zawierac tylko indeksy z 2 liniii4 12 6
				return 0+"."+par; //zakodowanie parametru obrony Rozgr
			}
			else
			{
				return par;
			}
			
		}
		else
		{
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + "Obrona"+Math.round(sro)+"/"+sumo+": "+" "+Math.round(obrona)+"%nieskt<br/>";
                        document.getElementById("screen1").innerHTML = scr + "Obrona - szanse: "+Math.round(obrona)+"% - niesktuteczna<br/>";
			return "niema";
		}
}


function blok2(pra)
{
	//pobranie zawodników aktualnie w 1 linii
	var b1=0,b2=0,b3=0;
	var mid = 0; der=0;
	var tas = new Array();
	for(i=1;i<=6;i++)
		{
			if(team2[i][0] == 2)
			{
				b1 = (team2[i][9]*team2[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if(team2[i][0] == 3)
			{
				b2 = (team2[i][9]*team2[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if(team2[i][0] == 4)
			{
				b3 = (team2[i][9]*team2[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if((i == 3 || i == 6) && (team2[i][0] == 2 || team2[i][0] == 3 || team2[i][0] == 4))
			{
				isr = i; //tu jest srodkowy
			}	
		}
		sumb = parseInt(b1)+parseInt(b2)+parseInt(b3);
		
		srb = zaokr(sumb/3);
		srb = srb*2; //spłaszczenie krzywej bloku
		if(pra>1500)
		{
			x1 = 500; x2 = 4500;
		}
		else
		{
			x1 = 50; x2 = 20000;
			sumb = zaokr(sumb/2);
		}
		
		y1 = sumb; y2= srb;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_b = zaokr(a*pra + b);
		var reg=1;
		if(team2[13][12])reg=team2[13][12]/100;
		blok = zaokr(krzyw_b/pra*(1000*reg));	//parametr do regulacji wartosci bloku !!!
		if(blok<1)blok=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
		//scr = document.getElementById("screen3").innerHTML;
		//document.getElementById("screen3").innerHTML = scr +","+ los;
		pon = blok/2;
		
		aut = blok*1.5;
		ant = blok*1.54;
		if(middle == 1){mid = 1; middle=0;}
		
		//wyznaczenie ilu w bloku na podst wart blok
		if(blok>=40)
		{
			skacze = 3;
		}
		else if(40>blok && blok>=20)
		{
			skacze = 2;
		}
		else if(20>blok)
		{
			skacze = 1;
		}
		else
		{
			//..	
		}
		
		//ify w zal od prxedzslu
		
		
		if(los < blok && los >= pon)
		{
			var los = Math.floor(Math.random() * 100 + 1);
			
			if(mid == 1) //atak ze srodka - blokuje srodkowy
			{
				nazw = team2[isr][5];
				pkt_blo = isr;
			}
			else//srodkowy tylko na podwojnym z ataku se skrzydeł
			{
				if(los<40)
				{
					nazw = team2[isr][5];
					pkt_blo = isr;
				}
				else if(40<los && los<70)
				{
					i = tas[0];
					nazw = team2[i][5];
					pkt_blo = i;
				}
				else
				{
					i = tas[1];
					nazw = team2[i][5];//blad jak srodkowy jest na zmianie  na podwyzszenie bloku
					
					pkt_blo = i;
				}
			}
			//wylosowanie zaw którzy skaczą poz: 2, 3, 4
			
			//a potem tego który zdobył punkt
			
			//skąd wiedzieć kiedy był atak przez środek
			
			//np "blok zaw ktory nie skakał to obrona..."
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% skuteczny->"+nazw+"<br/>";
                        document.getElementById("screen2").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - blokuje: "+nazw+"<br/>";
 
 			team2[pkt_blo][25]++;
			team2[pkt_blo][24]++;
			pkt_par = 0;
			return "jest";
		}
		else if(los < pon)
		{
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% skuteczny.<br/> Powrót piłki.<br/>";
			document.getElementById("screen2").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - powrót piłki";			
                        scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
			pkt_blo = 0;
			return 0+"."+blok;//zakodowanie wart bloku
		}
		else if(los < aut && los >= blok)					//aut
		{
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% Atak w aut<br/>";
                        document.getElementById("screen2").innerHTML = scr + " Blok - szanse: "+" "+Math.round(blok)+"% - atak w aut<br/>";
 			pkt_blo = 0;
			return "aut";
		}
		else if(los < ant && los >= aut)
		{
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% Atak w antenke<br/>";
                        document.getElementById("screen2").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - atak w antenke<br/>";
 			pkt_blo = 0;
			return "aut";
		}
		else
		{
			nazw = team2[i][5];
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% nieskt<br/>";
                        document.getElementById("screen2").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - niesktuteczny<br/>";
			pkt_blo = 0;
			return blok;
		}
}

function blok1(pra)
{
	//pobranie zawodników aktualnie w 1 linii
	var b1=0,b2=0,b3=0;
	var mid = 0; der =0;
	var tas = new Array();
	for(i=1;i<=6;i++)
		{
			if(team1[i][0] == 2)
			{
				b1 = (team1[i][9]*team1[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if(team1[i][0] == 3)
			{
				b2 = (team1[i][9]*team1[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if(team1[i][0] == 4)
			{
				b3 = (team1[i][9]*team1[i][15])/200;
				if(i != 3 && i != 6)
				{
					tas[der] = i;
					der++;
				}	
			}
			if((i == 3 || i == 6) && (team1[i][0] == 2 || team1[i][0] == 3 || team1[i][0] == 4))
			{
				isr = i; //tu jest srodkowy
			}	
		}
		sumb = parseInt(b1)+parseInt(b2)+parseInt(b3);
		srb = zaokr(sumb/3);
		srb = srb*2; //spłaszczenie krzywej bloku
		if(pra>1500)
		{
			x1 = 500; x2 = 4500; //mozna zrobić po bloku, jeesli jest niemozliwe do przebicia
		}
		else
		{
			x1 = 50; x2 = 20000;
			sumb = zaokr(sumb/2); //odpuszczenie bloku
		}
		y1 = sumb; y2= srb;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_b = zaokr(a*pra + b);
		var reg=1;
		if(team1[13][12])reg=team1[13][12]/100;
		blok = zaokr(krzyw_b/pra*(1000*reg));	//parametr do regulacji wartosci bloku !!!
		if(blok<1)blok=1.1;
		
		var los = Math.floor(Math.random() * 100 + 1);
		//scr = document.getElementById("screen3").innerHTML;
		//document.getElementById("screen3").innerHTML = scr +","+ los;
		pon = blok/2;									//!!ustawienie:po ilu sk blokach piłka powraca - ponowienia
		
		aut = blok*1.5;						//decyduje a tym ile ma być autów
		ant = blok*1.54;
		
		if(middle == 1){mid = 1; middle=0;}
		
		//wyznaczenie ilu w bloku na podst wart blok
		if(blok>=40)
		{
			skacze = 3;
		}
		else if(40>blok && blok>=20)
		{
			skacze = 2;
		}
		else if(20>blok)
		{
			skacze = 1;
		}
		else
		{
			//..	
		}
		
		if(los < blok && los >= pon)					
		{
			var los = Math.floor(Math.random() * 100 + 1);
			
			if(mid == 1) //atak ze srodka - blokuje srodkowy
			{
				nazw = team1[isr][5];
				pkt_blo = isr;
			}
			else//srodkowy tylko na podwojnym z ataku se skrzydeł
			{
				if(los<40)
				{
					nazw = team1[isr][5];
					pkt_blo = isr;
				}
				else if(40<los && los<70)
				{
					i = tas[0];
					nazw = team1[i][5];
					pkt_blo = i;
				}
				else
				{
					i = tas[1];
					//document.write(team1);
					nazw = team1[i][5];
					pkt_blo = i;
				}
			}
			
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% skuteczny =>"+nazw+"<br/>";
                        document.getElementById("screen1").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - blokuje: "+nazw+"<br/>";
 
 			team1[pkt_blo][25]++;
			team1[pkt_blo][24]++;
			pkt_par = 0;
			return "jest";
		}
		else if(los < pon)
		{
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% skuteczny.<br/> Powrót piłki:<br/>";
			document.getElementById("screen1").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - powrót piłki.";
                        scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";
			pkt_blo = 0;
			return 0+"."+blok;		//zakodowanie wart bloku
		}
		else if(los < aut && los >= blok)					//aut
		{
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% Atak w aut<br/>";
 			document.getElementById("screen1").innerHTML = scr + " Blok - szanse: "+" "+Math.round(blok)+"% - atak w aut<br/>";
                        pkt_blo = 0;
			return "aut";
		}
		else if(los < ant && los >= aut)
		{
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% Atak w antenke<br/>";
 			document.getElementById("screen1").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - atak w antenke<br/>";
                        pkt_blo = 0;
			return "aut";
		}
		else
		{
			nazw = team2[i][5];
			scr = document.getElementById("screen1").innerHTML;
			//document.getElementById("screen1").innerHTML = scr + " Blok"+Math.round(srb)+"/"+sumb+" : "+" "+Math.round(blok)+"% nieskt<br/>";
			document.getElementById("screen1").innerHTML = scr + " Blok - szanse: "+Math.round(blok)+"% - niesktuteczny<br/>";
                        pkt_blo = 0;
			return blok;
		}
}

function rozegranie_atak_1(prz)
{
	var los = Math.floor(Math.random() * 100 + 1);//losowanie zawodnika do ataku
	//scr = document.getElementById("screen3").innerHTML;
	//document.getElementById("screen3").innerHTML = scr +","+ los;
	if(prz <= 0.7 && flag_lib==0)	//rozgrywa libero
	{
		roz = team1[7][11];
		nazw = team1[7][5];
		team1[7][26]++;
		scr = document.getElementById("screen1").innerHTML;
		//document.getElementById("screen1").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen1").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=70) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(70<los && los<=90) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(90<los && los<=97) {happy = "L";}			//lider
		if(97<los) {happy = "M";}						//mini lider
	}
	else if(prz <= 0.7 && flag_lib==1)//rozgrywa rozgr po przyj libero)//bardzo chujowe przyjecie
	{
		roz = team1[1][11];
		nazw = team1[1][5];
		team1[1][26]++;
		scr = document.getElementById("screen1").innerHTML;
		//document.getElementById("screen1").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen1").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=65) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(65<los && los<=101) {happy = "PP";}			//przyjmujacy z gorszym atakiem
	}
	else if(0.7 < prz && prz <= 0.9)	//nie gra srodek i ten co przyjął?
	{
		roz = team1[1][11];
		nazw = team1[1][5];
		team1[1][26]++;
		scr = document.getElementById("screen1").innerHTML;
		//document.getElementById("screen1").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen1").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=65) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(65<los && los<=80) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(80<los && los<=95) {happy = "L";}			//lider
		if(95<los) {happy = "M";}						//mini lider
	}
	else
	{
		roz = team1[1][11];
		nazw = team1[1][5];
		team1[1][26]++;
		scr = document.getElementById("screen1").innerHTML;
		//document.getElementById("screen1").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen1").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
		if(los<=1) {happy = "R";}			//kiwka mozliwa tylko jesli rozegranie >54
		if(1<los && los<=20) {happy = 4;} //atakujacy
		if(20<los && los<=40) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(40<los && los<=50) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(50<los && los<=70) {happy = "S";}			//srodkowy 1 linia
		if(70<los && los<=90) {happy = "L";}			//lider
		if(90<los) {happy = "M";}
	
	}
	flag_lib=0;

scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br />";

	if(happy == "R")//ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
			if(team1[1][6] >= 40)
			{
				par = zaokr(1.4*team1[1][6]);
				nazw = team1[1][5];
				team1[1][18]++;
				pkt_par = 1;//pobranie numeru indeksu
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Atak 2 piłka: "+nazw+"("+par+")";
                                document.getElementById("screen1").innerHTML = scr + "Atak 2-ga piłka: "+nazw;
				//return par;
			}
			else if(team1[1][11] > 50)
			{
				par = team1[1][11];
				nazw = team1[1][5];
				team1[1][18]++;
				pkt_par = 1;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Kiwka: "+nazw+"("+par+")";
                                document.getElementById("screen1").innerHTML = scr + "Kiwka: "+nazw;
				//return par;
			}
			else
			{
				par = team1[4][6];
				nazw = team1[4][5];
				team1[4][18]++;
				pkt_par = 4;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";	
                                document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;	
			}	
	}
	
	else if(happy == "S")//ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if((team1[i][0] == 2 || team1[i][0] == 3 ||team1[i][0] == 4) && (i==3||i==6))
			{
				par = team1[i][6];
				if(team1[i][4]!="S")
				{
					par=par*0.7;
				}
				nazw = team1[i][5];
				team1[i][18]++;
				pkt_par = i;
				scr = document.getElementById("screen1").innerHTML;
				//document.getElementById("screen1").innerHTML = scr + "Atak-krótka: "+nazw+"("+par+")";
                                document.getElementById("screen1").innerHTML = scr + "Atak-krótka: "+nazw;
				middle = 1;
				//return par;
			}	
		}
	}
	else if(happy == "PA")//atakuje przyjmujacy z lepszym atakiem
	{	
			if(team1[2][6] >= team1[5][6]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][6];
				nazw = team1[2][5];
				team1[2][18]++;
				pkt_par = 2;
				if(team1[2][0] == 1 || team1[2][0] == 5 || team1[2][0] == 6)
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw;
				}
				else
				{
					scr = document.getElementById("screen1").innerHTML;
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
				}
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][6];
				nazw = team1[5][5];
				team1[5][18]++;
				pkt_par = 5;
				if(team1[5][0] == 1 || team1[5][0] == 5 || team1[5][0] == 6)
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-pipe: "+nazw;
				}
				else
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
				}
			}	
	}
	else if(happy == "PP")//atakuje przyjm z gorzym atakiem
	{	
			if(team1[2][6] <= team1[5][6]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][6];
				nazw = team1[2][5];
				team1[2][18]++;
				pkt_par = 2;
				if(team1[2][0] == 1 || team1[2][0] == 5 || team1[2][0] == 6)
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-pipe: "+nazw;
				}
				else
				{
                                        scr = document.getElementById("screen1").innerHTML;
                                        //document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
                                        //return par;
				}
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][6];
				nazw = team1[5][5];
				team1[5][18]++;
				pkt_par = 5;
				if(team1[5][0] == 1 || team1[5][0] == 5 || team1[5][0] == 6)
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-pipe: "+nazw;
				}
				else
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
				}
			}	
	}
	else if(happy == "L")//ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team1[i][1] == "L")
			{
				par = team1[i][6];
				nazw = team1[i][5];
				team1[i][18]++;
				pkt_par = i;
				if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "P")//jesli druga linnia i P
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-pipe: "+nazw;
				}
				else if(team1[i][4] == "S")
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak przes-krótka: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-przesunięta krótka: "+nazw;
					middle = 1;
				}
				else if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "A")
				{
					if(prz>0.97 && par > 52) 
					{
					par = parseInt(zaokr(par*1.5));
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atomowy Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atomowy atak 2-ga linia: "+nazw;
					}
					else
					{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak 2-ga linia: "+nazw;
					}
				}
				else
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
				}
			}	
		}
	}
	else if(happy == "M")//ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team1[i][1] == "M")
			{
				par = team1[i][6];
				nazw = team1[i][5];
				team1[i][18]++;
				pkt_par = i;
				if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "P")//jesli druga linnia i P
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-pipe: "+nazw;
				}
				else if(team1[i][4] == "S")
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak krótka z tyłu: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak-krótka z tyłu: "+nazw;
					middle = 1;
					
				}
				else if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "A")
				{
					if(prz>0.97 && par > 52) 
					{
					par = parseInt(zaokr(par*1.5));
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atomowy Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atomowy atak 2-ga linia: "+nazw;
					}
					else
					{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak 2-linia: "+nazw+"("+par+")";	
                                        document.getElementById("screen1").innerHTML = scr + "Atak 2-ga linia: "+nazw;	
					}
				}
				else
				{
					scr = document.getElementById("screen1").innerHTML;
					//document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
				}
			}	
		}
	}
	else
	{
		par = team1[happy][6];
		if(team1[happy][4]=="S")
		{
			par=0.7*par;
		}
		nazw = team1[happy][5];
		team1[happy][18]++;
		pkt_par = happy;
		scr = document.getElementById("screen1").innerHTML;
		document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                document.getElementById("screen1").innerHTML = scr + "Atak: "+nazw;
		//return par;	
	}
	scr = document.getElementById("screen2").innerHTML;document.getElementById("screen2").innerHTML =scr+ "<br /><br />";
	pra = zaokr(prz*roz*par);
	atak = par;
	scr = document.getElementById("screen1").innerHTML;
	document.getElementById("screen1").innerHTML = scr + "<br/>Siła PRA: "+Math.round(pra * 1)/1;
	return pra;
	
}



function rozegranie_atak_2(prz)
{
	var los = Math.floor(Math.random() * 100 + 1);//losowanie zawodnika do ataku
	if(prz <= 0.7  && flag_lib==0)	//rozgrywa libero
	{
		roz = team2[7][11];
		nazw = team2[7][5];
		team2[7][26]++;
		scr = document.getElementById("screen2").innerHTML;
		//document.getElementById("screen2").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen2").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=70) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(70<los && los<=90) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(90<los && los<=97) {happy = "L";}			//lider
		if(97<los) {happy = "M";}
	}						//mini lider
	else if(prz <= 0.7  && flag_lib==1)
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
		scr = document.getElementById("screen2").innerHTML;
		//document.getElementById("screen2").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen2").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=65) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(65<los && los<=101) {happy = "PP";}			//przyjmujacy z gorszym atakiem
	}
	
	else if(0.7 < prz && prz <= 0.9)	//nie gra srodek i ten co przyjął?
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
		scr = document.getElementById("screen2").innerHTML;
		//document.getElementById("screen2").innerHTML =scr+"Rozegrał: "+nazw+"("+roz+")<br />";
                document.getElementById("screen2").innerHTML =scr+"Rozgrywa: "+nazw+"<br />";
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=65) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(65<los && los<=80) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(80<los && los<=95) {happy = "L";}			//lider
		if(95<los) {happy = "M";}						//mini lider
	}
	else
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
			scr = document.getElementById("screen2").innerHTML;
			//document.getElementById("screen2").innerHTML =scr+ "Rozegrał: "+nazw+"("+roz+")<br />";
                        document.getElementById("screen2").innerHTML =scr+ "Rozgrywa: "+nazw+"<br />";
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		if(los<=1) {happy = "R";}			//kiwka mozliwa tylko jesli rozegranie >54
		if(1<los && los<=20) {happy = 4;} //atakujacy
		if(20<los && los<=40) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(40<los && los<=50) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(50<los && los<=70) {happy = "S";}			//srodkowy 1 linia
		if(70<los && los<=90) {happy = "L";}			//lider
		if(90<los) {happy = "M";}
	
	}
	flag_lib=0;
scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";

	switch(happy)
	{
	case "R":
	{
			if(team2[1][6] >= 40)
			{
				par = zaokr(1.4*team2[1][6]);
				nazw = team2[1][5];
				team2[1][18]++;
				pkt_par = 1;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Atak 2 piłka: "+nazw+"("+par+")";
                                document.getElementById("screen2").innerHTML = scr + "Atak 2-ga piłka: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				//return par;
			}
			else if(team2[1][11] > 50)
			{
				par = team2[1][11];
				nazw = team2[1][5];
				team2[1][18]++;
				pkt_par = 1;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Kiwka: "+nazw+"("+par+")";
                                document.getElementById("screen2").innerHTML = scr + "Kiwka: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				//return par;
			}
			else
			{
				par = team2[4][6];
				nazw = team2[4][5];
				team2[4][18]++;
				pkt_par = 4;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";	
			}	
	break;
	}
	
	case "S":
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if((team2[i][0] == 2 || team2[i][0] == 3 ||team2[i][0] == 4) && (i==3||i==6))
			{
				par = team2[i][6];
				if(team2[i][4]!="S")
				{
					par=par*0.7;
				}
				nazw = team2[i][5];
				team2[i][18]++;
				pkt_par = i;
				scr = document.getElementById("screen2").innerHTML;
				//document.getElementById("screen2").innerHTML = scr + "Atak-krótka: "+nazw+"("+par+")";
                                document.getElementById("screen2").innerHTML = scr + "Atak-krótka: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				middle = 1;
				//return par;
			}	
		}
	break;
	}
	case "PA":
	{	
			if(team2[2][6] >= team2[5][6])
			{
				par = team2[2][6];
				nazw = team2[2][5];
				team2[2][18]++;
				pkt_par = 2;
				if(team2[2][0] == 1 || team2[2][0] == 5 || team2[2][0] == 6)
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				
				//return par;
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[5][6];
				nazw = team2[5][5];
				team2[5][18]++;
				pkt_par = 5;
				if(team2[5][0] == 1 || team2[5][0] == 5 || team2[5][0] == 6)
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
			}
	break;	
	}
	case "PP":
	{	
			if(team2[2][6] <= team2[5][6]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[2][6];
				nazw = team2[2][5];
				team2[2][18]++;
				pkt_par = 2;
				if(team2[2][0] == 1 || team2[2][0] == 5 || team2[2][0] == 6)
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[5][6];
				nazw = team2[5][5];
				team2[5][18]++;
				pkt_par = 5;
				if(team2[2][0] == 1 || team2[2][0] == 5 || team2[2][0] == 6)
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
			}
	break;	
	}
	case "L":
	{
		var teoo2;
		for(var i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team2[i][1] == "L")
			{
				par = team2[i][6];
				nazw = team2[i][5];
				team2[i][18]++;
				pkt_par = i;
				
		
			
				if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "P")//jesli druga linnia i P
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else if(team2[i][4] == "S")
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak przes-krótka: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-przesunięta krótka: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					middle = 1;
				}
				else if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "A")
				{
					if(prz>0.97 && par>52) 
					{
					par = parseInt(zaokr(par*1.5));
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atomowy Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atomowy atak 2-ga linia: "+nazw;
                                        
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					}
					else
					{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak 2-ga linia: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";	
					}
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
			}
		}
	break;
	}
	case "M":
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team2[i][1] == "M")
			{
				par = team2[i][6];
				nazw = team2[i][5];
				team2[i][18]++;
				pkt_par = i;
				if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "P")//jesli druga linnia i P
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak-Pipe: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-pipe: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
				else if(team2[i][4] == "S")
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak krótka z tyłu: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak-krótka z tyłu: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					middle = 1;
				}
				else if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "A")
				{
					if(prz>0.97 && par>52) 
					{
					par = parseInt(zaokr(par*1.5));
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atomowy Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atomowy Atak 2-ga linia: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					}
					else
					{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak 2-linia: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak 2-ga linia: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";	
					}
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
					
				}
				else
				{
					scr = document.getElementById("screen2").innerHTML;
					//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                                        document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
				}
			}	
		}
	break;
	}
	default:
	{
		par = team2[happy][6];
		if(team2[happy][4]=="S")
		{
			par=0.7*par;
		}
		nazw = team2[happy][5];
		team2[happy][18]++;
		pkt_par = happy;
		scr = document.getElementById("screen2").innerHTML;
		//document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw+"("+par+")";
                document.getElementById("screen2").innerHTML = scr + "Atak: "+nazw;
//scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br />";
		//return par;	
	}
	}
	scr = document.getElementById("screen1").innerHTML;document.getElementById("screen1").innerHTML =scr+ "<br /><br />";
	pra = zaokr(prz*roz*par);
	atak = par;
	scr = document.getElementById("screen2").innerHTML;
	document.getElementById("screen2").innerHTML = scr + "<br/>Siła PRA: "+Math.round(pra * 1)/1;
	return pra;
	
}