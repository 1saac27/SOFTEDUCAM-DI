// Definir una lista de objetos con las imágenes, las respuestas correctas y los audios
var imagenesRespuestas = [{
        imagen: "../assets/9-CLIMA/lluvia.png",
        respuesta: "LLuvia",
        opciones: ["Calor", "LLuvia", "Viento"], // Nuevas opciones para los botones
        audio: "../assets/audios/lluvia_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/aire2.png",
        respuesta: "Aire",
        opciones: ["Lluvia", "Arcoiris", "Aire"], // Nuevas opciones para los botones
        audio: "../assets/audios/aire_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/arcoiris2.jpg",
        respuesta: "Arcoiris",
        opciones: ["Verano", "Aire", "Arcoiris"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },

    {
        imagen: "../assets/9-CLIMA/verano4.jpeg",
        respuesta: "Verano",
        opciones: ["Verano", "LLuvia", "Primavera"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/calor5.png",
        respuesta: "Calor",
        opciones: ["Calor", "LLuvia", "Frio"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/estaciones.png",
        respuesta: "Clima",
        opciones: ["Calor", "Clima", "Frio"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/frio.png",
        respuesta: "Frio",
        opciones: ["Calor", "Verano", "Frio"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/inverno1.jpeg",
        respuesta: "Invierno",
        opciones: ["Otoño", "Invierno", "Arcoiris"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/otoño.jpeg",
        respuesta: "Otoño",
        opciones: ["Calor", "LLuvia", "Otoño"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    },
    {
        imagen: "../assets/9-CLIMA/primavera273.jpeg",
        respuesta: "Primavera",
        opciones: ["Aire", "Primavera", "Frio"], // Nuevas opciones para los botones
        audio: "../assets/audios/arcoris_audio.mp3" // Ruta del audio relacionado con la imagen
    }
];

var indiceActual = 0;
var audioElement = document.getElementById('audio');

// Función para cargar la siguiente imagen, configurar los botones y reproducir el audio correspondiente
function cargarSiguiente() {
    if (indiceActual < imagenesRespuestas.length) {
        var imagenElement = document.getElementById('imagen');
        imagenElement.src = imagenesRespuestas[indiceActual].imagen;

        var respuestas = document.querySelectorAll('.boton');

        for (var i = 0; i < respuestas.length; i++) {
            // Asignamos las nuevas opciones a los botones
            respuestas[i].textContent = imagenesRespuestas[indiceActual].opciones[i];
            respuestas[i].style.backgroundColor = "";
            respuestas[i].onclick = verificarRespuesta; // Asignamos la función de verificar respuesta al evento onclick
        }

        // Reproducir el audio correspondiente a la imagen actual
        audioElement.src = imagenesRespuestas[indiceActual].audio;
        audioElement.play();
    } else {
        // Aquí puedes agregar algún comportamiento cuando se hayan mostrado todas las imágenes
        console.log("Has terminado la actividad.");
    }
}

function verificarRespuesta(event) {
    var botonClicado = event.target;
    if (botonClicado.textContent === imagenesRespuestas[indiceActual].respuesta) {
        // Cambiar el color del botón a verde
        botonClicado.style.backgroundColor = "green";
        // Avanzar a la siguiente pregunta después de un segundo
        setTimeout(siguientePregunta, 1000);
    } else {
        // Cambiar el color del botón a rojo después de un segundo
        botonClicado.style.backgroundColor = "red";
        setTimeout(function() {
            botonClicado.style.backgroundColor = ""; // Restablecer el color del botón después de un segundo
        }, 1000);
    }
}

// Función para avanzar a la siguiente pregunta
function siguientePregunta() {
    // Reiniciamos los colores de los botones
    var respuestas = document.querySelectorAll('.boton');
    respuestas.forEach(function(boton) {
        boton.style.backgroundColor = "";
    });
    // Incrementamos el índice para cargar la siguiente imagen y configurar los botones
    indiceActual++;
    if (indiceActual < imagenesRespuestas.length) {
        cargarSiguiente();
    } else {
        mostrarResultadoModal(); // Mostrar el modal al completar todas las actividades
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
    mensajeResultado.textContent = "¡FELICIDADES!";
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

// Cargar la primera imagen y configurar los botones al cargar la página
window.onload = cargarSiguiente;