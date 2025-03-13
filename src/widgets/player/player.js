import {styleActiveTrack} from "../playlist-tracks/playlist-tracks.js";

export function volumeControl() {
    const slider = document.getElementById('rangeSlider');
    let prevValue = slider.value
    const volumeIcon = document.getElementById('volume-icon');
    const volumePopover = document.getElementById('volume-popover');
    const volumePopoverSquare = document.getElementById('volume-popover-square');
    const settingsIcon = document.getElementById('player-settings');
    const settingsPopover = document.getElementById('settings-popover');
    const settingsPopoverSquare = document.getElementById('settings-popover-square');

    let isSettingsOpen = false;

    function updateSliderValue() {
        if (Number(slider.value) === 0) slider.value = prevValue;
        else slider.value = 0
        changeIcon()
    }

    function updateSliderBackground() {
        if (Number(slider.value) !== 0) {
            prevValue = slider.value
        }
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.setProperty('--value', `${value}%`);
        changeIcon()
    }

    function changeIcon() {
        if (Number(slider.value) === 0) {
            volumeIcon.style["fill"] = "#B560FFFF";
            volumeIcon.innerHTML = `<svg fill="#4ea8b4" id="volume-icon_off" viewBox="0 0 24 24" focusable="false" data-testid="VolumeMuteIcon" aria-hidden="true"><path fill-rule="evenodd" d="M7.015 8.007 10.33 4h1.657s.827 3.636.827 8.007c0 4.357-.83 7.993-.83 7.993H10.33l-3.245-3.993H4.667c-.368 0-.667-.325-.667-.727V8.735c0-.402.299-.728.667-.728h2.348Zm1.104 7.16 2.78 3.42c.236-1.366.582-3.837.582-6.58 0-2.76-.346-5.239-.582-6.604L8.043 8.857l-.4.483h-2.31v5.334h2.386l.4.493ZM18 9.53l.943.943L17.414 12l1.529 1.529-.943.943-1.529-1.529-1.528 1.529L14 13.53l1.529-1.529L14 10.473l.943-.943 1.528 1.529L18 9.53Z" clip-rule="evenodd"></path></svg>`;
        } else {
            volumeIcon.style["fill"] = "#FFFFFF";
            volumeIcon.innerHTML = `<svg id="volume-icon_on" viewBox="0 0 24 24" focusable="false" data-testid="VolumeMaxIcon" aria-hidden="true"> <path fill-rule="evenodd" d="M7.015 8.007 10.33 4h1.657s.827 3.636.827 8.007c0 4.357-.83 7.993-.83 7.993H10.33l-3.245-3.993H4.667c-.368 0-.667-.325-.667-.727V8.735c0-.402.299-.728.667-.728h2.348Zm1.104 7.16 2.78 3.42c.236-1.366.582-3.837.582-6.58 0-2.76-.346-5.239-.582-6.604L8.043 8.857l-.4.483h-2.31v5.334h2.386l.4.493Zm9.643-7.786-.943.942c1.137 1.137 1.731 2.399 1.72 3.65-.012 1.267-.646 2.542-1.834 3.686l.925.96c1.451-1.398 2.227-3 2.242-4.634.015-1.617-.715-3.21-2.11-4.604Zm-3.277 3.193c.448.45.683.936.679 1.408-.005.48-.256.973-.727 1.426l.925.96c.735-.707 1.127-1.528 1.135-2.374.008-.838-.362-1.655-1.07-2.362l-.942.942Z" clip-rule="evenodd"></path> </svg>`
        }
    }

    function onHoverVolume() {
        volumePopover.style.display = "flex"
        volumePopoverSquare.style.display = "block"
        setTimeout(() => {
            volumePopover.classList.add("player-right__volume-popover_hover")
            volumePopoverSquare.classList.add("player-right__volume-popover-square_hover")
        }, 1)
    }

    function onLeaveVolume() {
        volumePopover.classList.remove("player-right__volume-popover_hover")
        volumePopoverSquare.classList.remove("player-right__volume-popover-square_hover")
    }

    function onClickSettings() {
        if (!isSettingsOpen) {
            settingsPopover.style.display = "block"
            settingsIcon.style.fill = "var(--color-scheme-secondary)"
            settingsPopoverSquare.style.display = "block"
            setTimeout(() => {
                settingsPopover.style.opacity = "1"
                settingsPopoverSquare.style.opacity = "1"
            }, 1)
        } else {
            settingsPopover.style.opacity = "0"
            settingsPopoverSquare.style.opacity = "0"
            settingsIcon.style.fill = "#ffffff"
            setTimeout(() => {
                settingsPopover.style.display = "none"
                settingsPopoverSquare.style.display = "none"
            }, 300)
        }
        isSettingsOpen = !isSettingsOpen
    }

    function onClickWindow(e) {
        if (!e.composedPath().includes(settingsPopover) && !e.composedPath().includes(settingsIcon)) {
            isSettingsOpen = false
            settingsPopover.style.opacity = "0"
            settingsPopoverSquare.style.opacity = "0"
            settingsIcon.style.fill = "#ffffff"
            setTimeout(() => {
                settingsPopover.style.display = "none"
                settingsPopoverSquare.style.display = "none"
            }, 300)
        }
    }


    updateSliderBackground();
    volumePopover.addEventListener('transitionend', () => {
        if (!volumePopover.classList.contains('player-right__volume-popover_hover')) {
            volumePopover.style.display = "none";
            volumePopoverSquare.style.display = "none";
        }
    });
    settingsIcon.addEventListener("click", onClickSettings);
    volumeIcon.addEventListener("mouseenter", onHoverVolume);
    volumePopover.addEventListener("mouseenter", onHoverVolume);
    volumePopoverSquare.addEventListener("mouseenter", onHoverVolume);
    volumeIcon.addEventListener("mouseleave", onLeaveVolume);
    volumePopover.addEventListener("mouseleave", onLeaveVolume);
    volumePopoverSquare.addEventListener("mouseleave", onLeaveVolume);
    volumeIcon.addEventListener('click', updateSliderValue);
    slider.addEventListener('input', updateSliderBackground);
    volumeIcon.addEventListener('click', updateSliderBackground);
    window.addEventListener("click", onClickWindow);
}

