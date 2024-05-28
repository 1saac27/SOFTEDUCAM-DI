function playAudio(audioId, button) {
    var audio = document.getElementById(audioId);

    if (audio.paused) {
        // Stop any other playing audio
        var audios = document.querySelectorAll('audio');
        audios.forEach(function(aud) {
            if (!aud.paused && aud !== audio) {
                aud.pause();
                aud.currentTime = 0;
                document.querySelector(`button[onclick="playAudio('${aud.id}', this)"]`).classList.remove('playing');
            }
        });

        audio.play();
        button.classList.add('playing');

        audio.onended = function() {
            button.classList.remove('playing');
        };
    } else {
        audio.pause();
        audio.currentTime = 0;
        button.classList.remove('playing');
    }
}