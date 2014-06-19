/*
    MAIN.JS
    Contiene el funcionamiento básico del juego, en el reside la información principal para jugar,
    variables globales, llamadas a los objetos meteorito, utilizacion de nave.js, almacenamiento de la cookie etc.
*/

/*Definimos las variables globales*/
var tablero = document.getElementById('tablero');
var ROWS = 20;
var COLUMNS = 20;
var nivel = 1;
var over = false;
var puntos = 0;
var timer;
var energia = 100;
var timerEnergia;
var movimiento = true;
var usuario;
var inGame = false;

//Función encargada de eliminar del tablero las células de energía.
function borrarEnergia()
{
    var energia = document.getElementById("energy");
    energia.parentNode.removeChild(energia);
}
//Función encargada de dibujar las células de energia
function generaEnergia()
{
    var x = Math.floor(Math.random() * COLUMNS);//Generamos las coordenadas aleatoriamente
    var y = Math.floor(Math.random() * ROWS);//Generamos las coordenadas aleatoriamente
    var posicion = document.getElementById(x+"-"+y);
    var cargador = document.createElement('div');
    cargador.setAttribute("id","energy");
    cargador.setAttribute("style","background-image:url(images/sprites.png)");
    cargador.setAttribute("class","energy");
    posicion.appendChild(cargador);
}
//Función que se ejecuta recursivamente cada X tiempo, bajando la energia y comprobando la que queda
//para generar celulas de energia o finalizar el juego.
function bajaEnergia()
{
    timerEnergia = window.setInterval(function () {
        energia--;
        var contador = document.getElementById('energia');
        contador.removeChild(contador.firstChild);
        var texto = document.createTextNode("Su energia:"+energia);
        contador.appendChild(texto);
        if (energia == 25)
        {
            alert("Le queda poca energia!!");
            generaEnergia();
        }
        else if(energia == 0)
        {
            gameOver();
        }
    },500/nivel);
}
//Función encargada de aumentar la puntuación, visualizarla y comprobar que se sube o no de nivel
function sumaPuntos()
{
    puntos += 10;
    var contador = document.getElementById('puntuacion');
    contador.removeChild(contador.firstChild);
    var texto = document.createTextNode(puntos + " de " + (Math.pow(10,nivel)));
    contador.appendChild(texto);
    if (puntos >= Math.pow(10,nivel))
    {
        alert("Has subido de nivel!!!");
        nivel++;
        iniciarNivel();
    } 
}

//Función encargada de finalizar el juego, para todos los timers, bloquea el movimiento, lee las cookies
//Compara la puntuacion con la de la cookie y nos envia al menú de records.
function gameOver()
{
    alert("GAME OVER !!");
    clearInterval(timer);
    clearInterval(timerEnergia);
    movimiento = false;
    var x = leerCookie();
    compararPuntuacion(x);
    iniciarRecords();
}

//Función encargada de generar el tablero, con las coordenadas, donde trascurrirá el juego
function crearMapa()
{
	var mapa = document.createElement('table');
	tablero.removeChild(tablero.firstChild);
	for (var i=0;i<ROWS;i++)
	{
    	var tr = document.createElement('tr');
        tr.setAttribute("id","tr-"+i);
    	for(var j=0;j<COLUMNS;j++)
    	{
        	var td = document.createElement('td');
            td.setAttribute("id",i+"-"+j);
        	tr.appendChild(td);
    	}
    	mapa.appendChild(tr);
	}
	tablero.appendChild(mapa);
    return true;
}

//Función que en detectará los eventos de boton y determinará la acción a reiniciar
function pulsa()
{
    document.onkeydown = function() {
        if (movimiento == true)//Si podemos movernos
        {
            switch (arguments[0].keyCode)
            {
                case 40:
                    moverAbajo();
                    break;
                case 38:
                    moverArriba();
                    break;
                case 37:
                     moverIzquierda();
                    break;
                case 39:
                    moverDerecha();
                    break;
            }
        }
        if (inGame == true)//Si nos encontramos en partida
        {
            if (arguments[0].keyCode == 82)
            {
                alert("Ha pulsado R, se reiniciará el nivel");
                iniciarNivel();
            }
            else if (arguments[0].keyCode == 81)
            {
                alert("Ha pulsado Q, Ha decidido salir del juego");
                gameOver();
            }
        }
    }
    return true;
}
//Función encargada de crear los elementos marcadores (en función del parámetro que reciba)
function crearMarcador(elemento)
{
    var marcador = document.createElement('div');
    marcador.setAttribute('id',elemento);
    var texto = document.createTextNode(elemento);
    marcador.appendChild(texto);
    tablero.appendChild(marcador);
    return true;
}
//Elimina un marcador determinado en funcion del parámetro que reciba
function borrarMarcador(elemento)
{
    var marcador = document.getElementById(elemento);
    if (marcador != undefined)
    {
        marcador.parentNode.removeChild(marcador)
    }
    return true;
}
//Crea los botones de reinicio y salir, en la pantalla de juego
function crearBotones()
{
    var boton = document.createElement('div');
    boton.setAttribute('id','botonReinicio');
    var letra = document.createElement('h2');
    var texto = document.createTextNode("R");
    var subTexto = document.createTextNode("Reiniciar");
    letra.appendChild(texto);
    boton.appendChild(letra);
    boton.appendChild(subTexto);
    boton.addEventListener('click',iniciarNivel,false);
    tablero.appendChild(boton);

    var boton = document.createElement('div');
    boton.setAttribute('id','botonSalir');
    var letra = document.createElement('h2');
    var texto = document.createTextNode("Q");
    var subTexto = document.createTextNode("Salir");
    letra.appendChild(texto);
    boton.appendChild(letra);
    boton.appendChild(subTexto);
    boton.addEventListener('click',gameOver,false);
    tablero.appendChild(boton);
    return true;
}
//Rellena la información del usuario y el nivel en el marcador usuario.
function escribirUsuario()
{
        var usuarioHTML = document.getElementById("usuario");
        usuarioHTML.removeChild(usuarioHTML.firstChild);
        var texto = document.createTextNode("Nivel: "+nivel);
        usuarioHTML.appendChild(texto);
        usuarioHTML.appendChild(document.createElement('br'));
        var texto = document.createTextNode(usuario);
        usuarioHTML.appendChild(texto);
}
//función que manda a construir todos los elementos y valores necesarios para iniciar la partida
function iniciarNivel()
{
    inGame = true;//Definimos que estamos en juego
    borrarMarcador("puntuacion");
    borrarMarcador("energia");
    borrarMarcador("botonReinicio");
    borrarMarcador("botonSalir");
    borrarMarcador("usuario");
    clearInterval(timer);//Limpiamos los timer anteriores
    clearInterval(timerEnergia);
    campoMeteoritos = new Array();//Inicializamos el array de meteoritos
    crearMapa();
    crearNave();
    for (var  i = 0 ; i < nivel; i++)
    {
        crearMeteorito(i);
    }
    movimiento = true;//Habilitamos el movimiento
    ubicarMeteoritos();//Construimos los meteoritos
    energia = 100;
    pulsa();
    crearMarcador("usuario");
    escribirUsuario();
    crearMarcador("puntuacion");
    crearMarcador("energia");
    crearBotones();
    puntuacion = (Math.pow(10,(nivel-1)));
    bajaEnergia();   
}
