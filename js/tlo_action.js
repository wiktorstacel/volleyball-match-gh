function rozegranie_atak_2_tlo(prz)
{
	var los = Math.floor(Math.random() * 100 + 1);
	if(prz <= 0.7 && flag_lib==0)	//rozgrywa libero
	{
		roz = team2[7][11];
		nazw = team2[7][5];
		team2[7][26]++;
		if(los<=40) {happy = 4;}
		if(40<los && los<=70) {happy = "PA";}
		if(70<los && los<=90) {happy = "PP";}
		if(90<los && los<=97) {happy = "L";}
		if(97<los) {happy = "M";}
	}
	else if(prz <= 0.7 && flag_lib==1)
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
		if(los<=40) {happy = 4;}
		if(40<los && los<=65) {happy = "PA";}
		if(65<los && los<=101) {happy = "PP";}
	}
	else if(0.7 < prz && prz <= 0.9)
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
		if(los<=40) {happy = 4;}
		if(40<los && los<=65) {happy = "PA";}
		if(65<los && los<=80) {happy = "PP";}
		if(80<los && los<=95) {happy = "L";}
		if(95<los) {happy = "M";}
	}
	else
	{
		roz = team2[1][11];
		nazw = team2[1][5];
		team2[1][26]++;
		if(los<=1) {happy = "R";}
		if(1<los && los<=20) {happy = 4;}
		if(20<los && los<=40) {happy = "PA";}
		if(40<los && los<=50) {happy = "PP";}
		if(50<los && los<=70) {happy = "S";}
		if(70<los && los<=90) {happy = "L";}
		if(90<los) {happy = "M";}
	
	}
	flag_lib=0;
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
			}
			else if(team2[1][11] > 50)
			{
				par = team2[1][11];
				nazw = team2[1][5];
				team2[1][18]++;
				pkt_par = 1;
			}
			else
			{
				par = team2[4][6];
				nazw = team2[4][5];
				team2[4][18]++;
				pkt_par = 4;	
			}	
	break;
	}
	
	case "S":
	{
		for(i=1;i<=6;i++)
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
				middle = 1;
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
			}
			else
			{
				par = team2[5][6];
				nazw = team2[5][5];
				team2[5][18]++;
				pkt_par = 5;
			}
	break;	
	}
	case "PP":
	{	
			if(team2[2][6] <= team2[5][6])
			{
				par = team2[2][6];
				nazw = team2[2][5];
				team2[2][18]++;
				pkt_par = 2;
			}
			else
			{
				par = team2[5][6];
				nazw = team2[5][5];
				team2[5][18]++;
				pkt_par = 5;
			}
	break;	
	}
	case "L":
	{
		var teoo2;
		for(var i=1;i<=6;i++)
		{
			if(team2[i][1] == "L")
			{
				par = team2[i][6];
				nazw = team2[i][5];
				team2[i][18]++;
				pkt_par = i;
				
				if(team2[i][4] == "S")
				{
					middle = 1;
				}
				else if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "A")
				{
					if(prz>0.97 && par>52) 
					{
					par = parseInt(zaokr(par*1.5));
					}
				}
			}
		}
	break;
	}
	case "M":
	{
		for(i=1;i<=6;i++)
		{
			if(team2[i][1] == "M")
			{
				par = team2[i][6];
				nazw = team2[i][5];
				team2[i][18]++;
				pkt_par = i;
				if(team2[i][4] == "S")
				{
					middle = 1;
				}
				else if((team2[i][0] == 1 || team2[i][0] == 5 || team2[i][0] == 6) && team2[i][4] == "A")
				{
					if(prz>0.97 && par>52) 
					{
					par = parseInt(zaokr(par*1.5));
					}
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
	}
	}
	pra = zaokr(prz*roz*par);
	atak = par;
	return pra;
}


function rozegranie_atak_1_tlo(prz)
{
	var los = Math.floor(Math.random() * 100 + 1);//losowanie zawodnika do ataku
	if(prz <= 0.7 && flag_lib==0)	//rozgrywa libero
	{
		roz = team1[7][11];
		nazw = team1[7][5];
		team1[7][26]++;
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=70) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(70<los && los<=90) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(90<los && los<=97) {happy = "L";}			//lider
		if(97<los) {happy = "M";}						//mini lider
	}
	else if(prz <= 0.7 && flag_lib==1)
	{
		roz = team1[1][11];
		nazw = team1[1][5];
		team1[1][26]++;
		if(los<=40) {happy = 4;} //atakujacy
		if(40<los && los<=65) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(65<los && los<=101) {happy = "PP";}			//przyjmujacy z gorszym atakiem
	}
	else if(0.7 < prz && prz <= 0.9)	//nie gra srodek i ten co przyjął?
	{
		roz = team1[1][11];
		nazw = team1[1][5];
		team1[1][26]++;
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
		if(los<=1) {happy = "R";}			//kiwka mozliwa tylko jesli rozegranie >54
		if(1<los && los<=20) {happy = 4;} //atakujacy
		if(20<los && los<=40) {happy = "PA";} //przyjmujacy z lepszym atakiem
		if(40<los && los<=50) {happy = "PP";}			//przyjmujacy z gorszym atakiem
		if(50<los && los<=70) {happy = "S";}			//srodkowy 1 linia
		if(70<los && los<=90) {happy = "L";}			//lider
		if(90<los) {happy = "M";}
	
	}
flag_lib=0;
	switch(happy)
	{	
	case "R"://ktory S znajduje sie aktualnie na pozycji 2,3 lub 4
	{
			if(team1[1][6] >= 40)
			{
				par = zaokr(1.4*team1[1][6]);
				nazw = team1[1][5];
				team1[1][18]++;
				pkt_par = 1;//pobranie numeru indeksu
			}
			else if(team1[1][11] > 50)
			{
				par = team1[1][11];
				nazw = team1[1][5];
				team1[1][18]++;
				pkt_par = 1;
			}
			else
			{
				par = team1[4][6];
				nazw = team1[4][5];
				team1[4][18]++;
				pkt_par = 4;	
			}
	break;	
	}
	
	case "S":
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
			}	
		}
	break;
	}
	case "PA":
	{	
			if(team1[2][6] >= team1[5][6]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][6];
				nazw = team1[2][5];
				team1[2][18]++;
				pkt_par = 2;
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][6];
				nazw = team1[5][5];
				team1[5][18]++;
				pkt_par = 5;
			}	
	break;
	}
	case "PP":
	{	
			if(team1[2][6] <= team1[5][6]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][6];
				nazw = team1[2][5];
				team1[2][18]++;
				pkt_par = 2;
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][6];
				nazw = team1[5][5];
				team1[5][18]++;
				pkt_par = 5;
			}	
	break;
	}
	case "L":
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team1[i][1] == "L")
			{
				par = team1[i][6];
				nazw = team1[i][5];
				team1[i][18]++;
				pkt_par = i;
				if(team1[i][4] == "S")
				{
					middle = 1;
				}
				else if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "A")
				{
					if(prz>0.97 && par > 52) 
					{
					par = parseInt(zaokr(par*1.5));
					}
				}
			}	
		}
	break;
	}
	case "M":
	{
		for(i=1;i<=6;i++) //poszukiwanie zawodników na pozycji l,p1,p2 i ? s(1 linia)
		{
			if(team1[i][1] == "M")
			{
				par = team1[i][6];
				nazw = team1[i][5];
				team1[i][18]++;
				pkt_par = i;
				
			if(team1[i][4] == "S")
				{
					middle = 1;
				}
			else if((team1[i][0] == 1 || team1[i][0] == 5 || team1[i][0] == 6) && team1[i][4] == "A")
				{
					if(prz>0.97 && par > 52) 
					{
					par = parseInt(zaokr(par*1.5));
					}
				}
			}	
		}
	break;
	}
	default:
	{
		par = team1[happy][6];
		if(team1[happy][4]=="S")
		{
			par=0.7*par;
		}
		nazw = team1[happy][5];
		team1[happy][18]++;
		pkt_par = happy;	
	}
	}
	pra = zaokr(prz*roz*par);
	atak = par;
	return pra;
}

