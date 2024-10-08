$(document).ready(function() {
    // Obtiene el elemento del botón del micrófono desde el DOM
    const micButton = document.querySelector('.microfono');

    // Crea una instancia de SpeechRecognition basada en el navegador
    // Utiliza window.SpeechRecognition o window.webkitSpeechRecognition según la disponibilidad
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Define las palabras clave específicas que se quieren reconocer por página
    const palabrasClavePorPagina = {
        "1Salon.html": ["salón"],
        "2Pizarron.html": ["pizarrón"],
        "3Escritorio.html": ["escritorio"],
        "4Cuadernos.html": ["cuaderno"],
        "5Maestra.html": ["maestra"],
        "6Goma.html": ["goma"],
        "7Lapiz.html": ["lápiz"],
        "8Crayones.html": ["crayones"],
        "9Tijeras.html": ["tijeras"],
        "10Mochila.html": ["mochila"]
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
                if (paginaActual === "1Salon.html") {
                    window.location.href = "2Pizarron.html";
                } else if (paginaActual === "2Pizarron.html") {
                    window.location.href = "3Escritorio.html";
                } else if (paginaActual === "3Escritorio.html") {
                    window.location.href = "4Cuadernos.html";
                } else if (paginaActual === "4Cuadernos.html") {
                    window.location.href = "5Maestra.html";
                } else if (paginaActual === "5Maestra.html") {
                    window.location.href = "6Goma.html";
                } else if (paginaActual === "6Goma.html") {
                    window.location.href = "7Lapiz.html";
                } else if (paginaActual === "7Lapiz.html") {
                    window.location.href = "8Crayones.html";
                } else if (paginaActual === "8Crayones.html") {
                    window.location.href = "9Tijeras.html";
                } else if (paginaActual === "9Tijeras.html") {
                    window.location.href = "10Mochila.html";
                } else if (paginaActual === "10Mochila.html") {
                    window.location.href = "ActividadE.html";
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



// Archivo: Audio.js

// Definir un objeto con los nombres de los archivos HTML y los audios correspondientes
const audioMap = {
    'inicioEscuela.html': {
        botonAudio1: '../../assets/AUDIOS/LAESCUELA/BienvenidaEsc.aac',
    },
    '1Salon.html': {
        botonAudio1: '../../assets/AUDIOS/LAESCUELA/ESCUCHA Y REPITE LA PALABRA.aac',
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/SALON.aac'
    },
    '2Pizarron.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Pizarron.aac'
    },
    '3Escritorio.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Escritorio.aac'
    },
    '4Cuadernos.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Cuaderno.aac'
    },
    '5Maestra.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Maestra.aac'
    },
    '6Goma.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Gooma.aac'
    },
    '7Lapiz.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Lapiz.aac'
    },
    '8Crayones.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Crayones.aac'
    },
    '9Tijeras.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Tijeras.aac'
    },
    '10Mochila.html': {
        botonAudio2: '../../assets/AUDIOS/LAESCUELA/Mochila.aac'
    }
    
    // Agrega más entradas según sea necesario
};
  // Función para obtener el nombre del archivo HTML actual
  function getFileName() {
    const path = window.location.pathname;
    return path.split('/').pop();
}

// Función para asignar los audios a los botones
function assignAudios() {
    const fileName = getFileName();
    const audios = audioMap[fileName];

    if (audios) {
        // Asignar audio al primer botón
        const botonAudio1 = document.getElementById('audio1');
        if (botonAudio1) {
            botonAudio1.addEventListener('click', () => {
                const audio = new Audio(audios.botonAudio1);
                audio.play();
                botonAudio1.classList.add('pulsating');
                audio.addEventListener('ended', () => {
                    botonAudio1.classList.remove('pulsating');
                });
            });
        }

        // Asignar audio al segundo botón
        const botonAudio2 = document.getElementById('audio2');
        if (botonAudio2) {
            botonAudio2.addEventListener('click', () => {
                const audio = new Audio(audios.botonAudio2);
                audio.play();
                botonAudio2.classList.add('pulsating');
                audio.addEventListener('ended', () => {
                    botonAudio2.classList.remove('pulsating');
                });
            });
        }
    }
}

// Asignar los audios cuando la página haya cargado
window.onload = assignAudios;