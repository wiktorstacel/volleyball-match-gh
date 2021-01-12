function getData_ins(dataSource, divID)
{
var mozillaFlag = false;
var XMLHttpRequestObject = false;

    if (window.XMLHttpRequest)
    { 
        XMLHttpRequestObject = new XMLHttpRequest();
        XMLHttpRequestObject.overrideMimeType("text/xml");
        mozillaFlag = true;
    } 
    else if (window.ActiveXObject)
    {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (XMLHttpRequestObject) 
    {
        var obj = document.getElementById(divID);
        XMLHttpRequestObject.open("GET", dataSource);

        XMLHttpRequestObject.onreadystatechange = function()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                obj.innerHTML = XMLHttpRequestObject.responseText;
            }
        }
        XMLHttpRequestObject.send(null);
    }
return 1;
}


var XMLHttpRequestObject = false;
if (window.XMLHttpRequest)
{
  XMLHttpRequestObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
  XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
}


// Using php file address (dataSource) create php file that insert content with AJAX to div
function getData(dataSource, divID)
{
  if(XMLHttpRequestObject)
  {
    var obj = document.getElementById(divID);
    XMLHttpRequestObject.open("GET", dataSource);

    XMLHttpRequestObject.onreadystatechange = function()
    {
      if (XMLHttpRequestObject.readyState == 4 &&
          XMLHttpRequestObject.status == 200)
      {
      obj.innerHTML = XMLHttpRequestObject.responseText;
      }
    }
    XMLHttpRequestObject.send(null);
  }
}

var XMLHttpRequestObject5 = false;
if (window.XMLHttpRequest)
{
  XMLHttpRequestObject5 = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
  XMLHttpRequestObject5 = new ActiveXObject("Microsoft.XMLHTTP");
}

function getData5(dataSource, zm)
{
  if(XMLHttpRequestObject5)
  {
    
    XMLHttpRequestObject5.open("GET", dataSource);

    XMLHttpRequestObject5.onreadystatechange = function()
    {
      if (XMLHttpRequestObject5.readyState == 4 &&
          XMLHttpRequestObject5.status == 200)
      {
      panel[zm] = XMLHttpRequestObject5.responseText;
      }
    }
    XMLHttpRequestObject5.send(null);
  }
}

var XMLHttpRequestObject2 = false;
if (window.XMLHttpRequest)
{
  XMLHttpRequestObject2 = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
  XMLHttpRequestObject2 = new ActiveXObject("Microsoft.XMLHTTP");
}
function getData33(dataSource, divID)
{
  if(XMLHttpRequestObject2)
  {
    var obj = document.getElementById(divID);
    XMLHttpRequestObject2.open("GET", dataSource);

    XMLHttpRequestObject2.onreadystatechange = function()
    {
      if (XMLHttpRequestObject2.readyState == 4 &&
          XMLHttpRequestObject2.status == 200)
      {
      obj.innerHTML = XMLHttpRequestObject2.responseText;
      }
    }
    XMLHttpRequestObject2.send(null);
  }
}

var XMLHttpRequestObject3 = false;
if (window.XMLHttpRequest)
{
  XMLHttpRequestObject3 = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
  XMLHttpRequestObject3 = new ActiveXObject("Microsoft.XMLHTTP");
}
function getData44(dataSource, divID)
{
  if(XMLHttpRequestObject3)
  {
    var obj = document.getElementById(divID);
    XMLHttpRequestObject3.open("GET", dataSource);

    XMLHttpRequestObject3.onreadystatechange = function()
    {
      if (XMLHttpRequestObject3.readyState == 4 &&
          XMLHttpRequestObject3.status == 200)
      {
      obj.innerHTML = XMLHttpRequestObject3.responseText;
      }
    }
    XMLHttpRequestObject3.send(null);
  }
}

