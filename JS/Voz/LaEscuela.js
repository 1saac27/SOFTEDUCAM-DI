$(document).ready(function () {
    $(document).ready(function () {
        const audio1 = new Audio('../../assets/AUDIOS/LAESCUELA/ESCUCHA Y REPITE LA PALABRA.aac'); // Ruta al primer archivo de audio
        const audio2 = new Audio('../../assets/AUDIOS/LAESCUELA/SALON.aac'); // Ruta al segundo archivo de audio

        $('.boton-audio').on('click', function () {
            $(this).addClass('pulsating');
            audio1.play();
            audio1.onended = function () {
                $('.boton-audio').removeClass('pulsating');
            };
        });

        $('.boton-audio2').on('click', function () {
            $(this).addClass('pulsating');
            audio2.play();
            audio2.onended = function () {
                $('.boton-audio2').removeClass('pulsating');
            };
        });

        // Obtiene el elemento del botón del micrófono desde el DOM
        const micButton = document.querySelector('.microfono');

        // Crea una instancia de SpeechRecognition basada en el navegador
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        // Define las palabras clave específicas que se quieren reconocer por página
        const palabrasClavePorPagina = {
            "1Salon.html": ["salón"],
            "2Pizarron.html": ["pizarrón"],
            "3Escritoio.html": ["escritorio"],
            "4Doctor.html": ["doctor"],
            "5DolorCabeza.html": ["dolor de cabeza"],
            "6DolorEstomago.html": ["dolor estómago"],
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
        function mostrarAlerta(imagenSrc, esCorrecto) {
            Swal.fire({
                imageUrl: imagenSrc,
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 3000,
                willClose: () => {
                    // Redirigir a la página correspondiente si la respuesta es correcta
                    if (esCorrecto) {
                        if (paginaActual === "1Salon.html") {
                            window.location.href = "2Pizarron.html"; // Redirige a la página 2
                        } else if (paginaActual === "2Pizarron.html") {
                            window.location.href = "3Jabon.html"; // Redirige a la página 3
                        } else if (paginaActual === "3Jabon.html") {
                            window.location.href = "4Doctor.html"; // Redirige a la página 4
                        } else if (paginaActual === "4Doctor.html") {
                            window.location.href = "5DolorCabeza.html"; // Redirige a la página 5
                        } else if (paginaActual === "5DolorCabeza.html") {
                            window.location.href = "6DolorEstomago.html"; // Redirige a la página 6
                        } else if (paginaActual === "6DolorEstomago.html") {
                            window.location.href = "7Caer.html"; // Redirige a la página 7
                        } else if (paginaActual === "7Caer.html") {
                            window.location.href = "8Medicina.html"; // Redirige a la página 8
                        } else if (paginaActual === "8Medicina.html") {
                            window.location.href = "9Ejercicio.html"; // Redirige a la página 9
                        } else if (paginaActual === "9Ejercicio.html") {
                            window.location.href = "10Descansar.html"; // Redirige a la página 10
                        } else if (paginaActual === "10Descansar.html") {
                            window.location.href = "Actividad.html"; // Redirige a la página Act
                        }
                    }
                }
            });
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
                mostrarAlerta('../assets/correcto.png', true); // Mostrar la imagen de la palomita
            } else {
                console.log('Palabra clave no reconocida en la página ' + paginaActual);
                mostrarAlerta('../assets/incorrecto.png', false); // Mostrar la imagen de la equis
            }
        }

        // Configura el idioma para el reconocimiento de voz
        recognition.lang = 'es-ES'; // Español de España

        // Indica que no se deben devolver resultados intermedios
        recognition.interimResults = false;

        // Limita las alternativas de resultados a una sola (la más probable)
        recognition.maxAlternatives = 1;

        // Establecer un tiempo máximo para capturar la palabra
        recognition.timeout = 2000; // 2 segundos

        // Agrega un evento de clic al botón del micrófono para iniciar el reconocimiento de voz
        micButton.addEventListener('click', () => {
            // Cambia el icono del botón del micrófono y añade la clase escuchando
            micButton.classList.add('escuchando');
            micButton.innerHTML = '<span class="material-symbols-outlined">hearing</span>'; // Cambia el icono a "hearing"
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

        // Evento que se ejecuta cuando el reconocimiento de voz finaliza (cuando se deja de hablar o se alcanza el tiempo máximo)
        recognition.addEventListener('end', () => {
            // Detiene el reconocimiento
        })
    });
});