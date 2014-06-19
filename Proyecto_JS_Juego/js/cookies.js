/*
	COOKIE.JS
	Esta función define el tratamiento de la cookie, la obtención, comprobación de puntos con la misma
	y el borrado si fuese necesario.
*/

//Lee la cookie si existe
function leerCookie()
{
	var x= document.cookie.split(";");

	if (x != "")
	{
		if(x.length > 0)
		{
			var longitud=x[1].length;
			x[0] = x[0].substr(9,longitud)
			x[1] = parseInt(x[1].substr(12,longitud));
			resultado = x;
		}
	}
	return x;
}

//Construye el mensaje de Records, si la cookie existe
function visualizarDatos(x)
{
	var x = leerCookie();
	if (x!="")
	{
		var resultado =("El usuario con más puntos es: "+x[0]+" con una puntuación de: "+x[1]);
	}
	return resultado;
}

//Borra la cookie
function borrarCookie()
{
	document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

//Compara la puntuación obtenida con la de la cookie
function compararPuntuacion(x)
{
	var d = new Date();
	d.setTime(d.getTime()+(360*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	if (x[1] != undefined)//Si existe
	{
		if (x[1] <= puntuacion)//Y la puntuación obtenida es mayor, la almacena
		{
			document.cookie="username="+usuario+";"+expires;
			document.cookie="puntuacion="+puntos+";"+expires;
		}
	}
	else//Si no existe, la crea
	{
		document.cookie="username="+usuario+";"+expires;
		document.cookie="puntuacion="+puntos+";"+expires;
	}
}