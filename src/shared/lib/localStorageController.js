import {styleActiveTrack} from "../../widgets/playlist-tracks/playlist-tracks.js";
import {setPlayerController} from "../../widgets/player/player.js";

function renderData() {
    let trackId = localStorage.getItem("trackId");
    let playlistId = localStorage.getItem("playlistId");
    let tracksQueue = localStorage.getItem("tracksQueue");
    setPlayerController(playlistId, trackId).then();
}

export {renderData};