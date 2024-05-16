// Definir una lista de objetos con las imágenes y las respuestas correctas
var imagenesRespuestas = [
    { 
        imagen: "../assets/img/cabeza_nina.png", 
        respuesta: "../assets/img/cabeza_nina.png" // Ruta de la imagen correcta
    },
    { 
        imagen: "../assets/CUERPO/los sentidos/oido.png", 
        respuesta: "../assets/img/cabeza_nina.png" // Ruta de la imagen correcta
    },
    { 
        imagen: "../assets/CUERPO/los sentidos/boca.png", 
        respuesta: "../assets/img/cabeza_nina.png" // Ruta de la imagen correcta
    }
];

var indiceActual = 0;

// Función para verificar la respuesta cuando se hace clic en una imagen
function verificarRespuesta(imagenClicada) {
    var imagenActual = imagenesRespuestas[indiceActual];
    if (imagenClicada.src === imagenActual.respuesta) {
        // La respuesta es correcta
        imagenClicada.style.backgroundColor = "green"; // Cambiar el color del botón a verde
    } else {
        // La respuesta es incorrecta
        imagenClicada.style.backgroundColor = "red"; // Cambiar el color del botón a rojo
    }
    // Pasar automáticamente al siguiente botón de audio después de 1 segundo
    setTimeout(siguientePregunta, 1000);
}

// Función para avanzar al siguiente botón de audio
function siguientePregunta() {
    // Reiniciamos los colores de las imágenes
    var imagenes = document.querySelectorAll('.boton');
    imagenes.forEach(function(imagen) {
        imagen.style.backgroundColor = "";
    });
    // Incrementamos el índice para cargar la siguiente imagen
    indiceActual++;
    // Si hemos alcanzado el final de las imágenes, reiniciamos el índice
    if (indiceActual >= imagenesRespuestas.length) {
        indiceActual = 0;
    }
    // Cargar la siguiente imagen
    cargarSiguiente();
}

// Función para cargar la siguiente imagen y configurar los botones
function cargarSiguiente() {
    var imagenElement = document.getElementById('imagen');
    imagenElement.src = imagenesRespuestas[indiceActual].imagen;
}
