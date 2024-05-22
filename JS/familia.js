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
        
        for (var i = 0; i < respuestas.length; i++) {
            // Asignamos las nuevas opciones a los botones
            respuestas[i].textContent = imagenesRespuestas[indiceActual].opciones[i];
            respuestas[i].style.backgroundColor = "";
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
            willClose: () => {
                window.location.href = "../1MAIN/Contenido.html"; // Reemplaza con la URL a la que quieres redirigir
            }
        });
    }
}
function verificarRespuesta(event) {
    var botonClicado = event.target;
    if (botonClicado.textContent === imagenesRespuestas[indiceActual].respuesta) {
        //document.getElementById('resultado').textContent = "¡Correcto!";
        botonClicado.style.backgroundColor = "green"; // Cambiar el color del botón a verde
        // Mostrar el efecto de confeti
        var confettiSettings = {
            target: 'confetti-canvas',
            max: 100, // Máximo número de confetis
            size: 1, // Tamaño del confeti
            rotate: true // Permitir rotación del confeti
        };
        confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        // Detener y limpiar el confeti después de 3 segundos
        setTimeout(function() {
            confetti.clear();
        }, 1500);
    } else {
        //document.getElementById('resultado').textContent = "Incorrecto, intenta de nuevo.";
        botonClicado.style.backgroundColor = "red";
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

// Cargar la primera imagen y configurar los botones al cargar la página
window.onload = cargarSiguiente;
