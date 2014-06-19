/*
    MENU.JS
    En este fichero residen las funciones necesarias para la creación de los distintos menús del juego
*/
//Crea la cabecera fíja del menú
function crearCabeceraMenu()
{
    borrarMarcador("puntuacion");
    borrarMarcador("energia");
    borrarMarcador("botonReinicio");
    borrarMarcador("botonSalir");
    borrarMarcador("usuario");
    tablero.removeChild(tablero.firstChild);
    var div = document.createElement('div');
    div.setAttribute('class','pantalla');
    var titulo = document.createElement('h2');
    titulo.setAttribute('id','titulo');
    var texto = document.createTextNode('Space Avenger');
    titulo.appendChild(texto);
    div.appendChild(titulo);
    return div; 
}
//Crea el pie fijo del menú
function crearPieMenu(div)
{
    var atras = document.createElement('input');
    atras.setAttribute("type","button");
    atras.setAttribute("value","Atrás");
    atras.setAttribute('class','botonMenu');
    atras.addEventListener('click',cargarMenu,false);
    div.appendChild(atras); 
    tablero.appendChild(div);
}
//Crea el menú Ayuda
function iniciarAyuda()
{
    var divAyuda = crearCabeceraMenu();
    divAyuda.innerHTML += "La finalidad del juego es esquivar los meteoritos y hacer que estos choquen contra la colade esta manera, sumará puntos.";
    divAyuda.innerHTML += "Intente alcanzar la máxima puntuación antes de que se acabe la enegira.";
    divAyuda.innerHTML += "Si esto ocurre, recoja las baterias que aparecen en el mapa.";
    divAyuda.innerHTML += "<ul id='help'><li>Use las flechas de dirección para moverse.</li><li>Pulse R o haga click para reiniciar.</li><li>Pulsa Q o haga click para finalizar.</li></ul>";

    crearPieMenu(divAyuda);
}
//Función del boton salir, para cerrar la ventana (solo funciona en IE (y chrome si se ejecuta desde un IDE))
function iniciarSalir()
{
    self.close();
}

//Función que genera el menú de records
function iniciarRecords()
{
    inGame = false;
    var divRecords = crearCabeceraMenu();
    var record = visualizarDatos();
    var texto = document.createTextNode(record);
    divRecords.appendChild(texto);    
    crearPieMenu(divRecords);
}

//Función que crea los elementos del formulario
function crearFormulario(div,nombre)
{
    var label = document.createElement('label');
    var texto = document.createTextNode(nombre+':');
    label.appendChild(texto);
    div.appendChild(label);
    var input = document.createElement('input');
    input.setAttribute('id',nombre);
    input.setAttribute('type','text');
    input.setAttribute('name',nombre);
    div.appendChild(input);
    return div;
}

//Función que almacena el nick definido
function cogerNick()
{
    var input = document.getElementById('Nick');
    usuario = input.value;
    iniciarNivel();
}

//Función que genera el menú formulario
function iniciarFormulario()
{
    var divFormulario = crearCabeceraMenu();
    for (var i = 0; i < 3; i++)//Creamos los elementos del menú
    {
        switch(i)
        {
            case 0:
                divFormulario = crearFormulario(divFormulario,"Nombre");
                break;
            case 1:
                divFormulario = crearFormulario(divFormulario,"Correo");
                break;
            case 2:
                divFormulario = crearFormulario(divFormulario,"Nick");
                break;
        }
    }
    var boton = document.createElement('input');
    boton.setAttribute('type','button');
    boton.setAttribute('class','botonMenu');
    boton.setAttribute('value','Comenzar');
    boton.addEventListener('click',cogerNick,false);    
    divFormulario.appendChild(boton);
    tablero.appendChild(divFormulario);
}

//Esta función genera el menú principal 
function cargarMenu()
{
    inGame = false;
    //Creamos la cabecera (no se puede sustituir por la función general, porque en este caso le generamos un id en concreto)
    borrarMarcador("puntuacion");
    borrarMarcador("energia");
    borrarMarcador("botonReinicio");
    borrarMarcador("botonSalir");
    borrarMarcador("usuario");
    tablero.removeChild(tablero.firstChild);
    var menu = document.createElement('div');
    menu.setAttribute('id','menu');
    menu.setAttribute('class','pantalla');
    tablero.appendChild(menu);
    var titulo = document.createElement('h2');
    titulo.setAttribute('id','titulo');
    var texto = document.createTextNode('Space Avenger');
    titulo.appendChild(texto);
    menu.appendChild(titulo);

    //Creamos los botones:
    var boton = document.createElement('input');
    boton.setAttribute('class','botonMenu');
    boton.setAttribute('type','button');
    boton.setAttribute('value','Start');
    boton.addEventListener('click',iniciarFormulario,false);
    menu.appendChild(boton);

    var boton = document.createElement('input');
    boton.setAttribute('class','botonMenu');
    boton.setAttribute('type','button');
    boton.setAttribute('value','Records');
    boton.addEventListener('click',iniciarRecords,false);
    menu.appendChild(boton);

    var boton = document.createElement('input');
    boton.setAttribute('class','botonMenu');
    boton.setAttribute('type','button');
    boton.setAttribute('value','Ayuda');
    boton.addEventListener('click',iniciarAyuda,false);
    menu.appendChild(boton);

    var boton = document.createElement('input');
    boton.setAttribute('class','botonMenu');
    boton.setAttribute('type','button');
    boton.setAttribute('value','Salir');
    boton.addEventListener('click',iniciarSalir,false);
    menu.appendChild(boton);
}