function akcja1_tlo()
{
	po = spr_przyjecie2();
	z = zagrywka1_tlo(po);
	if(z == "as")
	{ 
		przyjecie2_tlo(0, 1);
		wyniki(1);
		return 1;
	}
	if(z == "zeps")
	{ 
		pkt_par = 0;
		wyniki(2);
		return 2;
	}
	
	prz = przyjecie2_tlo(z, 0);
	
	find_leaders();

	while(1)
	{
		pra = rozegranie_atak_2_tlo(prz);

		blok = blok1_tlo(pra);
		if(parseInt(blok) < 1)
		{		
							
				while(parseInt(blok) < 1)
				{
					obr = obrona2_tlo(blok, pra);
					if(obr == "niema")
					{
						pkt_par = 0;	
						wyniki(1);
						return 1;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69;
					}
					else
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2;	
					}
					
					pra = rozegranie_atak_2_tlo(prz);
					blok = blok1_tlo(pra);
				}
		  }
		if(blok == "jest")
		{ 
			pkt_par = 0;
			wyniki(1);
			return 1;
		}
		else if(blok == "aut")
		{ 
			pkt_par = 0;
			wyniki(1);
			return 1;
		}
		else
		{
			obr = obrona1_tlo(blok, pra);
			if(obr == "niema")
			{	
				wyniki(2);
				return 2;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69;
			}
			else
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2;	
			}
		} 
		pra = rozegranie_atak_1_tlo(prz);
		blok = blok2_tlo(pra);
		if(parseInt(blok) < 1)
		{							//PONOWIENIE !!!
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					obr = obrona1_tlo(blok, pra);
					if(obr == "niema")
					{	
						pkt_par = 0;
						wyniki(2);
						return 2;
					}
					else if(parseFloat(obr) < 1)
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69;
					}
					else
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2;
					}
					
					pra = rozegranie_atak_1_tlo(prz);
					blok = blok2_tlo(pra);	
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
			obr = obrona2_tlo(blok, pra);
			if(obr == "niema")
			{	
				wyniki(1);
				return 1;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69;
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2;
			}
		}
	}
}

