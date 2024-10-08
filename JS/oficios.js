$(document).ready(function() {
    // Función para barajar un array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Obtener todos los botones de audio y sus contenedores
    var audioButtons = $(".boton-audio3");
    var audioContainer = $("#audioContainer"); // Contenedor de los botones de audio

    // Convertir los botones de audio en un array y barajarlos
    var audioArray = $.makeArray(audioButtons);
    var shuffledAudioArray = shuffle(audioArray);

    // Limpiar el contenedor de audio antes de añadir los botones de audio barajados
    audioContainer.empty();

    // Crear las filas de audio
    var row1 = $('<div class="audio-row"></div>');
    var row2 = $('<div class="audio-row"></div>');

    // Añadir los botones de audio barajados a las filas
    for (var i = 0; i < shuffledAudioArray.length; i++) {
        var column = $('<div class="column"></div>').append(shuffledAudioArray[i]);
        if (i < 5) {
            row1.append(column);
        } else {
            row2.append(column);
        }
    }

    // Añadir las filas al contenedor de audio
    audioContainer.append(row1);
    audioContainer.append(row2);

    var selectedAudioButton = null;

    // Hacer que los botones de audio se seleccionen al hacer clic
    $(".boton-audio3").on('click', function() {
        var audioElement = $(this).find("audio")[0];
        if (audioElement) {
            // Iniciar la reproducción del audio
            audioElement.play();
            // Seleccionar el botón de audio
            selectedAudioButton = $(this);
            // Agregar la clase de animación al botón
            $(this).addClass('pulsate');
            // Remover la clase de animación después de que termine el audio
            audioElement.onended = function() {
                $(".boton-audio3").removeClass('pulsate');
            };
        }
    });

    // Función para manejar el soltar de los elementos de audio en los espacios de audio
    $(".audio-space").on('click', function(event) {
        if (selectedAudioButton) {
            // Mover el audio al espacio de audio correspondiente
            $(this).empty().append(selectedAudioButton);
            selectedAudioButton = null;
        }
    });

    // Objeto que almacena la relación entre los IDs de los audios y los espacios correspondientes
    var respuestasCorrectas = {
        'boton-audio1': 'audio-space1',
        'boton-audio2': 'audio-space2',
        'boton-audio3': 'audio-space3',
        'boton-audio4': 'audio-space4',
        'boton-audio5': 'audio-space5',
        'boton-audio6': 'audio-space6',
        'boton-audio7': 'audio-space7',
        'boton-audio8': 'audio-space8',
        'boton-audio9': 'audio-space9',
        'boton-audio10': 'audio-space10'
    };

    // Función para manejar el envío de respuestas
    $(".boton-rosa").on('click', function() {
        var correctas = 0;
        $.each(respuestasCorrectas, function(audioId, espacioId) {
            var audioColocado = $("#" + espacioId).children("button").attr('id');
            if (audioColocado === audioId) {
                correctas++;
            } else {
                $("#" + audioColocado).css('background-color', 'red');
            }
        });

        var mensaje;
        var imagenSrc;
        if (correctas === Object.keys(respuestasCorrectas).length) {
            mensaje = "<p style='text-align: center;'>¡FELICIDADES!</p>";
            imagenSrc = "../assets/feliz1.png"; // Ruta a la imagen para respuestas correctas
        } else {
            mensaje = "<p style='text-align: center;'>Algunas respuestas son incorrectas.</p>";
            imagenSrc = "../assets/triste1.png"; // Ruta a la imagen para respuestas incorrectas
        }

        $("#mensajeResultado").html(mensaje);
        $("#puntuacion").html("<p style='text-align: center;'>Puntos obtenidos: " + correctas + "</p>");
        $("#resultadoImagen").attr("src", imagenSrc);
        $("#resultadoModal").css('display', 'block');
    });

    // Función para cerrar el modal
    $(".close").on('click', function() {
        $("#resultadoModal").css('display', 'none');
    });

    // Función para volver a jugar
    $("#volverAJugar").on('click', function() {
        location.reload(); // Recargar la página
    });

    // Función para salir
    $("#salir").on('click', function() {
        window.location.href = "../1MAIN/Contenido.html"; // Redirigir a otra página
    });
});