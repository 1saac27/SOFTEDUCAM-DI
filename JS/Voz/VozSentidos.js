$(document).ready(function() {
    // Obtiene el elemento del botón del micrófono desde el DOM
    const micButton = document.querySelector('.microfono');

    // Crea una instancia de SpeechRecognition basada en el navegador
    // Utiliza window.SpeechRecognition o window.webkitSpeechRecognition según la disponibilidad
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Define las palabras clave específicas que se quieren reconocer por página
    const palabrasClavePorPagina = {
        "1Ver.html": ["ver"],
        "2Tocar.html": ["tocar"],
        "3Probar.html": ["probar"],
        "4Salado.html": ["salado"],
        "5Dulce.html": ["dulce"],
        "6Acido.html": ["ácido"],
        "7Sabroso.html": ["sabroso"],
        "8Oler.html": ["oler"],
        "9Escuchar.html": ["escuchar"],
        "10Contento.html": ["contento"],
        "11Triste.html": ["triste"]
    };

    // Función para determinar la página actual basada en la URL
    function determinarPaginaActual() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        console.log('Página actual:', page); // Para depuración
        return page;
    }

    // Variable para mantener el estado de la página actual
    let paginaActual = determinarPaginaActual();

    // Función para mostrar el modal
    function mostrarModal(imagenSrc) {
        const modal = document.getElementById('resultadoModal');
        const imagen = document.getElementById('resultadoImagen');

        // Asigna la fuente de la imagen
        imagen.src = imagenSrc;

        // Muestra el modal
        modal.style.display = "block";

        // Cierra el modal después de un segundo
        setTimeout(() => {
            modal.style.display = "none";
            // Si la respuesta es correcta, redirigir a la página correspondiente
            if (imagenSrc === '../assets/correcto.png') {
                if (paginaActual === "1Ver.html") {
                    window.location.href = "2Tocar.html"; // Redirige a la página 2
                } else if (paginaActual === "2Tocar.html") {
                    window.location.href = "3Probar.html"; // Redirige a la página 3
                } else if (paginaActual === "3Probar.html") {
                    window.location.href = "4Salado.html"; // Redirige a la página 4
                } else if (paginaActual === "4Salado.html") {
                    window.location.href = "5Dulce.html"; // Redirige a la página 5
                } else if (paginaActual === "5Dulce.html") {
                    window.location.href = "6Acido.html"; // Redirige a la página 6
                } else if (paginaActual === "6Acido.html") {
                    window.location.href = "7Sabroso.html"; // Redirige a la página 7
                } else if (paginaActual === "7Sabroso.html") {
                    window.location.href = "8Oler.html"; // Redirige a la página 8
                } else if (paginaActual === "8Oler.html") {
                    window.location.href = "9Escuchar.html"; // Redirige a la página 9
                } else if (paginaActual === "9Escuchar.html") {
                    window.location.href = "10Contento.html"; // Redirige a la página 10
                } else if (paginaActual === "10Contento.html") {
                    window.location.href = "11Triste.html"; // Redirige a la página Act
                } else if (paginaActual === "11Triste.html") {
                    window.location.href = "Actividad.html"; // Redirige a la página Act
                }
            }
        }, 3000); // Espera 3 segundos antes de cerrar el modal o redirigir
    }

    // Función para manejar el reconocimiento de voz
    function manejarReconocimiento(command) {
        // Verificar si el comando de voz coincide con alguna palabra clave de la página actual
        const palabrasClave = palabrasClavePorPagina[paginaActual];
        if (!palabrasClave) {
            console.error('No se encontraron palabras clave para la página:', paginaActual);
            return;
        }

        const keywordRecognized = palabrasClave.some(keyword => command.includes(keyword.toLowerCase()));

        if (keywordRecognized) {
            console.log('Palabra clave reconocida en la página ' + paginaActual);
            mostrarModal('../assets/correcto.png'); // Mostrar la imagen de la palomita
        } else {
            console.log('Palabra clave no reconocida en la página ' + paginaActual);
            mostrarModal('../assets/incorrecto.png'); // Mostrar la imagen de la equis
        }
    }

    // Configura el idioma para el reconocimiento de voz
    recognition.lang = 'es-ES'; // Español de España

    // Indica que no se deben devolver resultados intermedios
    recognition.interimResults = false;

    // Limita las alternativas de resultados a una sola (la más probable)
    recognition.maxAlternatives = 1;

    // Agrega un evento de clic al botón del micrófono para iniciar el reconocimiento de voz
    micButton.addEventListener('click', () => {
        // Inicia el reconocimiento de voz
        recognition.start();
        console.log('Se inició el reconocimiento de voz. Habla por el micrófono.');
    });

    // Evento que se ejecuta cuando se detecta un resultado de voz
    recognition.addEventListener('result', (event) => {
        // Obtiene el último resultado del reconocimiento de voz
        const last = event.results.length - 1;
        // Convierte el texto reconocido a minúsculas
        const command = event.results[last][0].transcript.toLowerCase();
        console.log('La entrada de voz: ' + command);
        // Manejar el reconocimiento de voz
        manejarReconocimiento(command);
    });

    // Evento que se ejecuta cuando el reconocimiento de voz finaliza (cuando se deja de hablar)
    recognition.addEventListener('speechend', () => {
        // Detiene el reconocimiento de voz
        recognition.stop();
    });

    // Evento que se ejecuta cuando ocurre un error en el reconocimiento de voz
    recognition.addEventListener('error', (event) => {
        console.error('Recognition error: ' + event.error);
        // Muestra una alerta indicando el error de reconocimiento
        alert('Error de reconocimiento: ' + event.error);
    });
});