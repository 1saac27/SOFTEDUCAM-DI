var imagenesRespuestas = [
    {
        imagen: "../assets/img/cabeza_nina.png",
        opciones: ["../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png", "../assets/CUERPO/los sentidos/boca.png"],
        respuesta: "../assets/img/cabeza_nina.png"//1
    },
    {
        imagen: "../assets/CUERPO/los sentidos/oido.png",
        opciones: ["../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png", "../assets/CUERPO/los sentidos/boca.png"],
        respuesta: "../assets/CUERPO/los sentidos/oido.png"//2
    },
    {
        imagen: "../assets/CUERPO/los sentidos/boca.png",
        opciones: ["../assets/CUERPO/los sentidos/boca.png", "../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png"],
        respuesta: "../assets/CUERPO/los sentidos/boca.png"//3
    },
    {
        imagen: "../assets/CUERPO/los sentidos/ojitos_mentirosos.png",
        opciones: ["../assets/CUERPO/los sentidos/ojitos_mentirosos.png", "../assets/img/espalda_nino.png", "../assets/img/cabeza_nino.png"],
        respuesta: "../assets/CUERPO/los sentidos/ojitos_mentirosos.png"//4
    },
    {
        imagen: "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png",
        opciones: ["../assets/CUERPO/los sentidos/boca.png", "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png", "../assets/img/el cuerpo(manos, pies, hombro)/pie.png"],
        respuesta: "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png"//5
    },
    {
        imagen: "../assets/img/el cuerpo(manos, pies, hombro)/manos.png",
        opciones: ["../assets/img/espalda_nino.png", "../assets/img/cabeza_nina.png", "../assets/img/el cuerpo(manos, pies, hombro)/manos.png"],
        respuesta: "../assets/img/el cuerpo(manos, pies, hombro)/manos.png"//6
    },
    {
        imagen: "../assets/img/el cuerpo(manos, pies, hombro)/pie.png",
        opciones: ["../assets/img/el cuerpo(manos, pies, hombro)/pie.png", "../assets/img/cabeza_nino.png", "../assets/CUERPO/los sentidos/nose.png"],
        respuesta: "../assets/img/el cuerpo(manos, pies, hombro)/pie.png"//7
    },
    {
        imagen: "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png",
        opciones: ["../assets/img/el cuerpo(manos, pies, hombro)/hombro.png", "../assets/CUERPO/los sentidos/oido.png", "../assets/CUERPO/los sentidos/esa_mano_arbitro.png"],
        respuesta: "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png"//8
    },
    {
        imagen: "../assets/CUERPO/INICIO.png",
        opciones: ["../assets/CUERPO/INICIO.png", "../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png"],
        respuesta: "../assets/CUERPO/INICIO.png"//9
    },
    {
        imagen: "../assets/img/nina_cuerpo.png",
        opciones: ["../assets/CUERPO/los sentidos/boca.png", "../assets/img/cabeza_nina.png", "../assets/img/nina_cuerpo.png"],
        respuesta: "../assets/img/nina_cuerpo.png"//10
    }
];

// Mapeo entre la ruta de la imagen y la ruta del archivo de audio
var audioMap = {
    "../assets/img/cabeza_nina.png": "../assets/AUDIOS/ELCUERPO/cabeza1.aac",
    "../assets/CUERPO/los sentidos/oido.png": "../assets/AUDIOS/ELCUERPO/oreja.aac",
    "../assets/CUERPO/los sentidos/boca.png": "../assets/AUDIOS/ELCUERPO/boca.aac",
    "../assets/CUERPO/los sentidos/ojitos_mentirosos.png": "../assets/AUDIOS/ELCUERPO/ojos.aac",
    "../assets/img/el cuerpo(manos, pies, hombro)/hombro.png": "../assets/AUDIOS/ELCUERPO/Hombro.aac",
    "../assets/img/el cuerpo(manos, pies, hombro)/manos.png": "../assets/AUDIOS/ELCUERPO/manos.aac",
    "../assets/img/el cuerpo(manos, pies, hombro)/pie.png": "../assets/AUDIOS/ELCUERPO/pied.aac",
    "../assets/CUERPO/INICIO.png": "../assets/AUDIOS/ELCUERPO/cuerpo.aac",
    "../assets/img/nina_cuerpo.png": "../assets/AUDIOS/ELCUERPO/piernas.aac"
};

var indiceActual = 0;
var confettiInstance = null; // Variable global para ConfettiJS

// Ruta del audio para el botón boton-audio
var audioBotonGeneralSrc = "../assets/AUDIOS/ELCUERPO/escuha y seleccionaimg.aac";
// Asociar el audio al botón de audio general llamado boton-audio
var audioBotonGeneral = document.querySelector('.boton-audio');
audioBotonGeneral.onclick = function() {
    var audio = new Audio(audioBotonGeneralSrc);
    audio.play();
};

