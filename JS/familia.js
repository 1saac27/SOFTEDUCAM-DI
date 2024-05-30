// Definir una lista de objetos con las imágenes y las respuestas correctas
var imagenesRespuestas = [
    { 
        imagen: "../assets/FAMILIA1/papa.png", 
        respuesta: "Papá",
        opciones: ["Papá", "Abuela", "Hermano"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/grandmother.png", 
        respuesta: "Abuela",
        opciones: ["Papá", "Abuela", "Hermano"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/hermano.jpeg", 
        respuesta: "Hermano",
        opciones: ["Papá", "Abuela", "Hermano"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/mama.png", 
        respuesta: "Mamá",
        opciones: ["Papá", "Mamá", "Abuelo"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/primos.jpeg", 
        respuesta: "Primos",
        opciones: ["Tios", "Hermano", "Primos"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/hermana.jpg", 
        respuesta: "Hermana",
        opciones: ["Papá", "Abuela", "Hermana"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/tios y primos.png", 
        respuesta: "Tios",
        opciones: ["Primos", "Tios", "Mamá"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/grandfather.png", 
        respuesta: "Abuelo",
        opciones: ["Abuelo", "Abuela", "Hermano"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/FAMILIA1/FAMILIA.jpg", 
        respuesta: "Familia",
        opciones: ["Hermana", "Familia", "Abuelo"] // Nuevas opciones para los botones
    },
];

// Mapeo entre el nombre de la imagen y la ruta del archivo de audio
var audioMap = {
    "papa.png": "../../assets/AUDIOS/LAFAMILIA/papá .aac",
    "grandmother.png": "../../assets/AUDIOS/LAFAMILIA/abuela.aac",
    "hermano.jpeg": "../../assets/AUDIOS/LAFAMILIA/hermano.aac",
    "mama.png": "../../assets/AUDIOS/LAFAMILIA/mamá 1.aac",
    "primos.jpeg": "../../assets/AUDIOS/LAFAMILIA/primos.aa",
    "hermana.jpg": "../../assets/AUDIOS/LAFAMILIA/hermana.aac",
    "tios y primos.png": "../../assets/AUDIOS/LAFAMILIA/tios.aac",
    "grandfather.png": "../../assets/AUDIOS/LAFAMILIA/abuelo.aac",
    "FAMILIA.jpg": "../../assets/AUDIOS/LAFAMILIA/familia .aac"
};

var indiceActual = 0;
var confetti;
// Ruta del audio para el botón boton-audio
var audioBotonGeneralSrc = "../assets/AUDIOS/LAESCUELA/Escucha y selecciona la palabra.aac";
// Asociar el audio al botón de audio general llamado boton-audio
var audioBotonGeneral = document.querySelector('.boton-audio');
audioBotonGeneral.onclick = function() {
    var audio = new Audio(audioBotonGeneralSrc);
    audio.play();
};

// Función para cargar la siguiente imagen y configurar los botones
function cargarSiguiente() {
    if (indiceActual < imagenesRespuestas.length) {
        var imagenElement = document.getElementById('imagen');
        imagenElement.src = imagenesRespuestas[indiceActual].imagen;
        
        // Obtener el nombre de la imagen actual
        var imagenNombre = imagenesRespuestas[indiceActual].imagen.split('/').pop();
        
        // Obtener la ruta del audio correspondiente a la imagen actual
        var audioSrc = audioMap[imagenNombre];
        
        // Asociar el audio al botón de audio correspondiente
        var audioBoton = document.querySelector('.boton-audio2');
        audioBoton.onclick = function() {
            var audio = new Audio(audioSrc);
            audio.play();
        };
        
        var respuestas = document.querySelectorAll('.boton');
        
        // Mezclar las opciones de respuesta
        var opcionesMezcladas = mezclarArray(imagenesRespuestas[indiceActual].opciones);

        for (var i = 0; i < respuestas.length; i++) {
            // Asignamos las nuevas opciones mezcladas a los botones
            respuestas[i].textContent = opcionesMezcladas[i];
            respuestas[i].style.backgroundColor = "";
            respuestas[i].disabled = false; // Habilitamos los botones
            respuestas[i].onclick = verificarRespuesta; // Asignamos la función de verificar respuesta al evento onclick
        }
    } else {
        // Mostrar un alert cuando se hayan mostrado todas las imágenes
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
               

                // Si se hizo clic en "Repetir la actividad"
                repetirActividad();
            }
        });
    }
}

function verificarRespuesta(event) {
    var botonClicado = event.target;
    var respuestas = document.querySelectorAll('.boton');

    if (botonClicado.textContent === imagenesRespuestas[indiceActual].respuesta) {
        botonClicado.style.backgroundColor = "green"; // Cambiar el color del botón a verde
        // Deshabilitar todos los botones
        respuestas.forEach(function(boton) {
            boton.disabled = true;
        });

        // Mostrar el efecto de confeti
        var confettiSettings = {
            target: 'confetti-canvas',
            max: 100, // Máximo número de confetis
            size: 1, // Tamaño del confeti
            rotate: true // Permitir rotación del confeti
        };
        confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        // Detener y limpiar el confeti después de 1.5 segundos
        setTimeout(function() {
            confetti.clear();
        }, 1500);

        // Avanzar a la siguiente pregunta después de 2 segundos
        setTimeout(siguientePregunta, 2000);
    } else {
        botonClicado.style.backgroundColor = "red";
        // Quitar el color rojo rápidamente
        setTimeout(function() {
            botonClicado.style.backgroundColor = "";
        }, 500);
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
    cargarSiguiente();
}

// Función para mezclar un array
function mezclarArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Función para repetir la actividad
function repetirActividad() {
    indiceActual = 0;
    cargarSiguiente();
}

// Cargar la primera imagen y configurar los botones al cargar la página
window.onload = cargarSiguiente;
