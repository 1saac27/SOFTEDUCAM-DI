$(document).ready(function () {
    // Obtiene el elemento del botón del micrófono desde el DOM
    const micButton = document.querySelector('.microfono');

    // Crea una instancia de SpeechRecognition basada en el navegador
    // Utiliza window.SpeechRecognition o window.webkitSpeechRecognition según la disponibilidad
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Define las palabras clave específicas que se quieren reconocer por página
    const palabrasClavePorPagina = {
        "1Salon.html": ["salón"],
        "2Pizarron.html": ["pizarrón"],
        "3Escritoio.html": ["escritorio"],
        "4Doctor.html": ["doctor"],
        "5DolorCabeza.html": ["dolor de cabeza"],
        "6DolorEstomago.html": ["dolor estomago"],
        "7Caer.html": ["caer"],
        "8Medicina.html": ["medicina"],
        "9Ejercicio.html": ["ejercicio"],
        "10Descansar.html": ["descansar"]
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

    // Función para mostrar la alerta con SweetAlert2
    function mostrarAlerta(tipo, mensaje, imagenSrc) {
        Swal.fire({
            icon: tipo,
            title: mensaje,
            imageUrl: imagenSrc,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        }).then((result) => {
            // Si la respuesta es correcta, redirigir a la página correspondiente
            if (result.isConfirmed && imagenSrc === '../assets/correcto.png') {
                redirigirPagina();
            }
        });
    }

    // Función para redirigir a la siguiente página
    function redirigirPagina() {
        const paginaSiguiente = obtenerPaginaSiguiente();
        if (paginaSiguiente) {
            window.location.href = paginaSiguiente;
        }
    }

    // Función para obtener la página siguiente
    function obtenerPaginaSiguiente() {
        const paginaIndex = parseInt(paginaActual.replace(/[^0-9]/g, ''));
        if (paginaIndex < 10) {
            return (paginaIndex + 1) + 'Banarse.html';
        } else {
            return "Actividad.html"; // Redirige a la página Act
        }
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
            mostrarAlerta('success', '¡Correcto!', '../assets/correcto.png');
        } else {
            console.log('Palabra clave no reconocida en la página ' + paginaActual);
            mostrarAlerta('error', 'Incorrecto', '../assets/incorrecto.png');
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
        Swal.fire({
            icon: 'error',
            title: 'Error de reconocimiento',
            text: event.error
        });
    });
});