function check_play()
{
	var sum="",a=0;
	for(i=1;i<=11;i++)
	{
		if(document.getElementById("id"+i).checked)
		{
		sum=sum+"id:"+i;
		a++;
		}
	}
	document.getElementById("ekran").value = sum;
	if(a!=2)
	{
		alert("Powinny być zaznaczone 2 drużyny");
		return false;
	}
	else
	{
		return true;
	}
}

function check_nr()
{
	nr = document.getElementById("n_player").value;
	team = document.getElementById("team_player").value;
	adres = "check_nr.php?nr="+nr+"&team="+team;
	getData(adres, "alert_nr")
}


function check_v(it)
{
	nr = document.getElementById(it).value;
	if(nr>64)
	alert("Podana wartość: "+nr+" nie wydaje się być poprawna!");
	
}

//Reset data to start position set in next_day.php
function next_day()
{
	adres = "next_day.php";
	getData(adres, "dzis");
	
}

//
function next_day_calendar(tyk)
{	

	adres = "next_day_calendar.php?tyk="+tyk;
	getData_ins(adres, "calendar");
}
var panel = new Array();
function show_table_10(r,liga)
{	

	adres = "show_table_10.php?r="+r+"&liga="+liga;
	//getData5(adres, 0);
	getData(adres, "monitor");
}
function show_table_100(r)
{	
	document.getElementById("monitor").innerHTML=panel[0];
}

//Load XML file from Myslq
function play_kolejka(nr,liga)
{
	adres = "kolejka.php?nr="+nr+"&liga="+liga;
	getData(adres, "monitor");
}

//Old - field for game fucnktion testing
function play_meczyk(d1, d2)
{
	adres = "play/load_teams.php?t1="+d1+"&t2="+d2;
	getData(adres, "game_field");
}

//Load 'plansza' into div "game_field" placed on main game page - panel.php
function load_plansza(kol)
{
	adres = "play/plansza.php?kol="+kol;
	getData(adres, "game_field");
}

//Used with "PY" button to load date to 'plansza.php' placed on 'panel.php'check_play
function play_meczyk_tlo(d1,d2,k,pl,para,liga)
{
	getGuest1(d1,d2,k,pl,para,liga);
	
	
	//window.setTimeout(optimal_composition_tlo, 500);
	//optimal_composition_tlo();
	//meczyk();
	//window.setTimeout("meczyk1("+d1+","+d2+","+k+")", 1000);
	//window.setTimeout("loop("+x+")", x);
	return 0;
}

function make_po(runda)
{
	adres = "operacje/make_po_plusliga.php?run="+runda;
	getData(adres, "monu");
}

function make_po_italian(runda)
{
	adres = "operacje/make_po_italian.php?run="+runda;
	getData(adres, "monu");
}

function make_lm(tryb)
{
	adres = "operacje/make_cups.php?t="+tryb;
	getData(adres, "monu");
}

function show_team(id)
{
	adres = "panel_show/team_show.php?id="+id;
	getData(adres, "monitor");
}

function show_emplo(id)
{
	adres = "panel_show/emplo_show.php?id="+id;
	getData(adres, "monitor");
}

function show_terminarz(kol,id,liga)
{
	adres = "panel_show/terminarz_show.php?id="+id+"&kol="+kol+"&liga="+liga;
	getData(adres, "monitor");
}

function show_terminarz_kola(id,liga)
{
	kol=document.getElementById("kola").value;
	show_terminarz(kol,id,liga)
}

