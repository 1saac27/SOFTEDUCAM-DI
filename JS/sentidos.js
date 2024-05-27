// Definir una lista de objetos con las imágenes, las respuestas correctas y los audios correspondientes
var imagenesRespuestas = [{
        imagen: "../assets/5-SENTIDOS/acidito.png",
        opciones: ["../assets/5-SENTIDOS/boca.png", "../assets/5-SENTIDOS/acidito.png", "../assets/5-SENTIDOS/nariz.png"],
        respuesta: "../assets/5-SENTIDOS/acidito.png",
        audio: "../audios/acidito.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/boca.png",
        opciones: ["../assets/5-SENTIDOS/nariz.png", "../assets/5-SENTIDOS/oido.png", "../assets/5-SENTIDOS/boca.png"],
        respuesta: "../assets/5-SENTIDOS/boca.png",
        audio: "../audios/boca.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/nieve.png",
        opciones: ["../assets/5-SENTIDOS/salado.png", "../assets/5-SENTIDOS/nieve.png", "../assets/5-SENTIDOS/mano.png"],
        respuesta: "../assets/5-SENTIDOS/nieve.png",
        audio: "../audios/nieve.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/ojos_verdes.png",
        opciones: ["../assets/5-SENTIDOS/ojos_verdes.png", "../assets/5-SENTIDOS/nariz.png", "../assets/5-SENTIDOS/oido.png"],
        respuesta: "../assets/5-SENTIDOS/ojos_verdes.png",
        audio: "../audios/ojos_verdes.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/contento.png",
        opciones: ["../assets/5-SENTIDOS/ojos_verdes.png", "../assets/5-SENTIDOS/contento.png", "../assets/5-SENTIDOS/patel.png"],
        respuesta: "../assets/5-SENTIDOS/contento.png",
        audio: "../audios/contento.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/mano.png",
        opciones: ["../assets/5-SENTIDOS/mano.png", "../assets/5-SENTIDOS/contento.png", "../assets/5-SENTIDOS/triste.png"],
        respuesta: "../assets/5-SENTIDOS/mano.png",
        audio: "../audios/mano.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/nariz.png",
        opciones: ["../assets/5-SENTIDOS/nariz.png", "../assets/5-SENTIDOS/oido.png", "../assets/5-SENTIDOS/boca.png"],
        respuesta: "../assets/5-SENTIDOS/nariz.png",
        audio: "../audios/nariz.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/oido.png",
        opciones: ["../assets/5-SENTIDOS/mano.png", "../assets/5-SENTIDOS/oido.png", "../assets/5-SENTIDOS/ojos_verdes.png"],
        respuesta: "../assets/5-SENTIDOS/oido.png",
        audio: "../audios/oido.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/patel.png",
        opciones: ["../assets/5-SENTIDOS/triste.png", "../assets/5-SENTIDOS/acidito.png", "../assets/5-SENTIDOS/patel.png"],
        respuesta: "../assets/5-SENTIDOS/patel.png",
        audio: "../audios/patel.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/salado.png",
        opciones: ["../assets/5-SENTIDOS/salado.png", "../assets/5-SENTIDOS/acidito.png", "../assets/5-SENTIDOS/contento.png"],
        respuesta: "../assets/5-SENTIDOS/salado.png",
        audio: "../audios/salado.mp3"
    },
    {
        imagen: "../assets/5-SENTIDOS/triste.png",
        opciones: ["../assets/5-SENTIDOS/nieve.png", "../assets/5-SENTIDOS/triste.png", "../assets/5-SENTIDOS/contento.png"],
        respuesta: "../assets/5-SENTIDOS/triste.png",
        audio: "../audios/triste.mp3"
    }
];


var indiceActual = 0;
var audioElement = new Audio(); // Crear un nuevo elemento de audio

