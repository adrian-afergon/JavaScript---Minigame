/*
    NAVE.JS
    Este fichero contiene la codificación necesaria para manipular la nave, su cola y eventos con dichos elementos.
    A diferencia de los meteoritos, NO son objetos, una posible mejora para una versión posterior, sería reemplazar
    este sistema, por el de objetos usado con los meteoritos.
*/

//Esta funcion detecta un choque con la energia, la cola o con un meteorito
function choque(i,j,objeto)
{
    var resultado = true;
    var posicionComprobar = document.getElementById(i+"-"+j);
    for (k in posicionComprobar.childNodes)
    {
        if(posicionComprobar.childNodes[k].className==objeto)
        {
            resultado = false;
        }    
    }
    return resultado;
}
//Esta función dibuja la nave en el tablero
function crearNave()
{
    var posInicial = document.getElementById('9-9');
    var nave = document.createElement('div');
    nave.setAttribute("style","background-image:url(images/sprites.png)");
    nave.setAttribute("class","naveUp");
    nave.setAttribute("id","nave");
    posInicial.appendChild(nave);
    crearCola(nave);
    return true;
}
//Nos devuelve las coordenadas en las que se encuentra la nave en función del id del td que la contiene
function localizarNave(nave)
{
    var posicion = nave.parentNode;
    var id_posicion = posicion.id;
    var coordenadas = id_posicion.split("-");
    var coordenadas_numericas = new Array();
    for (k in coordenadas)
    {
        coordenadas_numericas.push(parseInt(coordenadas[k]));
    }
    return coordenadas_numericas;
}
//funcion que realiza el movimiento de la cola, recibe la posicion a la que se va a mover y el elemento de la cola que va a mover
function moverCola(nueva_posicion , cola)
{
    //cola = "cola1", "cola2"... es donde estamos
    //nueva_posicion = "[1][1]", "[2][2]" es a la que queremos que se mueva
    //actual será donde estabamos, pero que ya nos movimos
    var cola = document.getElementById(cola);
    var actual = cola.parentNode;
    var destino = document.getElementById(nueva_posicion[0]+"-"+nueva_posicion[1]);//Sustituir por la escritura
    cola.parentNode.removeChild(cola);
    destino.appendChild(cola);
    var coordenadas_actuales = actual.id.split("-");//Obtenemos las coordenadas donde estaba antes de moverse
    var coordenadas_numericas = new Array(2);
    for (k in coordenadas_actuales)
        coordenadas_numericas[k] = parseInt(coordenadas_actuales[k]);
    return coordenadas_numericas;//Devolvemos un array donde se encuentran las coordenadas x,y de donde donde se encontraba
}

//Definimos las funciones de movimiento, comprobando si choca con algo antes de mover, para que en función de ello realice las
//acciones pertinentes (OPTIMIZACIÓN: refactorizar los movimientos tal y como se hizo con el mmovimiento del meteorito).
//Solo comentaremos moverArriba ya que las demás funcionan igual.
function moverArriba()
{
    var nave = document.getElementById('nave');
    var coordenadas_numericas = localizarNave(nave);
    if (coordenadas_numericas[0] - 1 >= 0)
    {
        if (choque(coordenadas_numericas[0] - 1,coordenadas_numericas[1],"cola") == true)//No permite movernos a través de la cola
        {
            if (choque(coordenadas_numericas[0] - 1,coordenadas_numericas[1],"meteorito") == true)
            {
                var nueva_posicion = document.getElementById((coordenadas_numericas[0] - 1)+"-"+coordenadas_numericas[1]);
                nave.className="naveUp";
                if (choque(coordenadas_numericas[0] - 1,coordenadas_numericas[1],"energy") == false)
                {
                    energia = 100;
                    borrarEnergia();
                }    
                nave.parentNode.removeChild(nave);
                var actual = coordenadas_numericas;
                for (var i = 1 ; i <= 5 ; i++)//Recorremos la cola para irla moviendo
                {
                    var actual = moverCola(actual,("cola"+i));
                }
                nueva_posicion.appendChild(nave);
            }
            else//Si choca con el meteorito, perdemos, ES NECESARIO COMPROBAR EL CHOQUE TANTO EN EL METEORITO COMO EN LA NAVE
            {
                gameOver();
            }
        } 
    }
    return true;
}