function zagrywka1_tlo(po)
{
	for(i=1;i<=6;i++)
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
			team1[pkt_zag][25]++;
			team1[pkt_zag][21]++;
			return "as";
		}
		else if(los_z < (200 - par))
		{
			team1[pkt_zag][22]++;	
			return "zeps";
		}
return par;
}

function zagrywka2_tlo(po)
{
	for(i=1;i<=6;i++)
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
			team2[pkt_zag][25]++;
			team2[pkt_zag][21]++;
			return "as";
		}
		else if(los_z < (200 - par))
		{
			team2[pkt_zag][22]++;
			return "zeps";
		}
return par; //parametr zagrywka aktualnie zagrywajacego
}

function przyjecie1_tlo(z, as)
{	
	happy = 0;	
	var los = Math.floor(Math.random() * 100 + 1);	
	if(document.getElementById("tktz2.1").checked)
	{
		if(los<=2) {happy = "S";}
		if(2<los && los<=26) {happy = "PA";}
		if(26<los && los<=60) happy = "PP";
		if(60<los) happy = 7;
	}
	else if(document.getElementById("tktz2.2").checked)
	{
		if(los<=2) {happy = "S";}
		if(2<los && los<=18) {happy = "PA";}
		if(18<los && los<=40) happy = "PP";	
		if(40<los) happy = 7;
	}
	else if(document.getElementById("tktz2.3").checked)
	{
		if(team1[2][7] <= team1[5][7])
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=19) {happy = 2;}
			if(19<los && los<=70) happy = 5;
			if(70<los) happy = 7;
		}
		else
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=48) {happy = 5;}
			if(48<los && los<=69) happy = 2;
			if(69<los) happy = 7;
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
	
	switch(happy)
	{
	case "S":
	{
		for(i=1;i<=6;i++)
		{
			if((team1[i][0] == 2 || team1[i][0] == 3 ||team1[i][0] == 4) && team1[i][4] == "S")
			{
				par = team1[i][7];
				nazw = team1[i][5];
				iss = i;
			}	
		}
	break;
	}
	case "PA":
	{	
			if(team1[2][7] <= team1[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][7];
				nazw = team1[2][5];
				iss = 2;
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][7];
				nazw = team1[5][5];
				iss = 5;	
			}
	break;	
	}
	case "PP":
	{	
			if(team1[2][7] > team1[5][7]) //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[2][7];
				nazw = team1[2][5];
				iss = 2;	
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team1[5][7];
				nazw = team1[5][5];
				iss = 5;
			}	
	break;
	}
	default:
	{
		par = team1[happy][7];
		nazw = team1[happy][5];
		iss = happy;	
		flag_lib=1;
	}
 }
		if(as == 1)
		{
			team1[iss][20]++;
			wagaa = (team1[iss][20]-1)/team1[iss][20];
			wagab = 1 - wagaa;
			team1[iss][19] = Math.round(team1[iss][19]*wagaa + 0*wagab);
			return 0;
		}
		prz = par/z; if(prz>1.2)prz=1.2; //jakosc przyjecia
		prz_st = 100*zaokr(prz*0.66);
		team1[iss][20]++;
		wagaa = (team1[iss][20]-1)/team1[iss][20];
		wagab = 1 - wagaa;
		team1[iss][19] = Math.round(team1[iss][19]*wagaa + prz_st*wagab);
		return prz;
}

