// Definir una lista de objetos con las imágenes y las respuestas correctas
var imagenesRespuestas = [
    { 
        imagen: "../assets/escuela/salon-01(lapiz)/lapiz2.png", 
        respuesta: "Lápiz",
        opciones: ["Tijeras", "Lápiz", "Maestra"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-02(goma)/goma.png", 
        respuesta: "Goma",
        opciones: ["Mesa", "Colores", "Goma"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-03(cuaderno)/cuaderno2.png", 
        respuesta: "Cuaderno",
        opciones: ["Cuaderno", "Pizarrón", "Lápiz"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-04(crayones)/crayones.png", 
        respuesta: "Crayones",
        opciones: ["Goma", "Crayones", "Maestra"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-05(sacapuntaz)/sacapuntas.png", 
        respuesta: "Sacapuntas",
        opciones: ["Sacapuntas", "Reloj", "Mochila"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-06(tijeras)/tijeras.png", 
        respuesta: "Tijeras",
        opciones: ["Maestra", "Lápiz", "Tijeras"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-07(pizarron)/pizarron.png", 
        respuesta: "Pizarrón",
        opciones: ["Cuaderno", "Pizarrón", "Crayones"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-08(mestra)/maestra.png", 
        respuesta: "Maestra",
        opciones: ["Maestra", "Goma", "Tijeras"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/salon-09(escritorio)/escritorio.png", 
        respuesta: "Escritorio",
        opciones: ["Tijeras", "Goma", "Escritorio"] // Nuevas opciones para los botones
    },
    { 
        imagen: "../assets/escuela/el salon de clases.jpeg", 
        respuesta: "Salón de Clases",
        opciones: ["Salón de Clases", "Maestra", "Goma"] // Nuevas opciones para los botones
    }
];

var indiceActual = 0;
var confetti;

// Función para cargar la siguiente imagen y configurar los botones
function cargarSiguiente() {
    if (indiceActual < imagenesRespuestas.length) {
        var imagenElement = document.getElementById('imagen');
        imagenElement.src = imagenesRespuestas[indiceActual].imagen;
        
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
            title: "¡ Felicidades !",
            html: '<img src="../assets/feliz1.png" style="width: 200px;">' + // Inserta la imagen como HTML
                  '<br><br>' +
                  '<h2>Has terminado la actividad!</h2>', // Agrega el texto
            showCloseButton: true, // Muestra un botón de cerrar para que el usuario pueda cerrar el cuadro de diálogo
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

// Cargar la primera imagen y configurar los botones al cargar la página
window.onload = cargarSiguiente;
