$(document).ready(function() {
    const micButton = document.querySelector('.microfono');
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    const palabrasClavePorPagina = {
        "1Enfermera.html": ["enfermera"],
        "2Zapatero.html": ["zapatero"],
        "3Plomero.html": ["plomero"],
        "4Comerciante.html": ["comerciante"],
        "5Albañil.html": ["albañil"],
        "6Bailarina.html": ["bailarina"],
        "7Arquitecto.html": ["arquitecto"],
        "8Musico.html": ["músico"],
        "9Policia.html": ["policía"],
        "10Soldado.html": ["soldado"]
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
                    if (paginaActual === "1Enfermera.html") {
                        window.location.href = "2Zapatero.html";
                    } else if (paginaActual === "2Zapatero.html") {
                        window.location.href = "3Plomero.html";
                    } else if (paginaActual === "3Plomero.html") {
                        window.location.href = "4Comerciante.html";
                    } else if (paginaActual === "4Comerciante.html") {
                        window.location.href = "5Albañil.html";
                    } else if (paginaActual === "5Albañil.html") {
                        window.location.href = "6Bailarina.html";
                    } else if (paginaActual === "6Bailarina.html") {
                        window.location.href = "7Arquitecto.html";
                    } else if (paginaActual === "7Arquitecto.html") {
                        window.location.href = "8Musico.html";
                    } else if (paginaActual === "8Musico.html") {
                        window.location.href = "9Policia.html";
                    } else if (paginaActual === "9Policia.html") {
                        window.location.href = "10Soldado.html";
                    } else if (paginaActual === "10Soldado.html") {
                        window.location.href = "Actividad.html";
                    }
                }
            }, 3000);
        } else {
            console.error('Modal or image element not found in the DOM.');
        }
    }

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