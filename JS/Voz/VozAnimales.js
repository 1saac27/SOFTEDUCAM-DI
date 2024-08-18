$(document).ready(function() {
    const micButton = document.querySelector('.microfono');
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    const palabrasClavePorPagina = {
        "1Pajaro.html": ["pájaro"],
        "2Perro.html": ["perro"],
        "3Elefante.html": ["elefante"],
        "4Gato.html": ["gato"],
        "5Pato.html": ["pato"],
        "6Vaca.html": ["vaca"],
        "7leon.html": ["león"],
        "8Panda.html": ["panda"],
        "9Pez.html": ["pez"],
        "10Caballo.html": ["caballo"]
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
                    if (paginaActual === "1Pajaro.html") {
                        window.location.href = "2Perro.html";
                    } else if (paginaActual === "2Perro.html") {
                        window.location.href = "3Elefante.html";
                    } else if (paginaActual === "3Elefante.html") {
                        window.location.href = "4Gato.html";
                    } else if (paginaActual === "4Gato.html") {
                        window.location.href = "5Pato.html";
                    } else if (paginaActual === "5Pato.html") {
                        window.location.href = "6Vaca.html";
                    } else if (paginaActual === "6Vaca.html") {
                        window.location.href = "7leon.html";
                    } else if (paginaActual === "7leon.html") {
                        window.location.href = "8Panda.html";
                    } else if (paginaActual === "8Panda.html") {
                        window.location.href = "9Pez.html";
                    } else if (paginaActual === "9Pez.html") {
                        window.location.href = "10Caballo.html";
                    } else if (paginaActual === "10Caballo.html") {
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