function przyjecie2_tlo(z, as)
{	
	var happy = 0;	
	var los = Math.floor(Math.random() * 100 + 1);
	if(document.getElementById("tktz1.1").checked)
	{
		if(los<=2) {happy = "S";}
		if(2<los && los<=26) {happy = "PA";}
		if(26<los && los<=60) happy = "PP";
		if(60<los) happy = 7;
	}
	else if(document.getElementById("tktz1.2").checked)
	{
		if(los<=2) {happy = "S";}
		if(2<los && los<=18) {happy = "PA";}
		if(18<los && los<=40) happy = "PP";
		if(40<los) happy = 7;
	}
	else if(document.getElementById("tktz1.3").checked)
	{
		if(team2[2][7] <= team2[5][7])
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=19) {happy = 2;}
			if(19<los && los<=70) happy = 5;
			if(70<los) happy = 7;
		}
		else
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=48) {happy = 5;}
			if(48<los && los<=69) happy = 2;
			if(69<los) happy = 7;
		}
	}
	else if(document.getElementById("tktz1.4").checked)
	{
		if(team2[2][7] >= team2[5][7])
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=19) {happy = 5;}
			if(19<los && los<=70) happy = 2;
			if(70<los) happy = 7;
		}
		else
		{
			if(los<=2) {happy = "S";}
			if(2<los && los<=48) {happy = 2;}
			if(48<los && los<=69) happy = 5;
			if(69<los) happy = 7;
		}
	}
	
	switch(happy)
	{
	case "S":
	{
		for(i=1;i<=6;i++)
		{
			if((team2[i][0] == 2 || team2[i][0] == 3 ||team2[i][0] == 4) && team2[i][4] == "S")
			{
				par = team2[i][7];
				nazw = team2[i][5];
				iss = i;
			}	
		}
	break;
	}
	case "PA":
	{	
			if(team2[2][7] <= team2[5][7])
			{
				par = team2[2][7];
				nazw = team2[2][5];
				iss = 2;
			}
			else
			{
				par = team2[5][7];
				nazw = team2[5][5];
				iss = 5;
			}
	break;	
	}
	case "PP":
	{	
			if(team2[2][7] > team2[5][7])
			{
				par = team2[2][7];
				nazw = team2[2][5];
				iss = 2;
			}
			else //spr ktory przyjmujacy ma lepsze przyjecie
			{
				par = team2[5][7];
				nazw = team2[5][5];
				iss = 5;
			}	
	break;
	}
	default:
	{
		par = team2[happy][7];
		nazw = team2[happy][5];
		iss = happy;	
		flag_lib=1;
	}
	}
		if(as == 1)
		{
			team2[iss][20]++;
			wagaa = (team2[iss][20]-1)/team2[iss][20];
			wagab = 1 - wagaa;
			team2[iss][19] = Math.round(team2[iss][19]*wagaa + 0*wagab);
			return 0;
		}
		prz = zaokr(par/z); if(prz>1.2)prz=1.2;
		prz_st = 100*zaokr(prz*0.66);
		team2[iss][20]++;
		wagaa = (team2[iss][20]-1)/team2[iss][20];
		wagab = 1 - wagaa;
		team2[iss][19] = Math.round(team2[iss][19]*wagaa + prz_st*wagab);
		return prz;
}