function ana_but_chan(sel)
{
	var pac=sel.options[sel.selectedIndex].value
	//=document.getElementById("id_ana").options.value;
	show_team(pac);
}
function view_stat(id,kol)
{
	adres = "operacje/stat_wjeb.php?id="+id+"&kol="+kol;
	getData(adres, "monu");
}
function show_stat_ind(id)
{
	getStat();
	adres = "operacje/stat_ind.php?id="+id;
	getData(adres, "monitor");
}
function ins_table(sel)
{
	var pac=sel.options[sel.selectedIndex].value;
	show_table_10(0,pac);
}
function ins_term(sel,id)
{
	var pac=sel.options[sel.selectedIndex].value;
	show_terminarz(0,id,pac)
}
function actual_stat(sety,liga)
{
	adres = "operacje/stat_actual.php?liga="+liga;
	for(var i=1;i<=12;i++)
	{
		for(var j=17;j<=26;j++)
		{
adres = adres+"&j"+i+j+"="+team1[i][j];
		}
		j=14;//tired
adres = adres+"&j"+i+j+"="+team1[i][j];
		j=28;//12
		zm=100-Math.round(100*(team1[i][j]/team1[i][j-1]));
		if((parseInt(team1[i][18])+parseInt(team1[i][20])+parseInt(team1[i][23])+parseInt(team1[i][24])+parseInt(team1[i][26]))<3)
		{
			zm=1;
		}
		else
		{
			zm*=4;
		}
		adres = adres+"&j"+i+j+"="+zm;
		j=29;//12
		adres = adres+"&j"+i+j+"="+team1[i][j];
		j=30;//7
		adres = adres+"&j"+i+j+"="+team1[i][j];
		j=31;//zmeczenie do naliczenia
		adres = adres+"&j"+i+j+"="+team1[i][j];
		j=34;//zmeczenie do naliczenia
		adres = adres+"&j"+i+j+"="+team1[i][j];		
		if(team1[i][4]=="S")
		{
var sum=2*parseInt(team1[i][18])+parseInt(team1[i][20])+parseInt(team1[i][23])+5*parseInt(team1[i][24])+parseInt(team1[i][26])/(3);
		}
		else
		{
var sum=parseInt(team1[i][18])+parseInt(team1[i][20])+2*parseInt(team1[i][23])+2*parseInt(team1[i][24])+parseInt(team1[i][26])/(3);
		}
		j=35;//zmeczenie do naliczenia
		adres = adres+"&j"+i+j+"="+sum;
		
	}
        //2021-01-11: jeśli ustawiona zmienna globalna to omiń zapis statystyk do SQL i wypisania efektu do div
        if(!play_1mecz)
        {
            getData33(adres, "screen5");
        }   
	
	adres = "operacje/stat_actual.php?liga="+liga;
	for(var i=1;i<=12;i++)
	{
		for(var j=17;j<=26;j++)
		{
adres = adres+"&j"+i+j+"="+team2[i][j];
		}
		j=14;
adres = adres+"&j"+i+j+"="+team2[i][j];
		j=27;//12
		adres = adres+"&j"+i+j+"="+sety;
		j=28;//12
		zm=100-Math.round(100*(team2[i][j]/team2[i][j-1]));
		if((parseInt(team2[i][18])+parseInt(team2[i][20])+parseInt(team2[i][23])+parseInt(team2[i][24])+parseInt(team2[i][26]))<3)
		{
			zm=1;
		}
		else
		{
			zm*=4;
		}
		adres = adres+"&j"+i+j+"="+zm;
		j=29;
		adres = adres+"&j"+i+j+"="+team2[i][j];
		j=30;
		adres = adres+"&j"+i+j+"="+team2[i][j];
		j=31;
		adres = adres+"&j"+i+j+"="+team2[i][j];
		j=34;
		adres = adres+"&j"+i+j+"="+team2[i][j];
		if(team2[i][4]=="S")
		{
var sum=2*parseInt(team2[i][18])+parseInt(team2[i][20])+parseInt(team2[i][23])+5*parseInt(team2[i][24])+parseInt(team2[i][26])/(3);
		}
		else
		{
var sum=parseInt(team2[i][18])+parseInt(team2[i][20])+2*parseInt(team2[i][23])+2*parseInt(team2[i][24])+parseInt(team2[i][26])/(3);
		}
		j=35;//zmeczenie do naliczenia
		adres = adres+"&j"+i+j+"="+sum;
	}
        //2021-01-11: jeśli ustawiona zmienna globalna to omiń zapis statystyk do SQL i wypisania efektu do div
        if(!play_1mecz)
        {
            getData44(adres, "screen5");
        } 
	
}

