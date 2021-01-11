var team1 = new Array();
var team2 = new Array();
var stat = new Array();


function getGuest1(d1,d2,k,pl,para,liga)
{
adres = "ask_team.php?d="+d1;//tutaj zmiana folderu
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
	XMLHttpRequestObject.open("GET", adres, true);
	XMLHttpRequestObject.onreadystatechange = function()
    {
      if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
      {
		var xmlDocument = XMLHttpRequestObject.responseXML;
		if (mozillaFlag) 
		{
		  removeWhitespace(xmlDocument);
		}
		displayGuest1(xmlDocument,d1,d2,k,pl,para,liga);
	  }
	}
	XMLHttpRequestObject.send(null);
	}
	return 1;
}

function displayGuest1 (xmldoc,d1,d2,k,pl,para,liga)
{
var machaczenode, personanode, cechnode, idnode;
//var target = document.getElementById("screen1");

machaczenode = xmldoc.documentElement;//machacze
personanode = machaczenode.firstChild;//persona

for(j=1;j<=13;j++)
{
team1[j] = Array(j,j,j);
idnode = personanode.firstChild;//id
for(i=3;i<=34;i++)
{
	var displayText = idnode.firstChild.nodeValue;
	team1[j][i] = displayText;
//	scrf = target.innerHTML;
//	target.innerHTML= scrf + displayText;
	idnode = idnode.nextSibling;
}
team1[j][27]=team1[j][9];team1[j][28]=team1[j][9];
team1[j][50]=100;
//document.write(team1);
//scrf = target.innerHTML;
//target.innerHTML= scrf + "<br />";
personanode = personanode.nextSibling;
}
//document.write(team1[1][25],team1[1][26],team1[1][27],team1[1][28],team1[1][29],team1[1][30]);
getGuest2(d2,d1,k,pl,para,liga);
}


function getGuest2(d,d1,k,pl,para,liga)
{
adres = "ask_team.php?d="+d;
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
	XMLHttpRequestObject.open("GET", adres, true);
	XMLHttpRequestObject.onreadystatechange = function()
    {
      if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
      {
		var xmlDocument = XMLHttpRequestObject.responseXML;
		if (mozillaFlag) 
		{
		  removeWhitespace(xmlDocument);
		}
		displayGuest2(xmlDocument,d1,d,k,pl,para,liga);
	  }
	}
	XMLHttpRequestObject.send(null);
	}
	return 1;
}

function displayGuest2 (xmldoc,d1,d2,k,pl,para,liga)
{
var machaczenode, personanode, cechnode, idnode;
//var target = document.getElementById("screen1");

machaczenode = xmldoc.documentElement;//machacze
personanode = machaczenode.firstChild;//persona

for(j=1;j<=13;j++)
{
team2[j] = Array(j,j,j);
idnode = personanode.firstChild;//id
for(i=3;i<=34;i++)
{
	var displayText = idnode.firstChild.nodeValue;
	team2[j][i] = displayText;
	//scrf = target.innerHTML;
	//target.innerHTML= scrf + displayText;
	idnode = idnode.nextSibling;
}
team2[j][27]=team2[j][9];team2[j][28]=team2[j][9];
team2[j][50]=100;
//scrf = target.innerHTML;
//target.innerHTML= scrf + "<br />";
personanode = personanode.nextSibling;
}
//document.write(team2[13][12]);
tir_zm_gen(d1,d2,k,pl,para,liga);
}

function removeWhitespace(xml)
{
	var loopIndex;
	for (loopIndex=0; loopIndex < xml.childNodes.length; loopIndex++) 
	{
		var currentNode = xml.childNodes[loopIndex];
		
		if (currentNode.nodeType == 1) 
		{
		  removeWhitespace(currentNode);
		}
		if (((/^\s+$/.test(currentNode.nodeValue))) && (currentNode.nodeType == 3)) 
		{
		  xml.removeChild(xml.childNodes[loopIndex--]);
		}
	}
}


function getGuest(k, pl, para, liga) //pobiera pary do kolejki: k - nr kolejki; pl - id teamu gracza; para - nr pary,
{
adres = "operacje/ask_kolejka.php?kol="+k+"&liga="+liga;
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
	XMLHttpRequestObject.open("GET", adres, true);
	XMLHttpRequestObject.onreadystatechange = function()
    {
      if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
      {
		var xmlDocument = XMLHttpRequestObject.responseXML;
		if (mozillaFlag) 
		{
		  removeWhitespace(xmlDocument);
		}
		display_kol(xmlDocument,k,pl,para,liga);//k - nr kolejki; pl - id teamu gracza; para - nr pary
	  }
	}
	XMLHttpRequestObject.send(null);
}
	return 1;
}

function display_kol(xmldoc,k,pl,para,liga)//j to parametr odpowiadajacy kolejnej parze - 
{
var meczenode, paranode, hostnode,dd1,dd2;
//var target = document.getElementById("screen1");

meczenode = xmldoc.documentElement;//machacze
paranode = meczenode.firstChild;//persona

for(j=1;j<=24;j++) //info ile par obrobi - można pobrać wg ligi ile ma być par - ale puchary?? TEMP: 5 ?
{
hostnode = paranode.firstChild;
guestnode = hostnode.nextSibling;
d1 = hostnode.firstChild.nodeValue;
d2 = guestnode.firstChild.nodeValue;
 if(para == j)
 {
 	if(document.getElementById("see"+d1+d2).checked)
	{
		para++;
	}
	else
	{
		play_meczyk_tlo(d1, d2, k, pl, para, liga);//!!! //k - nr kolejki; pl - id teamu gracza; para - nr pary
	} 
 }	
scfrg = document.getElementById("monu").innerHTML;
document.getElementById("monu").innerHTML = scfrg + ""+ d1+" "+d2+" "+ k+"; ";

paranode = paranode.nextSibling;
}

}

function getStat()
{
adres = "operacje/ask_stat.php";
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
	XMLHttpRequestObject.open("GET", adres, true);
	XMLHttpRequestObject.onreadystatechange = function()
    {
      if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
      {
		var xmlDocument = XMLHttpRequestObject.responseXML;
		if (mozillaFlag) 
		{
		  removeWhitespace(xmlDocument);
		}
		displayStat(xmlDocument);
	  }
	}
	XMLHttpRequestObject.send(null);
	}
	return 1;
}

function displayStat(xmldoc)
{
var machacnode, machnode, anode;

machacnode = xmldoc.documentElement;
machnode = machacnode.firstChild;

for(j=1;machnode;j++)
{
stat[j] = Array(j,j);
anode = machnode.firstChild;
for(i=0;i<=19;i++)
{
	var displayText = anode.firstChild.nodeValue;
	stat[j][i] = displayText;
	anode = anode.nextSibling;
}
machnode = machnode.nextSibling;
}
//document.write(stat);
}
function ins_t(a)
{	
	document.getElementById(a).innerHTML='<input id="a'+2+'" value='+document.getElementById(a+'1').innerHTML+'>';
}
function zap_t(a)
{	
	document.getElementById(a).innerHTML='<div id="a'+1+'" onclick="ins_t('+a+')>'+document.getElementById(a+'2').value+'</div>';
}