function blok1_tlo(pra)
{
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
				isr = i;
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
 			team1[pkt_blo][25]++;
			team1[pkt_blo][24]++;
			pkt_par = 0;
			return "jest";
		}
		else if(los < pon)
		{
			pkt_blo = 0;
			return 0+"."+blok;		//zakodowanie wart bloku
		}
		else if(los < aut && los >= blok)					//aut
		{
 			pkt_blo = 0;
			return "aut";
		}
		else if(los < ant && los >= aut)
		{
 			pkt_blo = 0;
			return "aut";
		}
		else
		{
			nazw = team2[i][5];
			pkt_blo = 0;
			return blok;
		}
}

function blok2_tlo(pra)
{
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
		//document.write(team2);
		if(team2[13][12])reg=team2[13][12]/100;
		blok = zaokr(krzyw_b/pra*(1000*reg));	//parametr do regulacji wartosci bloku !!!
		if(blok<1)blok=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
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
 			team2[pkt_blo][25]++;
			team2[pkt_blo][24]++;
			pkt_par = 0;
			return "jest";
		}
		else if(los < pon)
		{
			pkt_blo = 0;
			return 0+"."+blok;
		}
		else if(los < aut && los >= blok)
		{
 			pkt_blo = 0;
			return "aut";
		}
		else if(los < ant && los >= aut)
		{
 			pkt_blo = 0;
			return "aut";
		}
		else
		{
			nazw = team2[i][5];
			pkt_blo = 0;
			return blok;
		}
}

function obrona1_tlo(blok, pra)
{
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
				else if(przejscie == 1)
				{
					o1 = team1[i][10];
					o1i = i;	
				}
				else
				{	
					o1 = team1[7][10];
					liberoflag = 1;
					o1i = 7;
				}
			}
			if(team1[i][0] == 5)
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
			var los = Math.floor(Math.random() * 100 + 1);
			if(liberoflag == 1)
			{
				if(los<=50) {happy = o1i;}
				if(50<los && los<=75) {happy = o2i;}
				if(75<los) {happy = o3i;}
			}
			else if(liberoflag == 2)
			{
				if(los<=25) {happy = o1i;}
				if(25<los && los<=75) {happy = o2i;} 
				if(75<los) {happy = o3i;}
			}
			else if(liberoflag == 3)
			{
				if(los<=25) {happy = o1i;}
				if(25<los && los<=50) {happy = o2i;}
				if(50<los) {happy = o3i;}
			}
			else
			{
				if(los<=33) {happy = o1i;}
				if(33<los && los<=66) {happy = o2i;}
				if(66<los) {happy = o3i;}
			}	
		sumo = parseInt(o1)+parseInt(o2)+parseInt(o3);
		sro = zaokr(sumo/3);
		sro = sro*2.5;
		
		x1 = 500; x2 = 4500;
		y1 = sumo; y2= sro;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_o = zaokr(a*pra + b);
		var reg=1;
		if(team1[13][11])reg=team1[13][11]/100;
		obrona = zaokr(krzyw_o/pra*1000*reg);	//parametr do regulacji wartosci,skutecznosci obrony !!!
		if(obrona<1)obrona=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
		if(los < obrona)
		{
			par = team1[happy][10];
			nazw = team1[happy][5]; //nazwisko
			team1[happy][23]++;
			if(happy == 1)
			{		
				return 0+"."+par;
			}
			else
			{
				return par;
			}
		}
		else
		{
			return "niema";
		}
}

