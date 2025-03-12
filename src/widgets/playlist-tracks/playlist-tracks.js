import {trackDurationConverter} from "../../shared/lib/trackDurationConverter.js";

// получаем данные из JSON Artists
const response = await fetch("./entities/artists.json");
const data = await response.json();
const artists = JSON.parse(JSON.stringify(data));
let prevTrack = null;


export function styleActiveTrack(trackId) {
    document.getElementById(`track-info${trackId}`).classList.add("playlist-grid_track-active");
    if (prevTrack !== null) {
        document.getElementById(`track-info${prevTrack}`).classList.remove("playlist-grid_track-active");
    }
    prevTrack = trackId;
}

// Функция для отрисовки фильтров
function playlistFiltersRender() {
    let html = `
        <div id="playlist-tracks" class="playlist-tracks">
            <div class="playlist-grid playlist-grid_filters">
                <div class="playlist-grid__filter">
                    <button class="playlist-grid__button" type="button">
                        TRACK
                        <span class="playlist-grid__caret">
                                <svg viewBox="0 0 24 24" focusable="false" data-testid="SortIcon"><path fill-rule="evenodd" d="M12 5.802a78.165 78.165 0 0 0-4.84 4.879l-.987-.897c.493-.542.99-1.073 1.489-1.593a77.593 77.593 0 0 1 3.89-3.786L12 4l.448.405a77.634 77.634 0 0 1 3.89 3.786c.5.52.996 1.051 1.489 1.593l-.987.897A78.694 78.694 0 0 0 12 5.802Zm0 12.396a78.067 78.067 0 0 0 4.84-4.879l.987.897c-.493.542-.99 1.073-1.489 1.593a77.594 77.594 0 0 1-3.89 3.786L12 20l-.448-.405a77.61 77.61 0 0 1-3.89-3.786 81.52 81.52 0 0 1-1.489-1.593l.987-.897A78.597 78.597 0 0 0 12 18.198Z" clip-rule="evenodd"></path></svg>
                            </span>
                    </button>
                </div>
                <div class="playlist-grid__filter">
                    <button class="playlist-grid__button" type="button">
                        ARTIST
                        <span class="playlist-grid__caret">
                                <svg viewBox="0 0 24 24" focusable="false" data-testid="SortIcon"><path fill-rule="evenodd" d="M12 5.802a78.165 78.165 0 0 0-4.84 4.879l-.987-.897c.493-.542.99-1.073 1.489-1.593a77.593 77.593 0 0 1 3.89-3.786L12 4l.448.405a77.634 77.634 0 0 1 3.89 3.786c.5.52.996 1.051 1.489 1.593l-.987.897A78.694 78.694 0 0 0 12 5.802Zm0 12.396a78.067 78.067 0 0 0 4.84-4.879l.987.897c-.493.542-.99 1.073-1.489 1.593a77.594 77.594 0 0 1-3.89 3.786L12 20l-.448-.405a77.61 77.61 0 0 1-3.89-3.786 81.52 81.52 0 0 1-1.489-1.593l.987-.897A78.597 78.597 0 0 0 12 18.198Z" clip-rule="evenodd"></path></svg>
                            </span>
                    </button>
                </div>
                <div class="playlist-grid__filter">
                    <button class="playlist-grid__button" type="button">
                        ALBUM
                        <span class="playlist-grid__caret">
                                <svg viewBox="0 0 24 24" focusable="false" data-testid="SortIcon"><path fill-rule="evenodd" d="M12 5.802a78.165 78.165 0 0 0-4.84 4.879l-.987-.897c.493-.542.99-1.073 1.489-1.593a77.593 77.593 0 0 1 3.89-3.786L12 4l.448.405a77.634 77.634 0 0 1 3.89 3.786c.5.52.996 1.051 1.489 1.593l-.987.897A78.694 78.694 0 0 0 12 5.802Zm0 12.396a78.067 78.067 0 0 0 4.84-4.879l.987.897c-.493.542-.99 1.073-1.489 1.593a77.594 77.594 0 0 1-3.89 3.786L12 20l-.448-.405a77.61 77.61 0 0 1-3.89-3.786 81.52 81.52 0 0 1-1.489-1.593l.987-.897A78.597 78.597 0 0 0 12 18.198Z" clip-rule="evenodd"></path></svg>
                            </span>
                    </button>
                </div>
                <div class="playlist-grid__filter">
                    <button class="playlist-grid__button" type="button">
                        ADDED
                        <span class="playlist-grid__caret">
                                <svg viewBox="0 0 24 24" focusable="false" data-testid="SortIcon"><path fill-rule="evenodd" d="M12 5.802a78.165 78.165 0 0 0-4.84 4.879l-.987-.897c.493-.542.99-1.073 1.489-1.593a77.593 77.593 0 0 1 3.89-3.786L12 4l.448.405a77.634 77.634 0 0 1 3.89 3.786c.5.52.996 1.051 1.489 1.593l-.987.897A78.694 78.694 0 0 0 12 5.802Zm0 12.396a78.067 78.067 0 0 0 4.84-4.879l.987.897c-.493.542-.99 1.073-1.489 1.593a77.594 77.594 0 0 1-3.89 3.786L12 20l-.448-.405a77.61 77.61 0 0 1-3.89-3.786 81.52 81.52 0 0 1-1.489-1.593l.987-.897A78.597 78.597 0 0 0 12 18.198Z" clip-rule="evenodd"></path></svg>
                            </span>
                    </button>
                </div>
                <div class="playlist-grid__filter">
                    <button class="playlist-grid__button" type="button">
                        <svg class="playlist-grid__icon" viewBox="0 0 24 24" focusable="false" data-testid="ClockOutlinedIcon"><path d="M11.335 8v4.275l3.195 3.195.94-.94-2.805-2.805V8h-1.33Z"></path><path fill-rule="evenodd" d="M4 12c0-5.138 2.862-8 8-8 5.137 0 8 2.862 8 8 0 5.137-2.863 8-8 8-5.138 0-8-2.863-8-8Zm1.333 0c0 4.424 2.243 6.667 6.667 6.667 4.424 0 6.667-2.243 6.667-6.667 0-4.424-2.243-6.667-6.667-6.667-4.424 0-6.667 2.243-6.667 6.667Z" clip-rule="evenodd"></path></svg>
                        <span class="playlist-grid__caret">
                                <svg viewBox="0 0 24 24" focusable="false" data-testid="SortIcon"><path fill-rule="evenodd" d="M12 5.802a78.165 78.165 0 0 0-4.84 4.879l-.987-.897c.493-.542.99-1.073 1.489-1.593a77.593 77.593 0 0 1 3.89-3.786L12 4l.448.405a77.634 77.634 0 0 1 3.89 3.786c.5.52.996 1.051 1.489 1.593l-.987.897A78.694 78.694 0 0 0 12 5.802Zm0 12.396a78.067 78.067 0 0 0 4.84-4.879l.987.897c-.493.542-.99 1.073-1.489 1.593a77.594 77.594 0 0 1-3.89 3.786L12 20l-.448-.405a77.61 77.61 0 0 1-3.89-3.786 81.52 81.52 0 0 1-1.489-1.593l.987-.897A78.597 78.597 0 0 0 12 18.198Z" clip-rule="evenodd"></path></svg>
                            </span>
                    </button>
                </div>
                <div class="playlist-grid__filter playlist-grid__filter_flex">
                    <label class="playlist-grid__checkbox-label">
                        <input class="playlist-grid__checkbox" type="checkbox" value="">
                    </label>
                </div>
            </div>
        </div>
    `
    document.querySelector("#playlist-section").insertAdjacentHTML('beforeend', html);
}