// Función para verificar la respuesta cuando se hace clic en una imagen
function verificarRespuesta(imagenClicada) {
    var imagenActual = imagenesRespuestas[indiceActual];
    if (imagenClicada.src === new URL(imagenActual.respuesta, location.href).href) {
        // La respuesta es correcta
        imagenClicada.style.backgroundColor = "green"; // Cambiar el color del botón a verde
        setTimeout(siguientePregunta, 1000); // Esperar 1 segundo y cargar la siguiente pregunta
    } else {
        // La respuesta es incorrecta
        imagenClicada.style.backgroundColor = "red"; // Cambiar el color del botón a rojo
        setTimeout(() => {
            imagenClicada.style.backgroundColor = ""; // Quitar el color rojo después de 1 segundo
        }, 1000);
    }
}

// Función para mostrar el modal con los resultados
function mostrarResultadoModal() {
    // Obtener el modal y sus elementos internos
    var modal = document.getElementById("resultadoModal");
    var mensajeResultado = document.getElementById("mensajeResultado");
    var resultadoImagen = document.getElementById("resultadoImagen");
    var puntuacion = document.getElementById("puntuacion");
    var botonVolverAJugar = document.getElementById("volverAJugar");
    var botonSalir = document.getElementById("salir");

    // Asignar los resultados al modal (puedes personalizar esto según tus necesidades)
    mensajeResultado.textContent = "¡Todas las actividades se han completado!";
    resultadoImagen.src = "../assets/feliz1.png"; // Aquí puedes cambiar la imagen según desees
    puntuacion.textContent = "Puntuación: 100"; // Puedes calcular la puntuación según el desempeño del usuario

    // Mostrar el modal
    modal.style.display = "block";

    // Evento para cerrar el modal al hacer clic en la "X"
    var closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function() {
        modal.style.display = "none";
    };


    // Evento para volver a jugar
    botonVolverAJugar.addEventListener("click", function() {
        // Ocultar el modal al presionar el botón "Volver a Jugar"
        modal.style.display = "none";
        // Reiniciar el juego
        reiniciarJuego();
    });

    // Evento para salir
    botonSalir.addEventListener("click", function() {
        // Redirigir a otra página al presionar el botón "Salir"
        window.location.href = "../1MAIN/Contenido.html";
    });
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar el estado actual y volver a cargar la primera pregunta
    indiceActual = 0;
    cargarSiguiente();
}

// Función para avanzar a la siguiente pregunta
function siguientePregunta() {
    // Reiniciamos los colores de las imágenes
    var imagenes = document.querySelectorAll('.boton');
    imagenes.forEach(function(imagen) {
        imagen.style.backgroundColor = "";
    });
    // Incrementamos el índice para cargar la siguiente imagen
    indiceActual++;
    // Si hemos alcanzado el final de las imágenes, mostrar el modal
    if (indiceActual < imagenesRespuestas.length) {
        cargarSiguiente();
    } else {
        mostrarResultadoModal(); // Mostrar el modal al completar todas las actividades
    }
}

// Función para cargar la siguiente imagen, configurar los botones y cambiar el audio
function cargarSiguiente() {
    var container = document.querySelector('.container');
    container.innerHTML = ""; // Limpiar el contenedor

    // Configurar las opciones de imagen
    var opciones = imagenesRespuestas[indiceActual].opciones;

    for (var i = 0; i < opciones.length; i++) {
        var imgElement = document.createElement('img');
        imgElement.className = 'boton';
        imgElement.src = opciones[i];
        imgElement.onclick = function() {
            verificarRespuesta(this);
        };
        container.appendChild(imgElement);
    }

    // Cambiar el audio
    if (audioElement) {
        audioElement.pause(); // Pausar el audio actual
        audioElement.currentTime = 0; // Reiniciar el tiempo del audio
        audioElement.src = imagenesRespuestas[indiceActual].audio;
        audioElement.load(); // Cargar el nuevo audio
    }
}

// Evento para reproducir/pausar el audio cuando se hace clic en el botón de audio
document.getElementById('audio-instruction').addEventListener('click', function() {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
});

// Cargar la primera imagen y audio al cargar la página
window.onload = function() {
    cargarSiguiente();
};