function obrona2_tlo(blok, pra)
{
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
				else if(przejscie == 1)
				{
					o1 = team2[i][10];
					o1i = i;	
				}
				else
				{		
					o1 = team2[7][10];
					liberoflag = 1;
					o1i = 7;
				}
			}
			if(team2[i][0] == 5)
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

			var los = Math.floor(Math.random() * 100 + 1);
			if(liberoflag == 1)
			{
				if(los<=50) {happy = o1i;}
				if(50<los && los<=75) {happy = o2i;} 
				if(75<los) {happy = o3i;}
			}
			else if(liberoflag == 2)
			{
				if(los<=25) {happy = o1i;}
				if(25<los && los<=75) {happy = o2i;}
				if(75<los) {happy = o3i;}
			}
			else if(liberoflag == 3) 
			{
				if(los<=25) {happy = o1i;}
				if(25<los && los<=50) {happy = o2i;}
				if(50<los) {happy = o3i;}
			}
			else
			{
				if(los<=33) {happy = o1i;}
				if(33<los && los<=66) {happy = o2i;}
				if(66<los) {happy = o3i;}
			}
			
		sumo = parseInt(o1)+parseInt(o2)+parseInt(o3);
		sro = zaokr(sumo/3);
		sro = sro*2.5;
		
		x1 = 500; x2 = 4500;
		y1 = sumo; y2= sro;
		
		a = (y2-y1)/(x2-x1); b = y1 - ((y2-y1)/(x2-x1))*x1;
		krzyw_o = zaokr(a*pra + b);
		var reg=1;
		if(team2[13][11])reg=team2[13][11]/100;
		obrona = zaokr(krzyw_o/pra*1000*reg);	//parametr do regulacji wartosci,skutecznosci obrony !!!
		if(obrona<1)obrona=1.1;
		var los = Math.floor(Math.random() * 100 + 1);
		if(los < obrona)
		{
			par = team2[happy][10];
			nazw = team2[happy][5]; //nazwisko
			team2[happy][23]++;
			if(happy == 1)
			{
				return 0+"."+par;
			}
			else
			{
				return par;
			}
		}
		else
		{
			return "niema";
		}
}

function akcja2_tlo()
{
	po = spr_przyjecie1();
	z = zagrywka2_tlo(po);
	if(z == "as")
	{ 
		przyjecie1_tlo(0, 1)
		wyniki(2);
		return 2;
	}
	if(z == "zeps")
	{ 
		pkt_par = 0;
		wyniki(1);
		return 1;
	} 	
	prz = przyjecie1_tlo(z, 0);	
	find_leaders();
	
	while(1)
	{
		pra = rozegranie_atak_1_tlo(prz);
		blok = blok2_tlo(pra)
		if(parseInt(blok) < 1)
		{
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					obr = obrona1_tlo(blok, pra);
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
					}
					else//obrona skuteczna
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
					}
					pra = rozegranie_atak_1_tlo(prz);
					blok = blok2_tlo(pra);	
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
		else
		{
			obr = obrona2_tlo(blok, pra);
			if(obr == "niema")
			{	
				wyniki(1);
				return 1;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69;
			}
			else//obrona skuteczna
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie	
			}
		} 
		pra = rozegranie_atak_2_tlo(prz);
		blok = blok1_tlo(pra)
		if(parseInt(blok) <  1)
		{							//!!! Ponowienie
				while(parseInt(blok) < 1)//ponowienia - piłka musi wrocić i trzeba ją obronić
				{
					obr = obrona2_tlo(blok, pra);
					if(obr == "niema")
					{	
						pkt_par = 0;
						wyniki(1);
						return 1;
					}
					else if(parseFloat(obr) < 1)//broni rozgrywajacy
					{
						prz = zaokr(1.2*parseFloat(obr));
						if(prz>0.7)prz=0.69;
					}
					else//obrona skuteczna
					{
						prz = zaokr(obr/(parseInt(blok)*100));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
					}
					
					pra = rozegranie_atak_2_tlo(prz);
					blok = blok1_tlo(pra);
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
			obr = obrona1_tlo(blok, pra);
			if(obr == "niema")
			{	
				wyniki(2);
				return 2;
			}
			else if(parseFloat(obr) < 1)
			{
				prz = zaokr(1.2*parseFloat(obr));
				if(prz>0.7)prz=0.69;
			}
			else
			{
				blok = (100-blok)*0.01;
				prz = zaokr(obr/(atak*blok));if(prz>1.2)prz=1.2; //jakosc przyjecia po obronie
			}
		}
	}
}