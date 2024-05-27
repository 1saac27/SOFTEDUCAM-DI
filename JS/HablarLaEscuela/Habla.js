$(document).ready(function() {
    const audio1 = new Audio('../../assets/AUDIOS/LAESCUELA/ESCUCHA Y REPITE LA PALABRA.aac'); // Ruta al primer archivo de audio
    const audio2 = new Audio('../../assets/AUDIOS/LAESCUELA/SALON.aac'); // Ruta al segundo archivo de audio

    $('.boton-audio').on('click', function() {
        $(this).addClass('pulsating');
        audio1.play();
        audio1.onended = function() {
            $('.boton-audio').removeClass('pulsating');
        };
    });

    $('.boton-audio2').on('click', function() {
        $(this).addClass('pulsating');
        audio2.play();
        audio2.onended = function() {
            $('.boton-audio2').removeClass('pulsating');
        };
    });

// ////////////////////////////////////INICIO DE HABLAR SALON/////////////////////////////////////////
    const micButton = document.querySelector('.microfono');

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Tu navegador no soporta el reconocimiento de voz.');
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const palabraClave = "salón";
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'microphone' }).then(function(result) {
            if (result.state !== 'granted') {
                alert('Por favor, concede permiso para usar el micrófono.');
            }
        });
    }

    micButton.addEventListener('click', () => {
        recognition.start();
        console.log('Voice recognition started. Speak into the microphone.');
        micButton.classList.add('escuchando');
        micButton.innerHTML = '<span class="material-symbols-outlined">more_horiz</span>';
    });

    recognition.addEventListener('result', (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase();
        console.log('Voice input: ' + command);
    
        if (command.includes(palabraClave.toLowerCase())) {
            console.log('Palabra clave reconocida: ' + palabraClave);
            Swal.fire({
                icon: 'success',
                title: '¡Correcto!',
                text: 'Has dicho: ' + palabraClave,
                showConfirmButton: false,
                timer: 3000 // Duración de la notificación en milisegundos (opcional)
            });
        } else {
            console.log('Palabra clave no reconocida.');
            Swal.fire({
                icon: 'error',
                title: 'Palabra no reconocida',
                text: 'Intenta de nuevo.',
                showConfirmButton: false,
                timer: 3000 // Duración de la notificación en milisegundos (opcional)
            });
        }

        // Restablecer el icono del botón del micrófono después de que se haya completado el reconocimiento de voz
        micButton.classList.remove('escuchando');
        micButton.innerHTML = '<span class="material-symbols-outlined">settings_voice</span>';
    });

    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });

    recognition.addEventListener('error', (event) => {
        console.error('Recognition error: ' + event.error);
        alert('Error de reconocimiento: ' + event.error);

        // Restablecer el icono del botón del micrófono después de un error en el reconocimiento de voz
        micButton.classList.remove('escuchando');
        micButton.innerHTML = '<span class="material-symbols-outlined">settings_voice</span>';
    });
});



