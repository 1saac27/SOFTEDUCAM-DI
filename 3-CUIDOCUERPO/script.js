$(document).ready(function() {
    // Función para manejar el inicio del arrastre cuando se mantiene presionado el botón de reproducción de audio
    $(".boton-audio3").on('mousedown touchstart', function(event) {
        // Agregamos un atributo "draggable" al elemento de audio para permitir el arrastre
        $(this).attr('draggable', true);
    });

    // Función para manejar el inicio del arrastre de los elementos de audio
    $(".boton-audio3").on('dragstart', function(event) {
        // Agregamos un atributo "data-audio" al elemento de audio para identificarlo durante el arrastre
        event.originalEvent.dataTransfer.setData('audio', $(this).attr('id'));
    });

    // Función para manejar el soltar de los elementos de audio en los espacios de audio
    $(".audio-space").on('dragover', function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del navegador
    });

    $(".audio-space").on('drop', function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del navegador

        // Obtenemos el ID del botón de audio que fue soltado
        var audioId = event.originalEvent.dataTransfer.getData('audio');

        // Obtenemos el ID del espacio de audio donde se soltó el audio
        var audioSpaceId = $(this).attr('id');

        // Movemos el audio al espacio de audio correspondiente
        $("#" + audioId).appendTo($(this));

        // Opcionalmente, podrías actualizar el contenido del espacio de audio con el audio soltado
        // $("#" + audioSpaceId).html($("#" + audioId));
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
        // Verificar si los audios están en los espacios correctos
        var todasCorrectas = true;
        $.each(respuestasCorrectas, function(audioId, espacioId) {
            var audioColocado = $("#" + espacioId).children("button").attr('id');
            if (audioColocado !== audioId) {
                todasCorrectas = false;
                // Resaltar visualmente el audio colocado incorrectamente
                $("#" + audioColocado).css('background-color', 'red');
            }
        });

        // Manejar el resultado de la validación
        if (todasCorrectas) {
            alert("¡Respuestas correctas! Enviando respuesta...");
            // Aquí puedes enviar las respuestas al servidor si es necesario
        } else {
            alert("Algunas respuestas son incorrectas. Por favor, verifique y vuelva a intentarlo.");
        }
    });
});