export async function setPlayerController(playlistId, trackId, toPlay = false) {
    let playlist = await fetch("./entities/playlists.json").then(res => res.json())
    let tracks = await fetch("./entities/tracks.json").then(res => res.json())
    let artists = await fetch("./entities/artists.json").then(res => res.json())
    let playlistTracks = playlist.genres[playlistId].tracks;


    let currName = tracks[trackId].title
    let currCover = tracks[trackId].cover
    let currPath = tracks[trackId].path
    let currArtists = (tracks[trackId].artist_id).map(id => artists[id].name);

    setPlayerService(currName, currCover, currPath, currArtists, trackId, toPlay);
}

export function setRepeat() {
    localStorage.setItem("repeat", "no")
    let repeatIcon = document.getElementById("repeat-track");
    repeatIcon.addEventListener("click", toggleRepeat)
}


function toggleRepeat() {
    let repeatIcon = document.getElementById("repeat-track");
    let repeat = localStorage.getItem("repeat");
    if (repeat === "no") {
        repeatIcon.style.fill = "var(--color-scheme-secondary)"
        localStorage.setItem("repeat", "album")
    } else if (repeat === "album") {
        repeatIcon.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-e2c87f" data-testid="RepeatOneIcon" aria-hidden="true"><path fill-rule="evenodd" d="M5.254 11.999c0-3.478 2.969-4.466 5.46-4.682a.624.624 0 0 0 .572-.624v-.14a.617.617 0 0 0-.186-.444L9.168 4.192l-.882.89 1.149 1.14-.203.041C5.859 6.95 4 8.986 4 12c0 3.374 2.365 5.528 6.494 5.92l.11-1.248c-2.467-.235-5.35-1.244-5.35-4.672Zm14.746 0c0-3.374-2.365-5.528-6.494-5.92l-.11 1.248c2.467.236 5.35 1.245 5.35 4.672 0 3.478-2.97 4.466-5.46 4.682a.623.623 0 0 0-.572.625v.151c0 .167.068.33.187.447l1.932 1.904.88-.893-1.154-1.138.204-.041C18.14 17.052 20 15.014 20 11.999Zm-7.004-2.772v5.678h-1.254V10.63l-1.064 1.063-.886-.885 1.58-1.58h1.624Z" clip-rule="evenodd"></path></svg>`
        localStorage.setItem("repeat", "self")
    } else {
        repeatIcon.style.fill = "white"
        repeatIcon.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-ob9m0y" data-testid="RepeatIcon" aria-hidden="true"><path fill-rule="evenodd" d="M8.993 4.518c.11.065.2.118.381.234.61.391 1.019.671 1.616 1.11a1.18 1.18 0 0 1 .286 1.609 29.367 29.367 0 0 1-1.14 1.597 7.699 7.699 0 0 1-.289.36l-.11.136-.977-.785.13-.16.01-.012c.068-.083.127-.154.239-.3.132-.174.248-.33.36-.481l.17-.232-.282.058C6.683 8.205 5.254 9.709 5.254 12c0 3.32 2.882 4.298 5.347 4.527l-.104 1.25C6.367 17.393 4 15.292 4 12c0-2.945 1.869-4.932 5.26-5.597l.261-.051-.221-.15c-.186-.125-.38-.251-.603-.395a8.155 8.155 0 0 0-.349-.213l-.168-.1.649-1.073.164.097Zm4.51 1.706C17.634 6.606 20 8.707 20 12c0 2.902-1.818 4.88-5.118 5.572l-.255.053.216.147c.197.134.403.268.64.421.17.108.249.155.352.214l.166.1-.649 1.072-.16-.095-.011-.006a9.166 9.166 0 0 1-.375-.23 27.485 27.485 0 0 1-1.616-1.11 1.18 1.18 0 0 1-.285-1.609c.4-.598.687-1.001 1.14-1.596.126-.165.193-.246.27-.34l.018-.021.112-.136.977.785-.132.16c-.072.088-.13.159-.246.311-.12.157-.226.298-.328.435l-.176.24.29-.067c2.563-.587 3.916-2.074 3.916-4.3 0-3.32-2.881-4.298-5.347-4.527l.105-1.25Z" clip-rule="evenodd"></path></svg>`
        localStorage.setItem("repeat", "no")
    }
}

