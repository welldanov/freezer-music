import {styleActiveTrack} from "../../widgets/playlist-tracks/playlist-tracks.js";
import {setPlayerController} from "../../widgets/player/player.js";

function renderData() {
    let trackId = localStorage.getItem("trackId");
    let playlistId = localStorage.getItem("playlistId");
    setPlayerController(playlistId, trackId).then();
    styleActiveTrack(trackId);
}

function setData(trackId, playlistId) {
    localStorage.setItem("trackId", trackId);
    localStorage.setItem("playlistId", playlistId);
    renderData();
}

export {renderData, setData};