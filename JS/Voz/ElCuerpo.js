$(document).ready(function() {
    // Obtiene el elemento del botón del micrófono desde el DOM
    const micButton = document.querySelector('.microfono');

    // Crea una instancia de SpeechRecognition basada en el navegador
    // Utiliza window.SpeechRecognition o window.webkitSpeechRecognition según la disponibilidad
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Define las palabras clave específicas que se quieren reconocer por página
    const palabrasClavePorPagina = {
        "1Cuerpo.html": ["cuerpo"],
        "2Cabeza.html": ["cabeza"],
        "3Ojos.html": ["ojos"],
        "4Nariz.html": ["nariz"],
        "5Boca.html": ["boca"],
        "6Piernas.html": ["piernas"],
        "7Espalda.html": ["espalda"],
        "8Hombro.html": ["hombro"],
        "9Manos.html": ["manos"],
        "10Pie.html": ["pie"]
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
                if (paginaActual === "1Cuerpo.html") {
                    window.location.href = "2Cabeza.html";
                } else if (paginaActual === "2Cabeza.html") {
                    window.location.href = "3Ojos.html";
                } else if (paginaActual === "3Ojos.html") {
                    window.location.href = "4Nariz.html";
                } else if (paginaActual === "4Nariz.html") {
                    window.location.href = "5Boca.html";
                } else if (paginaActual === "5Boca.html") {
                    window.location.href = "6Piernas.html";
                } else if (paginaActual === "6Piernas.html") {
                    window.location.href = "7Espalda.html";
                } else if (paginaActual === "7Espalda.html") {
                    window.location.href = "8Hombro.html";
                } else if (paginaActual === "8Hombro.html") {
                    window.location.href = "9Manos.html";
                } else if (paginaActual === "9Manos.html") {
                    window.location.href = "10Pie.html";
                } else if (paginaActual === "10Pie.html") {
                    window.location.href = "Actividad.html";
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
    'inicioCuerpo.html': {
        botonAudio1: '../../assets/AUDIOS/ELCUERPO/inicio.aac',
    },
    '1Cuerpo.html': {
        botonAudio1: '../../assets/AUDIOS/LAESCUELA/ESCUCHA Y REPITE LA PALABRA.aac',
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/cuerpo .aac'
    },
    '2Cabeza.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/cabeza1.aac'
    },
    '3Ojos.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/ojos1.aac'
    },
    '4Nariz.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/nariz.aac'
    },
    '5Boca.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/boca1.aac'
    },
    '6Piernas.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/piernas.aac'
    },
    '7Espalda.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/espalda.aac'
    },
    '8Hombro.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/Hombro.aac'
    },
    '9Manos.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/manos.aac'
    },
    '10Pie.html': {
        botonAudio2: '../../assets/AUDIOS/ELCUERPO/pied1.aac'
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