/*
export function setShuffle() {
    localStorage.setItem("shuffleEnabled", "false")
    let shuffleIcon = document.getElementById("shuffle-tracks");
    shuffleIcon.addEventListener("click", toggleShuffle)
}

function shuffleTracks(trackId) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const queue = localStorage.getItem(`tracksQueue`);
    if (!queue) return;

    const tracksQueue = queue.split(",");
    const shuffledTracks = shuffleArray(tracksQueue);
    [shuffledTracks[shuffledTracks.indexOf(trackId)], shuffledTracks[0]] = [shuffledTracks[0], shuffledTracks[shuffledTracks.indexOf(trackId)]];

    localStorage.setItem(`tracksQueue`, shuffledTracks.join(","));
}


function toggleShuffle() {
    const isShuffleEnabled = localStorage.getItem("shuffleEnabled") === "true";
    localStorage.setItem("shuffleEnabled", (!isShuffleEnabled).toString());

    const shuffleButton = document.getElementById("shuffle-tracks");
    shuffleButton.style.fill = isShuffleEnabled ? "var(--color-scheme-ice)" : "var(--color-scheme-secondary)";

    const trackId = localStorage.getItem("trackId");
    if (!isShuffleEnabled) {
        shuffleTracks(trackId);
    } else {
        let queue = localStorage.getItem(`tracksQueue`).split(",").sort((a, b) => a - b);
        let indexOfTrack = queue.indexOf(trackId);
        queue = queue.slice(indexOfTrack, queue.length).concat(queue.slice(0, indexOfTrack));

        localStorage.setItem(`tracksQueue`, queue.join(","));
    }
}
 */


