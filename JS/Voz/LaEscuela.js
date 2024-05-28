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

    const micButton = document.querySelector('.microfono');
    let recognitionActive = false;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    const palabrasClavePorPagina = {
        "1Salon.html": ["salón"],
        "2Pizarron.html": ["pizarrón"],
        "3Escritoio.html": ["escritorio"],
        "4Cuadernos.html": ["cuadernos"],
        "5Maestra.html": ["maestra"],
        "6Goma.html": ["goma"],
        "7Lapiz.html": ["lápiz"],
        "8Crayones.html": ["crayones"],
        "9Tijeras.html": ["tijeras"],
        "10Mochila.html": ["mochila"]
    };

    function determinarPaginaActual() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        console.log('Página actual:', page); // Para depuración
        return page;
    }

    let paginaActual = determinarPaginaActual();

    function mostrarAlerta(imagenSrc, esCorrecto) {
        Swal.fire({
            imageUrl: imagenSrc,
            imageWidth: 400,
            imageHeight: 200,
            showConfirmButton: false,
            timer: 3000,
            willClose: () => {
                if (esCorrecto) {
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
            }
        });
    }

    function manejarReconocimiento(command) {
        const palabrasClave = palabrasClavePorPagina[paginaActual];
        if (!palabrasClave) {
            console.error('No se encontraron palabras clave para la página:', paginaActual);
            return;
        }

        const keywordRecognized = palabrasClave.some(keyword => command.includes(keyword.toLowerCase()));

        if (keywordRecognized) {
            console.log('Palabra clave reconocida en la página ' + paginaActual);
            mostrarAlerta('../assets/correcto.png', true);
        } else {
            console.log('Palabra clave no reconocida en la página ' + paginaActual);
            mostrarAlerta('../assets/incorrecto.png', false);
        }
    }

    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.timeout = 2000;

    micButton.addEventListener('click', () => {
        if (recognitionActive) {
            recognition.stop();
        } else {
            recognition.start();
        }
        recognitionActive = !recognitionActive;
        micButton.classList.toggle('escuchando');
        micButton.innerHTML = recognitionActive
            ? '<span class="material-symbols-outlined">hearing</span>'
            : '<span class="material-symbols-outlined">mic</span>';
        console.log('Reconocimiento de voz ' + (recognitionActive ? 'iniciado' : 'detenido') + '.');
    });

    recognition.addEventListener('result', (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase();
        console.log('La entrada de voz: ' + command);
        manejarReconocimiento(command);
    });

    recognition.addEventListener('end', () => {
        if (recognitionActive) {
            recognitionActive = false;
            micButton.classList.remove('escuchando');
            micButton.innerHTML = '<span class="material-symbols-outlined">mic</span>';
        }
        console.log('Reconocimiento de voz finalizado.');
    });

    recognition.addEventListener('error', (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        recognitionActive = false;
        micButton.classList.remove('escuchando');
        micButton.innerHTML = '<span class="material-symbols-outlined">mic</span>';
    });
});