// Функция для нахождения исполнителей трека
function findAllArtists(artistsIds) {
    let html = ``;
    for (let i of artistsIds) {
        if (artists[i.toString()] !== undefined) {
            html += `<a href="#">${artists[i.toString()]["name"]}</a>, `
        } else{
            html += `<a href="#">unknown</a>, `
        }
    }
    return html.slice(0, html.length - 2);
}

// Основная функция
export async function playlistTracksRender(playlistId, tracksIds) {
    // Отрисовывем сначала все фильтры
    playlistFiltersRender();

    let html = ``;
    let playlistTracks = document.querySelector("#playlist-tracks");
    let playerImage = document.getElementById("player-image");
    let playerMusicName = document.getElementById("player-music-name");
    let playerArtist = document.getElementById("player-artist");
    let playerTimeSlider = document.getElementById("timeSlider");
    let playerTimeLeft = document.getElementById("player-time-left");
    let playerTimeRight = document.getElementById("player-time-right");
    let playPauseBtn = document.getElementById("play-pause");
    let playerCheck = document.getElementById("check-player");
    let nextTrack = document.getElementById("next-track");
    let prevTrack = document.getElementById("prev-track");

    // получаем данные из JSON Tracks
    let playlist = await fetch("./entities/playlists.json").then(res => res.json())
    let tracks = await fetch("./entities/tracks.json").then(res => res.json())
    let artists = await fetch("./entities/artists.json").then(res => res.json())


    let currPlaylistTracks = playlist.genres[playlistId].tracks;
    let currId = null
    let currName = null
    let currCover = null
    let trackPath = null
    let currArtists = null

    let myAudio = null
    let isPlaying = false

    function switchTrackRight() {
        let playerCheck = document.getElementById("check-player");
        if (playerCheck.checked) {
            let tracksQueue = localStorage.getItem("tracksQueue");
            updateTrack(tracksQueue.split(",")[1])
            localStorage.setItem("trackId", tracksQueue.split(",")[1]);
            styleActiveTrack(tracksQueue.split(",")[1])
            localStorage.setItem("tracksQueue", [...tracksQueue.split(",").slice(1), tracksQueue.split(",")[0]].toString());
            tracksQueue = localStorage.getItem("tracksQueue");
            changeIcon()
        }
    }

    nextTrack.addEventListener("click", () => {
        switchTrackRight()
    })

    function switchTrackLeft() {
        let playerCheck = document.getElementById("check-player");
        if (playerCheck.checked) {
            let tracksQueue = localStorage.getItem("tracksQueue");
            updateTrack(tracksQueue.split(",")[tracksQueue.split(",").length - 1])
            localStorage.setItem("trackId", tracksQueue.split(",")[tracksQueue.split(",").length - 1]);
            styleActiveTrack(tracksQueue.split(",")[tracksQueue.split(",").length - 1])
            localStorage.setItem("tracksQueue", [tracksQueue.split(",")[tracksQueue.split(",").length - 1], ...tracksQueue.split(",").slice(0, tracksQueue.split(",").length - 1)].toString());
            changeIcon()
        }
    }

    prevTrack.addEventListener("click", () => {
        switchTrackLeft()
    })

    function changeIcon() {
        console.log(isPlaying)
        if(!isPlaying) {
            playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PlayFilledIcon"><path d="M16.04 9.009a93.31 93.31 0 0 0-5.18-2.992 85.246 85.246 0 0 0-3.861-1.945.756.756 0 0 0-1.075.62 85.122 85.122 0 0 0-.246 4.317 92.993 92.993 0 0 0 0 5.982c.048 1.492.131 2.935.246 4.316.043.524.6.845 1.074.62a85.293 85.293 0 0 0 3.861-1.944 93.24 93.24 0 0 0 5.181-2.992 85.086 85.086 0 0 0 3.652-2.396.725.725 0 0 0 0-1.19A84.99 84.99 0 0 0 16.04 9.01Z"></path></svg>`;
        } else {
            playPauseBtn.innerHTML =`<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="PauseFilledIcon"><path fill-rule="evenodd" d="M5.001 11.58c.02-2.585.249-4.847.55-6.753A.97.97 0 0 1 6.503 4H11v16H6.521a.968.968 0 0 1-.95-.823A45.403 45.403 0 0 1 5 11.579ZM17.48 4c.468 0 .873.344.95.823a45.4 45.4 0 0 1 .57 7.598 45.347 45.347 0 0 1-.55 6.752.97.97 0 0 1-.951.827H13V4h4.479Z" clip-rule="evenodd"></path></svg>`
        }
    }

    function updateTrack(trackId) {
        currId = currPlaylistTracks.indexOf(Number(trackId));
        currName = tracks[trackId].title
        currCover = tracks[trackId].cover
        trackPath = tracks[trackId].path
        currArtists = (tracks[trackId].artist_id).map(id => artists[id].name);
        playerImage.src = currCover;
        playerMusicName.textContent = currName;
        playerArtist.textContent = currArtists.join(", ");
        playerTimeSlider.value = 0
        if (isPlaying) {
            myAudio.pause()
        }

        localStorage.setItem("trackId", trackId);
        localStorage.setItem("playlistId", playlistId);
        localStorage.setItem("isHandled", "1");
        localStorage.setItem("tracksQueue", [...currPlaylistTracks.slice(currId), ...currPlaylistTracks.slice(0, currId)].toString());
        myAudio =  new Audio(trackPath);
        myAudio.play();
        isPlaying = true;
        myAudio.addEventListener("loadeddata", () => {
            let audioDuration = Math.floor(myAudio.duration)
            const formatTime = (time) => (time < 10 ? `0${time}` : time)
            const minutes = formatTime(Math.floor(myAudio.duration / 60))
            const seconds = formatTime(Math.floor(audioDuration - minutes * 60))
            playerTimeRight.textContent = `${minutes}:${seconds}`;
        })

        myAudio.addEventListener("timeupdate", ({target}) => {
            playerTimeSlider.value = (target.currentTime / myAudio.duration) * 100;
            playerTimeSlider.style.setProperty('--time-value', `${(target.currentTime / myAudio.duration) * 100}%`);
            const formatTime = (time) => (time < 10 ? `0${time}` : time)
            const minutes = formatTime(Math.floor(myAudio.currentTime / 60))
            const seconds = formatTime(Math.floor(myAudio.currentTime % 60))
            playerTimeLeft.textContent = `${minutes}:${seconds}`;
        })

        myAudio.addEventListener("ended", ({target}) => {
            let playerCheck = document.getElementById("check-player");
            let repeat = localStorage.getItem("repeat");
            let track = localStorage.getItem("trackId");

            if (playerCheck.checked) {
              if (track == trackId) {
                if (repeat === "no") {
                  isPlaying = false
                  changeIcon()
                  myAudio.pause()
                } else if (repeat === "album") {
                  switchTrackRight()
                  let trackId = localStorage.getItem("trackId");
                  styleActiveTrack(trackId)
                } else if (repeat === "self") {
                  myAudio.currentTime = 0
                  myAudio.play()
                }
              }
            }
        })
    }

    function updateSlider() {
        const value = (playerTimeSlider.value - playerTimeSlider.min) / (playerTimeSlider.max - playerTimeSlider.min) * 100;
        myAudio.currentTime = (playerTimeSlider.value / 100) * myAudio.duration;
        playerTimeLeft.textContent = `${playerTimeSlider.value}%`;
    }

    function HandlePlayer() {
        if (isPlaying) {
            isPlaying = false
            myAudio.pause()
        } else {
            myAudio.play()
            isPlaying = true
        }
    }




    playPauseBtn.addEventListener("click", () => {
        HandlePlayer()
    })
    playerTimeSlider.addEventListener('input', updateSlider)
    // Сборка html
    try {
        let trackId = 0;
        for (let id of tracksIds) {
            const track = tracks[id.toString()];
            trackId++;
            html = `
                <audio id="track-audio${trackId}" src="${track["path"]}"></audio>
                <div id="track-info${trackId}" class="playlist-grid playlist-grid_track"
                data-track-id="${trackId}"
                data-playlist-id="${playlistId}">
                    <div class="playlist-track-controls playlist-track_spaced">
                        <div class="playlist-track-controls__left">
                            <div class="playlist-track-controls__cover-container">
                                <div class="playlist-track-controls__cover">
                                    <img src="${track["cover"]}" alt="Track Cover">
                                </div>
                                <div class="playlist-track-controls__play">
                                    <button id="play-button${trackId}" type="button">
                                        <svg viewBox="0 0 24 24" focusable="false" data-testid="PlayFilledIcon"><path d="M16.04 9.009a93.31 93.31 0 0 0-5.18-2.992 85.246 85.246 0 0 0-3.861-1.945.756.756 0 0 0-1.075.62 85.122 85.122 0 0 0-.246 4.317 92.993 92.993 0 0 0 0 5.982c.048 1.492.131 2.935.246 4.316.043.524.6.845 1.074.62a85.293 85.293 0 0 0 3.861-1.944 93.24 93.24 0 0 0 5.181-2.992 85.086 85.086 0 0 0 3.652-2.396.725.725 0 0 0 0-1.19A84.99 84.99 0 0 0 16.04 9.01Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="playlist-track-controls__track-title">
                            <span>${track["title"]}</span>
                        </div>
                        <div class="playlist-track-controls__right">
                            <button class="playlist-action__button playlist-track-controls__button" type="button" aria-label="Add to Favourite tracks">
                                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="HeartOutlinedIcon" aria-hidden="true"><path d="M16.46 6.788c.496 0 .957.16 1.385.489.451.336.719.803.796 1.389.204 1.537-.817 3.449-1.753 4.62a15.508 15.508 0 0 1-2.075 2.15 11.65 11.65 0 0 1-2.782 1.774h-.062c-.921-.41-1.82-.976-2.672-1.682a15.413 15.413 0 0 1-2.185-2.243c-.936-1.17-1.957-3.082-1.753-4.62a2.002 2.002 0 0 1 .81-1.399 2.212 2.212 0 0 1 1.37-.478c.142 0 .29.013.437.039.51.09 1.042.327 1.578.705.497.35.983.813 1.407 1.34L12 10.164l1.04-1.292c.423-.527.91-.99 1.406-1.34.536-.378 1.067-.615 1.578-.705a2.53 2.53 0 0 1 .436-.04Zm0-1.333c-.219 0-.442.02-.667.059-.756.133-1.472.475-2.115.928A8.405 8.405 0 0 0 12 8.036a8.405 8.405 0 0 0-1.678-1.594c-.643-.453-1.36-.795-2.115-.928a3.854 3.854 0 0 0-.667-.06 3.54 3.54 0 0 0-2.183.754c-.738.551-1.195 1.34-1.32 2.282-.258 1.947.88 4.185 2.034 5.628a16.74 16.74 0 0 0 2.375 2.437 12.87 12.87 0 0 0 3.034 1.896c.161.071.348.095.52.095.172 0 .359-.024.52-.095a12.957 12.957 0 0 0 3.154-1.997 16.834 16.834 0 0 0 2.255-2.336c1.154-1.443 2.292-3.681 2.034-5.628-.125-.942-.582-1.73-1.32-2.282a3.536 3.536 0 0 0-2.183-.753Z"></path></svg>
                            </button>
                            <button class="playlist-action__button playlist-track-controls__button" type="button" aria-label="View menu" aria-haspopup="true">
                                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-mpq5dm" data-testid="MoreHorizontalIcon" aria-hidden="true"><path d="M8.5 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="playlist-track-artist playlist-track_spaced">
                        ${findAllArtists(track["artist_id"])}
                    </div>
                    <div class="playlist-track-album playlist-track_spaced">
                        <a href="#">${track["album"]}</a>
                    </div>
                    <div class="playlist-track-added playlist-track_spaced">
                        <span>${track["release_date"]}</span>
                    </div>
                    <div class="playlist-track-duration playlist-track_spaced">
                        <span>${trackDurationConverter(track["duration"])}</span>
                    </div>
                    <div class="playlist-grid__filter playlist-grid__filter_flex">
                        <label class="playlist-grid__checkbox-label">
                            <input class="playlist-grid__checkbox" type="checkbox" value="">
                        </label>
                    </div>
                </div>
            `
            playlistTracks.insertAdjacentHTML('beforeend', html);
            document.getElementById(`play-button${trackId}`).addEventListener('click', () => {
                let playerTimeSlider = document.getElementById("timeSlider");
                let playerTimeLeft = document.getElementById("player-time-left");
                playerTimeSlider.style.setProperty('--time-value', `0`);
                playerTimeLeft.textContent = `00:00`;
                updateTrack(id, playlistId)
                playerCheck.checked = true
                playerCheck.dispatchEvent(new Event('change'));
                changeIcon()
                styleActiveTrack(id);
            });
            playPauseBtn.addEventListener("click", () => {
                if (playerCheck.checked) {
                    changeIcon()
                }
            })
        }
    }catch (error) {
        console.error("Ошибка при загрузке длительности треков:", error);
    }
}