function setPlayerService(name, cover, trackPath, artists, trackId, toPlay) {
    let playerImage = document.getElementById("player-image");
    let playerMusicName = document.getElementById("player-music-name");
    let playerArtist = document.getElementById("player-artist");
    let playerTimeSlider = document.getElementById("timeSlider");
    let playerTimeLeft = document.getElementById("player-time-left");
    let playerTimeRight = document.getElementById("player-time-right");
    let playPauseBtn = document.getElementById("play-pause");
    let playerCheck = document.getElementById("check-player");

    playerTimeSlider.value = 0
    let isPlaying = false;

    let myAudio = new Audio(trackPath);
    myAudio.addEventListener("loadeddata", () => {
        let audioDuration = Math.floor(myAudio.duration)
        const formatTime = (time) => (time < 10 ? `0${time}` : time)
        const minutes = formatTime(Math.floor(myAudio.duration / 60))
        const seconds = formatTime(Math.floor(audioDuration - minutes * 60))
        playerTimeRight.textContent = `${minutes}:${seconds}`;
    })

    myAudio.addEventListener("timeupdate", ({target}) => {
        let track = localStorage.getItem("trackId");
        if (track === trackId) {
            playerTimeSlider.value = (target.currentTime / myAudio.duration) * 100;
            playerTimeSlider.style.setProperty('--time-value', `${(target.currentTime / myAudio.duration) * 100}%`);
            const formatTime = (time) => (time < 10 ? `0${time}` : time)
            const minutes = formatTime(Math.floor(myAudio.currentTime / 60))
            const seconds = formatTime(Math.floor(myAudio.currentTime % 60))
            playerTimeLeft.textContent = `${minutes}:${seconds}`;
        } else {
            myAudio.currentTime = 0
            myAudio.pause()
        }
    })

    myAudio.addEventListener("ended", ({target}) => {
        let track = localStorage.getItem("trackId");
        let repeat = localStorage.getItem("repeat");
        let playerCheck = document.getElementById("check-player");
        if (!playerCheck.checked) {
            if (track === trackId) {
                if (repeat === "no") {
                    myAudio.pause()
                    isPlaying = false
                    changeIcon()
                } else if (repeat === "album") {
                    switchTrackRight()
                    let trackId = localStorage.getItem("trackId");
                    styleActiveTrack(trackId)
                } else if (repeat === "self") {
                    myAudio.currentTime = 0
                    myAudio.play()
                }
            }
        } else {
            myAudio.currentTime = 0
            myAudio.pause()
        }
    })

    playerImage.src = cover;
    playerMusicName.textContent = name;
    playerArtist.textContent = artists.join(", ");

    function updateSlider() {
        const value = (playerTimeSlider.value - playerTimeSlider.min) / (playerTimeSlider.max - playerTimeSlider.min) * 100;
        playerTimeSlider.style.setProperty('--time-value', `${value}%`);
        myAudio.currentTime = (playerTimeSlider.value / 100) * myAudio.duration;
        playerTimeLeft.textContent = `${playerTimeSlider.value}%`;
        localStorage.setItem("pauseTime", ((playerTimeSlider.value / 100) * myAudio.duration).toString())
    }

    localStorage.setItem("isHandled", "0");

    function HandlePlayer() {
        let isHandled = localStorage.getItem("isHandled");
        let track = localStorage.getItem("trackId");
        if (isPlaying) {
            myAudio.pause()
            isPlaying = false
        } else if (isHandled === "0" && trackId === track) {
            myAudio.play()
            isPlaying = true
        }
    }

    function handlePause() {
        myAudio.pause()
        isPlaying = false
    }

    function changeIcon() {
        if (!isPlaying) {
            playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PlayFilledIcon"><path d="M16.04 9.009a93.31 93.31 0 0 0-5.18-2.992 85.246 85.246 0 0 0-3.861-1.945.756.756 0 0 0-1.075.62 85.122 85.122 0 0 0-.246 4.317 92.993 92.993 0 0 0 0 5.982c.048 1.492.131 2.935.246 4.316.043.524.6.845 1.074.62a85.293 85.293 0 0 0 3.861-1.944 93.24 93.24 0 0 0 5.181-2.992 85.086 85.086 0 0 0 3.652-2.396.725.725 0 0 0 0-1.19A84.99 84.99 0 0 0 16.04 9.01Z"></path></svg>`;
        } else {
            playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PauseFilledIcon"><path fill-rule="evenodd" d="M5.001 11.58c.02-2.585.249-4.847.55-6.753A.97.97 0 0 1 6.503 4H11v16H6.521a.968.968 0 0 1-.95-.823A45.403 45.403 0 0 1 5 11.579ZM17.48 4c.468 0 .873.344.95.823a45.4 45.4 0 0 1 .57 7.598 45.347 45.347 0 0 1-.55 6.752.97.97 0 0 1-.951.827H13V4h4.479Z" clip-rule="evenodd"></path></svg>`
        }
    }

    if (toPlay) {
        isPlaying = true
        changeIcon()
        myAudio.play()
    }

    let nextTrack = document.getElementById("next-track");
    let prevTrack = document.getElementById("prev-track");

    function switchTrackRight() {
        myAudio.pause()
        myAudio = null
        changeIcon()
        let playlistId = localStorage.getItem("playlistId");
        let tracksQueue = localStorage.getItem("tracksQueue");
        setPlayerController(playlistId, tracksQueue.split(",")[1], true).then()
        localStorage.setItem("trackId", tracksQueue.split(",")[1]);
        localStorage.setItem("tracksQueue", [...tracksQueue.split(",").slice(1), tracksQueue.split(",")[0]].toString());
    }

    nextTrack.addEventListener("click", () => {
        let playerCheck = document.getElementById("check-player");
        if (!playerCheck.checked) {
            switchTrackRight()
            let trackId = localStorage.getItem("trackId");
            styleActiveTrack(trackId)
        }
    })

    function switchTrackLeft() {
        myAudio.pause()
        myAudio = null
        changeIcon()
        let playlistId = localStorage.getItem("playlistId");
        let tracksQueue = localStorage.getItem("tracksQueue");
        setPlayerController(playlistId, tracksQueue.split(",")[tracksQueue.split(",").length - 1], true).then()
        localStorage.setItem("trackId", tracksQueue.split(",")[tracksQueue.split(",").length - 1]);
        localStorage.setItem("tracksQueue", [tracksQueue.split(",")[tracksQueue.split(",").length - 1], ...tracksQueue.split(",").slice(0, tracksQueue.split(",").length - 1)].toString());
    }

    prevTrack.addEventListener("click", () => {
        let playerCheck = document.getElementById("check-player");
        if (!playerCheck.checked) {
            switchTrackLeft()
            let trackId = localStorage.getItem("trackId");
            styleActiveTrack(trackId)
        }
    })

    playerCheck.addEventListener("change", (event) => {
        if (event.target.checked === true) {
            handlePause()
        }
    })

    playPauseBtn.addEventListener("click", () => {
        if (!playerCheck.checked) {
            HandlePlayer()
            changeIcon()
        }
    })

    playerTimeSlider.addEventListener('input', () => {
        updateSlider()
    });
}