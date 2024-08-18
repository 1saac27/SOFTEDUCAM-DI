$(document).ready(function() {
    const micButton = document.querySelector('.microfono');
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    const palabrasClavePorPagina = {
        "1Verano.html": ["verano"],
        "2Otoño.html": ["otoño"],
        "3Invierno.html": ["invierno"],
        "4Primavera.html": ["primavera"],
        "5Frio.html": ["frío"],
        "6Calor.html": ["calor"],
        "7Clima.html": ["clima"],
        "8Arcoiris.html": ["arcoíris"],
        "9Viento.html": ["viento"],
        "10LLuvia.html": ["lluvia"]
    };

    function determinarPaginaActual() {
        const path = window.location.pathname;
        const page = decodeURIComponent(path.split("/").pop());
        console.log('Página actual:', page); // Para depuración
        return page;
    }

    let paginaActual = determinarPaginaActual();

    function mostrarModal(imagenSrc) {
        const modal = document.getElementById('resultadoModal');
        const imagen = document.getElementById('resultadoImagen');

        if (modal && imagen) {
            imagen.src = imagenSrc;
            modal.style.display = "block";

            setTimeout(() => {
                modal.style.display = "none";
                if (imagenSrc === '../assets/correcto.png') {
                    if (paginaActual === "1Verano.html") {
                        window.location.href = "2Otoño.html";
                    } else if (paginaActual === "2Otoño.html") {
                        window.location.href = "3Invierno.html";
                    } else if (paginaActual === "3Invierno.html") {
                        window.location.href = "4Primavera.html";
                    } else if (paginaActual === "4Primavera.html") {
                        window.location.href = "5Frio.html";
                    } else if (paginaActual === "5Frio.html") {
                        window.location.href = "6Calor.html";
                    } else if (paginaActual === "6Calor.html") {
                        window.location.href = "7Clima.html";
                    } else if (paginaActual === "7Clima.html") {
                        window.location.href = "8Arcoiris.html";
                    } else if (paginaActual === "8Arcoiris.html") {
                        window.location.href = "9Viento.html";
                    } else if (paginaActual === "9Viento.html") {
                        window.location.href = "10LLuvia.html";
                    } else if (paginaActual === "10LLuvia.html") {
                        window.location.href = "Actividad.html";
                    }
                }
            }, 3000);
        } else {
            console.error('Modal or image element not found in the DOM.');
        }
    }
    //PARA RECONOCER LETRAS ESPECIALES 
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function manejarReconocimiento(command) {
        const palabrasClave = palabrasClavePorPagina[paginaActual];
        if (!palabrasClave) {
            console.error('No se encontraron palabras clave para la página:', paginaActual);
            return;
        }

        const commandNormalizado = normalizarTexto(command);

        const keywordRecognized = palabrasClave.some(keyword =>
            commandNormalizado.includes(normalizarTexto(keyword))
        );

        if (keywordRecognized) {
            console.log('Palabra clave reconocida en la página ' + paginaActual);
            mostrarModal('../assets/correcto.png');
        } else {
            console.log('Palabra clave no reconocida en la página ' + paginaActual);
            mostrarModal('../assets/incorrecto.png');
        }
    }

    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micButton.addEventListener('click', () => {
        recognition.start();
        console.log('Se inició el reconocimiento de voz. Habla por el micrófono.');
    });

    recognition.addEventListener('result', (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase();
        console.log('La entrada de voz: ' + command);
        manejarReconocimiento(command);
    });

    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });

    recognition.addEventListener('error', (event) => {
        console.error('Recognition error: ' + event.error);
        alert('Error de reconocimiento: ' + event.error);
    });
});