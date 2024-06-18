$(document).ready(function() {
    // Obtiene el elemento del botón del micrófono desde el DOM
    const micButton = document.querySelector('.microfono');

    // Crea una instancia de SpeechRecognition basada en el navegador
    // Utiliza window.SpeechRecognition o window.webkitSpeechRecognition según la disponibilidad
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Define las palabras clave específicas que se quieren reconocer por página
    const palabrasClavePorPagina = {
        "1-Puerta.html": ["puerta"],
        "2-Ventana.html": ["ventana"],
        "3-Bano.html": ["baño"],
        "4-Cocina.html": ["cocina"],
        "5-Recamara.html": ["recamara"],
        "6-Comedor.html": ["comedor"],
        "7-Television.html": ["television"],
        "8-Silla.html": ["silla"],
        "9-Licuadora.html": ["licuadora"],
        "10-refrigerador.html": ["refrigerador"]
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
                if (paginaActual === "1-Puerta.html") {
                    window.location.href = "2-Ventana.html";
                } else if (paginaActual === "2-Ventana.html") {
                    window.location.href = "3-Bano.html";
                } else if (paginaActual === "3-Bano.html") {
                    window.location.href = "4-Cocina.html";
                } else if (paginaActual === "4-Cocina.html") {
                    window.location.href = "5-Recamara.html";
                } else if (paginaActual === "5-Recamara.html") {
                    window.location.href = "6-Comedor.html";
                } else if (paginaActual === "6-Comedor.html") {
                    window.location.href = "7-Television.html";
                } else if (paginaActual === "7-Television.html") {
                    window.location.href = "8-Silla.html";
                } else if (paginaActual === "8-Silla.html") {
                    window.location.href = "9-Licuadora.html";
                } else if (paginaActual === "9-Licuadora.html") {
                    window.location.href = "10-refrigerador.html";
                } else if (paginaActual === "10-refrigerador.html") {
                    window.location.href = "ActividadLC.html";
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
    'inicioLacasa.html': {
        botonAudio1: '../../assets/AUDIOS/LACASA/LaCsaInicio.m4a',
    },
    '1-Puerta.html': {
        botonAudio1: '../../assets/AUDIOS/LAESCUELA/ESCUCHA Y REPITE LA PALABRA.aac',
        botonAudio2: '../../assets/AUDIOS/LACASA/Puerta.m4a'
    },
    '2-Ventana.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/ventans.m4a'
    },
    '3-Bano.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/bano.m4a'
    },
    '4-Cocina.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/cocina.m4a'
    },
    '5-Recamara.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/recamara.m4a'
    },
    '6-Comedor.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/comedor.m4a'
    },
    '7-Television.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/television.m4a'
    },
    '8-Silla.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/silla.m4a'
    },
    '9-Licuadora.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/licuadora.m4a'
    },
    '10-refrigerador.html': {
        botonAudio2: '../../assets/AUDIOS/LACASA/refrigerador.m4a'
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