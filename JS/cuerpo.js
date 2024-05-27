// Definir una lista de objetos con las imágenes y las respuestas correctas
var imagenesRespuestas = [
    {
        imagen: "../assets/img/cabeza_nina.png",
        opciones: ["../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png", "../assets/CUERPO/los sentidos/boca.png"],
        respuesta: "../assets/img/cabeza_nina.png"
    },
    {
        imagen: "../assets/CUERPO/los sentidos/oido.png",
        opciones: ["../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png", "../assets/CUERPO/los sentidos/boca.png"],
        respuesta: "../assets/CUERPO/los sentidos/oido.png"
    },
    {
        imagen: "../assets/CUERPO/los sentidos/boca.png",
        opciones: ["../assets/CUERPO/los sentidos/boca.png", "../assets/img/cabeza_nina.png", "../assets/CUERPO/los sentidos/oido.png"],
        respuesta: "../assets/CUERPO/los sentidos/boca.png"
    }
];

var indiceActual = 0;
var confettiInstance = null; // Variable global para ConfettiJS

// Función para verificar la respuesta cuando se hace clic en una imagen
function verificarRespuesta(imagenClicada) {
    var imagenActual = imagenesRespuestas[indiceActual];
    if (imagenClicada.src === new URL(imagenActual.respuesta, location.href).href) {
        // La respuesta es correcta
        imagenClicada.style.backgroundColor = "green"; // Cambiar el color del botón a verde
        lanzarConfeti();
    } else {
        // La respuesta es incorrecta
        imagenClicada.style.backgroundColor = "red"; // Cambiar el color del botón a rojo
    }

    // Verificar si se han seleccionado todas las imágenes correctas
    var respuestasCorrectas = document.querySelectorAll('.boton[style="background-color: green;"]');
    if (respuestasCorrectas.length === imagenesRespuestas.length) {
        // Mostrar alert al completar todas las respuestas
        setTimeout(() => {
            alert("¡Todas las respuestas son correctas!");
        }, 1500);
    }
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
                title: "¡ Felicidades !",
                html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                      '<br><br>' +
                      '<h2>Has terminado la actividad!</h2>', // Agrega el texto
                showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
                willClose: () => {
                    window.location.href = "../1MAIN/Contenido.html"; // Reemplaza con la URL a la que quieres redirigir
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
}

// Cargar la primera imagen al cargar la página
window.onload = function () {
    cargarSiguiente();
    // Inicializar el canvas de ConfettiJS
    var confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    document.body.appendChild(confettiCanvas);
};
