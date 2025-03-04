import {renderFunction} from "../../shared/lib/renderFunction.js";
import {playlistInfoRender} from "../../widgets/playlist-info/playlist-info.js";
import {playlistTracksRender} from "../../widgets/playlist-tracks/playlist-tracks.js";

export async function playlistPageRender(playlistId="1", tracksIds=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    await renderFunction('./pages/playlist-page/playlist-page.html', 'main-body-container').then();
    await playlistInfoRender(playlistId);
    await playlistTracksRender(playlistId, tracksIds);
}