function moverAbajo()
{
    var nave = document.getElementById('nave');
    var coordenadas_numericas = localizarNave(nave);
    if(coordenadas_numericas[0] + 1 < 20)
    {
        if (choque(coordenadas_numericas[0] + 1,coordenadas_numericas[1],"cola") == true)
        {
            if (choque(coordenadas_numericas[0] + 1,coordenadas_numericas[1],"meteorito") == true)
            {
                var nueva_posicion = document.getElementById((coordenadas_numericas[0] + 1)+"-"+coordenadas_numericas[1]);
                nave.className="naveDown";
                if (choque(coordenadas_numericas[0] + 1,coordenadas_numericas[1],"energy") == false)
                {
                    energia = 100;
                    borrarEnergia();
                }
                nave.parentNode.removeChild(nave);
                var actual = coordenadas_numericas;
                for (var i = 1 ; i <= 5 ; i++)
                {
                    var actual = moverCola(actual,("cola"+i));
                }
                nueva_posicion.appendChild(nave);
            }
            else
            {
                gameOver();
            }
        } 
    }
    return true;
}

function moverIzquierda()
{
    var nave = document.getElementById('nave');
    var coordenadas_numericas = localizarNave(nave);
    if (coordenadas_numericas[1] - 1 >= 0)
    {
        if (choque(coordenadas_numericas[0],coordenadas_numericas[1]-1,"cola") == true)
        {
            if (choque(coordenadas_numericas[0],coordenadas_numericas[1]-1,"meteorito") == true)
            {
                var nueva_posicion = document.getElementById(coordenadas_numericas[0]+"-"+(coordenadas_numericas[1]-1));
                nave.className="naveLeft";
                if (choque(coordenadas_numericas[0],coordenadas_numericas[1]-1,"energy") == false)
                {
                    energia = 100;
                    borrarEnergia();
                }
                nave.parentNode.removeChild(nave);
                var actual = coordenadas_numericas;
                for (var i = 1 ; i <= 5 ; i++)
                {
                    var actual = moverCola(actual,("cola"+i));
                }
                nueva_posicion.appendChild(nave);
            }
            else
            {
                gameOver();
            } 
        }
    }
    return true;
}
function moverDerecha()
{
    var nave = document.getElementById('nave');
    var coordenadas_numericas = localizarNave(nave);
    if (coordenadas_numericas[1] + 1 < 20)
    {
        if (choque(coordenadas_numericas[0],coordenadas_numericas[1]+1,"cola") == true)
        {
            if (choque(coordenadas_numericas[0],coordenadas_numericas[1]+1,"meteorito") == true)
            {
                var nueva_posicion = document.getElementById(coordenadas_numericas[0]+"-"+(coordenadas_numericas[1]+1));
                nave.className="naveRight";
                if (choque(coordenadas_numericas[0],coordenadas_numericas[1]+1,"energy") == false)
                {
                    energia = 100;
                    borrarEnergia();
                }
                nave.parentNode.removeChild(nave);
                var actual = coordenadas_numericas;
                for (var i = 1 ; i <= 5 ; i++)
                {
                    var actual = moverCola(actual,("cola"+i));
                }
                nueva_posicion.appendChild(nave);
            }
            else
            {
                gameOver();
            }
        }
    }
    return true;
}
//Esta función crea la cola de la nave
function crearCola(nave)
{
    var coordenada = nave.parentNode.id.split("-");//Obtenemos las coordenadas de la nave
    var coordenadas_numericas = new Array(2);
    for (k in coordenada)
        coordenadas_numericas[k] = parseInt(coordenada[k]);//Las guardamos como int
    for (var i = 1 ; i <= 5 ; i++)//Creamos los 5 elementos de la cola
    {
        var elementoEscribir = document.getElementById((coordenadas_numericas[0]+i)+"-"+coordenadas_numericas[1]);
        var cola = document.createElement('div');
        cola.setAttribute("style","background-image:url(images/sprites.png)");
        cola.setAttribute("class","cola");
        cola.setAttribute("id","cola"+i);
        elementoEscribir.appendChild(cola);
    }
    return true;
}