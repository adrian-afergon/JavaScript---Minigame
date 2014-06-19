/*
   METEORITOOBJETO.JS:
   Este fichero contiene toda la estructura del objeto meteorito (y por lo tanto el objeto coordenada).
   En el encontramos las propiedades y funciones básicas de operación con el meteorito.
   Los meteoritos creados se almacenarán en un array, el cual se recorrera cada X tiempo para rediujar los meteoritos.
   Los meteoritos pueden ser eliminados de este array, lo que implica que no se volverán a dibujar.
*/
//Definimos el array que almacenara los objetos meteorito
campoMeteoritos = new Array();

//definimos los getter y setter del objeto coordenadas
function setX(x)
{
    this.x=x;
    return true;
}
function setY(y)
{
    this.y=y;
    return true;
}
function getX()
{
    return this.x;
}
function getY()
{
    return this.y;
}
//Definimos el objeto coordenadas
function coordenadas()
{
    this.x = 0;
    this.y = Math.floor(Math.random() * ROWS);//La coordenada y se genera con un random
    this.setX = setX;
    this.setY = setY;
    this.getX = getX;
    this.getY = getY;
    return true;
}
//crearMeteorito es la funcion (independiente del objeto meteorito), que recibiendo un id, crea los meteoritos
//y los añadade a nuestro array, despues llama al metodo dibujar.
function crearMeteorito(id)
{
    var meteo = new meteorito(id)
    campoMeteoritos.push(meteo);
    meteo.dibujar();
    return true;
}

//Destruir es un método del objeto meteorito, nos permite eliminar ese objeto del campoMeteoritos.
//Además una vez destruido, creará uno nuevo.
function destruir()
{
    var nuevo = this.id;
    for (var k in campoMeteoritos)
    {
        if (campoMeteoritos[k].id == nuevo)
        {
            delete campoMeteoritos[k];
        }
    }
    crearMeteorito(nuevo);    
}
//El metodo mover detecta el tipo de movimiento del objeto y en función de ello modificará sus coordenadas,
//de no encontrarse en las dimensiones permitidas, destruye el meteorito.
function mover()
{
    if(this.estaEnElTablero())
    {
        var x = this.coordenadas.getX();
        var y = this.coordenadas.getY();
        switch(this.getTipoMovimiento())
        {
            case 0:
                this.coordenadas.setX(++x);
                break;
            case 1:
                this.coordenadas.setX(++x);
                this.coordenadas.setY(++y);
                break;
            case 2:
                this.coordenadas.setY(--y);
                this.coordenadas.setX(++x);
                break;
        }
    }
    else
    {
        this.destruir();
    }
}
//El metodo chocaraConAlgo comprobará si el meteorito tendra una colision con la nave, con la cola o con otros meteoritos
//En función del caso, actuará de una manera u otra
function chocaraConAlgo()
{
    var posicionNave = document.getElementById("nave").parentNode.id.split("-");
    var posicionCola = new Array(
        document.getElementById("cola1").parentNode.id.split("-"),
        document.getElementById("cola2").parentNode.id.split("-"),
        document.getElementById("cola3").parentNode.id.split("-"),
        document.getElementById("cola4").parentNode.id.split("-"),
        document.getElementById("cola5").parentNode.id.split("-"));
    
    if (this.coordenadas.getX() == posicionNave[0] && this.coordenadas.getY() == posicionNave[1])
    {
        //Choca con la nave, fin del juego
        gameOver();
    }
    else
    {
        for (var k in posicionCola)
        {

            if(this.coordenadas.getX() == posicionCola[k][0] && this.coordenadas.getY() == posicionCola[k][1]) 
            {
                //Choca con la cola, se destruye el meteorito, suma puntos
                this.borrarDibujo();
                this.destruir();
                sumaPuntos();
            }
        }
    }
    for (var meteo in campoMeteoritos)
    {
        //Choca con otro meteorito, se destruye el meteorito
        if ((this.coordenadas.getX() == campoMeteoritos[meteo].coordenadas.getX()) && 
            (this.coordenadas.getY() == campoMeteoritos[meteo].coordenadas.getY()) && 
            (this.getId() != campoMeteoritos[meteo].getId())
            )//Comprueba que no choca con algun meteorito en esas coordenadas y que no es él mismo
        {
            this.borrarDibujo();
            this.destruir();
        }
    }
}

