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
      volumeIcon.innerHTML =`<svg id="volume-icon_on" viewBox="0 0 24 24" focusable="false" data-testid="VolumeMaxIcon" aria-hidden="true"> <path fill-rule="evenodd" d="M7.015 8.007 10.33 4h1.657s.827 3.636.827 8.007c0 4.357-.83 7.993-.83 7.993H10.33l-3.245-3.993H4.667c-.368 0-.667-.325-.667-.727V8.735c0-.402.299-.728.667-.728h2.348Zm1.104 7.16 2.78 3.42c.236-1.366.582-3.837.582-6.58 0-2.76-.346-5.239-.582-6.604L8.043 8.857l-.4.483h-2.31v5.334h2.386l.4.493Zm9.643-7.786-.943.942c1.137 1.137 1.731 2.399 1.72 3.65-.012 1.267-.646 2.542-1.834 3.686l.925.96c1.451-1.398 2.227-3 2.242-4.634.015-1.617-.715-3.21-2.11-4.604Zm-3.277 3.193c.448.45.683.936.679 1.408-.005.48-.256.973-.727 1.426l.925.96c.735-.707 1.127-1.528 1.135-2.374.008-.838-.362-1.655-1.07-2.362l-.942.942Z" clip-rule="evenodd"></path> </svg>`
    }
  }

  function onHoverVolume() {
    volumePopover.style.display = "flex"
    volumePopoverSquare.style.display = "block"
    setTimeout(()=> {
      volumePopover.classList.add("player-right__volume-popover_hover")
      volumePopoverSquare.classList.add("player-right__volume-popover-square_hover")
    },1)
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
      setTimeout(()=> {
        settingsPopover.style.opacity = "1"
        settingsPopoverSquare.style.opacity = "1"
      },1)
    } else {
      settingsPopover.style.opacity = "0"
      settingsPopoverSquare.style.opacity = "0"
      settingsIcon.style.fill = "#ffffff"
      setTimeout(()=> {
        settingsPopover.style.display = "none"
        settingsPopoverSquare.style.display = "none"
      },300)
    }
    isSettingsOpen = !isSettingsOpen
  }

  function onClickWindow(e) {
    if (!e.composedPath().includes(settingsPopover) && !e.composedPath().includes(settingsIcon)) {
      isSettingsOpen = false
      settingsPopover.style.opacity = "0"
      settingsPopoverSquare.style.opacity = "0"
      settingsIcon.style.fill = "#ffffff"
      setTimeout(()=> {
        settingsPopover.style.display = "none"
        settingsPopoverSquare.style.display = "none"
      },300)
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

export async function setPlayerController(playlistId, trackId, tracksQueue) {
  let playlist = await fetch("./entities/playlists.json").then(res => res.json())
  let tracks = await fetch("./entities/tracks.json").then(res => res.json())
  let artists = await fetch("./entities/artists.json").then(res => res.json())

  let playlistTracks = playlist.genres[playlistId].tracks;

  let currId = playlistTracks.indexOf(Number(trackId));
  let currName = tracks[trackId].title
  let currCover = tracks[trackId].cover
  let currPath = tracks[trackId].path
  let currArtists = (tracks[trackId].artist_id).map(id => artists[id].name);

  setPlayerService(currName, currCover, currPath, currArtists, trackId);
}

function setPlayerService(name, cover, trackPath, artists, trackId) {
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

  const myAudio =  new Audio(trackPath);
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
    if (isPlaying) {
      myAudio.pause()
      isPlaying = false
    } else if(isHandled === "0") {
      myAudio.play()
      isPlaying = true
    }
  }

  function handlePause() {
    myAudio.pause()
    isPlaying = false
  }

  function changeIcon() {
      if(!isPlaying) {
          playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PlayFilledIcon"><path d="M16.04 9.009a93.31 93.31 0 0 0-5.18-2.992 85.246 85.246 0 0 0-3.861-1.945.756.756 0 0 0-1.075.62 85.122 85.122 0 0 0-.246 4.317 92.993 92.993 0 0 0 0 5.982c.048 1.492.131 2.935.246 4.316.043.524.6.845 1.074.62a85.293 85.293 0 0 0 3.861-1.944 93.24 93.24 0 0 0 5.181-2.992 85.086 85.086 0 0 0 3.652-2.396.725.725 0 0 0 0-1.19A84.99 84.99 0 0 0 16.04 9.01Z"></path></svg>`;
      } else {
          playPauseBtn.innerHTML =`<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PauseFilledIcon"><path fill-rule="evenodd" d="M5.001 11.58c.02-2.585.249-4.847.55-6.753A.97.97 0 0 1 6.503 4H11v16H6.521a.968.968 0 0 1-.95-.823A45.403 45.403 0 0 1 5 11.579ZM17.48 4c.468 0 .873.344.95.823a45.4 45.4 0 0 1 .57 7.598 45.347 45.347 0 0 1-.55 6.752.97.97 0 0 1-.951.827H13V4h4.479Z" clip-rule="evenodd"></path></svg>`
      }
  }

  playerCheck.addEventListener("change", (event) => {
    if (event.target.checked === true) {
      handlePause()
    }
  })
  playPauseBtn.addEventListener("click", () => {
    if (!playerCheck.checked) {
      console.log("hello")
      HandlePlayer()
      changeIcon()
    }
  })

  playerTimeSlider.addEventListener('input', () => {
    updateSlider()
  });
}