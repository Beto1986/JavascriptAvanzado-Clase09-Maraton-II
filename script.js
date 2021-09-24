// https://docs.google.com/document/d/1lXWesCLFSNN9CbWflDBN98C2dW1kD7aMA-VP1J3GDck/edit

// 1) Eureka! Nuestra web tendrá una lamparita (imagen o hecha con css), que al oprimir una tecla se encienda y al soltarla se apague(cambia de estilo o imagen). Si la quiero prender y ya está prendida, no hace nada. Lo mismo con el apagado.

// Defino los 2 botones (Encendido/Apagado) y la imagen
let botonencendido = document.querySelector("#encendido");
let botonapagado = document.querySelector("#apagado");
let imgLampara = document.querySelector("#imagenlampara");

const apagado = () => {
    // 0 significa que está apagado
    if (botonapagado.value == 0) {
        console.log("apagado")
        imgLampara.src = `img/lampara-apagada.jpg`
    }
}

const encendido = () => {
    // 1 significa que está encendido
    if (botonencendido.value == 1) {
        console.log("encendido")
        imgLampara.src = `img/lampara-prendida.jpg`
    }
}

botonapagado.addEventListener("click", apagado);
botonencendido.addEventListener("click", encendido);
imgLampara.addEventListener("click", apagado); // Por default dejo la lampara apagada

/* 2) Crear un elemento (puede ser cualquier cosa, un cuadrado, círculo, imagen, etc) que cuente la cantidad de veces que se le pasó el mouse por encima. 
Mostrar en un mensaje la cantidad de veces sumadas e ir actualizandolo cada vez que agregue 1.
Ejemplo: Que diga “Usted pasó el mouse 2 veces”.*/

const cuadrado = document.querySelector("#cuadrado");
const informarVeces = document.querySelector("#informarVeces");
let contarVeces = 0;

// Cuento cada vez que me posiciono sobre el cuadrado 
const contar = () => {
    // Cuento la cantidad de veces que voy pasando con el mouse
    contarVeces = contarVeces + 1;
    // Arrancamos seteados en 0
    if (informarVeces.value == 0) {
        informarVeces.value = `Usted pasó el mouse ${contarVeces} vez`;
    } else {
        informarVeces.value = `Usted pasó el mouse ${contarVeces} veces`
    }
}

cuadrado.addEventListener("mouseover", contar);

/* 3) Vamos a crear una app para que cada vez que aprete un botón, me muestre un usuario aleatorio utilizando la siguiente API: https://randomuser.me/api
Mostrar 3 o 4 datos del usuario. */

// Ejemplo de implementacion de API (https://randomuser.me/api)
const botonusuario = document.querySelector("#botonusuario");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const direccion = document.querySelector("#direccion");
const mail = document.querySelector("#mail");

const traerUsuario = () => {

    const usuarios = new XMLHttpRequest(); // Crear un objeto de tipo REQUEST
    const url = 'https://randomuser.me/api'; // Definimos la URI que queremos llamar
    const method = "GET" // Definimos el metodo
    usuarios.open(method, url); // Preparamos y abrimos la conexion HTTP
    usuarios.send(); // Ejecutamos la conexion HTTP
    //console.log(usuarios);

    // Una vez que se recibió la respuesta OK.(operación completada)
    usuarios.onreadystatechange = (e) => { // Creamos un evento que escucha y espera a que cambie el estado de mi peticion

        //console.log(usuarios); // texto en xml (sin conversion JSON)
        usuario = JSON.parse(usuarios.responseText); // Guardamos en una variable y convertimos la respuesta a JSON
        //console.log(usuario.results[0]); // texto convertido a JSON

        // Busco el nombre, apellido, direccion y mail y lo muestro en los input
        nombre.value = `${usuario.results[0].name.first}`;
        apellido.value = `${usuario.results[0].name.last}`;
        direccion.value = `${usuario.results[0].location.street.name} ${usuario.results[0].location.street.number}`;
        mail.value = `${usuario.results[0].email}`;

    }
}

botonusuario.addEventListener("click", traerUsuario)

/* 4) Crear un juego de piedra papel o tijera! Tenemos la tres opciones y al elegir, saldrá aleatoriamente lo que eligió la computadora. Mostrar el resultado.
Ejemeplo: Si elegí tijera, y aleatoriamente la computadora sacó piedra, entonces mostrar que he perdido. */

// Defino los botones a utilizar
const botonPiedra = document.querySelector("#piedra");
const botonPapel = document.querySelector("#papel");
const botonTijera = document.querySelector("#tijera");
let maquina = 0; // Respresenta el numero aleatorio que va a sacar la máquina(0-> Piedra, 1-> Papel y 2-> Tij.)

const jugarMaquina = () => {
    // Ejecuto el random para la máquina.
    maquina = parseInt((Math.random() * 3));
    if (maquina == 0) {
        console.log("Máquina: piedra")
    } else if (maquina == 1) {
        console.log("Máquina: papel")
    } else {
        console.log("Máquina: tijera")
    }
    return maquina;
}

const determinarGanador = (valorElegido, valorMaquina) => {

    switch (valorMaquina) {
        case 0:
            if (valorElegido === 2) {
                console.log("La máquina gana porque sacó piedra")
            } else if (valorElegido === 1) {
                console.log("Usted gana porque sacó papel")
            } else {
                console.log("Es un empate");
            }
            break;
        case 1:
            if (valorElegido === 0) {
                console.log("La máquina gana porque sacó papel")
            } else if (valorElegido === 2) {
                console.log("Usted gana porque sacó tijera")
            } else {
                console.log("Es un empate");
            }
            break;
        case 2:
            if (valorElegido === 1) {
                console.log("La máquina gana porque sacó tijera")
            } else if (valorElegido === 0) {
                console.log("Usted gana porque sacó piedra")
            } else {
                console.log("Es un empate");
            }
            break;
        default:
            break;
    }
}