// Función para verificar la respuesta cuando se hace clic en una imagen
function verificarRespuesta(imagenClicada) {
    var imagenActual = imagenesRespuestas[indiceActual];
    var isCorrect = imagenClicada.src === new URL(imagenActual.respuesta, location.href).href;

    if (isCorrect) {
        // La respuesta es correcta
        imagenClicada.style.backgroundColor = "green"; // Cambiar el color del botón a verde
        desactivarBotones();
        lanzarConfeti();
    } else {
        // La respuesta es incorrecta
        imagenClicada.style.backgroundColor = "red"; // Cambiar el color del botón a rojo
        setTimeout(() => {
            imagenClicada.style.backgroundColor = ""; // Quitar el color rojo después de un momento
        }, 1000);
    }

    // Verificar si se han seleccionado todas las imágenes correctas
    var respuestasCorrectas = document.querySelectorAll('.boton[style="background-color: green;"]');
    if (respuestasCorrectas.length === imagenesRespuestas.length) {
        // Mostrar alert al completar todas las respuestas
        setTimeout(() => {
            Swal.fire({
                icon: null, // Deja el icono en null
                title: "¡Felicidades!",
                html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                      '<br><br>' +
                      '<h2>Has terminado la actividad!</h2>', // Agrega el texto
                showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
                confirmButtonText: 'OK', // El texto del botón de confirmación
                showCancelButton: true, // Muestra un segundo botón
                cancelButtonText: 'Repetir la actividad' // El texto del botón de cancelar
            }).then((result) => {
                if (result.isDismissed) {
                    // Si se hizo clic en "Repetir la actividad"
                    repetirActividad();
                }
            });
        }, 1500);
    }
}

// Función para desactivar todos los botones
function desactivarBotones() {
    var botones = document.querySelectorAll('.boton');
    botones.forEach(function (boton) {
        boton.onclick = null; // Desactivar el evento onclick
    });
}

// Función para lanzar confeti
function lanzarConfeti() {
    if (confettiInstance) {
        confettiInstance.clear();
    }

    var confettiSettings = { target: 'confetti-canvas', max: 100, size: 1, clock: 25 };
    confettiInstance = new ConfettiGenerator(confettiSettings);
    confettiInstance.render();

    setTimeout(() => {
        confettiInstance.clear();
    }, 1500);
}

// Función para avanzar al siguiente botón de audio
function siguientePregunta() {
    // Reiniciamos los colores de las imágenes
    var imagenes = document.querySelectorAll('.boton');
    imagenes.forEach(function (imagen) {
        imagen.style.backgroundColor = "";
    });
    // Incrementamos el índice para cargar la siguiente imagen
    indiceActual++;
    // Si hemos alcanzado el final de las imágenes, no reiniciamos el índice
    if (indiceActual < imagenesRespuestas.length) {
        cargarSiguiente();
    } else {
        // Mostrar un mensaje o realizar alguna acción al completar todas las preguntas
        setTimeout(() => {
            Swal.fire({
                icon: null, // Deja el icono en null
                title: "¡Felicidades!",
                html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                      '<br><br>' +
                      '<h2>Has terminado la actividad!</h2>', // Agrega el texto
                showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
                confirmButtonText: 'OK', // El texto del botón de confirmación
                showCancelButton: true, // Muestra un segundo botón
                cancelButtonText: 'Repetir la actividad' // El texto del botón de cancelar
            }).then((result) => {
                if (result.isDismissed) {
                    // Si se hizo clic en "Repetir la actividad"
                    repetirActividad();
                }
            });
        }, 1500);
    }
}

// Función para mezclar las opciones de imagen
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para cargar la siguiente imagen y configurar los botones
function cargarSiguiente() {
    var container = document.querySelector('.container');
    container.innerHTML = ""; // Limpiar el contenedor

    // Configurar las opciones de imagen
    var opciones = imagenesRespuestas[indiceActual].opciones;

    // Mezclar las opciones
    mezclarArray(opciones);

    for (var i = 0; i < opciones.length; i++) {
        var imgElement = document.createElement('img');
        imgElement.className = 'boton';
        imgElement.src = opciones[i];
        imgElement.onclick = function () {
            verificarRespuesta(this);
        };
        container.appendChild(imgElement);
    }

    // Asociar el audio al botón boton-audio2
    var audioBoton = document.querySelector('.btn-audio');
    var imagenActual = imagenesRespuestas[indiceActual];
    var audioSrc = audioMap[imagenActual.respuesta];
    audioBoton.onclick = function() {
        var audio = new Audio(audioSrc);
        audio.play();
    };
}

// Función para repetir la actividad
function repetirActividad() {
    indiceActual = 0;
    cargarSiguiente();
}

// Cargar la primera imagen al cargar la página
window.onload = function () {
    cargarSiguiente();
    // Inicializar el canvas de ConfettiJS
    var confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    document.body.appendChild(confettiCanvas);
};
