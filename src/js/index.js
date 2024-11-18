const listaSelecaoPokedev = document.querySelectorAll (".pokedev");
listaSelecaoPokedev.forEach (pokedev =>{    
    console.log(pokedev);
    pokedev.addEventListener("click", () => {
        EsconderCartaoPokedev();
        const idPokedevSelecionado = MostrarCartaoPokedevSelecionado(pokedev);
        EsconderPokedevDaListagem();
        AtivarPokedevNaListagem(idPokedevSelecionado);
    })
})

function AtivarPokedevNaListagem(idPokedevSelecionado) {
    const pokedevSelecionadoNaListagem = document.getElementById(idPokedevSelecionado);
    pokedevSelecionadoNaListagem.classList.add("ativo");
}

function EsconderPokedevDaListagem() {
    const pokedevAtivoNaListagem = document.querySelector(".ativo");
    pokedevAtivoNaListagem.classList.remove("ativo");
}

function MostrarCartaoPokedevSelecionado(pokedev) {
    const idPokedevSelecionado = pokedev.attributes.id.value;
    const idDoCartaoPokedevParaAbrir = "cartao-" + idPokedevSelecionado;
    const cartaoPokedevParaAbrir = document.getElementById(idDoCartaoPokedevParaAbrir);
    cartaoPokedevParaAbrir.classList.add("aberto");
    return idPokedevSelecionado;
}

function EsconderCartaoPokedev() {
    const cartaoPokedevAberto = document.querySelector(".aberto");
    cartaoPokedevAberto.classList.remove("aberto");
}

const audio = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playButton');
        const progressBar = document.getElementById('progressBar');
        const progress = document.getElementById('progress');
        const currentTimeDisplay = document.getElementById('currentTime');
        const durationDisplay = document.getElementById('duration');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeIcon = document.getElementById('volumeIcon');

        let isPlaying = false;

        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playButton.textContent = '▶';
            } else {
                audio.play();
                playButton.textContent = '⏸';
            }
            isPlaying = !isPlaying;
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function updateProgress() {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }

        audio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', updateProgress);

        playButton.addEventListener('click', togglePlay);

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });

        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            updateVolumeIcon(e.target.value);
        });

        function updateVolumeIcon(volume) {
            if (volume >= 0.5) {
                volumeIcon.textContent = '🔊';
            } else if (volume > 0) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔇';
            }
        }

        volumeIcon.addEventListener('click', () => {
            if (audio.volume > 0) {
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeIcon.textContent = '🔇';
            } else {
                audio.volume = 1;
                volumeSlider.value = 1;
                volumeIcon.textContent = '🔊';
            }
        });