//Este metodo dibujara nuestro objeto en el tablero
function dibujar()
{
    if(this.estaEnElTablero())
    {
        var posInicial = document.getElementById(this.coordenadas.getX()+"-"+this.coordenadas.getY());
        var meteoritoHTML = document.createElement('div');
        meteoritoHTML.setAttribute("class",this.clase);
        meteoritoHTML.setAttribute("style","background-image:url(images/sprites.png)");
        posInicial.appendChild(meteoritoHTML);
    }
}
//Este metodo borrará el meteorito de la posicion anterior (es decir, solo debería llamarse despues de haber sido movido)
function borrarDibujo()
{
    var x = this.coordenadas.getX();
    var y = this.coordenadas.getY();
    switch(this.tipoMovimiento)
    {
    case 0:
        x--;
        break;
    case 1:
        x--;
        y--;
        break;
    case 2:
        x--;
        y++; 
        break;
    }
    if (y >= 0 && x >=0 && x <ROWS)
    {    
        var posInicial = document.getElementById(x+"-"+y);
        var imgMeteoritos = posInicial.childNodes;
        for (var m = 0; m<posInicial.childNodes.length;m++)
        {
            posInicial.removeChild(posInicial.childNodes[m]);
        }
    }
}
//El método estaEnElTablero, nos devolverá true o false, dependiendo si el meteorito está dentro de las coordenadas
//permitidas o no
function estaEnElTablero()
{
    return (this.coordenadas.getX() < ROWS && this.coordenadas.getY() < COLUMNS) && 
    (this.coordenadas.getX() < ROWS && this.coordenadas.getY() >= 0);
}
//Definimos los getter del objeto meteorito
function getTipoMovimiento()
{
    return this.tipoMovimiento;
}

function getId()
{
    return this.id;
}
//Definimos el objeto meteorito
function meteorito(id)
{
    this.id = id;
    this.imagen = "images/meteorito.png";
    this.clase = "meteorito";
    this.coordenadas = new coordenadas;
    this.dibujar = dibujar;
    this.mover = mover;
    this.tipoMovimiento = Math.floor(Math.random() * 3);
    this.getTipoMovimiento = getTipoMovimiento;
    this.estaEnElTablero = estaEnElTablero;
    this.chocaraConAlgo = chocaraConAlgo;
    this.destruir = destruir;
    this.borrarDibujo = borrarDibujo;
    this.getId = getId;
}

//Funcion independiente al objeto meteorito que cada X tiempo moverá los meteoritos, los borrará y volverá a dibujar en el tablero
function ubicarMeteoritos()
{
    var tiempoMovimiento = 1000/nivel;
    //crear la funcion timer, que recorra el array y cada segundo mueva los meteoritos del mismo y los redibuje
    //falta limpiar los meteoritos que ya existen en el tablero
    timer = window.setInterval(function () {
        var longitud = campoMeteoritos.length -1;
        for (var i = longitud; i >= 0; i--)
        {
            if (campoMeteoritos[i] !== undefined)
            {
                campoMeteoritos[i].mover();
            }
            if (campoMeteoritos[i] !== undefined) 
            {
                campoMeteoritos[i].chocaraConAlgo();
            }
            if (campoMeteoritos[i] !== undefined)
            {
                campoMeteoritos[i].dibujar();
                campoMeteoritos[i].borrarDibujo();
            }
        }
        },tiempoMovimiento);
}