// Si presiono Piedra
const presionarPiedra = () => {
    console.log("Usted: piedra")
        // Asigno el valor del boton a una variable para pasarla por parámetro
    const piedra = parseInt(botonPiedra.value);
    // Dependiendo lo que sacó la maquina (0 = Piedra, 1 = Papel y 2 = Tijera)
    jugarMaquina();
    // Comparo elección vs máquina
    determinarGanador(piedra, maquina);
}

// Si presiono Papel
const presionarPapel = () => {
    console.log("Usted: papel")
        // Asigno el valor del boton a una variable para pasarla por parámetro
    const papel = parseInt(botonPapel.value);
    // Dependiendo lo que sacó la maquina (0 = Piedra, 1 = Papel y 2 = Tijera)
    jugarMaquina();
    // Comparo elección vs máquina
    determinarGanador(papel, maquina);
}

// Si presiono Tijera
const presionarTijera = () => {
    console.log("Usted: tijera")
        // Asigno el valor del boton a una variable para pasarla por parámetro
    const tijera = parseInt(botonTijera.value);
    // Dependiendo lo que sacó la maquina (0 = Piedra, 1 = Papel y 2 = Tijera)
    jugarMaquina();
    // Comparo elección vs máquina
    determinarGanador(tijera, maquina);
}

// Si se presiona el boton de piedra, papel o tijera.
botonPiedra.addEventListener("click", presionarPiedra)
botonPapel.addEventListener("click", presionarPapel)
botonTijera.addEventListener("click", presionarTijera)


/* 5) Crear un cronómetro. Puede iniciar apretando un botón o con el evento que prefieran y empezar a contar segundos y minutos. Arranca en 0 y va subiendo infinitamente. */

// 1 segundo --> 100 centesimas
// 1 centesima --> 0.01 segundo
// 10 milisegundos --> 0.01 segundo

// Seteo los valores en 0.
let centesimas = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;

// Defino los botones a utilizar
const iniciar = document.querySelector("#iniciar");
const pausar = document.querySelector("#pausar");
const continuar = document.querySelector("#continuar");
const reiniciar = document.querySelector("#reiniciar");

const botonIniciar = () => {

    control = setInterval(cronometro, 10);

    // Habilito / Deshabilito botones
    iniciar.disabled = true; // Deshabilito el inicio
    pausar.disabled = false; // Habilito parar
    continuar.disabled = true; // Deshabilito el continuado
    reiniciar.disabled = false; // Habilito reiniciar
}

const botonPausar = () => {

    // La función clearInterval detiene la ejecución del cronómetro
    clearInterval(control);

    // Habilito / Deshabilito botones
    pausar.disabled = true; // Deshabilito parar
    continuar.disabled = false; // Habilito continuar
}

const botonReiniciar = () => {

    // Paro el cronómetro
    clearInterval(control);

    // Reinicializo las variables a 0.
    centesimas = 0;
    segundos = 0;
    minutos = 0;
    horas = 0;

    // Seteo el formato origen
    centesimasReloj.innerHTML = ":00";
    segundosReloj.innerHTML = ":00";
    minutosReloj.innerHTML = ":00";
    horasReloj.innerHTML = "00";

    // Habilito / Deshabilito botones
    iniciar.disabled = false; // Habilito inicio
    pausar.disabled = true; // Desabilito parar
    continuar.disabled = true; // Deshabilito continuar
    reiniciar.disabled = true; // Deshabilito reinicio
}

const cronometro = () => {

    // Seteo en -1 para que al sumarizar arranque nuevamente en 0.
    if (centesimas == 99) {
        centesimas = -1;
    }

    // Seteo en -1 para que al sumarizar arranque nuevamente en 0.
    if (segundos == 59) {
        segundos = -1;
    }

    // Seteo en -1 para que al sumarizar arranque nuevamente en 0.
    if (minutos == 59) {
        minutos = -1;
    }

    // Sumarizo las centesimas cuando son menores a 99
    if (centesimas < 99) {
        centesimas++;
        // Como se trata de 2 digitos(HH:MM:SS:CC), al primero lo seteo en 0 si es menor a 10, sino sumo normal
        centesimas < 10 ? centesimas = "0" + centesimas : "";
        // Armo las centesimas
        centesimasReloj.innerHTML = ":" + centesimas;
    }

    // Cuando llego a 0 centesimas, sumo un segundo 
    if (centesimas == 0) {
        segundos++;
        // Como se trata de 2 digitos(HH:MM:SS:CC), al primero lo seteo en 0 si es menor a 10, sino sumo normal
        segundos < 10 ? segundos = "0" + segundos : "";
        // Armo los segundos
        segundosReloj.innerHTML = ":" + segundos;
    }

    // Cuando llego a 0 centesimas y 0 segundos, sumo un minuto
    if ((centesimas == 0) && (segundos == 0)) {
        minutos++;
        // Como se trata de 2 digitos(HH:MM:SS:CC), al primero lo seteo en 0 si es menor a 10, sino sumo normal
        minutos < 10 ? minutos = "0" + minutos : "";
        // Armo los minutos
        minutosReloj.innerHTML = ":" + minutos;
    }

    // Cuando llego a 0 centesimas, 0 segundos y 0 minutos, suma una hora
    if ((centesimas == 0) && (segundos == 0) && (minutos == 0)) {
        horas++;
        // Como se trata de 2 digitos(HH:MM:SS:CC), al primero lo seteo en 0 si es menor a 10, sino sumo normal
        horas < 10 ? horas = "0" + horas : "";
        // Armo la hora
        horasReloj.innerHTML = horas;
    }
}