function czas()
{
	for(i=0;i<=1000;i++)
	{
		a = i;
	}
}
function okr()
{
	document.getElementById("screen1").innerHTML = Math.round(2.5455);
}

//For testing
function eke()
{
	//document.getElementById("monitor").className = "motor2";
	//document.write(changes);
	document.getElementById("monu").innerHTML = Math.sin(30);
}
function nr_change(nr,div)
{
	document.getElementById(div).innerHTML="<input type='text' value="+nr+" style='width:18px;'>";
	//nr_change_reset(nr);
}
function nr_change_reset(nr)//zamienia wszystkie inputy na divy
{
	for(var i=1;i<=12;i++)
	{
		if(i!=nr)
		{
		nr = document.getElementById("nr"+i).value;
		document.getElementById("nr"+i).innerHTML="<div onclick=\"nr_change('"+nr+"','nr"+i+"')\" id=\"nr_ch"+i+"\">"+nr+"</div>";
		}
		
	}
}

function trans_notes(id)
{
	adres = "operacje/notes_show.php?id="+id;
	getData_ins(adres, "monitor");
}


function insert_teams_by_lig(sel)
{
	var id_liga=parseInt(sel.options[sel.selectedIndex].value); //mam numer ligi
	
	adres = "wklad_pole/insert_teams_by_lig.php?id_liga="+id_liga;
	getData(adres, "make_druzyna");
//	getData(adres, "make_druzyna");
//document.getElementById("make_druzyn").innerHTML="<option>kutas</option>";
}

function load_team_for_edit(sel)
{
	var id=parseInt(sel.options[sel.selectedIndex].value); //mam numer druzyny
	
	adres = "add_done/load_team_for_edit.php?tryb=1&id="+id;
	getData(adres, "halter");
}
function wstaw_nowy_z_line(line_nr,id)
{
	adres = "add_done/wstaw_nowy_z_line.php?line_nr="+line_nr+"&id="+id;
	getData(adres, "wstaw_nowy_z_line");
}
function create_form(id)
{
var lit = new Array('o','R','P','S','A','P','S','L','R','P','P','S','A','L','R','P','S','A');
var p1_7=document.getElementById("p1_7").value;
var p8_12=document.getElementById("p8_12").value;
var p13_17=document.getElementById("p13_17").value;
var kraj_team=document.getElementById("kraj_team").value;
var wsad="";
for(var i=1;i<=17;i++)
{
	if(i<=7)
	{
	wsad=wsad+"<tr style=\"background-color:#fafdb0;\"><td>"+lit[i]+"</td><td><input type=\"text\" id=\"pool"+i+"\" class=\"input2\" maxlength=\"\" value=\""+p1_7+"\"/></td></tr>";
	}
	else if(i>=8 && i<=12)
	{
	wsad=wsad+"<tr style=\"background-color:#fafdb0;\"><td>"+lit[i]+"</td><td><input type=\"text\" id=\"pool"+i+"\" class=\"input2\" maxlength=\"\" value=\""+p8_12+"\"/></td></tr>";
	}
	else
	{
	wsad=wsad+"<tr style=\"background-color:#fafdb0;\"><td>"+lit[i]+"</td><td><input type=\"text\" id=\"pool"+i+"\" class=\"input2\" maxlength=\"\" value=\""+p13_17+"\"/></td></tr>";
	}
	if(i==7||i==12){wsad=wsad+"<br/>"}
}
wsad=wsad+"<tr><td></td><td><input type=\"button\" value=\"create\" onclick=\"create_team("+id+","+kraj_team+")\" /></td></tr>";
document.getElementById("halter").innerHTML=wsad;

}
function create_team(id,kraj_team)
{
adres="add_done/load_team_for_edit.php?kraj_team="+kraj_team+"&tryb=0&id="+id;
for(var i=1;i<=17;i++)
{
	adres=adres+"&z"+i+"="+document.getElementById("pool"+i).value;	
}
getData(adres, "halter");
}